import { formatDateMDY, formatTimeFromDate } from "../formatDate.js";
import { parseUrl } from "./parseUrl.js";
import { getCached, setCached } from "../sessionCache.js";

const GITHUB_API_BASE_URL = "https://api.github.com/repos";
const REPO_URL = "https://github.com/mellowestmel/mellowestmel.github.io";
const CACHE_DURATION_MS = 1000 * 60 * 60;

export async function getLastCommitDateTime(repoUrl = REPO_URL) {
    const cacheKey = `lastCommit:v2:${repoUrl}`;

    const cached = getCached(cacheKey, CACHE_DURATION_MS);
    if (cached) return cached;

    const { owner, repo } = parseUrl(repoUrl);
    const requestUrl = `${GITHUB_API_BASE_URL}/${owner}/${repo}/commits?per_page=1`;

    const response = await fetch(requestUrl, {
        headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const commits = await response.json();
    const latestCommit = commits[0];

    if (!latestCommit) {
        throw new Error(`No commits found for ${owner}/${repo}`);
    }

    const isoDateTime = latestCommit.commit.author.date;
    const commitDate = new Date(isoDateTime);

    const datePart = isoDateTime.slice(0, 10);
    const formattedDate = formatDateMDY(datePart);
    const formattedTime = formatTimeFromDate(commitDate);

    const formattedDateTime = `${formattedDate} at ${formattedTime}`;

    setCached(cacheKey, formattedDateTime);

    return formattedDateTime;
}