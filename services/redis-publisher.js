let redis = require("redis");

class RedisPublisher {
  constructor() {
    this.channel = "tweets";
    this.publisher = redis.createClient();
  }

  publish(data) {
    this.publisher.publish(this.channel, JSON.stringify(data));
  }

  close() {
    this.publisher.quit();
    console.log("redis stream closed ...");
  }
}

module.exports = RedisPublisher;
