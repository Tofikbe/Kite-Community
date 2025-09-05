import { useEffect, useState } from "react";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tweets")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.tweets || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>KiteAI Tweets Leaderboard</h1>
      <ol>
        {tweets.map((tweet, index) => (
          <li key={index}>
            <p>{tweet.text}</p>
            <small>XP: {tweet.xp} | Score: {tweet.score}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
  const [tweets, setTweets] = useState([]);
