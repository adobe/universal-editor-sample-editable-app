const scrolltriggerDurationOverride = animation => {
  if (animation.to) {
    if (!animation.to.scrollTrigger.scrub) {
      animation.to.duration = 0;
    }
    if (typeof animation.to.scrollTrigger.scrub === "number") {
      animation.to.scrollTrigger.scrub = true;
    }
    animation.to.delay = 0;
  }
  if (animation?.from) {
    animation.from.delay = 0;
    animation.from.duration = 0;
  }
};

const createScrollTriggerAnimation = (gsap, q, animation, instant) => {
  // duration override
  if (instant) {
    scrolltriggerDurationOverride(animation);
  }
  
  // apply animation based on what is present
  if (animation.to && animation.from) {
    gsap.fromTo(q(animation.selector), animation.from, animation.to);
    return;
  } else {
    if (animation.to) {
      gsap.to(q(animation.selector), animation.to);
    }
    if (animation.from) {
      gsap.from(q(animation.selector), animation.from);
    }
  }
};

const createAnimationTimeline = (gsap, q, timelineArray, timelineSettings, runOnEnd, debugAnim) => {
  if (!timelineArray || timelineArray.length === 0) {
    return runOnEnd();
  }
  // value to control duration overrides
  try {
    const instant = debugAnim === "instant";
    // initialize timeline
    const tl = gsap.timeline({ onComplete: runOnEnd });
    if (timelineSettings?.startDelay && !instant) {
      tl.delay(timelineSettings.startDelay);
    }
    const standardDelay = timelineSettings?.globalAutoDelay && !instant ? ">" : "<";
    
    // apply each animation
    for (let i = 0; i < timelineArray.length; i++) {
      const animation = timelineArray[i];
      // ignore animation if element doesn't exist
      if (!document.querySelector(animation.selector)) {
        continue;
      }
      
      // if animation has a Scrolltrigger, exclude it from timeline
      if (animation?.to?.scrollTrigger || animation?.from?.scrollTrigger) {
        createScrollTriggerAnimation(gsap, q, animation, instant);
        continue;
      }
      
      // adding to timeline
      let delay;
      if (animation.autoDelay !== undefined) {
        delay = animation.autoDelay === true ? ">" : "<";
      } else {
        delay = standardDelay;
      }
      
      // delay override
      if (instant) {
        delay = 0;
      }
      if (animation.to && instant) {
        animation.to.duration = 0;
      }
      
      // apply animation based on what is present
      if (animation.from && animation.to) {
        tl.fromTo(q(animation.selector), animation.from, animation.to, delay);
      } else {
        animation.from && tl.from(q(animation.selector), animation.from, delay);
        animation.to && tl.to(q(animation.selector), animation.to, delay);
      }
    }
  } catch (error) {
    console.error("Error while applying animations! \n \n ", error);
    return runOnEnd();
  }
};

export default createAnimationTimeline;
