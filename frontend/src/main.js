const config = window.CONDUIT_CONFIG || { API_BASE_URL: "http://localhost:8000" };

const apiBaseUrlElement = document.querySelector("#api-base-url");
const heroTitleElement = document.querySelector("#hero-title");
const heroCopyElement = document.querySelector("#hero-copy");
const healthBadgeElement = document.querySelector("#health-badge");
const dbBadgeElement = document.querySelector("#db-badge");
const articleListElement = document.querySelector("#article-list");
const selectedTitleElement = document.querySelector("#selected-title");
const selectedDescriptionElement = document.querySelector("#selected-description");
const selectedBodyElement = document.querySelector("#selected-body");
const systemOutputElement = document.querySelector("#system-output");
const sectionTitleElement = document.querySelector("#section-title");
const sectionSubtitleElement = document.querySelector("#section-subtitle");
const navTabElements = document.querySelectorAll(".nav-tab");

apiBaseUrlElement.textContent = config.API_BASE_URL;

function setBadgeState(element, label, state) {
  element.textContent = label;
  element.className = `status-badge status-${state}`;
}

function writeOutput(element, payload) {
  element.textContent = JSON.stringify(payload, null, 2);
}

function setSelectedArticle(article) {
  selectedTitleElement.textContent = article.title;
  selectedDescriptionElement.textContent = article.description;
  selectedBodyElement.textContent = article.body;
}

function renderArticles(articles) {
  articleListElement.innerHTML = "";

  articles.forEach((article, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `article-card${index === 0 ? " is-selected" : ""}`;
    button.innerHTML = `
      <div class="article-meta">
        <span>${article.author.username}</span>
        <span>${article.favoritesCount} favorites</span>
      </div>
      <h4>${article.title}</h4>
      <p>${article.description}</p>
      <div class="tag-row">${article.tagList.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    `;

    button.addEventListener("click", () => {
      document.querySelectorAll(".article-card").forEach((card) => card.classList.remove("is-selected"));
      button.classList.add("is-selected");
      setSelectedArticle(article);
    });

    articleListElement.appendChild(button);
  });

  if (articles.length > 0) {
    setSelectedArticle(articles[0]);
  }
}

async function fetchJson(path) {
  const response = await fetch(`${config.API_BASE_URL}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request to ${path} failed with ${response.status}`);
  }

  return data;
}

function switchView(view) {
  navTabElements.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === view);
  });

  if (view === "system") {
    sectionTitleElement.textContent = "System endpoints";
    sectionSubtitleElement.textContent = "Health and database responses from the backend.";
    articleListElement.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (view === "about") {
    sectionTitleElement.textContent = "Project notes";
    sectionSubtitleElement.textContent = "Why this setup exists and what it validates.";
    articleListElement.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    sectionTitleElement.textContent = "Articles";
    sectionSubtitleElement.textContent = "Data loaded from the backend.";
  }
}

navTabElements.forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});

async function loadApplicationState() {
  try {
    const [summaryData, articlesData, healthData, dbData] = await Promise.all([
      fetchJson("/app-summary"),
      fetchJson("/articles"),
      fetchJson("/health"),
      fetchJson("/db-health"),
    ]);

    heroTitleElement.textContent = summaryData.project;
    heroCopyElement.textContent = summaryData.summary;
    setBadgeState(healthBadgeElement, "Online", "success");
    setBadgeState(dbBadgeElement, "Online", "success");
    renderArticles(articlesData.articles);
    writeOutput(systemOutputElement, { health: healthData, database: dbData });
  } catch (error) {
    setBadgeState(healthBadgeElement, "Error", "error");
    setBadgeState(dbBadgeElement, "Error", "error");
    heroTitleElement.textContent = "Application loading failed";
    heroCopyElement.textContent = "The frontend could not load the required backend data.";
    writeOutput(systemOutputElement, { message: error.message });
  }
}

loadApplicationState();
