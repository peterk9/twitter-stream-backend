let TwitterStreamAPI = require("twitter-stream-api");

let keys = {
  consumer_key: "",
  consumer_secret: "",
  token: "",
  token_secret: ""
};

class TwitterStream {
  constructor() {
    this.Twitter = new TwitterStreamAPI(keys, false);
  }

  start(streamPipe) {
    this.Twitter.stream("statuses/filter", {
      track: "javascript"
    });

    this.Twitter.on("connection success", function(uri) {
      console.log("connection success", uri);
    });

    this.Twitter.on("data", function(streamChunk) {
      let parsedTweet = JSON.parse(streamChunk);

      let tweet = {
        created_at: parsedTweet.created_at,
        text: parsedTweet.text,
        source: parsedTweet.source,
        user: {
          name: parsedTweet.user.name,
          description: parsedTweet.user.description,
          profile_image_url: parsedTweet.user.profile_image_url
        }
      };

      //console.log(tweet);
      streamPipe.publish(tweet);
    });

    this.Twitter.on("connection error network", function(error) {
      console.log("connection error network", error);
    });
  }

  stop(streamPipe) {
    //TODO: check if stream is even open
    this.Twitter.close();
    this.streamPipe.close();
    console.log("twitter stream closed...");
  }
}

module.exports = TwitterStream;
