import { useEffect, useState } from "react";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tweets")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.tweets);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-white text-3xl text-center mt-20">Loading...</h2>;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black animate-pulse -z-10"></div>

      <h1 className="text-4xl font-bold text-center mb-8">KiteAI Tweets Leaderboard (24h)</h1>

      <ol className="space-y-4 max-w-3xl mx-auto">
        {tweets.map((tweet, idx) => (
          <li
            key={idx}
            className={`p-4 rounded-lg border border-gray-700 hover:border-white transition-colors ${
              tweet.quality === "High" ? "bg-purple-900 animate-pulse" : "bg-gray-800"
            }`}
          >
            <p className="text-white">{tweet.text}</p>
            <small className="text-gray-400">
              XP: {tweet.xp} | Quality: {tweet.quality} | Author: {tweet.author}
            </small>
          </li>
        ))}
      </ol>
    </div>
  );
}
