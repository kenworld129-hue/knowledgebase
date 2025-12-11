// 共通デザインテーマ
export const theme = {
  colors: {
    // ベースカラー（グレー）
    background: '#e5e7eb',
    cardBackground: '#d1d5db',
    cardHover: '#e5e7eb',
    border: '#9ca3af',
    
    // アクセントカラー１（ターコイズグリーン）
    primary: '#20b2aa',
    primaryHover: '#1a9a94',
    
    // アクセントカラー２（濃紺）
    secondary: '#1e3a8a',
    secondaryHover: '#1e40af',
    
    // テキストカラー
    textPrimary: '#495057',
    textSecondary: '#6c757d',
    textWhite: 'white',
  },
  
  shadows: {
    default: '0 2px 4px rgba(0,0,0,0.1)',
    hover: '0 8px 16px rgba(32, 178, 170, 0.15)',
    button: '0 4px 12px rgba(32, 178, 170, 0.3)',
  },
  
  borderRadius: {
    default: '8px',
    small: '6px',
    large: '12px',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  }
};

// メタリック光沢効果
export const addShineEffect = (element: HTMLElement, color = 'rgba(255,255,255,0.4)') => {
  const shine = document.createElement('div');
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${color}, transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  `;
  element.appendChild(shine);
  setTimeout(() => shine.style.left = '100%', 10);
  setTimeout(() => {
    if (element && element.contains(shine)) {
      element.removeChild(shine);
    }
  }, 500);
};

// 共通ボタンスタイル
export const buttonStyles = {
  primary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.textWhite,
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: theme.borderRadius.small,
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: theme.shadows.default,
  },
  
  secondary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textWhite,
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: theme.borderRadius.small,
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: theme.shadows.default,
  }
};

// 共通カードスタイル
export const cardStyles = {
  default: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.default,
    padding: '2rem',
    boxShadow: theme.shadows.default,
    border: `1px solid ${theme.colors.border}`,
  },
  
  interactive: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.default,
    padding: '1.25rem',
    cursor: 'pointer',
    boxShadow: theme.shadows.default,
    border: `1px solid ${theme.colors.border}`,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }
};

// 共通レイアウトスタイル
export const layoutStyles = {
  page: {
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  
  header: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textWhite,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.default,
    marginBottom: theme.spacing.xl,
    boxShadow: theme.shadows.default,
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  }
};