const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ukhairtransplant.co";
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "81041f6f0c26422b91067fc9b7393a84";
const INDEXNOW_ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

function normalizeOrigin(value) {
  const url = new URL(value);
  url.protocol = "https:";

  if (url.hostname === "ukhairtransplant.co") {
    url.hostname = "www.ukhairtransplant.co";
  }

  url.pathname = "";
  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/, "");
}

function getLocUrls(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), (match) =>
    match[1].trim(),
  );
}

function chunkUrls(urls, size) {
  const chunks = [];

  for (let index = 0; index < urls.length; index += size) {
    chunks.push(urls.slice(index, index + size));
  }

  return chunks;
}

async function main() {
  const siteUrl = normalizeOrigin(SITE_URL);
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const keyLocation = `${siteUrl}/${INDEXNOW_KEY}.txt`;
  const dryRun = process.argv.includes("--dry-run");

  const sitemapResponse = await fetch(sitemapUrl);

  if (!sitemapResponse.ok) {
    throw new Error(
      `Could not fetch sitemap ${sitemapUrl}: ${sitemapResponse.status}`,
    );
  }

  const sitemapXml = await sitemapResponse.text();
  const urls = getLocUrls(sitemapXml).filter((url) =>
    url.startsWith(`${siteUrl}/`),
  );

  if (urls.length === 0) {
    throw new Error(`No canonical URLs found in ${sitemapUrl}`);
  }

  console.log(`Found ${urls.length} canonical URLs in ${sitemapUrl}`);

  if (dryRun) {
    console.log("Dry run only. First URLs:");
    console.log(urls.slice(0, 10).join("\n"));
    return;
  }

  for (const urlList of chunkUrls(urls, 10000)) {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: new URL(siteUrl).hostname,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList,
      }),
    });

    const body = await response.text();

    if (!response.ok) {
      throw new Error(
        `IndexNow submission failed: ${response.status} ${body}`,
      );
    }

    console.log(
      `Submitted ${urlList.length} URLs to IndexNow: ${response.status}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
