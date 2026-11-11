'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { capabilities, projects } from './data';
import { ArrowDown, ArrowUpRight, MenuIcon } from './Icons';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { loadGsap } from './gsap-runtime';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Anuj, home"><span className="brand-mark">A<span>.</span></span><span className="brand-caption">DEVELOPER<br />& DATA PERSON</span></a>
      <nav id="site-navigation" className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</a>)}
        <a className="nav-availability" href="#contact" onClick={closeMenu}><i /> LET’S BUILD SOMETHING THOUGHTFUL</a>
      </nav>
      <button ref={menuButtonRef} className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-controls="site-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><MenuIcon open={menuOpen} /></button>
    </header>
  );
}

function SectionLabel({ number, children, note }) {
  return <div className="section-label"><span>{number} / {children}</span>{note && <span className="section-label-note">{note}</span>}</div>;
}

function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const moveGlowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let disposed = false;
    let ctx;
    loadGsap().then((gsap) => {
      if (disposed) return;
      ctx = gsap.context(() => {
        // Keep the headline readable before hydration and while entrance motion runs.
        gsap.fromTo('.hero-reveal', { y: 24 }, { y: 0, duration: 0.78, stagger: 0.09, ease: 'power3.out', delay: 0.08 });
        gsap.fromTo('.hero-stamp', { scale: 0.8, rotate: -14, opacity: 0 }, { scale: 1, rotate: 7, opacity: 1, duration: 0.9, ease: 'back.out(1.8)', delay: 0.85 });
      }, heroRef);
      const moveX = gsap.quickTo(glowRef.current, 'x', { duration: 0.75, ease: 'power3.out' });
      const moveY = gsap.quickTo(glowRef.current, 'y', { duration: 0.75, ease: 'power3.out' });
      moveGlowRef.current = (x, y) => { moveX(x); moveY(y); };
    }).catch(() => {});
    return () => { disposed = true; moveGlowRef.current = null; ctx?.revert(); };
  }, []);

  const handlePointer = (event) => {
    if (!moveGlowRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    moveGlowRef.current(x, y);
  };

  return (
    <section className="hero section-shell" id="top" ref={heroRef} onPointerMove={handlePointer}>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />
      <div className="hero-kicker hero-reveal"><span className="status-dot" /> OPEN TO GOOD QUESTIONS <span className="kicker-coordinates">FULL-STACK / DATA / CURIOSITY</span></div>
      <div className="hero-heading-wrap">
        <h1 className="hero-title"><span className="hero-reveal">I make</span><span className="hero-reveal title-second">things <em>make</em></span><span className="hero-reveal">sense<span className="hero-period">.</span></span></h1>
        <div className="hero-stamp" aria-hidden="true"><span>THINK<br />· BUILD ·<br />LEARN</span><b>✳</b></div>
      </div>
      <div className="hero-bottom">
        <p className="hero-intro hero-reveal">Full-stack developer <span>+</span> data scientist.<br />I turn complex ideas into useful, human things.</p>
        <div className="hero-actions hero-reveal"><a className="button-primary" href="#work">Explore selected work <ArrowDown /></a><a className="button-quiet" href="#about">A little about me <ArrowUpRight /></a></div>
      </div>
      <div className="hero-index"><span>PORTFOLIO / 2026</span><span>SCROLL TO EXPLORE <ArrowDown /></span></div>
      <div className="hero-side-note" aria-hidden="true">CURIOSITY IS A TECHNICAL SKILL</div>
    </section>
  );
}

function Marquee() {
  const words = ['THOUGHTFUL SYSTEMS', 'USEFUL DATA', 'HUMAN SOFTWARE', 'GOOD QUESTIONS'];
  return <div className="marquee-band"><span className="sr-only">Thoughtful systems, useful data, human software, good questions.</span><div className="marquee-track" aria-hidden="true">{[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word}<b>✳</b></span>)}</div></div>;
}

