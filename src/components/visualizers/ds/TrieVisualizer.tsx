import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const TrieVisualizer: React.FC = () => {
  const words = ['app', 'apple', 'bat', 'ball'];
  const [searchWord, setSearchWord] = useState<string>('app');
  const [activeChars, setActiveChars] = useState<string[]>([]);
  const [message, setMessage] = useState('Trie (Prefix Tree). Nodes share common prefixes for fast O(L) searches.');

  // Trie Nodes layout
  const trieNodes = [
    { id: 'root', label: 'ROOT', x: 240, y: 35, isEnd: false },
    { id: 'a', label: 'a', x: 120, y: 85, isEnd: false, pId: 'root' },
    { id: 'ap', label: 'p', x: 100, y: 135, isEnd: false, pId: 'a' },
    { id: 'app', label: 'p*', x: 90, y: 185, isEnd: true, pId: 'ap' },
    { id: 'appl', label: 'l', x: 90, y: 235, isEnd: false, pId: 'app' },
    { id: 'apple', label: 'e*', x: 90, y: 285, isEnd: true, pId: 'appl' },

    { id: 'b', label: 'b', x: 360, y: 85, isEnd: false, pId: 'root' },
    { id: 'ba', label: 'a', x: 360, y: 135, isEnd: false, pId: 'b' },
    { id: 'bat', label: 't*', x: 320, y: 185, isEnd: true, pId: 'ba' },
    { id: 'bal', label: 'l', x: 400, y: 185, isEnd: false, pId: 'ba' },
    { id: 'ball', label: 'l*', x: 400, y: 235, isEnd: true, pId: 'bal' }
  ];

  const handleSearch = async (isPrefix: boolean) => {
    if (!searchWord) return;
    const term = searchWord.toLowerCase();
    setMessage(`Searching for ${isPrefix ? 'prefix' : 'word'} "${term}" character by character in O(L)...`);

    const path: string[] = ['root'];
    let prefixAcc = '';
    setActiveChars(['root']);

    for (let i = 0; i < term.length; i++) {
      prefixAcc += term[i];
      const matchNode = trieNodes.find((n) => n.id === prefixAcc || n.id === prefixAcc.slice(0, -1) + term[i]);
      await new Promise((r) => setTimeout(r, 600));

      if (matchNode) {
        path.push(matchNode.id);
        setActiveChars([...path]);
        setMessage(`Character '${term[i]}' matched at level ${i + 1}.`);
      } else {
        setMessage(`Character '${term[i]}' NOT found. Search terminated in O(${i + 1}).`);
        return;
      }
    }

    const lastNode = trieNodes.find((n) => n.id === term);
    if (isPrefix) {
      setMessage(`Prefix "${term}" exists in the Trie!`);
    } else {
      if (lastNode && lastNode.isEnd) {
        setMessage(`Full word "${term}" successfully found!`);
      } else {
        setMessage(`"${term}" exists as a prefix, but is NOT marked as a complete terminal word.`);
      }
    }
  };

  const handleReset = () => {
    setActiveChars([]);
    setMessage('Trie reset.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Words in Trie:
          </span>
          {words.map((w) => (
            <span key={w} className="cyber-badge badge-cyan">{w}</span>
          ))}
        </div>

        <svg viewBox="0 0 480 320" style={{ width: '100%', maxWidth: '480px', height: '260px' }}>
          {/* Edges */}
          {trieNodes.map((n) => {
            if (!n.pId) return null;
            const parent = trieNodes.find((p) => p.id === n.pId);
            if (!parent) return null;
            const isPathActive = activeChars.includes(n.id) && activeChars.includes(parent.id);

            return (
              <line
                key={`trie-edge-${n.id}`}
                x1={parent.x}
                y1={parent.y}
                x2={n.x}
                y2={n.y}
                stroke={isPathActive ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.25)'}
                strokeWidth={isPathActive ? 3 : 2}
              />
            );
          })}

          {/* Nodes */}
          {trieNodes.map((n) => {
            const isActive = activeChars.includes(n.id);
            const isEnd = n.isEnd;

            return (
              <g key={`trie-node-${n.id}`}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.id === 'root' ? 20 : 16}
                  fill={isActive ? 'rgba(255, 0, 127, 0.4)' : isEnd ? 'rgba(57, 255, 20, 0.2)' : 'rgba(16, 28, 54, 0.9)'}
                  stroke={isActive ? 'var(--neon-magenta)' : isEnd ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.4)'}
                  strokeWidth={isActive || isEnd ? 2.5 : 1.5}
                  filter={isActive ? 'drop-shadow(0 0 8px #ff007f)' : 'none'}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fill={isActive ? '#fff' : isEnd ? '#39ff14' : '#e0eaff'}
                  fontSize={n.id === 'root' ? '9' : '12'}
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Message Banner */}
        <div
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: 'rgba(0, 245, 255, 0.05)',
            borderLeft: '3px solid var(--neon-cyan)',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#c9e6ff',
            marginTop: '8px'
          }}
        >
          &gt; {message}
        </div>
      </div>

      {/* Action Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search..."
            style={{
              width: '90px',
              padding: '6px 8px',
              background: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <button
            onClick={() => handleSearch(false)}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Search size={14} /> Search Word O(L)
          </button>
          <button
            onClick={() => handleSearch(true)}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            StartsWith (Prefix)
          </button>
        </div>

        <button
          onClick={handleReset}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
