const execute_rows = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, function (err, result, fields) {
      if (err) {
        // Returning the error
        reject(err);
      }

      resolve(result);
    });
  });
};

const listOfManagers = async () => {
  const managerData = await execute_rows(
    "SELECT manager_fn, manager_ln FROM managers;"
  );
  const managerMap = managerData.map((result) => {
    if (result["manager_ln"]) {
      return result["manager_fn"] + " " + result["manager_ln"];
    } else {
      return result["manager_fn"];
    }
  });
  managerMap.push("Add Manager");
  return managerMap;
};

const listOfClubs = async () => {
  const clubData = await execute_rows("SELECT club FROM clubs;");
  const clubMap = clubData.map((c) => c.club);
  return clubMap;
};

const listOfNations = async () => {
  const countryData = await execute_rows("SELECT country FROM nations;");
  const clubCountryMap = countryData.map((c) => c.country);
  return clubCountryMap;
};

const addClub = async () => {
  let countryList = await listOfNations();

  const newClub = await inquirer.prompt([
    {
      type: "input",
      name: "club",
      message:
        "Enter the club that has/had a player who won the ballon d'or with that team.",
    },
    {
      type: "number",
      name: "clubRating",
      message: "From 1 to 10, please rate this team.",
      validate: (answer) => {
        if (typeof answer === "number") {
          if (answer < 0 || answer > 10) {
            return "Please enter a number from 1 to 10.";
          }
          return true;
        } else {
          return "Please enter a number.";
        }
      },
    },
    {
      type: "list",
      name: "clubCountry",
      message: "Select the country of origin of the club.",
      choices: countryList,
    },
  ]);

  if (newClub["clubCountry"] === "Add Country") {
    await addNation();
  }
  let countryId = countryList.indexOf(newClub["clubCountry"]);

  const arrClub = newClub["club"].split(" ");
  for (let i = 0; i < arrClub.length; i++) {
    arrClub[i] = arrClub[i].charAt(0).toUpperCase() + arrClub[i].slice(1);
  }

  const newTeam = arrClub.join(" ");
  // Query database
  const currClubs = await execute_rows("SELECT club FROM clubs");
  const clubMap = currClubs.map((club) => club.club);
  if (clubMap.includes(newTeam)) {
    let index = clubMap.indexOf(newTeam);
    console.log(`${newTeam} (${index}) is already in our database.`);
    myInq();
  } else {
    const clubValues = [newTeam, newClub["clubRating"], countryId + 1];
    db.query(
      `INSERT INTO clubs (club, club_rating, country_id) VALUES (?);`,
      [clubValues],
      function (err, results) {
        if (err) throw err;
        console.log(`${newTeam} added to the database.`);
      }
    );
  }
};

const addNation = async () => {
  const newNation = await inquirer.prompt([
    {
      type: "input",
      name: "nation",
      message: "Enter the new nationality.",
      validate: async (answer) => {
        const arrNation = answer.split(" ");
        for (let i = 0; i < arrNation.length; i++) {
          arrNation[i] =
            arrNation[i].charAt(0).toUpperCase() + arrNation[i].slice(1);
          const newCountry = arrNation.join(" ");
          const currNations = await execute_rows("SELECT country FROM nations");
          const nationsMap = currNations.map((country) => country.country);
          if (nationsMap.includes(newCountry)) {
            let index = nationsMap.indexOf(newCountry);
            return `${newCountry} (${index}) is already in our database.`;
          } else {
            return true;
          }
        }
      },
    },
  ]);

  const arrNation = newNation["nation"].split(" ");
  for (let i = 0; i < arrNation.length; i++) {
    arrNation[i] = arrNation[i].charAt(0).toUpperCase() + arrNation[i].slice(1);
    const newCountry = arrNation.join(" ");
    // Query database

    db.query(
      `INSERT INTO nations (country) VALUES (?);`,
      newCountry,
      function (err, results) {
        console.log(`${newCountry} added to the database.`);
      }
    );
  }
};

const addManager = async () => {
  let countryList = await listOfNations();
  const newManager = await inquirer.prompt([
    {
      type: "input",
      name: "manager_fn",
      message: "Enter manager first name.",
    },
    {
      type: "input",
      name: "manager_ln",
      message: "Enter manager last name.",
    },
    {
      type: "list",
      name: "managerCountry",
      message: "Select the country of origin of the manager.",
      choices: countryList,
    },
  ]);
  if (newManager["managerCountry"] === "Add Country") {
    await addNation();
  }

  let countryId = countryList.indexOf(newManager["managerCountry"]);
  const managerValues = [
    newManager["manager_fn"],
    newManager["manager_ln"],
    countryId + 1,
  ];
  db.query(
    `INSERT INTO managers (manager_fn, manager_ln, country_id) VALUES (?);`,
    [managerValues],
    function (err, results) {
      if (err) throw err;
      console.log(
        `${newManager["manager_fn"]} ${newManager["manager_ln"]} added to the managers database.`
      );
    }
  );
};

module.exports = { execute_rows, listOfManagers, listOfClubs, listOfNations, addClub, addNation, addManager };