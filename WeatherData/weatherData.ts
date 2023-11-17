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

//football variation////

async function displayFootballData() {
  const data = await fsPromises.readFile("./football.dat", "utf-8");

  let splitData = data.split("\n");
  splitData = splitData
    .map((team) => {
      return team.trim().replaceAll(/\s+/g, ",").split(",");
    })
    .slice(1, splitData.length);

  const smallestDelta = [0, null];

  splitData.forEach((team) => {
    const goalsFor = team[6];
    const goalsAgainst = team[8];
    let delta = goalsFor - goalsAgainst;
    if (delta < 0) {
      delta = -delta;
    }
    if (delta < smallestDelta[1] || smallestDelta[1] === null) {
      smallestDelta[0] = team[1];
      smallestDelta[1] = delta;
    }
  });

  return `The team with the smallest variation in goals for and against is ${smallestDelta[0]} with a delta of ${smallestDelta[1]} goals.`;
}

displayFootballData().then((res) => {
  console.log(res);
});
