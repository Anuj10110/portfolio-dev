import { useId } from 'react';

function SignalVisual() {
  return (
    <div className="visual visual-signal" aria-hidden="true">
      <div className="signal-label"><span>OBSERVATION / 001</span><span>IN PROGRESS</span></div>
      <div className="signal-grid">
        {[...Array(54)].map((_, index) => (
          <i key={index} style={{ '--bar': `${12 + ((index * 37 + 11) % 72)}%`, '--delay': `${(index % 9) * -0.13}s` }} />
        ))}
      </div>
      <div className="signal-axis"><span>LOW SIGNAL</span><span className="signal-marker">●</span><span>HIGH SIGNAL</span></div>
      <div className="visual-stamp">FIND<br />THE<br /><b>PATTERN</b></div>
      <span className="visual-index">01 / DATA</span>
    </div>
  );
}

function FieldnotesVisual() {
  return (
    <div className="visual visual-notes" aria-hidden="true">
      <div className="notes-top"><span className="window-dots"><i /><i /><i /></span><span>fieldnotes / space 01</span><span>⌘ K</span></div>
      <div className="notes-board">
        <div className="note note-one"><small>MON · 09:41</small><b>Start with the<br />question.</b><span>Ideas / 04</span></div>
        <div className="note note-two"><small>THREAD 02</small><b>Make the useful<br />thing obvious.</b><span>Product / 12</span></div>
        <div className="note note-three"><span className="scribble">↗</span><small>CONNECTED TO</small><b>Signal / Noise</b><span>Research / 03</span></div>
        <div className="notes-cross">+</div>
      </div>
      <div className="notes-bottom"><span>COLLECT</span><span>CONNECT</span><span>MAKE MEANING</span></div>
      <span className="visual-index">02 / PRODUCT</span>
    </div>
  );
}

function GroundVisual() {
  const gradientId = `chart-area-${useId().replace(/:/g, '')}`;
  return (
    <div className="visual visual-ground" aria-hidden="true">
      <div className="ground-header"><span>COMMON GROUND</span><span>PUBLIC DATA / LIVE QUESTION</span></div>
      <div className="ground-copy"><span>WHAT DO WE</span><b>SHARE<span>?</span></b></div>
      <div className="ground-chart">
        <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span></div>
        <svg viewBox="0 0 660 210" preserveAspectRatio="none">
          <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#D9622B" stopOpacity=".38" /><stop offset="1" stopColor="#D9622B" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 170 C40 150 60 90 108 120 S175 155 220 90 S286 60 330 100 S395 130 440 53 S510 30 552 80 S620 95 660 18 V210 H0Z" fill={`url(#${gradientId})`} />
          <path d="M0 170 C40 150 60 90 108 120 S175 155 220 90 S286 60 330 100 S395 130 440 53 S510 30 552 80 S620 95 660 18" fill="none" stroke="#D9622B" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <circle cx="440" cy="53" r="5" fill="#E8E6E1" stroke="#D9622B" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="ground-foot"><span>AN EXPLORABLE DATA STORY</span><span>INSIGHT IS A STARTING POINT ↗</span></div>
      <span className="visual-index">03 / SYSTEMS</span>
    </div>
  );
}

export default function ProjectVisual({ type }) {
  if (type === 'signal') return <SignalVisual />;
  if (type === 'fieldnotes') return <FieldnotesVisual />;
  return <GroundVisual />;
}
