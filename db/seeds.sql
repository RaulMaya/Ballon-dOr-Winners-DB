DELETE FROM
    nations;

DELETE FROM
    winners;

DELETE FROM
    clubs;

DELETE FROM
    managers;

INSERT INTO
    nations (country)
VALUES
    ('Italy'),
    ('France'),
    ('Spain'),
    ('Germany'),
    ("Belgium"),
    ("Bulgaria"),
    ("Liberia"),
    ("Brazil"),
    ("Netherlands");

INSERT INTO
    clubs (club, club_rating, country_id)
VALUES
    ("Inter Milan", 8, 1),
    ("Marseille", 7, 2),
    ("Juventus", 9, 1),
    ("Barcelona", 9, 3),
    ("Borussia Dortmund", 8, 4),
    ("AC Milan", 8, 1);

INSERT INTO
    managers (manager_fn, manager_ln, country_id)
VALUES
    ("Giovanni", "Trapattoni", 1),
    ("Raymond", "Goethals", 5),
    ("Fabio", "Capello", 1),
    ("Johan", "Cruyff", 9),
    ("Ottmar", "Hitzfeld", 4),
    ("Luigi", "Simoni", 1),
    ("Carlo", "Ancelotti", 1),
    ("Louis", "Van Gaal", 9);

INSERT INTO
    winners (
        first_name,
        last_name,
        nation_id,
        club_id,
        age,
        manager_id
    )
VALUES
    (
        "Lothar",
        "Matthäus",
        4,
        1,
        28,
        1
    ),
    (
        "Jean-Pierre",
        "Papin",
        2,
        2,
        27,
        2
    ),
    (
        "Marco",
        "Van Basten",
        9,
        6,
        28,
        3
    ),
    (
        "Roberto",
        "Baggio",
        1,
        3,
        26,
        1
    ),
    (
        "Hristo",
        "Stoichkov",
        6,
        4,
        28,
        4
    ),
    (
        "George",
        "Weah",
        7,
        6,
        29,
        3
    ),
    (
        "Matthias",
        "Sammer",
        4,
        5,
        29,
        5
    ),
    (
        "Ronaldo",
        "Nazario",
        8,
        1,
        21,
        6
    ),
    (
        "Zinedine",
        "Zidane",
        2,
        3,
        26,
        7
    ),
    (
        "Rivaldo",
        null,
        8,
        4,
        27,
        8
    );