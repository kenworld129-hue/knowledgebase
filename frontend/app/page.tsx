"use client";

import { theme, layoutStyles, cardStyles, buttonStyles, addShineEffect } from '../lib/theme';

export default function Home() {
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
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: theme.colors.textPrimary,
            margin: '0 0 1rem 0'
          }}>📊 ダッシュボード</h1>
          <p style={{ 
            color: theme.colors.textSecondary, 
            fontSize: '1rem', 
            margin: '0 0 2rem 0' 
          }}>システム障害の状況を一目で確認できます</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
            <div style={{
              ...cardStyles.interactive,
              backgroundColor: theme.colors.background,
              textAlign: 'center'
            }}>
              <h3 style={{ color: theme.colors.primary, margin: '0 0 1rem 0' }}>📊 総インシデント数</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.textPrimary, margin: '0.5rem 0' }}>127</p>
              <p style={{ color: theme.colors.textSecondary, margin: 0 }}>先月比 +12%</p>
            </div>
            <div style={{
              ...cardStyles.interactive,
              backgroundColor: theme.colors.background,
              textAlign: 'center'
            }}>
              <h3 style={{ color: theme.colors.primary, margin: '0 0 1rem 0' }}>⚠️ 未解決</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.textPrimary, margin: '0.5rem 0' }}>8</p>
              <p style={{ color: theme.colors.textSecondary, margin: 0 }}>緊急度高: 2件</p>
            </div>
            <div style={{
              ...cardStyles.interactive,
              backgroundColor: theme.colors.background,
              textAlign: 'center'
            }}>
              <h3 style={{ color: theme.colors.primary, margin: '0 0 1rem 0' }}>⏱️ 平均解決時間</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.textPrimary, margin: '0.5rem 0' }}>2.4h</p>
              <p style={{ color: theme.colors.textSecondary, margin: 0 }}>先月比 -15%</p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            padding: '1.5rem',
            borderRadius: theme.borderRadius.default,
            marginBottom: '2rem',
            boxShadow: theme.shadows.default
          }}>
            <h2 style={{ color: theme.colors.textPrimary, margin: '0 0 1rem 0' }}>📅 最近のインシデント</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: theme.borderRadius.default, overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>ID</th>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>タイトル</th>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>システム</th>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>重要度</th>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>状態</th>
                  <th style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary, fontWeight: '600' }}>発生日時</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>#001</td>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>データベース接続エラー</td>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>ユーザー管理システム</td>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>Critical</td>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>未解決</td>
                  <td style={{ border: `1px solid ${theme.colors.border}`, padding: '0.75rem', color: theme.colors.textPrimary }}>2024-01-15 14:30</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`,
              padding: '1.5rem',
              borderRadius: theme.borderRadius.default,
              boxShadow: theme.shadows.default
            }}>
              <h3 style={{ color: theme.colors.textPrimary, margin: '0 0 1rem 0' }}>⚡ クイックアクション</h3>
              <a 
                href="/incidents/new" 
                style={{
                  ...buttonStyles.primary,
                  display: 'block',
                  margin: '0.5rem 0',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.secondaryHover;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  addShineEffect(e.currentTarget);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.secondary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ➕ 新しいインシデントを登録
              </a>
              <a 
                href="/incidents" 
                style={{
                  ...buttonStyles.secondary,
                  display: 'block',
                  margin: '0.5rem 0',
                  textDecoration: 'none',
                  textAlign: 'center'
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
                📄 全インシデントを表示
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
