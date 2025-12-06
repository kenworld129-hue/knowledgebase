"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("ログイン失敗");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);

    router.push("/incidents"); // ログイン後一覧へ
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
