import React, { useState } from 'react';
import { ArrowRight, Plus, Trash2, RotateCcw, Play } from 'lucide-react';

interface LLNode {
  id: number;
  val: number;
  memoryAddr: string;
}

export const LinkedListVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 1, val: 10, memoryAddr: '0x7F10' },
    { id: 2, val: 25, memoryAddr: '0x8A44' },
    { id: 3, val: 42, memoryAddr: '0x3C90' },
    { id: 4, val: 88, memoryAddr: '0x1F22' }
  ]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [message, setMessage] = useState('Lista Enlazada simple. Cada nodo contiene su valor y puntero al siguiente nodo.');
  const [newVal, setNewVal] = useState('99');
  const [isTraversing, setIsTraversing] = useState(false);

  const handleTraverse = async () => {
    setIsTraversing(true);
    setMessage('Iniciando recorrido desde Head...');
    for (let i = 0; i < nodes.length; i++) {
      setActiveIdx(i);
      setMessage(`Visitando nodo [${nodes[i].val}] en dirección ${nodes[i].memoryAddr}. Siguiente -> ${i === nodes.length - 1 ? 'NULL' : nodes[i + 1].memoryAddr}`);
      await new Promise((r) => setTimeout(r, 700));
    }
    setActiveIdx(null);
    setMessage('Recorrido completado en tiempo O(N).');
    setIsTraversing(false);
  };

  const handleAddHead = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (nodes.length >= 7) {
      setMessage('Límite alcanzado (máx 7 nodos para visualización).');
      return;
    }
    const hex = '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase();
    const newNode: LLNode = { id: Date.now(), val, memoryAddr: hex };
    setNodes([newNode, ...nodes]);
    setMessage(`¡Nuevo Head [${val}] insertado en O(1)! Nuevo puntero next apunta al antiguo Head.`);
  };

  const handleAddTail = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (nodes.length >= 7) {
      setMessage('Límite alcanzado (máx 7 nodos).');
      return;
    }
    const hex = '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase();
    const newNode: LLNode = { id: Date.now(), val, memoryAddr: hex };
    setNodes([...nodes, newNode]);
    setMessage(`¡Nuevo Tail [${val}] insertado en O(1) con puntero al tail!`);
  };

  const handleDeleteHead = () => {
    if (nodes.length <= 1) {
      setMessage('Debe haber al menos 1 nodo en la lista.');
      return;
    }
    const deleted = nodes[0];
    setNodes(nodes.slice(1));
    setMessage(`Eliminado Head [${deleted.val}] en O(1). Head actualizado al siguiente nodo.`);
  };

  const handleReset = () => {
    setNodes([
      { id: 1, val: 10, memoryAddr: '0x7F10' },
      { id: 2, val: 25, memoryAddr: '0x8A44' },
      { id: 3, val: 42, memoryAddr: '0x3C90' },
      { id: 4, val: 88, memoryAddr: '0x1F22' }
    ]);
    setActiveIdx(null);
    setMessage('Lista enlazada restablecida.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Visual Canvas */}
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
          overflowX: 'auto'
        }}
      >
        {/* Node Chain */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 'min-content', padding: '10px 0' }}>
          {nodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;
            const isActive = activeIdx === idx;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  {/* Head / Tail Tags */}
                  <div style={{ height: '20px', display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {isHead && <span className="cyber-badge badge-green">HEAD</span>}
                    {isTail && <span className="cyber-badge badge-magenta">TAIL</span>}
                  </div>

                  {/* Dual cell: Value | Next Pointer */}
                  <div
                    style={{
                      display: 'flex',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(0, 245, 255, 0.3)' : 'rgba(16, 28, 54, 0.85)',
                      border: `2px solid ${isActive ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.3)'}`,
                      boxShadow: isActive ? '0 0 16px rgba(0, 245, 255, 0.6)' : 'none',
                      overflow: 'hidden',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.25s'
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: '#fff',
                        borderRight: '1px solid rgba(0, 245, 255, 0.2)'
                      }}
                    >
                      {node.val}
                    </div>
                    <div
                      style={{
                        padding: '12px 10px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--neon-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 245, 255, 0.06)'
                      }}
                      title={`Puntero next -> ${isTail ? 'NULL' : nodes[idx + 1].memoryAddr}`}
                    >
                      •
                    </div>
                  </div>

                  {/* Memory address */}
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-dim)',
                      marginTop: '4px'
                    }}
                  >
                    {node.memoryAddr}
                  </span>
                </div>

                {/* Arrow to next */}
                <div style={{ display: 'flex', alignItems: 'center', color: isActive ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.4)', padding: '0 4px' }}>
                  <ArrowRight size={22} className={isActive ? 'animate-pulse-glow' : ''} />
                </div>
              </React.Fragment>
            );
          })}

          {/* NULL Terminator */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ height: '20px' }} />
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px dashed rgba(255, 0, 127, 0.5)',
                color: 'var(--neon-magenta)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
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

      {/* Action Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '16px',
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
          <Play size={14} /> Recorrer O(N)
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
            onClick={handleAddHead}
            disabled={isTraversing}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insertar Head O(1)
          </button>
          <button
            onClick={handleAddTail}
            disabled={isTraversing}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insertar Tail O(1)
          </button>
        </div>

        <button
          onClick={handleDeleteHead}
          disabled={isTraversing}
          className="cyber-btn-magenta"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} /> Eliminar Head O(1)
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
