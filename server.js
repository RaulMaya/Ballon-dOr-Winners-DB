const db = require("./config/connection");
const inquirer = require("inquirer");

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

const addNation = async () => {
  const newNation = await inquirer.prompt([
    {
      type: "input",
      name: "nation",
      message: "Enter the new nationality that has won the ballon d'or.",
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

  const arrNation = newNation.split(" ");
  for (let i = 0; i < arrNation.length; i++) {
    arrNation[i] =
      arrNation[i].charAt(0).toUpperCase() + arrNation[i].slice(1);
    const newCountry = arrNation.join(" ");
  // Query database

  db.query(
    `INSERT INTO nations (country) VALUES (?);`,
    newCountry,
    function (err, results) {
      console.log(`${newCountry} added to the database.`);
    }
  );
};

console.log(`  
  ___________________________
 |             |             |
 |___          |          ___|
 |_  |         |         |  _|
.| | |         |         | | |.
|| | | )     ( | )     ( | | ||
'|_| |         |         | |_|'
 |___|         |         |___|
 |             |             |
 |_____________|_____________|
 
 `);

const myInq = async () => {
  const result = await inquirer.prompt([
    {
      type: "list",
      name: "Introduction",
      message: "What would you like to consult?",
      choices: [
        "View all nations",
        "Add nation",
        "View all clubs",
        "Add club",
        "View all managers",
        "Add manager",
        "View all winners",
        "Add winner",
        "Full Ballon D'Or winners",
        "Update winners team",
        "Stats",
        "Exit",
      ],
    },
  ]);

  console.log(result["Introduction"]);
  if (result["Introduction"] === "View all nations") {
    // Query database
    db.query("SELECT * FROM nations", function (err, results) {
      console.table(results);
      myInq();
    });
  } else if (result["Introduction"] === "Add nation") {
    addNation();
    db.query("SELECT * FROM nations", function (err, results) {
      console.table(results);
    });
    myInq();
  } else if (result["Introduction"] === "View all clubs") {
    // Query database
    db.query(
      "SELECT club, club_rating, country as clubs_country FROM clubs JOIN nations ON clubs.country_id = nations.id;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
  } else if (result["Introduction"] === "Add club") {
    const countryData = await execute_rows("SELECT country FROM nations;");
    const clubCountryMap = countryData.map((c) => c.country);
    clubCountryMap.push("Add Country");

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
        choices: clubCountryMap,
      },
    ]);

    if (newClub["clubCountry"] === "Add Country") {
      addNation();
    }
    let countryId = clubCountryMap.indexOf(newClub["clubCountry"]);

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
      db.query(
        "SELECT club, club_rating, country as clubs_country FROM clubs JOIN nations ON clubs.country_id = nations.id;",
        function (err, results) {
          console.table(results);
          myInq();
        }
      );
    }
  } else if (result["Introduction"] === "View all managers") {
    // Query database
    db.query(
      "SELECT manager_fn, manager_ln, country as manager_country FROM managers JOIN nations ON managers.country_id = nations.id;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
  } else if (result["Introduction"] === "View all winners") {
    // Query database
    db.query(
      "SELECT first_name, last_name, age FROM winners;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
  } else if (result["Introduction"] === "Full Ballon D'Or winners") {
    // Query database

    await execute_rows(
      `CREATE OR REPLACE VIEW winners_part1 AS (SELECT winners.id, first_name, last_name, age, country, club, club_rating, clubs.country_id as club_country_id, manager_fn, manager_ln, managers.country_id as manager_country_id FROM winners JOIN nations ON winners.nation_id = nations.id JOIN clubs ON winners.club_id = clubs.id JOIN managers ON winners.manager_id = managers.id);`
    );
    await execute_rows(
      `CREATE OR REPLACE VIEW winners_part2 AS (SELECT winners_part1.id, first_name, last_name, age, winners_part1.country, club, club_rating, club_country_id, manager_fn, manager_ln, nations.country as manager_country FROM winners_part1 JOIN nations ON winners_part1.manager_country_id = nations.id);`
    );
    const finalResult = await execute_rows(
      `SELECT winners_part2.id, first_name, last_name, age, winners_part2.country, club, club_rating, nations.country as club_country, manager_fn, manager_ln, manager_country FROM winners_part2 JOIN nations ON winners_part2.club_country_id = nations.id ORDER BY winners_part2.id ASC;`
    );
    console.table(finalResult);
    myInq();
  } else if (result["Introduction"] === "Update winners team") {
    const winnersData = await execute_rows(
      "SELECT first_name, last_name FROM winners;"
    );
    const winnersMap = winnersData.map((result) => {
      if (result["last_name"]) {
        return result["first_name"] + " " + result["last_name"];
      } else {
        return result["first_name"];
      }
    });
    console.log(winnersMap);

    const update = await inquirer.prompt([
      {
        type: "list",
        name: "playerUpdate",
        message:
          "Which Ballon d'Or winning player would you like to change teams?",
        choices: winnersMap,
      },
      {
        type: "input",
        name: "teamUpdate",
        message: "Input the new team for the player:",
      },
    ]);
    console.log(update);
  }
};

// async function asyncCall() {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // Expected output: "resolved"
// }

myInq();
