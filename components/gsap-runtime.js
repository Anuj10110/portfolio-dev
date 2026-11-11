let runtimePromise;

export function loadGsap() {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    });
  }

  return runtimePromise;
}
