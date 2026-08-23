import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface LLNode {
  id: number;
  val: number;
  memoryAddr: string;
}

export const LinkedListVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 1, val: 10, memoryAddr: '0x7ff1' },
    { id: 2, val: 25, memoryAddr: '0x8ab3' },
    { id: 3, val: 40, memoryAddr: '0x94cd' },
    { id: 4, val: 65, memoryAddr: '0xaa1e' }
  ]);

  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [message, setMessage] = useState('Singly Linked List. Each node contains a value and a pointer address to the next node.');
  const [isTraversing, setIsTraversing] = useState(false);
  const [newVal, setNewVal] = useState('80');

  const handleTraverse = async () => {
    setIsTraversing(true);
    setMessage('Traversing linked list from HEAD to NULL in O(N)...');

    for (let i = 0; i < nodes.length; i++) {
      setHighlightId(nodes[i].id);
      setMessage(`Visiting node [${nodes[i].val}] at address ${nodes[i].memoryAddr}. Next -> ${i === nodes.length - 1 ? 'NULL' : nodes[i + 1].memoryAddr}`);
      await new Promise(r => setTimeout(r, 700));
    }
    setHighlightId(null);
    setMessage('End of Linked List reached (next == NULL). Traversal finished in O(N).');
    setIsTraversing(false);
  };

  const handleInsertHead = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (nodes.length >= 6) {
      setMessage('Visualizer capacity reached (max 6 nodes).');
      return;
    }

    const randomHex = '0x' + Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const newNode: LLNode = { id: Date.now(), val, memoryAddr: randomHex };
    setNodes([newNode, ...nodes]);
    setHighlightId(newNode.id);
    setMessage(`Inserted ${val} at HEAD in O(1) time. New node points to old HEAD.`);
  };

  const handleInsertTail = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (nodes.length >= 6) {
      setMessage('Visualizer capacity reached (max 6 nodes).');
      return;
    }

    const randomHex = '0x' + Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const newNode: LLNode = { id: Date.now(), val, memoryAddr: randomHex };
    setNodes([...nodes, newNode]);
    setHighlightId(newNode.id);
    setMessage(`Appended ${val} at TAIL in O(1) time (with tail pointer).`);
  };

  const handleDeleteHead = () => {
    if (nodes.length <= 1) {
      setMessage('List must have at least 1 node.');
      return;
    }
    const removed = nodes[0];
    setNodes(nodes.slice(1));
    setHighlightId(null);
    setMessage(`Removed HEAD node [${removed.val}] in O(1). HEAD pointer moved to head.next.`);
  };

  const handleReset = () => {
    setNodes([
      { id: 1, val: 10, memoryAddr: '0x7ff1' },
      { id: 2, val: 25, memoryAddr: '0x8ab3' },
      { id: 3, val: 40, memoryAddr: '0x94cd' },
      { id: 4, val: 65, memoryAddr: '0xaa1e' }
    ]);
    setHighlightId(null);
    setMessage('Linked list reset.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          minHeight: '180px',
          justifyContent: 'center'
        }}
      >
        {/* Nodes stream */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {nodes.map((node, idx) => {
            const isSelected = highlightId === node.id;
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Pointer tag */}
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: isHead ? 'var(--neon-green)' : isTail ? 'var(--neon-magenta)' : 'var(--text-dim)',
                      fontWeight: 700,
                      marginBottom: '4px'
                    }}
                  >
                    {isHead && isTail ? 'HEAD & TAIL' : isHead ? 'HEAD' : isTail ? 'TAIL' : `Node ${idx + 1}`}
                  </span>

                  {/* Node block */}
                  <div
                    style={{
                      display: 'flex',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `2px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.3)'}`,
                      boxShadow: isSelected ? '0 0 16px rgba(0, 245, 255, 0.6)' : 'none',
                      backgroundColor: isSelected ? 'rgba(0, 245, 255, 0.2)' : 'rgba(16, 28, 54, 0.9)',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Val */}
                    <div
                      style={{
                        padding: '12px 14px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isSelected ? '#fff' : '#c9d8f0',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {node.val}
                    </div>

                    {/* Next pointer address */}
                    <div
                      style={{
                        padding: '12px 10px',
                        backgroundColor: 'rgba(0, 245, 255, 0.08)',
                        borderLeft: '1px solid rgba(0, 245, 255, 0.2)',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--neon-cyan)',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {isTail ? 'NULL' : nodes[idx + 1].memoryAddr}
                    </div>
                  </div>

                  {/* Address label */}
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                    {node.memoryAddr}
                  </span>
                </div>

                {/* Arrow */}
                {idx < nodes.length - 1 && (
                  <ArrowRight size={18} color="var(--neon-cyan)" style={{ marginTop: '10px' }} />
                )}
              </React.Fragment>
            );
          })}

          {/* NULL pointer termination */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: 'transparent' }}>-</span>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 0, 127, 0.15)',
                border: '1px dashed var(--neon-magenta)',
                color: 'var(--neon-magenta)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              NULL
            </div>
          </div>
        </div>

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
            color: '#c9e6ff'
          }}
        >
          &gt; {message}
        </div>
      </div>

      {/* Control Panel */}
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
        <button
          onClick={handleTraverse}
          disabled={isTraversing}
          className="cyber-btn"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <ArrowRight size={14} /> Traverse O(N)
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            placeholder="Val"
            style={{
              width: '60px',
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
            onClick={handleInsertHead}
            disabled={isTraversing}
            className="cyber-btn-secondary"
            style={{ padding: '7px 10px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insert Head O(1)
          </button>
          <button
            onClick={handleInsertTail}
            disabled={isTraversing}
            className="cyber-btn-secondary"
            style={{ padding: '7px 10px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insert Tail O(1)
          </button>
        </div>

        <button
          onClick={handleDeleteHead}
          disabled={isTraversing}
          className="cyber-btn-magenta"
          style={{ padding: '7px 10px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} /> Delete Head O(1)
        </button>

        <button
          onClick={handleReset}
          disabled={isTraversing}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
