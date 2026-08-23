import React, { useState } from 'react';
import { Copy, Check, Maximize2, Minimize2, ZoomIn, ZoomOut, WrapText } from 'lucide-react';

interface SyntaxHighlighterProps {
  pythonCode: string;
  tsCode: string;
  title?: string;
  defaultExpanded?: boolean;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  pythonCode,
  tsCode,
  title = 'Solution Code',
  defaultExpanded = false
}) => {
  const [lang, setLang] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [fontSize, setFontSize] = useState<number>(13.5); // px
  const [wrapLines, setWrapLines] = useState<boolean>(false);

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
      if (match.index > lastIdx) {
        parts.push(codePart.slice(lastIdx, match.index));
      }

      const token = match[0];
      let color = '#d4d4d4';
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

  const editorContent = (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid #333333',
        borderRadius: isExpanded ? '12px' : 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: isExpanded ? '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 245, 255, 0.2)' : '0 8px 30px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        height: isExpanded ? '85vh' : 'auto',
        maxHeight: isExpanded ? '85vh' : '520px',
        width: '100%',
        transition: 'all 0.25s ease'
      }}
    >
      {/* IDE Editor Tab Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #333333',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        {/* Left window indicators & title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <span style={{ fontSize: '0.82rem', color: '#e0e0e0', fontFamily: 'var(--font-mono)', fontWeight: 600, marginLeft: '6px' }}>
            {title} &bull; <span style={{ color: lang === 'python' ? '#4ec9b0' : '#569cd6' }}>{lang === 'python' ? 'solution.py' : 'solution.ts'}</span>
          </span>
        </div>

        {/* Right tools: Language toggle, font size, wrap, maximize & copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {/* Language Switcher */}
          <div style={{ display: 'flex', backgroundColor: '#1e1e1e', padding: '2px', borderRadius: '4px', border: '1px solid #3c3c3c' }}>
            <button
              onClick={() => setLang('python')}
              style={{
                background: lang === 'python' ? '#37373d' : 'transparent',
                color: lang === 'python' ? '#4ec9b0' : '#858585',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '3px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
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
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              TypeScript
            </button>
          </div>

          {/* Zoom controls */}
          <div style={{ display: 'flex', backgroundColor: '#1e1e1e', borderRadius: '4px', border: '1px solid #3c3c3c' }}>
            <button
              onClick={() => setFontSize(f => Math.max(11, f - 1))}
              title="Decrease Font Size"
              style={{ background: 'transparent', border: 'none', color: '#858585', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ZoomOut size={13} />
            </button>
            <span style={{ fontSize: '0.7rem', color: '#aaa', fontFamily: 'var(--font-mono)', alignSelf: 'center', padding: '0 4px' }}>
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(f => Math.min(18, f + 1))}
              title="Increase Font Size"
              style={{ background: 'transparent', border: 'none', color: '#858585', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ZoomIn size={13} />
            </button>
          </div>

          {/* Wrap lines toggle */}
          <button
            onClick={() => setWrapLines(!wrapLines)}
            title={wrapLines ? 'Disable Line Wrap' : 'Enable Line Wrap'}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: wrapLines ? '#37373d' : '#1e1e1e',
              color: wrapLines ? 'var(--neon-cyan)' : '#858585',
              border: '1px solid #3c3c3c',
              borderRadius: '4px',
              padding: '4px 6px',
              cursor: 'pointer'
            }}
          >
            <WrapText size={13} />
          </button>

          {/* Maximize / Expand Modal Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse View' : 'Expand Fullscreen Code Editor'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: isExpanded ? 'rgba(0, 245, 255, 0.2)' : '#1e1e1e',
              color: isExpanded ? 'var(--neon-cyan)' : '#858585',
              border: `1px solid ${isExpanded ? 'var(--neon-cyan)' : '#3c3c3c'}`,
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isExpanded ? 'Exit' : 'Expand'}</span>
          </button>

          {/* Copy Button */}
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
              fontSize: '0.74rem',
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
          overflowX: wrapLines ? 'hidden' : 'auto',
          overflowY: 'auto',
          fontSize: `${fontSize}px`,
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.65',
          flex: 1
        }}
      >
        {/* Line Numbers Gutter */}
        <div
          style={{
            userSelect: 'none',
            padding: '0 16px 0 16px',
            color: '#656565',
            textAlign: 'right',
            borderRight: '1px solid #333333',
            marginRight: '16px',
            minWidth: '40px'
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Lines */}
        <div style={{ flex: 1, paddingRight: '24px', minWidth: 0 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ whiteSpace: wrapLines ? 'pre-wrap' : 'pre', wordBreak: wrapLines ? 'break-word' : 'normal' }}>
              {renderHighlightedLine(line, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // If expanded into modal overlay
  if (isExpanded) {
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1200px',
              zIndex: 9999
            }}
          >
            {editorContent}
          </div>
        </div>

        {/* Placeholder in document flow so layout does not jump */}
        <div style={{ padding: '12px', border: '1px dashed #444', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Code Editor expanded to Fullscreen View. Click "Exit" or outside to restore inline view.
        </div>
      </>
    );
  }

  return editorContent;
};
