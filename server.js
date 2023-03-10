const db = require("./config/connection");
const inquirer = require("inquirer");
const {
  execute_rows,
  listOfManagers,
  listOfClubs,
  listOfNations,
  addClub,
  addNation,
  addManager,
} = require("./lib/helper");

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
    await addNation();
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
    await addClub();
    db.query(
      "SELECT club, club_rating, country as clubs_country FROM clubs JOIN nations ON clubs.country_id = nations.id;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
  } else if (result["Introduction"] === "View all managers") {
    // Query database
    db.query(
      "SELECT manager_fn, manager_ln, country as manager_country FROM managers JOIN nations ON managers.country_id = nations.id;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
  } else if (result["Introduction"] === "Add manager") {
    await addManager();
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
  } else if (result["Introduction"] === "Add winner") {
    let countryList = await listOfNations();
    let clubList = await listOfClubs();
    let managerList = await listOfManagers();

    const newPlayer = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the name of the winner of the ballon d'or.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the winner of the ballon d'or.",
      },
      {
        type: "number",
        name: "age",
        message: "Enter the age of the winner of the ballon d'or.",
      },
      {
        type: "list",
        name: "playerCountry",
        message:
          "Select the country of origin of the winner of the ballon d'or.",
        choices: countryList,
      },
      {
        type: "list",
        name: "playerClub",
        message: "Select the club where this player won the Ballon d'Or.",
        choices: clubList,
      },
      {
        type: "list",
        name: "playersManager",
        message:
          "Select the coach who directed this player when he won the ballon d'or.",
        choices: managerList,
      },
    ]);

    let countryId = countryList.indexOf(newPlayer["playerCountry"]);
    let clubId = clubList.indexOf(newPlayer["playerClub"]);
    let managerId = managerList.indexOf(newPlayer["playersManager"]);

    const playerValues = [
      newPlayer["firstName"],
      newPlayer["lastName"],
      countryId + 1,
      clubId + 1,
      newPlayer["age"],
      managerId + 1,
    ];
    db.query(
      `INSERT INTO winners (first_name, last_name, nation_id, club_id, age, manager_id) VALUES (?);`,
      [playerValues],
      function (err, results) {
        if (err) throw err;
        console.log(
          `${newPlayer["firstName"]} ${newPlayer["lastName"]} added to the database.`
        );
      }
    );
    db.query(
      "SELECT first_name, last_name, age FROM winners;",
      function (err, results) {
        console.table(results);
        myInq();
      }
    );
    myInq();
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
    let clubList = await listOfClubs();

    const update = await inquirer.prompt([
      {
        type: "list",
        name: "playerUpdate",
        message:
          "Which Ballon d'Or winning player would you like to change teams?",
        choices: winnersMap,
      },
      {
        type: "list",
        name: "teamUpdate",
        message: "What team do you want to switch to?",
        choices: clubList,
      },
    ]);
    const playerId = winnersMap.indexOf(update["playerUpdate"]) + 1990;
    const clubId = clubList.indexOf(update["teamUpdate"]) + 1;
    
    db.query(
      "UPDATE winners SET club_id = ? WHERE id = ?",
      [clubId, playerId],
      function (err, results) {
        if (err) throw err;
        console.log(`
        Team Updated \n
        New Team: ${update["teamUpdate"]}`);
      }
    );

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
  } else if (result["Introduction"] === "Exit") {
    console.log("Thank you for using our Ballon d'Or database.");
    process.exit();
  }
};

myInq();
