import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeSnippetProps {
  pythonCode: string;
  tsCode: string;
  title?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  pythonCode,
  tsCode,
  title = 'Solution Code'
}) => {
  const [lang, setLang] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);

  const activeCode = lang === 'python' ? pythonCode : tsCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#070a13',
        border: '1px solid rgba(0, 245, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }}
    >
      {/* Code Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#0c1322',
          borderBottom: '1px solid rgba(0, 245, 255, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={15} color="var(--neon-cyan)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e0eaff', fontFamily: 'var(--font-mono)' }}>
            {title}
          </span>
        </div>

        {/* Language Tabs & Copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: 'rgba(5, 8, 16, 0.8)', padding: '2px', borderRadius: '4px' }}>
            <button
              onClick={() => setLang('python')}
              style={{
                background: lang === 'python' ? 'rgba(0, 245, 255, 0.25)' : 'transparent',
                color: lang === 'python' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Python
            </button>
            <button
              onClick={() => setLang('typescript')}
              style={{
                background: lang === 'typescript' ? 'rgba(0, 245, 255, 0.25)' : 'transparent',
                color: lang === 'typescript' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              TypeScript
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="cyber-btn-secondary"
            style={{ padding: '4px 8px', fontSize: '0.72rem', display: 'flex', gap: '4px' }}
          >
            {copied ? <Check size={13} color="var(--neon-green)" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Display Body */}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          overflowX: 'auto',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.5,
          color: '#c9e6ff'
        }}
      >
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};
