const fsPromises = require("fs").promises;

////weather variation////
//Find the smallest diff between high and low temps and return that diff with the day number.

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

////football variation////
//Find the smallest diff between goals scored/conceeded and return that diff with the team name.

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

//D.R.Y version//
//Combine the two functions above into a DRY function to handle both data sets.
//Takes a filepath and zero-indexed column numbers to compare.

async function findSmallestDelta(filePath, col1, col2) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const type = filePath.match(/(?<=\/)\w+/gi).toString();

  let splitData = data.split("\n");
  splitData = splitData
    .map((arr) => {
      return arr.trim().replaceAll(/\s+/g, ",").split(",");
    })
    .slice(1, splitData.length);

  const smallestDelta = [0, null];

  splitData.forEach((arr) => {
    if (arr.length > 1) {
      const high = arr[col1].replaceAll(/[^0-9]/g, "");
      const low = arr[col2].replaceAll(/[^0-9]/g, "");
      let delta = high - low;
      if (delta < 0) {
        delta = -delta;
      }
      if (delta < smallestDelta[1] || smallestDelta[1] === null) {
        smallestDelta[0] = type === "football" ? arr[1] : arr[0];
        smallestDelta[1] = delta;
      }
    }
  });

  return `The ${
    type == "football" ? "team" : "day"
  } with the smallest variation in ${
    type == "football" ? "goals" : "temperature"
  } is ${smallestDelta[0]} with a delta of ${smallestDelta[1]} ${
    type == "football" ? "goals" : "degrees"
  }.`;
}

findSmallestDelta("./football.dat", 6, 8).then((res) => {
  console.log(res);
});

findSmallestDelta("./weather.dat", 1, 2).then((res) => {
  console.log(res);
});
