'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from './Icons';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project, index, onSelect }) {
  const trackPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <motion.article
      className={`project-card project-card-${index + 1}`}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="project-open" onPointerMove={trackPointer} onClick={() => onSelect(project)} aria-label={`Read about ${project.title}`}>
        <ProjectVisual type={project.visual} />
        <span className="project-open-hint">EXPLORE PROJECT <ArrowUpRight /></span>
      </button>
      <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
      <div className="project-title-row">
        <h3>{project.title}</h3>
        <span className="project-count">/{project.number}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <ul className="tag-list" aria-label="Skills"><li>{project.tags[0]}</li><li>{project.tags[1]}</li><li>{project.tags[2]}</li></ul>
    </motion.article>
  );
}
