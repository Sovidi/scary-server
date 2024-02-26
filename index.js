const express = require('express')
var cors = require('cors')
const fs = require("fs");
var bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const data = {
  select : function () {
    return JSON.parse(fs.readFileSync("./test.json"))
  },
  insert : function (reqBody) {
    const jsonData = data.select();
    let newData = [...jsonData, {id: Date.now(), ...reqBody}];
    fs.writeFileSync("./test.json", JSON.stringify(newData));
    return newData;
  },
  delete : function() {},
  update : function(msg) {
    const jsonData = data.select();
    let putData = jsonData.map(item=>{
      if (item.name == "11") {
        item.msg = msg;
      }
      return item;
    });
    fs.writeFileSync(`./test.json`, JSON.stringify(putData));
  return putData;
  },
}

app.get(`/abc`, function (req, res) {
  res.send(data.select());
});

app.post("/insert", function(req, res) {
  res.send(data.insert(req.body));
  console.log(req.body);
})

app.delete("/abc/:id", function(req, res) {
  const jsonData = data.select();
  const {id} = req.params;
  const delData = jsonData.filter(item => item.id != id);

  fs.writeFileSync("./test.json", JSON.stringify(delData));
  res.send(delData);
})

app.put(`/update`, function(req, res) {
  res.send(data.update(req.body.msg));
})


app.listen(3050)