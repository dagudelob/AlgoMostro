import React, { useState } from 'react';
import { RotateCcw, Plus, Trash2, Search } from 'lucide-react';

export const ArrayVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([12, 45, 7, 23, 89, 34, 61]);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Contiguous memory array. Each cell has direct O(1) index access.');
  const [isAnimating, setIsAnimating] = useState(false);

  const [inputVal, setInputVal] = useState<string>('50');
  const [insertIdx, setInsertIdx] = useState<string>('2');
  const [searchTarget, setSearchTarget] = useState<string>('23');

  const handleAccess = (idx: number) => {
    setHighlightIdx(idx);
    setMessage(`O(1) Access to array[${idx}] = ${array[idx]} at memory address base + ${idx} * sizeof(int).`);
  };

  const handleSearch = async () => {
    const target = parseInt(searchTarget);
    if (isNaN(target)) return;
    setIsAnimating(true);
    setMessage(`Linear search O(N) for '${target}'...`);
    let found = false;

    for (let i = 0; i < array.length; i++) {
      setHighlightIdx(i);
      setMessage(`Comparing array[${i}] (${array[i]}) with ${target}...`);
      await new Promise(r => setTimeout(r, 600));
      if (array[i] === target) {
        setMessage(`Found! array[${i}] == ${target} after ${i + 1} comparisons.`);
        found = true;
        break;
      }
    }
    if (!found) {
      setHighlightIdx(null);
      setMessage(`Element ${target} not found after checking all ${array.length} elements (Worst case O(N)).`);
    }
    setIsAnimating(false);
  };

  const handleInsert = async () => {
    const val = parseInt(inputVal);
    const idx = parseInt(insertIdx);
    if (isNaN(val) || isNaN(idx) || idx < 0 || idx > array.length) return;
    if (array.length >= 10) {
      setMessage('Visualizer capacity reached (max 10 elements).');
      return;
    }

    setIsAnimating(true);
    setMessage(`Inserting ${val} at index ${idx}. Shifting elements right (Cost O(N))...`);
    
    const newArr = [...array];
    newArr.splice(idx, 0, val);
    setArray(newArr);
    setHighlightIdx(idx);
    setMessage(`Element ${val} inserted at index ${idx}! Shifted ${array.length - idx} elements.`);
    setIsAnimating(false);
  };

  const handleDelete = (idx: number) => {
    if (array.length <= 2) {
      setMessage('Array must contain at least 2 elements.');
      return;
    }
    const val = array[idx];
    const newArr = array.filter((_, i) => i !== idx);
    setArray(newArr);
    setHighlightIdx(null);
    setMessage(`Deleted array[${idx}] = ${val}. Shifted elements left in O(N).`);
  };

  const handleReset = () => {
    setArray([12, 45, 7, 23, 89, 34, 61]);
    setHighlightIdx(null);
    setMessage('Array reset to initial values.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Interactive Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Memory Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {array.map((val, idx) => {
            const isSelected = highlightIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => !isAnimating && handleAccess(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s'
                }}
              >
                {/* Index label */}
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: isSelected ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    marginBottom: '4px',
                    fontWeight: 600
                  }}
                >
                  [{idx}]
                </span>

                {/* Cell Block */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? 'rgba(0, 245, 255, 0.25)' : 'rgba(16, 28, 54, 0.8)',
                    border: `2px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.25)'}`,
                    boxShadow: isSelected ? '0 0 15px rgba(0, 245, 255, 0.5)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isSelected ? '#fff' : '#c9d8f0',
                    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {val}
                </div>

                {/* Delete trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAnimating) handleDelete(idx);
                  }}
                  title="Delete element O(N)"
                  style={{
                    marginTop: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 0, 127, 0.6)',
                    cursor: 'pointer',
                    padding: '2px',
                    fontSize: '0.7rem'
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Status / Output Banner */}
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        {/* Search tool */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Search val"
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
            onClick={handleSearch}
            disabled={isAnimating}
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Search size={14} /> Search O(N)
          </button>
        </div>

        {/* Insert tool */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Value"
            style={{
              width: '65px',
              padding: '6px 8px',
              background: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <input
            type="number"
            value={insertIdx}
            onChange={(e) => setInsertIdx(e.target.value)}
            placeholder="Index"
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
            onClick={handleInsert}
            disabled={isAnimating}
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insert
          </button>
        </div>

        {/* Reset */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <button
            onClick={handleReset}
            disabled={isAnimating}
            className="cyber-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', gap: '6px' }}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};
