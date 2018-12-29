let express = require("express");
let TwitterStream = require("./services/twitter-stream");
let RedisPublisher = require("./services/redis-publisher");
let RedisSubscriber = require("./services/redis-subscriber");

let twitterStream = new TwitterStream();
let redisPublisher = new RedisPublisher();
let redisSubscriber = new RedisSubscriber();

let app = express();

let PORT = 3423;

let streamPipe = redisPublisher;

app.get("/", (req, res) => res.send("Hello People!"));

app.get("/stream/start", (req, res) => {
  twitterStream.start(streamPipe);
  res.send("streaming started...");
});

app.get("/stream/stop", (req, res) => {
  twitterStream.stop(streamPipe);
  res.send("streaming stopped.");
});

app.get("/listen/start", (req, res) => {
  redisSubscriber.listen();
  res.send("listening started...");
});

app.get("/listen/stop", (req, res) => {
  redisSubscriber.close();
  res.send("listening stopped.");
});

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
