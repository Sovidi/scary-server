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
    let newData = [...jsonData, {id: jsonData.length+1, ...reqBody}];
    fs.writeFileSync("./test.json", JSON.stringify(newData));
    return newData;
  },
  delete : function() {},
  update : function() {},
}

app.get('/abc', function (req, res) {
  res.send(data.select());
});

app.post("/insert", function(req, res) {
  res.send(data.insert(req.body));
})

app.delete("/abc/:id", function(req, res) {
  const jsonData = data.select();
  const {id} = req.params;
  const delData = jsonData.filter(item => item.id != id);

  fs.writeFileSync("./test.json", JSON.stringify(delData));
  res.send(delData);
})


app.listen(3050)