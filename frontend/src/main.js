const config = window.CONDUIT_CONFIG || { API_BASE_URL: "http://localhost:8000" };

const apiBaseUrlElement = document.querySelector("#api-base-url");
const healthBadgeElement = document.querySelector("#health-badge");
const dbBadgeElement = document.querySelector("#db-badge");
const healthOutputElement = document.querySelector("#health-output");
const dbOutputElement = document.querySelector("#db-output");

apiBaseUrlElement.textContent = config.API_BASE_URL;

function setBadgeState(element, label, state) {
  element.textContent = label;
  element.className = `status-badge status-${state}`;
}

function writeOutput(element, payload) {
  element.textContent = JSON.stringify(payload, null, 2);
}

async function fetchJson(path) {
  const response = await fetch(`${config.API_BASE_URL}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request to ${path} failed with ${response.status}`);
  }

  return data;
}

async function loadServiceState() {
  try {
    const [healthData, dbData] = await Promise.all([
      fetchJson("/health"),
      fetchJson("/db-health"),
    ]);

    setBadgeState(healthBadgeElement, "Online", "success");
    setBadgeState(dbBadgeElement, "Online", "success");
    writeOutput(healthOutputElement, healthData);
    writeOutput(dbOutputElement, dbData);
  } catch (error) {
    setBadgeState(healthBadgeElement, "Error", "error");
    setBadgeState(dbBadgeElement, "Error", "error");
    writeOutput(healthOutputElement, { message: error.message });
    writeOutput(dbOutputElement, { message: error.message });
  }
}

loadServiceState();
