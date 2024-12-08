const template = (data) => {
  const on = Object.keys(data).some((k) => data[k].state.on);
  const lightsOn = Object.keys(data).filter((k) => data[k].state.on).length;
  const lights = Object.keys(data).length;
  return `
<style>
.lights-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.lights-counter {
  font-size: 2.5rem;
}
</style>
<div class="lights-wrapper">
  <div class="light-bulb">
    <svg width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <defs>
    </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
        <path d="M 52.532 82.468 C 52.532 86.628 49.16 90 45 90 s -7.532 -3.372 -7.532 -7.532" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(178,178,178); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 59.69 54.787 v -0.71 c 0 -3.59 1.495 -6.978 4.009 -9.54 c 4.636 -4.725 7.495 -11.199 7.495 -18.342 c 0 -15.082 -12.746 -27.187 -28.054 -26.131 C 30.257 0.953 20.092 10.87 18.918 23.731 c -0.727 7.955 2.107 15.259 7.09 20.503 c 2.715 2.857 4.302 6.6 4.302 10.542 v 0 c 0 2.361 1.913 4.275 4.274 4.277 l 20.827 0.011 C 57.774 59.065 59.69 57.15 59.69 54.787 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${
          on ? "rgb(255,182,55)" : "#efefef"
        }; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 56.769 74.663 H 33.231 c -2.146 0 -3.902 -1.756 -3.902 -3.902 v 0 c 0 -2.146 1.756 -3.902 3.902 -3.902 h 23.539 c 2.146 0 3.902 1.756 3.902 3.902 v 0 C 60.672 72.907 58.916 74.663 56.769 74.663 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(178,178,178); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 53.229 82.468 H 36.771 c -2.146 0 -3.902 -1.756 -3.902 -3.902 v 0 c 0 -2.146 1.756 -3.902 3.902 -3.902 h 16.458 c 2.146 0 3.902 1.756 3.902 3.902 v 0 C 57.131 80.712 55.375 82.468 53.229 82.468 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,204,204); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 49.819 61.098 c -1.13 0 -2.045 -0.916 -2.045 -2.045 V 46.691 c 0 -5.949 2.449 -11.737 6.719 -15.88 c 0.81 -0.787 2.104 -0.769 2.892 0.043 c 0.786 0.81 0.767 2.105 -0.044 2.892 c -3.48 3.378 -5.476 8.096 -5.476 12.945 v 12.362 C 51.864 60.182 50.949 61.098 49.819 61.098 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,224,171); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 40.18 61.098 c -1.13 0 -2.045 -0.916 -2.045 -2.045 V 46.691 c 0 -4.85 -1.996 -9.568 -5.476 -12.944 c -0.811 -0.787 -0.83 -2.082 -0.044 -2.892 c 0.786 -0.811 2.081 -0.831 2.892 -0.044 c 4.27 4.143 6.718 9.931 6.718 15.881 v 12.362 C 42.226 60.182 41.31 61.098 40.18 61.098 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,224,171); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 56.769 66.858 H 33.231 c -2.146 0 -3.902 -1.756 -3.902 -3.902 v 0 c 0 -2.146 1.756 -3.902 3.902 -3.902 h 23.539 c 2.146 0 3.902 1.756 3.902 3.902 v 0 C 60.672 65.102 58.916 66.858 56.769 66.858 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,204,204); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      </g>
    </svg>
  </div>
  <div class="lights-counter">
    ${lightsOn} / ${lights}
  </div>
</div>
  `;
};

try {
  template(datasources[6].latestData.data);
} catch {
  ("LOADING");
}
