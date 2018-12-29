let TwitterStreamAPI = require("twitter-stream-api");

let keys = {
  consumer_key: "naXqHYuZjUJZW0YXvyPHiETBi",
  consumer_secret: "VJsSPJTxQkRHPTH7QuQyLdBsPCB0JhCP0SmF7g3487lvUERDCl",
  token: "2943057045-P7mYjlS4FhAxQqscmnE67noKRA8G3BRSHfX0Gf3",
  token_secret: "W6d1YbdTETeaiZuDY8Q2Kw4uqYexAAlNcgDD6BjdTRfc1"
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
