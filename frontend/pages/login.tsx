"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "../lib/api";
import { theme, layoutStyles, cardStyles, buttonStyles, addShineEffect } from "../lib/theme";

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
    <div style={layoutStyles.page}>
      <div style={layoutStyles.header}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          margin: 0
        }}>
          🗂 KnowledgeBase
        </h1>
      </div>
      
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={cardStyles.default}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: theme.colors.textPrimary,
            margin: '0 0 2rem 0',
            textAlign: 'center'
          }}>🔐 ログイン</h1>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: theme.colors.textPrimary,
                fontWeight: '500'
              }}>ユーザー名</label>
              <input
                type="text"
                placeholder="ユーザー名を入力"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.small,
                  backgroundColor: theme.colors.background,
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: theme.colors.textPrimary,
                fontWeight: '500'
              }}>パスワード</label>
              <input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.small,
                  backgroundColor: theme.colors.background,
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            
            <button 
              type="submit"
              style={{
                ...buttonStyles.primary,
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.secondaryHover;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = theme.shadows.button;
                addShineEffect(e.currentTarget);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.secondary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.shadows.default;
              }}
            >
              🔐 ログイン
            </button>
          </form>
          
          {message && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fca5a5',
              borderRadius: theme.borderRadius.small
            }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
