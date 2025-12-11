import { useState } from "react";
import { createIncident, PostIncident } from "../../lib/api";
import { useRouter } from "next/navigation";
import { theme, layoutStyles, cardStyles, buttonStyles, addShineEffect } from "../../lib/theme";

export default function NewIncidentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [occurred_at, setOccurred_at] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const incident: PostIncident = {
      title,
      description,
      severity,
      occurred_at,
    };
    try {
      const result = await createIncident(incident);
      setMessage(`インシデントが作成されました: ID ${result.id}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage(String(err));
        }
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
      
      <div style={layoutStyles.container}>
        <div style={cardStyles.default}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: theme.colors.textPrimary,
              margin: 0
            }}>➕ 新しいインシデントを作成</h1>
            
            <button
              onClick={() => router.push('/incidents')}
              style={{
                ...buttonStyles.secondary,
                padding: '0.5rem 1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.primaryHover;
                e.currentTarget.style.transform = 'translateY(-2px)';
                addShineEffect(e.currentTarget);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.primary;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← 一覧に戻る
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: theme.colors.textPrimary
              }}>
                タイトル *
              </label>
              <input
                type="text"
                placeholder="インシデントのタイトルを入力"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                fontWeight: '500',
                color: theme.colors.textPrimary
              }}>
                詳細説明
              </label>
              <textarea
                placeholder="インシデントの詳細を記述"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.small,
                  backgroundColor: theme.colors.background,
                  minHeight: '120px',
                  resize: 'vertical',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: theme.colors.textPrimary
              }}>
                重要度
              </label>
              <select 
                value={severity} 
                onChange={(e) => setSeverity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.small,
                  backgroundColor: theme.colors.background,
                  fontSize: '1rem'
                }}
              >
            <option value="low">Low - 低</option>
            <option value="medium">Medium - 中</option>
            <option value="high">High - 高</option>
            <option value="critical">Critical - 緊急</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: theme.colors.textPrimary
              }}>
                発生日時
              </label>
              <input
                type="datetime-local"
                value={occurred_at}
                onChange={(e) => setOccurred_at(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.small,
                  backgroundColor: theme.colors.background,
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              style={buttonStyles.primary}
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
              ✨ インシデントを作成
            </button>
          </form>
          
          {message && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: message.includes('作成されました') ? '#f0fdf4' : '#fee2e2',
              color: message.includes('作成されました') ? '#16a34a' : '#dc2626',
              border: `1px solid ${message.includes('作成されました') ? '#86efac' : '#fca5a5'}`,
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
