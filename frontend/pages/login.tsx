"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "../lib/api";


export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: LoginRequest = { username, password };
    try {
      await login(body);
      router.push("/incidents");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : String(err));
    }
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
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
