import { navigate } from "../core/router.js";

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const navigationTarget = event.target.closest("[data-page]");

    if (!navigationTarget) {
        return;
    }

    if (navigationTarget instanceof HTMLAnchorElement) {
        event.preventDefault();
    }

    navigate(navigationTarget.dataset.page);
});