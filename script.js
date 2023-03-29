const kpis = [
  { title: "Number of Listings", currentValue: 121, goal: 2000 },
  { title: "User Sign-ups", currentValue: 384, goal: 1000 },
  { title: "Conversion Rate", currentValue: "8%", goal: "25%" },
  { title: "Average Revenue per User (ARPU)", currentValue: "12", goal: "50" },
  { title: "Gross Transaction Volume (GTV)", currentValue: "$52,974", goal: "$250,000" },
  { title: "Total Revenue", currentValue: "$10,595", goal: "$172,000" },
];

const gridContainer = document.querySelector(".grid-container");
const kpiTemplate = document.getElementById("kpi-template");

kpis.forEach((kpi) => {
  const kpiClone = kpiTemplate.content.cloneNode(true);
  const title = kpiClone.querySelector(".kpi-title");
  const progressBar = kpiClone.querySelector(".kpi-progress-bar");
  const currentValue = kpiClone.querySelector(".current-value");
  const goalValue = kpiClone.querySelector(".goal-value"); // new element
  const input = kpiClone.querySelector(".edit-input");
  const saveButton = kpiClone.querySelector(".save-button");

  title.innerText = kpi.title;
  currentValue.innerText = kpi.currentValue;
  goalValue.innerText = kpi.goal; // set goal value
  progressBar.style.width = calculatePercentage(kpi.currentValue, kpi.goal) + "%";

  saveButton.addEventListener("click", () => {
  const newValue = input.value;
  if (newValue) {
    currentValue.innerText = newValue;
    progressBar.style.width = calculatePercentage(newValue, kpi.goal) + "%";
    input.value = "";
  }
});

  gridContainer.appendChild(kpiClone);
});

function calculatePercentage(currentValue, goal) {
  const current = parseFloat(currentValue);
  const goalValue = parseFloat(goal);

  if (isNaN(current) || isNaN(goalValue) || goalValue === 0) {
    return 0;
  }

  return Math.min(Math.round((current / goalValue) * 100), 100);
}