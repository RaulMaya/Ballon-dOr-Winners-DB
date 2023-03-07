DELETE FROM
    winners;

DELETE FROM
    clubs;

DELETE FROM
    managers;

INSERT INTO
    winners (first_name, last_name, club, nation, age, coach)
VALUES
    (
        "Lothar",
        "Matthäus",
        "Inter Milan",
        "Germany",
        28,
        "Giovanni Trapattoni"
    ),
    (
        "Jean-Pierre",
        "Papin",
        "Marseille",
        "France",
        27,
        "Raymond Goethals"
    ),
    (
        "Marco",
        "van Basten",
        "AC Milan",
        "Netherlands",
        28,
        "Fabio Capello"
    ),
    (
        "Roberto",
        "Baggio",
        "Juventus",
        "Italy",
        26,
        "Giovanni Trapattoni"
    ),
    (
        "Hristo",
        "Stoichkov",
        "Barcelona",
        "Bulgaria",
        28,
        "Johan Cruyff"
    ),
    (
        "George",
        "Weah",
        "AC Milan",
        "Liberia",
        29,
        "Fabio Capello"
    ),
    (
        "Matthias",
        "Sammer",
        "Borussia Dortmund",
        "Germany",
        29,
        "Ottmar Hitzfeld"
    ),
    (
        "Ronaldo",
        "Nazario",
        "Inter Milan",
        "Brazil",
        21,
        "Luigi Simoni"
    ),
    (
        "Zinedine",
        "Zidane",
        "Juventus",
        "France",
        26,
        "Carlo Ancelotti"
    ),
    (
        "Rivaldo",
        null,
        "Barcelona",
        "Brazil",
        27,
        "Louis van Gaal"
    );

INSERT INTO
    clubs (club, club_rating)
VALUES
    ("Inter Milan", 8),
    ("Marseille", 7),
    ("AC Milan", 9),
    ("Juventus", 9),
    ("Barcelona", 9),
    ("Borussia Dortmund", 8);

INSERT INTO
    managers (manager_name)
VALUES
    ("Giovanni Trapattoni"),
    ("Raymond Goethals"),
    ("Fabio Capello"),
    ("Johan Cruyff"),
    ("Ottmar Hitzfeld"),
    ("Luigi Simoni"),
    ("Carlo Ancelotti"),
    ("Louis van Gaal");