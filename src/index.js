const express = require("express");
const path = require('path');

const hermes = require("./hermes")
const jsc = require("./jsc")
const V8 = require("./V8")

const app = express();
app.use(express.json());

app.post("/hermes", async (req, res) => {
  const { code } = req.body
  await hermes.executeJavaScript(code, (data) => res.write(data + "\n"));
  res.end()
});

app.post("/jsc", async (req, res) => {
    const { code } = req.body
    await jsc.executeJavaScript(code, (data) => res.write(data + "\n"));
    res.end()
  });

app.post("/V8", async (req, res) => {
    const { code } = req.body
    await V8.executeJavaScript(code, (data) => res.write(data + "\n"));
    res.end()
  });

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.listen(8080);
