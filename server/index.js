const express = require("express");
const expressWS = require("express-ws");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const WSServer = expressWS(app);

app.use(cors());
app.use(express.json());

const PORT = 5000;
const aWss = WSServer.getWss();
app.ws("/", (ws, req) => {
  console.log("Connection is ready...");
  //   ws.send("Hello from server");
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.method) {
      case "connection":
        connectionHandler(ws, message);
        break;

      case "draw":
        broadcastDraw(ws, message);
        break;
    }
  });
});

const connectionHandler = (ws, message) => {
  ws.id = message.id;
  //   ws.username = message.username;
  broadcastConnection(ws, message);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      //   client.send(`User ${msg.username} connected`);
      client.send(JSON.stringify(msg));
    }
  });
};

const broadcastDraw = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

app.post("/img", (req, res) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    res.status(200).json({ message: "It's ok" });
  } catch (error) {
    console.log("Ошибка!");
    console.log(error);
  }
});

app.get("/img", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );

    const data = "data:image/png;base64," + file.toString("base64");
    res.json(data);
  } catch (error) {
    console.log("Ошибка!");
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server started ...");
});
