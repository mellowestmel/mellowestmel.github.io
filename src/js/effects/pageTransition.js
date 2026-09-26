const APP_ELEMENT_ID = "app";
const TRANSITION_CLASS = "page-spring-in";

let hasLoadedOnce = false;

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function triggerSpringTransition() {
    const appElement = document.getElementById(APP_ELEMENT_ID);
    if (!appElement || prefersReducedMotion()) return;

    appElement.classList.remove(TRANSITION_CLASS);

    void appElement.offsetWidth;

    appElement.classList.add(TRANSITION_CLASS);
}

document.addEventListener("pageLoaded", () => {
    if (!hasLoadedOnce) {
        hasLoadedOnce = true;
        return;
    }

    triggerSpringTransition();
});