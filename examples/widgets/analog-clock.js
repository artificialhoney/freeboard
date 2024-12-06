const template = (now) => {
  const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    d = now,
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds(),
    date = d.getDate(),
    month = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
    year = d.getFullYear(),
    hDeg = h * 30 + m * (360 / 720),
    mDeg = m * 6 + s * (360 / 3600),
    sDeg = s * 6,
    diallines = [...Array(60).keys()].map(
      (i) =>
        `<div class="diallines" style="transform: rotate(${
          6 * (i + 1)
        }deg)"></div>`,
    ),
    day = weekday[d.getDay()];

  return `
    <style>
    .clock {
      background: #ececec;
      width: 300px;
      height: 300px;
      margin: 8% auto 0;
      border-radius: 50%;
      border: 14px solid #333;
      position: relative;
      box-shadow: 0 2vw 4vw -1vw rgba(0,0,0,0.8);
    }

  .clock .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #ccc;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      z-index: 10;
      box-shadow: 0 2px 4px -1px black;
    }

  .clock .hour-hand {
      position: absolute;
      z-index: 5;
      width: 4px;
      height: 65px;
      background: #333;
      top: 79px;
      transform-origin: 50% 72px;
      left: 50%;
      margin-left: -2px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }

  .clock .minute-hand {
      position: absolute;
      z-index: 6;
      width: 4px;
      height: 100px;
      background: #666;
      top: 46px;
      left: 50%;
      margin-left: -2px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      transform-origin: 50% 105px;
    }

  .clock .second-hand {
      position: absolute;
      z-index: 7;
      width: 2px;
      height: 120px;
      background: gold;
      top: 26px;
      lefT: 50%;
      margin-left: -1px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      transform-origin: 50% 125px;
  }

  .clock span {
    display: inline-block;
    position: absolute;
    color: #333;
    font-size: 22px;
    font-family: sans-serif;
    font-weight: 700;
    z-index: 4;
  }

  .clock .h12 {
    top: 30px;
    left: 50%;
    margin-left: -9px;
  }
  .clock .h3 {
    top: 140px;
    right: 30px;
  }
  .clock .h6 {
    bottom: 30px;
    left: 50%;
    margin-left: -5px;
  }
  .clock .h9 {
    left: 32px;
    top: 140px;
  }

  .clock .diallines {
    position: absolute;
    z-index: 2;
    width: 2px;
    height: 15px;
    background: #666;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 150px;
  }
  .clock .diallines:nth-of-type(5n) {
    position: absolute;
    z-index: 2;
    width: 4px;
    height: 25px;
    background: #666;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 150px;
  }

  .clock .info {
    position: absolute;
    width: 120px;
    height: 20px;
    border-radius: 7px;
    background: #ccc;
    text-align: center;
    line-height: 20px;
    color: #000;
    font-size: 11px;
    top: 200px;
    left: 50%;
    margin-left: -60px;
    font-family: sans-serif;
    font-weight: 700;
    z-index: 3;
    letter-spacing: 3px;
    margin-left: -60px;
    left: 50%;
  }
  .clock .date {
      top: 80px;
    }
  .clock .day {
      top: 200px;
  }
  </style>
  <div class="clock">
    <div>
      <div class="info date">${date}/${month}/${year}</div>
      <div class="info day">${day}</div>
    </div>
    <div class="dot"></div>
    <div>
      <div class="hour-hand" style="transform: rotate(${hDeg}deg);"></div>
      <div class="minute-hand" style="transform: rotate(${mDeg}deg);"></div>
      <div class="second-hand" style="transform: rotate(${sDeg}deg);"></div>
    </div>
    <div>
      <span class="h3">3</span>
      <span class="h6">6</span>
      <span class="h9">9</span>
      <span class="h12">12</span>
    </div>
    <div class="diallines">${diallines.join("")}</div>
  </div>
  `;
};

template(datasources[0].latestData.data);
