import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface SyntaxHighlighterProps {
  pythonCode: string;
  tsCode: string;
  title?: string;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  pythonCode,
  tsCode,
  title = 'Solution Code'
}) => {
  const [lang, setLang] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);

  const activeCode = lang === 'python' ? pythonCode.trim() : tsCode.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Tokenize code lines for VS Code / Pylance styling
  const renderHighlightedLine = (line: string, _lineIdx: number) => {
    // Regex for comments
    const commentMatch = lang === 'python' ? line.match(/^(.*?)(\s*#.*)$/) : line.match(/^(.*?)(\s*\/\/.*)$/);
    let codePart = line;
    let commentPart = '';

    if (commentMatch) {
      codePart = commentMatch[1];
      commentPart = commentMatch[2];
    }

    // Tokenize strings, keywords, types, numbers, functions, variables
    const tokenRegex = /(["'][^"']*["']|\b(?:def|class|return|if|elif|else|while|for|in|import|from|const|let|var|function|type|interface|extends|implements|new|typeof|instanceof|async|await|break|continue|try|except|catch|finally|throw)\b|\b(?:int|float|str|bool|List|Dict|Set|Optional|Tuple|number|string|boolean|void|any|Record|Array|Map|TreeNode|ListNode)\b|\b(?:self|this|true|false|True|False|None|null|undefined|Infinity|NaN)\b|\b\d+\b|[a-zA-Z_]\w*(?=\()|[a-zA-Z_]\w*|[^\s\w])/g;

    const parts = [];
    let lastIdx = 0;
    let match;

    while ((match = tokenRegex.exec(codePart)) !== null) {
      // push any text before match
      if (match.index > lastIdx) {
        parts.push(codePart.slice(lastIdx, match.index));
      }

      const token = match[0];
      let color = '#d4d4d4'; // default text
      let fontWeight = 'normal';
      let fontStyle = 'normal';

      if (/^["']/.test(token)) {
        color = '#ce9178'; // strings (orange-brown)
      } else if (/^(def|class|return|if|elif|else|while|for|in|import|from|const|let|var|function|type|interface|extends|implements|new|typeof|instanceof|async|await|break|continue|try|except|catch|finally|throw)$/.test(token)) {
        color = '#c586c0'; // control keywords (pink-purple)
        if (/^(def|class|function|return|import|from|const|let|var)$/.test(token)) color = '#569cd6'; // blue keywords
      } else if (/^(int|float|str|bool|List|Dict|Set|Optional|Tuple|number|string|boolean|void|any|Record|Array|Map|TreeNode|ListNode)$/.test(token)) {
        color = '#4ec9b0'; // types (teal)
      } else if (/^(self|this|true|false|True|False|None|null|undefined|Infinity|NaN)$/.test(token)) {
        color = '#569cd6'; // built-in constants (blue)
        fontWeight = '600';
      } else if (/^\d+$/.test(token)) {
        color = '#b5cea8'; // numbers (light green)
      } else if (codePart[match.index + token.length] === '(') {
        color = '#dcdcaa'; // function / method calls (warm yellow)
      } else if (/^[a-zA-Z_]\w*$/.test(token)) {
        color = '#9cdcfe'; // variables & identifiers (light blue)
      } else {
        color = '#d4d4d4'; // operators & punctuation
      }

      parts.push(
        <span key={match.index} style={{ color, fontWeight, fontStyle }}>
          {token}
        </span>
      );

      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < codePart.length) {
      parts.push(codePart.slice(lastIdx));
    }

    return (
      <>
        {parts}
        {commentPart && <span style={{ color: '#6a9955', fontStyle: 'italic' }}>{commentPart}</span>}
      </>
    );
  };

  const lines = activeCode.split('\n');

  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid #333333',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* IDE Editor Tab Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 16px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #333333'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#cccccc', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>
            {title} &bull; {lang === 'python' ? 'solution.py' : 'solution.ts'}
          </span>
        </div>

        {/* Language switcher & copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', backgroundColor: '#1e1e1e', padding: '2px', borderRadius: '4px', border: '1px solid #3c3c3c' }}>
            <button
              onClick={() => setLang('python')}
              style={{
                background: lang === 'python' ? '#37373d' : 'transparent',
                color: lang === 'python' ? '#4ec9b0' : '#858585',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Python 3 (Pylance)
            </button>
            <button
              onClick={() => setLang('typescript')}
              style={{
                background: lang === 'typescript' ? '#37373d' : 'transparent',
                color: lang === 'typescript' ? '#569cd6' : '#858585',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: copied ? 'rgba(57, 255, 20, 0.15)' : '#333333',
              color: copied ? '#39ff14' : '#cccccc',
              border: '1px solid #444',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div
        style={{
          display: 'flex',
          padding: '16px 0',
          overflowX: 'auto',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.6'
        }}
      >
        {/* Line Numbers Gutter */}
        <div
          style={{
            userSelect: 'none',
            padding: '0 16px 0 16px',
            color: '#858585',
            textAlign: 'right',
            borderRight: '1px solid #333333',
            marginRight: '16px'
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Lines */}
        <div style={{ flex: 1, paddingRight: '20px' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ whiteSpace: 'pre' }}>
              {renderHighlightedLine(line, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
