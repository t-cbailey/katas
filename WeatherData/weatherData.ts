const fs = require("fs");
const fsPromises = require("fs").promises;

async function displayWeatherData() {
  const data = await fsPromises.readFile("./weather.dat", "utf-8");

  let splitData = [];

  let i = 91;

  while (i < data.length - 90) {
    const sliced = data.slice(i, i + 14);
    splitData.push([sliced]);
    i += 90;
  }

  splitData = splitData.map((day) => {
    return day[0]
      .replace(/\s+/g, " ")
      .split(" ")
      .filter((item) => {
        if (item && item !== " ") return item;
      });
  });

  const smallestDelta = [0, null];

  splitData.forEach((day) => {
    const dayHigh = day[1].replace(/\*/, "");
    const dayLow = day[2].replace(/\*/, "");
    const delta = dayHigh - dayLow;
    if (delta < smallestDelta[1] || smallestDelta[1] === null) {
      smallestDelta[0] = day[0];
      smallestDelta[1] = delta;
    }
  });

  return `The day with the smallest temp variation is day ${smallestDelta[0]} with a delta of ${smallestDelta[1]} degrees.`;
}

displayWeatherData().then((res) => {
  console.log(res);
});
