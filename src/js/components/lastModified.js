import { getLastCommitDateTime } from "../utils/github/lastCommit.js";

const lastModifiedElement = document.getElementById("lastModified");

if (lastModifiedElement) {
    getLastCommitDateTime()
        .then((formattedDateTime) => {
            lastModifiedElement.textContent = formattedDateTime;
        })
        .catch((err) => {
            console.error("Failed to load last updated date:", err);
            lastModifiedElement.textContent = "unknown";
        });
}