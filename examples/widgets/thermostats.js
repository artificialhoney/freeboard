const style = (value1) => {
  return `
    <style>
.thermostats {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.thermostat {
  --bg-color: #f3f6fb;
  --theme-color-1: #52acff;
  --theme-color-2: #2af598;
  position: relative;
  height: 200px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--bg-color);
  overflow: hidden;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.3);
}
.thermostat:after {
  content: "";
  position: absolute;
  height: 90%;
  aspect-ratio: 1;
  background-image: linear-gradient(
    to right,
    var(--theme-color-1),
    var(--theme-color-2)
  );
  border-radius: 50%;
  inset: 0;
  margin: auto;
  box-shadow: inset 2px 4px 4px 0px rgba(0, 0, 0, 0.3);
}
.thermostat:before {
  content: "";
  position: absolute;
  height: 100%;
  aspect-ratio: 1;
  background-color: var(--bg-color);
  transform-origin: center;
  rotate: 45deg;
  top: 145px;
  z-index: 1;
}
.thermostat .indicator {
  position: absolute;
  height: 50%;
  width: 1px;
  left: 50%;
  top: 0%;
  transform-origin: bottom center;
  rotate: -50deg;
  transition: 600ms;
}
.thermostat .indicator:before {
  content: "";
  position: absolute;
  height: 10px;
  width: 1px;
  background-color: var(--theme-color-1);
}
.thermostat .text-info {
  position: relative;
  z-index: 1;
}
.thermostat .dial-wrapper {
  padding: 20px 0 0;
  position: absolute;
  height: 62%;
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 50%;
  inset: 0;
  margin: auto;
  z-index: 1;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.thermostat .text-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.thermostat .temp_outside {
  font-size: 12px;
  margin-bottom: 3px;
}
.thermostat .room-temp-wrapper {
  position: relative;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  font-size: 60px;
  line-height: 50px;
  color: var(--theme-color-1);
  text-align: center;
}
.thermostat .room-temp-wrapper .temp_room {
  position: absolute;
  display: flex;
  align-items: flex-start;
  font-size: 52px;
  font-weight: 500;
  transition: 600ms;
}
.thermostat .room-temp-wrapper .temp_room span {
  font-size: 32px;
  margin-top: -9px;
}
.thermostat .room-temp-wrapper .temp_room:nth-child(1) {
  translate: 50px 0;
  opacity: 0;
  scale: 0.5;
}
.thermostat .room-name {
  font-size: 12px;
}
.thermostat .indicator {
  rotate: -${value1}deg;
}

.thermostat .room-temp-wrapper .temp_room:nth-child(1) {
  translate: 0px 0;
  opacity: 1;
  scale: 1;
}
  </style>
    `;
};

const template = (value1, value2, room) => {
  return `
<div class="thermostat">
  <div class="dial-wrapper">
    <div class="indicator"></div>
    <div class="text-info">
      <div class="temp_outside">${value2}°</div>
      <div class="room-temp-wrapper">
        <div class="temp_room">${value1} <span>°</span></div>
      </div>
      <div class="room-name">${room}</div>
    </div>
  </div>
</div>
  `;
};

const render = (z) => {
  const zoneStates = datasources[4].latestData.data.zoneStates;
  const zones = datasources[5].latestData.data;
  const zone = zones[z];
  const value1 = Math.round(
    zoneStates[zone.id].sensorDataPoints.insideTemperature.celsius,
  );
  const value2 = "";

  if (style) {
    return style(value1) + template(value1, value2, zone.name);
  } else {
    return template(value1, value2, zone.name);
  }
};
try {
  `<div class="thermostats">${[
    render(0, true),
    render(1, true),
    render(2, true),
    render(3, true),
  ].join("")}</div>`;
} catch {
  ("LOADING");
}
