function initializeSearch() {
    const searchInputs = document.querySelectorAll(".searchInput");

    for (const searchInput of searchInputs) {
        if (!(searchInput instanceof HTMLInputElement)) {
            continue;
        }

        searchInput.addEventListener("input", () => {
            filterSearchResults(searchInput);
        });
    }
}

function filterSearchResults(searchInput) {
    const searchContainer = searchInput.nextElementSibling;

    if (!searchContainer?.classList.contains("searchOutput")) {
        return;
    }

    const searchQuery = searchInput.value.trim().toLowerCase();
    const searchableItems = searchContainer.querySelectorAll(".searchable");

    for (const searchableItem of searchableItems) {
        const searchableText = searchableItem.textContent
            .trim()
            .toLowerCase();

        searchableItem.hidden =
            searchQuery !== "" &&
            !searchableText.includes(searchQuery);
    }
}

document.addEventListener("pageLoaded", initializeSearch);