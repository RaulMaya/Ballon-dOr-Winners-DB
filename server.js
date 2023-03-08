const express = require("express");
const db = require("./config/connection");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const myInq = async () => {
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

  const result = await inquirer.prompt([
    {
      type: "list",
      name: "Introduction",
      message: "What would you like to consult?",
      choices: [
        "View all nations",
        "View all clubs",
        "View all managers",
        "View all winners",
        "Complete table",
        "Add a winner",
      ],
    },
  ]);

  console.log(result["Introduction"]);
  if (result["Introduction"] === "View all nations") {
    // Query database
    db.query("SELECT * FROM nations", function (err, results) {
      console.table(results);
    });
  } else if (result["Introduction"] === "View all clubs") {
    // Query database
    db.query(
      "SELECT club, club_rating, country as clubs_country FROM clubs JOIN nations ON clubs.country_id = nations.id;",
      function (err, results) {
        console.table(results);
      }
    );
  } else if (result["Introduction"] === "View all managers") {
    // Query database
    db.query(
      "SELECT club, club_rating, country as clubs_country FROM clubs JOIN nations ON clubs.country_id = nations.id;",
      function (err, results) {
        console.table(results);
      }
    );
  }

  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// async function asyncCall() {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // Expected output: "resolved"
// }

myInq();
