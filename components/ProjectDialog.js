'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from './Icons';
import ProjectVisual from './ProjectVisual';

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('dialog-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('dialog-open');
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-lede" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.99 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <div className="dialog-top"><span>{project.category} / {project.year}</span><button ref={closeRef} className="dialog-close" onClick={onClose} aria-label="Close project details">CLOSE <span>×</span></button></div>
            <h2 id="dialog-title">{project.title}<span>.</span></h2>
            <p className="dialog-lede" id="dialog-lede">{project.description}</p>
            <div className="dialog-visual"><ProjectVisual type={project.visual} /></div>
            <div className="dialog-rule" />
            <p className="dialog-detail">{project.detail}</p>
            <div className="dialog-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="dialog-note"><span className="status-dot" />A WORK IN PROGRESS — PROJECT DETAILS WILL GROW WITH THE BUILD.</div>
            <a href="#contact" onClick={onClose} className="text-link">Talk about a project <ArrowUpRight /></a>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
