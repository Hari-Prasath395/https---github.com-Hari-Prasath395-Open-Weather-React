const iconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const API_KEY = "e6b230e294c367e0de2b1eae21eb86eb";

const getWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const response = await fetch(URL);
  const data = await response.json();

  console.log(data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconUrl: iconUrl(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export default getWeatherData;
