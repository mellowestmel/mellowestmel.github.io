export function parseUrl(repoUrl) {
    const { pathname } = new URL(repoUrl);
    const [, owner, repo] = pathname.split("/");

    if (!owner || !repo) {
        throw new Error(`Could not parse owner/repo from URL: ${repoUrl}`);
    }

    return { owner, repo: repo.replace(/\.git$/, "") };
}