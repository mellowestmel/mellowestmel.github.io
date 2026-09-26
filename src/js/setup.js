import "./core/router.js";

import "./components/lastModified.js";
import "./components/projects.js";
import "./components/buttons.js";
import "./components/search.js";

if ("requestIdleCallback" in window) {
    requestIdleCallback(() => import("./effects/shootingStars/init.js"));
} else {
    window.addEventListener("load", () => import("./effects/shootingStars/init.js"));
}