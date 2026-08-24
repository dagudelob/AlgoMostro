import React, { useState, useEffect } from 'react';
import { 
  WIKI_MODULES, 
  BIG_O_CHEATSHEET, 
  ALGORITHM_DECISION_RULES, 
  GLOSSARY_TERMS 
} from '../../data/wikiData';
import { 
  BookOpen, 
  Compass, 
  HelpCircle, 
  Search, 
  Clock, 
  CheckCircle2, 
  Workflow,
  PlayCircle
} from 'lucide-react';

interface WikiViewProps {
  onOpenVisualizer?: (type: string) => void;
}

type WikiTab = 'curriculum' | 'decision_matrix' | 'complexity' | 'glossary';

export const WikiView: React.FC<WikiViewProps> = ({ onOpenVisualizer }) => {
  const [activeTab, setActiveTab] = useState<WikiTab>('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-ds');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter decision rules
  const filteredDecisionRules = ALGORITHM_DECISION_RULES.filter(
    r =>
      r.signal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.recommendation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.exampleLC.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter glossary terms
  const filteredGlossary = GLOSSARY_TERMS.filter(
    g =>
      g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1280px', margin: '14px auto', padding: isMobile ? '0 10px' : '0 24px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.95), rgba(4, 7, 14, 0.98))',
          border: '1px solid rgba(0, 245, 255, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: isMobile ? '16px' : '28px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', fontSize: isMobile ? '0.72rem' : '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '4px' }}>
            <BookOpen size={14} />
            <span>KNOWLEDGE BASE & CURRICULUM</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.8rem', margin: '0 0 6px 0', color: '#fff' }}>
            DSA Learning Wiki & Big-O
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: isMobile ? '0.78rem' : '0.9rem', maxWidth: '680px' }}>
            Structured progressive mastery: from foundational memory structures and algorithmic patterns to computational complexity and interview decision criteria.
          </p>
        </div>

        {/* Global Wiki Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: isMobile ? '100%' : '300px' }}>
          <Search size={15} color="var(--neon-cyan)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search signals, terms, Big-O..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '8px 12px 8px 34px' : '10px 14px 10px 38px',
              backgroundColor: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontSize: isMobile ? '0.78rem' : '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="horizontal-touch-scroll" style={{ display: 'flex', gap: '6px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('curriculum')}
          style={{
            padding: isMobile ? '6px 12px' : '8px 18px',
            borderRadius: '6px',
            backgroundColor: activeTab === 'curriculum' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
            border: `1px solid ${activeTab === 'curriculum' ? 'var(--neon-cyan)' : 'transparent'}`,
            color: activeTab === 'curriculum' ? '#fff' : 'var(--text-muted)',
            fontSize: isMobile ? '0.78rem' : '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'curriculum' ? '0 0 12px rgba(0, 245, 255, 0.3)' : 'none'
          }}
        >
          <Workflow size={15} /> 1. Curriculum
        </button>

        <button
          onClick={() => setActiveTab('decision_matrix')}
          style={{
            padding: isMobile ? '6px 12px' : '8px 18px',
            borderRadius: '6px',
            backgroundColor: activeTab === 'decision_matrix' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
            border: `1px solid ${activeTab === 'decision_matrix' ? 'var(--neon-magenta)' : 'transparent'}`,
            color: activeTab === 'decision_matrix' ? '#fff' : 'var(--text-muted)',
            fontSize: isMobile ? '0.78rem' : '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'decision_matrix' ? '0 0 12px rgba(255, 0, 127, 0.3)' : 'none'
          }}
        >
          <Compass size={15} /> 2. Decision Guide
        </button>

        <button
          onClick={() => setActiveTab('complexity')}
          style={{
            padding: isMobile ? '6px 12px' : '8px 18px',
            borderRadius: '6px',
            backgroundColor: activeTab === 'complexity' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
            border: `1px solid ${activeTab === 'complexity' ? 'var(--neon-green)' : 'transparent'}`,
            color: activeTab === 'complexity' ? '#fff' : 'var(--text-muted)',
            fontSize: isMobile ? '0.78rem' : '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'complexity' ? '0 0 12px rgba(57, 255, 20, 0.3)' : 'none'
          }}
        >
          <Clock size={15} /> 3. Big-O Cheat Sheet
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          style={{
            padding: isMobile ? '6px 12px' : '8px 18px',
            borderRadius: '6px',
            backgroundColor: activeTab === 'glossary' ? 'rgba(255, 214, 10, 0.2)' : 'transparent',
            border: `1px solid ${activeTab === 'glossary' ? 'var(--neon-yellow)' : 'transparent'}`,
            color: activeTab === 'glossary' ? '#fff' : 'var(--text-muted)',
            fontSize: isMobile ? '0.78rem' : '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'glossary' ? '0 0 12px rgba(255, 214, 10, 0.3)' : 'none'
          }}
        >
          <HelpCircle size={15} /> 4. Glossary
        </button>
      </div>

      {/* TAB 1: Progressive Curriculum with Direct Visualizer Links */}
      {activeTab === 'curriculum' && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(240px, 1fr) minmax(0, 2.5fr)', gap: '16px', alignItems: 'start' }}>
          {/* Sidebar Roadmap Tracker */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '8px', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '4px' : 0 }}>
            {WIKI_MODULES.map((m) => {
              const isSelected = selectedModuleId === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  style={{
                    padding: isMobile ? '10px 12px' : '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'rgba(0, 245, 255, 0.15)' : 'rgba(13, 21, 39, 0.7)',
                    border: `1.5px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer',
                    minWidth: isMobile ? '180px' : 'auto',
                    boxShadow: isSelected ? '0 0 15px rgba(0, 245, 255, 0.25)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '0.82rem' : '0.92rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>
                    {m.title}
                  </h4>
                  {!isMobile && (
                    <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                      {m.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module Deep Dive Articles with Simulator Launchers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {WIKI_MODULES.find(m => m.id === selectedModuleId)?.articles.map((art) => (
              <div
                key={art.id}
                style={{
                  backgroundColor: '#090f20',
                  border: '1px solid rgba(0, 245, 255, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '14px' : '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#fff' }}>
                      {art.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {art.timeComplexity && (
                        <span className="cyber-badge badge-cyan" style={{ fontSize: '0.68rem' }}>{art.timeComplexity}</span>
                      )}
                      {art.spaceComplexity && (
                        <span className="cyber-badge badge-magenta" style={{ fontSize: '0.68rem' }}>{art.spaceComplexity}</span>
                      )}
                    </div>
                  </div>

                  {art.visualizerType && onOpenVisualizer && (
                    <button
                      onClick={() => onOpenVisualizer(art.visualizerType!)}
                      className="cyber-btn"
                      style={{
                        padding: isMobile ? '5px 10px' : '6px 14px',
                        fontSize: isMobile ? '0.74rem' : '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <PlayCircle size={14} />
                      <span>Simulator</span>
                    </button>
                  )}
                </div>

                <p style={{ margin: 0, color: '#c9e6ff', fontSize: isMobile ? '0.82rem' : '0.88rem', lineHeight: 1.5 }}>
                  {art.summary}
                </p>

                <div style={{ backgroundColor: 'rgba(57, 255, 20, 0.08)', borderLeft: '3px solid var(--neon-green)', padding: '6px 10px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--neon-green)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    KEY TAKEAWAY: {art.keyTakeaway}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Decision Guide with Direct Simulator Links */}
      {activeTab === 'decision_matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ backgroundColor: 'rgba(13, 21, 39, 0.6)', padding: isMobile ? '12px' : '14px 18px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--neon-magenta)' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '0.88rem' : '0.95rem', color: 'var(--neon-magenta)' }}>
              ALGORITHMIC DECISION MATRIX:
            </h4>
            <p style={{ margin: 0, fontSize: isMobile ? '0.78rem' : '0.85rem', color: 'var(--text-muted)' }}>
              Scan problem signals to determine the optimal pattern and launch its interactive simulator.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
            {filteredDecisionRules.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#090f20',
                  border: '1px solid rgba(255, 0, 127, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: isMobile ? '14px' : '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--neon-green)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--neon-green)' }}>
                    SIGNAL IN PROBLEM
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: isMobile ? '0.84rem' : '0.9rem', color: '#fff', fontWeight: 600 }}>
                  "{rule.signal}"
                </p>

                <div style={{ backgroundColor: 'rgba(255, 0, 127, 0.1)', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(255, 0, 127, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--neon-magenta)', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'block' }}>
                      RECOMMENDED:
                    </span>
                    <span style={{ fontSize: isMobile ? '0.82rem' : '0.9rem', color: '#fff', fontWeight: 700 }}>
                      {rule.recommendation}
                    </span>
                  </div>

                  {rule.visualizerType && onOpenVisualizer && (
                    <button
                      onClick={() => onOpenVisualizer(rule.visualizerType!)}
                      className="cyber-btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <PlayCircle size={12} />
                      <span>Sim</span>
                    </button>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--neon-cyan)' }}>Rationale: </strong>{rule.why}
                </p>

                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {rule.exampleLC}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Computational Complexity Cheat Sheet (Horizontally Scrollable Container) */}
      {activeTab === 'complexity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(13, 21, 39, 0.6)', padding: isMobile ? '12px' : '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--neon-green)' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '0.88rem' : '0.95rem', color: 'var(--neon-green)' }}>
              BIG-O COMPLEXITY & INPUT SIZE FEASIBILITY:
            </h4>
            <p style={{ margin: 0, fontSize: isMobile ? '0.78rem' : '0.85rem', color: 'var(--text-muted)' }}>
              Max operations per second ≈ <strong>10^8</strong>. Scroll horizontally on mobile if needed.
            </p>
          </div>

          <div
            className="responsive-code-container"
            style={{
              backgroundColor: '#090f20',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              borderRadius: 'var(--radius-lg)',
              overflowX: 'auto'
            }}
          >
            <div style={{ minWidth: '600px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.1fr 2.5fr 1fr', padding: '10px 14px', backgroundColor: '#0d1527', borderBottom: '1px solid rgba(0, 245, 255, 0.2)', fontSize: '0.74rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                <span>NOTATION</span>
                <span>NAME</span>
                <span>MAX N</span>
                <span>TYPICAL ALGORITHMS</span>
                <span>SIMULATOR</span>
              </div>

              {BIG_O_CHEATSHEET.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.3fr 1.1fr 2.5fr 1fr',
                    padding: '12px 14px',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(16, 28, 54, 0.3)' : 'transparent',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <span style={{ color: item.color, fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.notation}
                  </span>
                  <span style={{ color: '#fff', fontSize: '0.8rem' }}>
                    {item.name}
                  </span>
                  <span style={{ color: 'var(--neon-yellow)', fontSize: '0.78rem', fontWeight: 600 }}>
                    {item.nLimit}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {item.typicalAlgorithms.map((algo, i) => (
                      <span key={i} className="cyber-badge badge-cyan" style={{ fontSize: '0.62rem' }}>
                        {algo}
                      </span>
                    ))}
                  </div>
                  <div>
                    {item.visualizerType && onOpenVisualizer && (
                      <button
                        onClick={() => onOpenVisualizer(item.visualizerType!)}
                        className="cyber-btn-secondary"
                        style={{ padding: '3px 6px', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <PlayCircle size={11} />
                        <span>Live</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Technical Glossary */}
      {activeTab === 'glossary' && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#090f20',
                border: '1px solid rgba(255, 214, 10, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: isMobile ? '14px' : '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: isMobile ? '0.92rem' : '1rem', color: '#fff', fontWeight: 700 }}>
                  {item.term}
                </h4>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span className="cyber-badge badge-yellow" style={{ fontSize: '0.62rem' }}>
                    {item.category}
                  </span>
                  {item.visualizerType && onOpenVisualizer && (
                    <button
                      onClick={() => onOpenVisualizer(item.visualizerType!)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                      title="Launch Simulator"
                    >
                      <PlayCircle size={14} />
                    </button>
                  )}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.definition}
              </p>

              <div style={{ backgroundColor: 'rgba(255, 214, 10, 0.08)', padding: '5px 8px', borderRadius: '4px', marginTop: '2px' }}>
                <span style={{ fontSize: '0.72rem', color: '#ffd60a', fontFamily: 'var(--font-mono)' }}>
                  <strong>Ex:</strong> {item.example}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
