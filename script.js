document.addEventListener("DOMContentLoaded", () => {
  const kpis = loadKpis();
  const gridContainer = document.querySelector(".grid-container");
  const kpiTemplate = document.getElementById("kpi-template");

  kpis.forEach((kpi, index) => {
    renderKpi(gridContainer, kpiTemplate, kpi);
  });
});

function loadKpis() {
  const storedKpis = localStorage.getItem("kpis");
  if (storedKpis) {
    return JSON.parse(storedKpis);
  }

  return getDefaultKpis();
}

function getDefaultKpis() {
  return [
    { title: "Number of Listings", currentValue: 148, goal: 2000 },
    { title: "User Sign-ups", currentValue: 403, goal: 1000 },
    { title: "Conversion Rate", currentValue: "8%", goal: "25%" },
    { title: "Average Revenue per User (ARPU)", currentValue: "896", goal: "2000" },
    { title: "Gross Transaction Volume (GTV)", currentValue: "52974", goal: "250000" },
    { title: "Total Revenue Year-to-date (YTD)", currentValue: "12595", goal: "172000" },
  ];
}

function saveKpis(kpis) {
  localStorage.setItem("kpis", JSON.stringify(kpis));
}

function renderKpi(gridContainer, kpiTemplate, kpi) {
  const kpiClone = kpiTemplate.content.cloneNode(true);

  // Assign values to the KPI elements
  const title = kpiClone.querySelector(".kpi-title");
  const progressBar = kpiClone.querySelector(".kpi-progress-bar");
  const currentValue = kpiClone.querySelector(".current-value");
  const goalValue = kpiClone.querySelector(".goal-value");
  const input = kpiClone.querySelector(".edit-input");
  const saveButton = kpiClone.querySelector(".save-button");

  title.innerText = kpi.title;
  currentValue.innerText = kpi.currentValue;
  goalValue.innerText = kpi.goal;
  progressBar.style.width = calculatePercentage(kpi.currentValue, kpi.goal) + "%";

  // Update KPI values and save them to local storage
  saveButton.addEventListener("click", () => {
    const newValue = input.value;
    if (newValue) {
      kpi.currentValue = newValue;
      currentValue.innerText = newValue;
      progressBar.style.width = calculatePercentage(newValue, kpi.goal) + "%";
      input.value = "";
      saveKpis(kpis);
    }
  });

  gridContainer.appendChild(kpiClone);
}

function calculatePercentage(currentValue, goal) {
  const current = parseFloat(currentValue);
  const goalValue = parseFloat(goal);

  if (isNaN(current) || isNaN(goalValue) || goalValue === 0) {
    return 0;
  }

  return Math.min(Math.round((current / goalValue) * 100), 100);
}
