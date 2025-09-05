import { useEffect, useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  // ✅ Hooks must be inside the function component
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
    <div className={`${geistSans.className} ${geistMono.className} font-sans p-8`}>
      <h1>KiteAI Tweets Leaderboard</h1>
      <ol>
        {tweets.map((tweet, idx) => (
          <li key={idx}>
            <p>{tweet.text}</p>
            <small>XP: {tweet.xp} | Score: {tweet.score}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
