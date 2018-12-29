let redis = require("redis");
const io = require("socket.io")();

const port = 8000;
io.listen(port);
console.log("listening on port ", port);

let channel = "tweets";

let CLIENT = null;

class RedisSubscriber {
  constructor() {
    this.channel = "tweets";
    this.subscriber = redis.createClient();
    this.subscriber.subscribe(channel);

    this.io = io;
    this.io.on("connection", client => {
      CLIENT = client;
      CLIENT.on("subscribeToTweet", () =>
        console.log("subscribed to tweets...")
      );
    });
  }

  listen() {
    this.subscriber.on("message", (channel, message) => {
      console.log(`tweet : ${message}`);
      let tweet = message;
      CLIENT.emit("tweet", tweet);
    });
  }

  close() {
    this.subscriber.quit();
    console.log("redis subscriber closed ...");
  }
}

module.exports = RedisSubscriber;
