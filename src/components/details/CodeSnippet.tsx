import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeSnippetProps {
  pythonCode: string;
  tsCode: string;
  title?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ pythonCode, tsCode, title = 'Solution Implementation' }) => {
  const [lang, setLang] = useState<'python' | 'ts'>('python');
  const [copied, setCopied] = useState(false);

  const activeCode = lang === 'python' ? pythonCode : tsCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        backgroundColor: '#070b14',
        border: '1px solid rgba(0, 245, 255, 0.2)',
        overflow: 'hidden',
        marginTop: '12px',
        marginBottom: '16px'
      }}
    >
      {/* Header with language selector and copy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'rgba(13, 21, 39, 0.9)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={15} color="#00f5ff" />
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Lang Tabs */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '2px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setLang('python')}
              style={{
                background: lang === 'python' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
                color: lang === 'python' ? '#00f5ff' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                fontWeight: lang === 'python' ? 600 : 400
              }}
            >
              Python
            </button>
            <button
              onClick={() => setLang('ts')}
              style={{
                background: lang === 'ts' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
                color: lang === 'ts' ? '#00f5ff' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                fontWeight: lang === 'ts' ? 600 : 400
              }}
            >
              TypeScript
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="cyber-btn-secondary"
            style={{
              padding: '3px 8px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <Check size={13} color="#39ff14" /> : <Copy size={13} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#d1e0ff',
          fontFamily: 'var(--font-mono)',
          backgroundColor: '#060a12'
        }}
      >
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};
