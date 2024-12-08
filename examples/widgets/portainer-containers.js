const style = () => {
  return `
<style>
.indicators {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
.indicator-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
h2.indicator-title {
  font-size: 2.5rem;
}
.indicator {
  max-width: 100px;
}
.indicator svg polyline {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.indicator svg polyline#back {
  stroke: rgba(59, 211, 171, 0.3);
}
.indicator svg polyline#front {
  stroke: #3bd3ab;
  stroke-dasharray: 12, 36;
  stroke-dashoffset: 48;
  animation: dash 1s linear infinite;
}
@keyframes dash {
  62.5% {
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
  `;
};

const template = (title, data) => {
  const running = data.every((c) => c.State === "running");
  return `
<div class="indicator-container">
  <span class="indicator">
    <svg width="100%" viewBox="0 0 15 15">
      <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
      <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6" stroke="${
        running ? "#3bd3ab" : "#D3AB3B"
      }"></polyline>
    </svg>
  </span>
  <h2 class="indicator-title">${title}</h2>
</div>
  `;
};

const render = () => {
  return [
    '<div class="indicators">',
    style(),
    template("Drone", datasources[2].latestData?.data),
    template("Hive", datasources[3].latestData?.data),
    "</div>",
  ].join("");
};

try {
  render();
} catch {
  ("LOADING");
}
