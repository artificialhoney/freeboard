const f2c = (value) => {
  return (value - 32) / 1, 8;
};

const template = (data) => {
  return `
<style>
.weather {
    color: #fff;
    width: 100%;
}

.weather__body {
    text-align: center;
    margin-top: 3rem;
}

.weather__datetime {
    margin-bottom: 2rem;
    font-size: 14px;
}

.weather__forecast {
    background: #1e1e1e;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 30px;
}

.weather__icon img {
    width: 100px;
}

.weather__temperature {
    font-size: 1.75rem;
}

.weather__minmax {
    display: flex;
    justify-content: center;
}

.weather__minmax p {
    font-size: 14px;
    margin: 0.5rem;
}

.weather__info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-top: 3rem;
}

.weather__card {
    display: flex;
    align-items: center;
    background: #1e1e1e;
    padding: 1rem;
    border-radius: 10px;
}

.weather__card i {
    font-size: 1.5rem;
    margin-right: 1rem;
}

.weather__card p {
    font-size: 14px;
}
</style>
<div class="weather">
    <div class="weather__body">
        <h1 class="weather__city">${data?.name}</h1>
        <div class="weather__icon"> <img src="http://openweathermap.org/img/wn/${
          data?.weather[0].icon
        }@4x.png"></div>
        <p class="weather__temperature">${Math.round(f2c(data?.main.temp))}°</p>
        <div class="weather__minmax">
            <p>Min: ${Math.round(f2c(data?.main.temp_min))}°</p>
            <p>Max: ${Math.round(f2c(data?.main.temp_max))}°</p>
        </div>
    </div>

    <div class="weather__info">
        <div class="weather__card">
            <i class="fa-solid fa-temperature-full" aria-hidden="true"></i>
            <div>
                <p>Real Feel</p>
                <p class="weather__realfeel">${Math.round(
                  f2c(data?.main.feels_like),
                )}°</p>
            </div>
        </div>
        <div class="weather__card">
            <i class="fa-solid fa-droplet" aria-hidden="true"></i>
            <div>
                <p>Humidity</p>
                <p class="weather__humidity">${Math.round(
                  data?.main.humidity,
                )}%</p>
            </div>
        </div>
        <div class="weather__card">
            <i class="fa-solid fa-wind" aria-hidden="true"></i>
            <div>
                <p>Wind</p>
                <p class="weather__wind">${Math.round(data?.wind.speed)} m/s</p>
            </div>
        </div>
        <div class="weather__card">
            <i class="fa-solid fa-gauge-high" aria-hidden="true"></i>
            <div>
                <p>Pressure</p>
                <p class="weather__pressure">${Math.round(
                  data?.main.pressure,
                )} hPa</p>
            </div>
        </div>
    </div>
</div>
  `;
};

template(datasources[1].latestData?.data);
