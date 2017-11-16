const express = require("express");
const jsonfile = require("jsonfile");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors())

const file = "./data.json";

app.get("/", (req, res) => {
  jsonfile.readFile(file, function(err, obj) {
    res.send(obj);
  });
});

app.post("/update", (req, res) => {

  jsonfile.writeFile(file, req.body, function(err) {
    console.error(err);
  });
  console.log(req.body)
  res.send({status:200,message:'success'})
});

app.listen(3001);
