export default async function handler(req, res) {
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

  try {
    const response = await fetch(
      "https://api.twitter.com/2/tweets/search/recent?query=KiteAI&max_results=100&tweet.fields=author_id,created_at,public_metrics",
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    const tweets = (data.data || []).map((tweet) => {
      const xp = tweet.public_metrics.like_count + tweet.public_metrics.retweet_count;
      const quality = xp > 5 ? "High" : "Low";
      return {
        text: tweet.text,
        author: tweet.author_id,
        xp,
        quality,
      };
    });

    tweets.sort((a, b) => b.xp - a.xp);

    res.status(200).json({ tweets: tweets.slice(0, 100) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
