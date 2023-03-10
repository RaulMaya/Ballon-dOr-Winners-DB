<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/RaulMaya/Ballon-dOr-Winners-DB">
    <img src="./icon/ballondor.png" alt="Logo" width="200" height="200">
  </a>

  <h2 align="center">Ballon d'Or Database</h2>
  <h4 align="center">Node.JS & MySQL</h4>
  
<br/>
<p align="center">
    <a href="LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/License-MIT-lime.svg" alt="GitHub License">
    </a>
    <a href="https://www.mysql.com/" target="_blank">
        <img src="https://img.shields.io/badge/MySQL-v8.0.32-blue.svg" alt="MySQL Version">
    </a>
    <a href="https://nodejs.org/en/docs/" target="_blank">
        <img src="https://img.shields.io/badge/node.js-v16.15.1-green.svg" alt="Node.JS Version">
    </a>
    <div style="position:relative;width:fit-content;height:fit-content;">
            <a style="position:absolute;top:20px;right:1rem;opacity:0.8;" href="https://clipchamp.com/watch/U5gM42W5s4B">
                <img style="height:22px;" src="https://clipchamp.com/e.svg" alt="Made with Clipchamp" />
            </a>
    </div>
</p>
<br/>

<p align="center">
This is a command-line interface (CLI) application that allows users to query a MySQL database. The application uses the Inquirer.js package to prompt the user to select what they would like to consult. There are several options, including viewing and adding data on nations, clubs, managers, and Ballon d'Or winners. The application executes SQL queries on the database based on the user's selections and returns the results in a tabular format using the console.table() method. The application allows users to view data from the database, add new data to the database, update existing data, and delete data.
    <br />
    <br />
    <a href="https://github.com/RaulMaya/Ballon-dOr-Winners-DB">Repository</a>    
    ·
    <a href="https://express-notiz-block.herokuapp.com/">Video</a>
    ·
    <a href="https://www.linkedin.com/in/raul-maya/">My LinkedIn</a>

  </p>
</div>



### Content Table

- [About](#about)
- [Usage](#usage)
- [Installation](#installation)
- [Video](#video)
- [License](#license)
- [Contact](#contact)

<br>

### About

<p>This CLI Applcation runs using Node.js and MySQL, the program  prompts the user with a menu using the "inquirer" package. The user can select different options from the menu, such as viewing or adding data about nations, clubs, managers, and Ballon d'Or winners.</p>

<p>When the user selects an option, the program queries a MySQL database using the "mysql2" package and displays the results in a table using the "console.table" function. The program uses several functions to add new data to the database, including addNation(), addClub(), and addManager().</p>

<p>
When the user selects the "Add winner" option, the program prompts the user to enter the name, age, country of origin, club, and manager of the Ballon d'Or winner, and adds this data to the "winners" table in the database.</p>

<p>The code includes ASCII art in the form of two console.log() statements, and uses async/await syntax to ensure that the menu options are displayed in the correct order.
</p>

<br>

### Usage

<p>This code displays a database query program menu and prompts the user to log in using Inquirer.js. Depending on the user's choice, the program queries a database and displays the result in tabular form. The program also allows users to add new entries to the database.</p>

<br>

### Installation

```
git clone git@github.com:RaulMaya/Ballon-dOr-Winners-DB.git
npm i
npm start
```

<br>

### Video
<a href="https://www.youtube.com/watch?v=LcycfAQQEzo">
<img src="icon/app.gif" alt="Application behavior gif">
</a>
 
<br>

### License

> You can check out the full license [here](https://github.com/RaulMaya/Ballon-dOr-Winners-DB/blob/master/LICENSE)
> This project is licensed under the terms of the **MIT** license.

<br>

### Contact

- Name: Raul Maya Salazar
- Phone: +52 833 159 7006
- E-mail: raulmayas20@gmail.com
- GitHub: https://github.com/RaulMaya
- LinkedIn: https://www.linkedin.com/in/raul-maya/

<p align="right">(<a href="#top">back to top</a>)</p>
