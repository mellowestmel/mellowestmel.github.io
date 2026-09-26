let currentPage = null;
let navigationRequestId = 0;

function updateNavigationButtons() {
    const navigationButtons = document.querySelectorAll(
        "button[data-page]"
    );

    for (const button of navigationButtons) {
        button.disabled = button.dataset.page === currentPage;
    }
}

async function fetchPage(page) {
    const response = await fetch(`/src/pages/${page}.html`);

    if (!response.ok) {
        throw new Error(
            `Failed to load page "${page}": HTTP ${response.status}`
        );
    }

    return response.text();
}

async function loadPage() {
    const requestId = ++navigationRequestId;
    const application = document.getElementById("app");

    if (!application) {
        return;
    }

    const searchParameters = new URLSearchParams(
        window.location.search
    );

    let page = searchParameters.get("page") || "home";

    try {
        const pageHTML = await fetchPage(page);

        if (requestId !== navigationRequestId) {
            return;
        }

        application.innerHTML = pageHTML;
    } catch (error) {
        console.error(error);

        if (requestId !== navigationRequestId) {
            return;
        }

        try {
            const fallbackHTML = await fetchPage("404");

            if (requestId !== navigationRequestId) {
                return;
            }

            application.innerHTML = fallbackHTML;
            page = "404";
        } catch (fallbackError) {
            console.error(fallbackError);

            application.textContent = "Page could not be loaded.";
            page = "404";
        }
    }

    currentPage = page;

    window.history.replaceState(
        {},
        "",
        `?page=${encodeURIComponent(page)}`
    );

    updateNavigationButtons();

    document.dispatchEvent(
        new CustomEvent("pageLoaded", {
            detail: {
                page
            }
        })
    );
}

function navigate(page) {
    if (!page || page === currentPage) {
        return;
    }

    window.history.pushState(
        {},
        "",
        `?page=${encodeURIComponent(page)}`
    );

    loadPage();
}

window.addEventListener("popstate", loadPage);
window.addEventListener("load", loadPage);

export {
    navigate
};