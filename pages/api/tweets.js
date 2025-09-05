export default async function handler(req, res) {
  const BEARER_TOKEN = process.env.BEARER_TOKEN;
  const url = `https://api.twitter.com/2/tweets/search/recent?query=KiteAI&max_results=50&tweet.fields=public_metrics,created_at,text,author_id`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });

    if (!response.ok) return res.status(response.status).json({ error: "Twitter API error" });

    const data = await response.json();

    const tweets = data.data.map((tweet) => {
      const likes = tweet.public_metrics.like_count;
      const retweets = tweet.public_metrics.retweet_count;
      const replies = tweet.public_metrics.reply_count;

      const score = likes + retweets + replies;
      let xp = 1;
      if (score > 20) xp = 50;
      else if (score > 10) xp = 30;
      else if (score > 5) xp = 10;

      return { text: tweet.text, xp, score };
    });

    res.status(200).json({ tweets });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}+
