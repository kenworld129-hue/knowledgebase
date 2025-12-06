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
    const body: LoginRequest = {
      username,
      password,
    };
    try {
      const result = await login(body);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage(String(err));
        }
    }


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
