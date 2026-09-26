const form = document.querySelector("#analysis-form");
const input = document.querySelector("#url-input");
const results = document.querySelector("#results");
const message = document.querySelector("#message");

function analyseUrl(value) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Use an http or https URL.");

  const words = decodeURIComponent(url.pathname)
    .replace(/[-_/]+/g, " ")
    .split(" ")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 2);

  const uniqueWords = [...new Set(words)];
  return {
    host: url.hostname,
    path: url.pathname || "/",
    terms: uniqueWords.slice(0, 8),
    readingEstimate: Math.max(1, Math.ceil((uniqueWords.length * 18) / 200))
  };
}

function addMetric(label, value) {
  const item = document.createElement("div");
  item.className = "metric";
  const heading = document.createElement("dt");
  heading.textContent = label;
  const detail = document.createElement("dd");
  detail.textContent = value;
  item.append(heading, detail);
  return item;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  results.replaceChildren();
  message.textContent = "";

  try {
    const data = analyseUrl(input.value.trim());
    const heading = document.createElement("h2");
    heading.textContent = "URL snapshot";
    const list = document.createElement("dl");
    list.append(
      addMetric("Host", data.host),
      addMetric("Path", data.path),
      addMetric("Terms", data.terms.length ? data.terms.join(", ") : "No descriptive path terms"),
      addMetric("Reading estimate", data.readingEstimate + " minute" + (data.readingEstimate === 1 ? "" : "s"))
    );
    results.append(heading, list);
    message.textContent = "Analysis completed locally. No page content was fetched.";
  } catch (error) {
    message.textContent = error.message || "Enter a valid article URL.";
  }
});