function WorkSection({ onSelect }) {
  return (
    <section className="work-section section-shell" id="work">
      <SectionLabel number="01">SELECTED WORK</SectionLabel>
      <div className="section-intro-row"><h2 className="section-heading">Ideas, <em>in motion.</em></h2><p className="section-intro-copy">A growing collection of experiments at the intersection of software, data, and everyday life.</p></div>
      <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} onSelect={onSelect} />)}</div>
      <div className="work-footnote"><span>THESE ARE STARTING POINTS, NOT FINISHED CASE STUDIES.</span><span>REAL WORK WILL TAKE THEIR PLACE AS IT’S BUILT.</span></div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-shell" id="about">
      <SectionLabel number="02">THE PERSON BEHIND THE PIXELS</SectionLabel>
      <div className="about-grid">
        <h2 className="section-heading about-heading">Two lenses.<br /><em>One curiosity.</em></h2>
      <div className="about-copy"><p className="about-lede">I like the space where a good question becomes a useful product.</p><p>That can mean shaping an idea into a full-stack application, or getting close to a dataset until its patterns start to tell a story. I bring both ways of thinking together: make it work, make it clear, make it matter to someone.</p><p className="about-disclaimer">My approach: test the assumption, ship a useful version, and let evidence guide the next decision.</p><a className="text-link" href="mailto:anuj.10110.taneja@gmail.com">Say hello <ArrowUpRight /></a></div>
      </div>
      <div className="capabilities-list">{capabilities.map((item) => <div className="capability-row" key={item.index}><span className="capability-index">{item.index}</span><h3>{item.title}</h3><span className="capability-detail">{item.detail}</span><span className="capability-arrow">↗</span></div>)}</div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="principles-section section-shell" aria-labelledby="principles-title">
      <SectionLabel number="03">A SMALL OPERATING SYSTEM</SectionLabel>
      <h2 id="principles-title" className="principle-quote">Curiosity finds the question.<br /><em>Craft makes the answer useful.</em></h2>
      <div className="principles-bottom"><span>01 / STAY CURIOUS</span><span>02 / SWEAT THE DETAILS</span><span>03 / MAKE IT HUMAN</span></div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact">
      <SectionLabel number="04">THE NEXT GOOD THING</SectionLabel>
      <div className="contact-grid"><h2 className="contact-heading">Have a<br /><em>good question?</em></h2><div className="contact-aside"><p>I’m open to conversations about thoughtful products, data, and teams who care about the details.</p><a className="contact-email" href="mailto:anuj.10110.taneja@gmail.com">Let’s talk <ArrowUpRight /></a><nav className="contact-socials" aria-label="Social profiles"><a href="https://github.com/Anuj10110" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href="https://www.linkedin.com/in/anuj-taneja-635281375/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></nav><span className="contact-note">A GOOD EMAIL CAN START ANYTHING. <b>↗</b></span></div></div>
      <div className="contact-orbit" aria-hidden="true"><span>✳</span><i /><i /><i /></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer section-shell"><a href="#top" className="footer-brand">ANUJ<span>/</span></a><span>BUILT WITH QUESTIONS & CARE</span><span>ALWAYS IN PROGRESS <b>✳</b></span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>;
}

function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let disposed = false;
    let ctx;
    loadGsap().then((gsap) => {
      if (disposed) return;
      ctx = gsap.context(() => {
        gsap.fromTo(progressRef.current, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
        });
      });
    }).catch(() => {});
    return () => { disposed = true; ctx?.revert(); };
  }, []);

  return <div className="reading-progress" ref={progressRef} aria-hidden="true" />;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let disposed = false;
    let ctx;
    loadGsap().then((gsap) => {
      if (disposed) return;
      ctx = gsap.context(() => {
        const revealOnScroll = (element, distance, duration) => {
          // A direct hash link or restored scroll position may put the target
          // past its trigger before hydration. Leave it visible in that case.
          if (element.getBoundingClientRect().top <= window.innerHeight * 0.88) return;
          gsap.fromTo(element, { opacity: 0, y: distance }, {
            opacity: 1,
            y: 0,
            duration,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: element, start: 'top 88%', toggleActions: 'play none none reverse' },
          });
        };
        gsap.utils.toArray('.section-label').forEach((label) => revealOnScroll(label, 12, 0.65));
        gsap.utils.toArray('.section-heading, .about-copy, .principle-quote, .contact-grid').forEach((item) => revealOnScroll(item, 28, 0.8));
      });
    }).catch(() => {});
    return () => { disposed = true; ctx?.revert(); };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="main-content"><Hero /><Marquee /><WorkSection onSelect={setSelectedProject} /><AboutSection /><PrinciplesSection /><ContactSection /></main>
      <Footer />
      <ProjectDialog project={selectedProject} onClose={closeProject} />
    </>
    </MotionConfig>
  );
}
