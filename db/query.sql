CREATE
OR REPLACE VIEW winners_part1 AS (
    SELECT
        winners.id,
        first_name,
        last_name,
        age,
        country,
        club,
        club_rating,
        clubs.country_id as club_country_id,
        manager_fn,
        manager_ln,
        managers.country_id as manager_country_id
    FROM
        winners
        JOIN nations ON winners.nation_id = nations.id
        JOIN clubs ON winners.club_id = clubs.id
        JOIN managers ON winners.manager_id = managers.id
);

CREATE
OR REPLACE VIEW winners_part2 AS (
    SELECT
        winners_part1.id,
        first_name,
        last_name,
        age,
        winners_part1.country,
        club,
        club_rating,
        club_country_id,
        manager_fn,
        manager_ln,
        nations.country as manager_country
    FROM
        winners_part1
        JOIN nations ON winners_part1.manager_country_id = nations.id
);

CREATE
OR REPLACE VIEW full_list AS (
    SELECT
        winners_part2.id,
        first_name,
        last_name,
        age,
        winners_part2.country,
        club,
        club_rating,
        nations.country as club_country,
        manager_fn,
        manager_ln,
        manager_country
    FROM
        winners_part2
        JOIN nations ON winners_part2.club_country_id = nations.id
);

SELECT
    club AS Club,
    COUNT(id) AS Number_Of_Ballon_DOrs
FROM
    full_list
GROUP BY
    club
ORDER BY Number_Of_Ballon_DOrs DESC;