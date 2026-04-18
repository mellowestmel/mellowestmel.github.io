function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, expires) {
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function daysBetweenUTC(a, b) {
  const utcA = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const utcB = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.floor((utcA - utcB) / 86400000);
}

async function loadRepoUpdate() {
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA");

  const cachedDate = getCookie("repoLastUpdateDate");
  const cachedFormatted = getCookie("repoLastUpdateFormatted");

  if (cachedDate === todayStr && cachedFormatted) {
    const pushedDate = new Date(cachedFormatted);
    const diffDays = daysBetweenUTC(today, pushedDate);
    const dayText = diffDays === 0 ? "Today" : `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

    document.getElementById("last-updated").textContent =
      `Last updated: ${pushedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} (${dayText})`;
    return;
  }

  const res = await fetch(
    "https://api.github.com/repos/ShibaTheDeveloper/shibathedeveloper.github.io"
  );
  const repo = await res.json();
  const pushedDate = new Date(repo.pushed_at);

  const diffDays = daysBetweenUTC(today, pushedDate);
  const dayText = diffDays === 0 ? "Today" : `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  document.getElementById("last-updated").textContent =
    `Last updated: ${pushedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} (${dayText})`;

  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  setCookie("repoLastUpdateDate", todayStr, nextMidnight);
  setCookie("repoLastUpdateFormatted", pushedDate.toISOString(), nextMidnight);
}

loadRepoUpdate();