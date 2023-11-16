const fs = require("fs");
const fsPromises = require("fs").promises;

async function displayWeatherData() {
  const fetchData = async () => {
    return fsPromises.readFile("./weather.dat", "utf-8");
  };

  const data = await fetchData();

  const formattedData = data
    .replace(/\s+/g, " ")
    .split(" ")
    .filter((item) => {
      if (item && item !== " ") return item;
    });

  const dayData = [];

  for (let j = 1; j < 10; j++) {
    const location = formattedData.indexOf(j.toString());
    dayData.push(formattedData.slice(location, location + 3));
  }

  return dayData;
}

console.log(displayWeatherData());
