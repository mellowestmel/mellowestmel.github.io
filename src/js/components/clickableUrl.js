function makeClickableUrls() {
    const app = document.getElementById("app");

    if (!app) {
        return;
    }

    const walker = document.createTreeWalker(
        app,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    for (const node of textNodes) {
        const parent = node.parentElement;

        if (parent?.closest("a, script, style, code, pre")) {
            continue;
        }

        const text = node.textContent;
        const matches = [...text.matchAll(/https?:\/\/[^\s<]+/g)];

        if (!matches.length) {
            continue;
        }

        const fragment = document.createDocumentFragment();
        let position = 0;

        for (const match of matches) {
            const url = match[0];

            fragment.append(
                document.createTextNode(
                    text.slice(position, match.index)
                )
            );

            const link = document.createElement("a");

            link.href = url;
            link.textContent = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            fragment.append(link);

            position = match.index + url.length;
        }

        fragment.append(
            document.createTextNode(text.slice(position))
        );

        node.replaceWith(fragment);
    }
}

document.addEventListener("pageLoaded", makeClickableUrls);

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        makeClickableUrls,
        { once: true }
    );
} else {
    makeClickableUrls();
}