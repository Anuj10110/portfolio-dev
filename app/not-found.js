import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-grid" aria-hidden="true" />
      <header className="not-found-header">
        <Link href="/" className="not-found-brand" aria-label="Anuj, home">A<span>.</span></Link>
        <span>PAGE NOT FOUND / 404</span>
      </header>
      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-kicker"><i /> WRONG TURN, GOOD STORY</p>
        <h1 id="not-found-title">Nothing<br /><em>here.</em></h1>
        <p className="not-found-copy">This page doesn’t exist, or it may have moved. Let’s get you back to the workbench.</p>
        <Link href="/" className="not-found-link"><span>Back to the homepage</span><b aria-hidden="true">↗</b></Link>
      </section>
      <footer className="not-found-footer"><span>ANUJ / PORTFOLIO</span><span>KEEP FOLLOWING THE QUESTIONS&nbsp; ↗</span></footer>
    </main>
  );
}
