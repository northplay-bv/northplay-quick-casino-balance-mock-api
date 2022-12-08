// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var url = String(process.env.HOSTNAME).split("-");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// basically the database / storage (for aslong the instance is live)
var storedUserBalance = 1000;
var storedUsername = "betboy";
var storedUserId = 59;
var storedCurrency = "USD";
var lastBalanceRequest = null;

// This route processes GET requests to "/"`
app.get("/", function (req, res) {
  var dummyData = {
    id: storedUserId,
    balance: storedUserBalance,
    username: storedUsername,
    currency: storedCurrency,
  };

  res.send(
    "<h3>CASINO TEST REST API</h3><p>Using Express and body-parser.<br /><br />To test, curl the following and view the terminal logs:<br /><br /><i>" +
      `curl -H "Content-Type: application/json" -X POST -d '{"username":"betboy","balance":500}' https://` +
      req.headers.host +
      "/balance</i></p>" +
      "<p><h4>Current User Data:</h4><i>" +
      JSON.stringify(dummyData) +
      "</i> </p>" +
      "<p><h4>Last balance change:</h4><i>" +
      (lastBalanceRequest
        ? JSON.stringify(lastBalanceRequest)
        : "nothing yet") +
      "</p> </i>"
  );
  console.log("Received GET: '/'");
});

// A route for POST requests sent to `/balance`
app.post("/balance", function (req, res) {
  if (!req.body.balance) {
    console.log("Received incomplete POST: " + JSON.stringify(req.body));
    return res.send({ status: "error", message: "missing balance paramet" });
  }
  storedUserBalance = Number(req.body.balance);
  var dummyData = {
    id: storedUserId,
    balance: storedUserBalance,
    username: storedUsername,
    currency: storedCurrency,
  };
  lastBalanceRequest = JSON.stringify(req.body);
  return res.send(dummyData);
});
// A GET request handler for `/balance`
app.get("/balance", function (req, res) {
  var dummyData = {
    id: storedUserId,
    balance: storedUserBalance,
    username: storedUsername,
    currency: storedCurrency,
  };
  console.log("Received GET: '/balance' - " + JSON.stringify(req.query));
  if (!req.query.username) {
    return res.send({ status: "error", message: "no username" });
  } else if (req.query.username !== dummyData.username) {
    return res.send({ status: "error", message: "username does not match" });
  } else {
    return res.send(dummyData);
  }
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
