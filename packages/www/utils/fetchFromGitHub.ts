const repository = "Zertz/Tempocal";
const branch = "docs-v2";

export async function fetchFromGitHub(file: `/${string}`) {
  const contentUrl = `https://github.com/${repository}/blob/${branch}${file}`;
  const rawContentUrl = `https://raw.githubusercontent.com/${repository}/${branch}${file}`;

  const response = await fetch(rawContentUrl);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const rawContent = await response.text();

  return {
    contentUrl,
    rawContent,
    rawContentUrl,
  };
}
