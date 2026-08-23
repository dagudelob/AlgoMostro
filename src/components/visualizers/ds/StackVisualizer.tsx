import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Play } from 'lucide-react';

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([15, 30, 45]);
  const [newVal, setNewVal] = useState<string>('60');
  const [message, setMessage] = useState('Stack (LIFO - Last In, First Out). The top element is always accessed in O(1) time.');

  // Interactive Parentheses Demo state
  const expr = '{[()]}';
  const [pStack, setPStack] = useState<string[]>([]);
  const [activeCharIdx, setActiveCharIdx] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handlePush = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (stack.length >= 6) {
      setMessage('Stack Overflow for this visualizer demo (max 6).');
      return;
    }
    setStack([...stack, val]);
    setMessage(`Push(${val}) in O(1) time. The new item is now the TOP.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage('Stack Underflow. Cannot Pop from an empty stack.');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Pop() -> Removed [${popped}] from TOP in O(1) time.`);
  };

  const handleValidateParentheses = async () => {
    setIsValidating(true);
    setPStack([]);
    setMessage(`Validating parentheses expression "${expr}" using Stack in O(N) time...`);

    const openMap: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    const tempStack: string[] = [];

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      setActiveCharIdx(i);
      await new Promise((r) => setTimeout(r, 600));

      if (['(', '[', '{'].includes(char)) {
        tempStack.push(char);
        setPStack([...tempStack]);
        setMessage(`Opening bracket '${char}' -> Push onto stack.`);
      } else if ([')', ']', '}'].includes(char)) {
        if (tempStack.length === 0 || tempStack[tempStack.length - 1] !== openMap[char]) {
          setMessage(`Mismatch error! '${char}' does not match stack top or stack is empty.`);
          setIsValidating(false);
          return;
        }
        const popped = tempStack.pop()!;
        setPStack([...tempStack]);
        setMessage(`Valid match: '${popped}' closed by '${char}' -> Pop from stack.`);
      }
    }

    setActiveCharIdx(null);
    if (tempStack.length === 0) {
      setMessage(`Expression "${expr}" is completely VALID and balanced!`);
    } else {
      setMessage(`Invalid expression: unclosed brackets remain in the stack.`);
    }
    setIsValidating(false);
  };

  const handleReset = () => {
    setStack([15, 30, 45]);
    setPStack([]);
    setActiveCharIdx(null);
    setMessage('Stack reset.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        {/* Visual Stack Bucket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            LIFO Stack (Vertical Bucket)
          </span>

          <div
            style={{
              width: '120px',
              height: '180px',
              borderLeft: '3px solid var(--neon-cyan)',
              borderRight: '3px solid var(--neon-cyan)',
              borderBottom: '3px solid var(--neon-cyan)',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
              flexDirection: 'column-reverse',
              padding: '6px',
              gap: '4px',
              backgroundColor: 'rgba(0, 245, 255, 0.03)',
              position: 'relative'
            }}
          >
            {stack.map((val, idx) => {
              const isTop = idx === stack.length - 1;
              return (
                <div
                  key={idx}
                  style={{
                    height: '26px',
                    borderRadius: '4px',
                    backgroundColor: isTop ? 'rgba(255, 0, 127, 0.35)' : 'rgba(16, 28, 54, 0.9)',
                    border: `1px solid ${isTop ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.3)'}`,
                    boxShadow: isTop ? '0 0 10px rgba(255, 0, 127, 0.5)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                    color: isTop ? '#fff' : '#c9d8f0',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <span>{val}</span>
                  {isTop && <span style={{ fontSize: '0.65rem', color: 'var(--neon-magenta)' }}>TOP</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Parentheses Demo Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Demo: Balanced Parentheses Validator O(N)
          </span>

          <div style={{ display: 'flex', gap: '4px' }}>
            {expr.split('').map((char, idx) => {
              const isActive = activeCharIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(57, 255, 20, 0.3)' : 'rgba(13, 21, 39, 0.8)',
                    border: `1px solid ${isActive ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#39ff14' : '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
            Current Stack: [{pStack.join(', ')}]
          </div>

          <button
            onClick={handleValidateParentheses}
            disabled={isValidating}
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem', width: 'fit-content', marginTop: '4px' }}
          >
            <Play size={13} /> Validate Expression
          </button>
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
            onClick={handlePush}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Push O(1)
          </button>
        </div>

        <button
          onClick={handlePop}
          className="cyber-btn-magenta"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} /> Pop O(1)
        </button>

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
