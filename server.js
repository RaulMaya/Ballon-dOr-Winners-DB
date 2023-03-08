const db = require("./config/connection");
const inquirer = require("inquirer");

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
 |_____________|_____________|`);

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
        "Update winner team",
        "Exit"
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
  } else if (result["Introduction"] === "View all clubs") {
    // Query database
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
    function execute_rows(query) {
      return new Promise((resolve, reject) => {
        db.query(query, function (err, result, fields) {
          if (err) {
            // Returning the error
            reject(err);
          }

          resolve(result);
        });
      });
    }
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
  }
};

// async function asyncCall() {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // Expected output: "resolved"
// }

myInq();
