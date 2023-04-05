document.addEventListener("DOMContentLoaded", () => {
  loadKpis().then((kpis) => {
    const gridContainer = document.querySelector(".grid-container");
    const kpiTemplate = document.getElementById("kpi-template");

    kpis.forEach((kpi, index) => {
      renderKpi(gridContainer, kpiTemplate, kpi);
    });
  });
});

// Fetch KPIs from the backend
async function loadKpis() {
  try {
    const response = await fetch('http://localhost:3000/kpis');
    const kpis = await response.json();
    return kpis;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return getDefaultKpis();
  }
}

// Update KPIs in the backend
async function saveKpis(kpis) {
  try {
    await fetch('http://localhost:3000/kpis', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kpis),
    });
  } catch (error) {
    console.error('Error updating KPIs:', error);
  }
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
