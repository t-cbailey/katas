const fs = require("fs");
const fsPromises = require("fs").promises;

async function displayWeatherData() {
  const data = await fsPromises.readFile("./weather.dat", "utf-8");

  let splitData = [];

  let i = 91;

  while (i < data.length - 90) {
    const sliced = data.slice(i, i + 20);
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

  console.log(splitData);

  const smallestDelta = [0, null];

  splitData.forEach((day) => {
    const delta = day[1] - day[2];
    if (delta < smallestDelta[1] || smallestDelta[1] === null) {
      smallestDelta[0] = day[0];
      smallestDelta[1] = delta;
    }
  });

  return smallestDelta;
}

displayWeatherData().then((res) => {
  console.log(res);
});
