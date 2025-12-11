"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchIncidentDetail, GetIncident } from "../../lib/api";
import { theme, layoutStyles, cardStyles, buttonStyles, addShineEffect } from "../../lib/theme";

export default function IncidentDetail() {
  const params = useParams();
  const id = params?.id;
  const [incident, setIncident] = useState<GetIncident | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const numericId = Number(id);
    if (isNaN(numericId)) return;

    fetchIncidentDetail(numericId)
      .then(setIncident)
      .catch(console.error);
  }, [id]);

  if (!incident) {
    return (
      <div style={layoutStyles.page}>
        <div style={{
          ...cardStyles.default,
          textAlign: 'center',
          color: theme.colors.textPrimary
        }}>
          🔄 読み込み中...
        </div>
      </div>
    );
  }

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
            }}>📝 インシデント詳細 #{incident.id}</h1>
            
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
          
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.default,
            overflow: 'hidden',
            boxShadow: theme.shadows.default
          }}>
            <tbody>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground, 
                  width: '200px',
                  color: theme.colors.textPrimary
                }}>ID</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>#{incident.id}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>タイトル</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600',
                  color: theme.colors.textPrimary
                }}>{incident.title || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>説明</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.description || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>重要度</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.severity || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>システム名</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.system_name || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>発生日時</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.occurred_at || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>解決日時</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.resolved_at || '未解決'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>原因</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.root_cause || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>解決方法</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.resolution || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>作成者</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.created_by || '-'}</td>
              </tr>
              <tr>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem', 
                  fontWeight: '600', 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.textPrimary
                }}>作成日時</td>
                <td style={{ 
                  border: `1px solid ${theme.colors.border}`, 
                  padding: '1rem',
                  color: theme.colors.textPrimary
                }}>{incident.created_at || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
