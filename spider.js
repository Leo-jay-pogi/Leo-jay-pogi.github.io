const scrollingSpider = document.querySelector("#scrolling-spider");
const siteHeader = document.querySelector("header");
const reducedMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let lastScrollPosition = window.scrollY;
let spiderMotionTimeout;

function updateSpiderPosition() {
    const spiderStartPosition = siteHeader.getBoundingClientRect().bottom + 8;
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollRange > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
        : 0;
    const spiderTravelLimit = Math.max(
        0,
        window.innerHeight - spiderStartPosition - scrollingSpider.offsetHeight - 8
    );
    scrollingSpider.style.setProperty(
        "--spider-start-position",
        `${spiderStartPosition}px`
    );
    scrollingSpider.style.setProperty(
        "--spider-scroll-offset",
        `${spiderTravelLimit * scrollProgress}px`
    );
}

window.addEventListener("resize", updateSpiderPosition);
updateSpiderPosition();

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;
    const scrollDelta = currentScrollPosition - lastScrollPosition;
    lastScrollPosition = currentScrollPosition;

    if (Math.abs(scrollDelta) < 1) {
        return;
    }

    updateSpiderPosition();
    const isClimbing = scrollDelta < 0;
    scrollingSpider.classList.toggle("is-climbing", isClimbing);
    scrollingSpider.classList.toggle("is-facing-up", isClimbing);

    if (reducedMotionPreference.matches) {
        return;
    }

    scrollingSpider.classList.toggle("is-chasing", isClimbing);
    scrollingSpider.classList.toggle("is-sliding", scrollDelta > 0);
    scrollingSpider.classList.add("is-crawling");

    window.clearTimeout(spiderMotionTimeout);
    spiderMotionTimeout = window.setTimeout(() => {
        scrollingSpider.classList.remove(
            "is-climbing",
            "is-chasing",
            "is-sliding",
            "is-crawling"
        );
    }, 480);
}, { passive: true });
