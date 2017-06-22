-- The table needs to be dropped each time you restart nodemon. This is necessary for the Postman tests.
-- === DROP TABLE ====================

DROP TABLE IF EXISTS vehicles;

-- === CREATE TABLE ==================

-- Complete the create table statement below. The table should have the following columns:

-- id         should be an auto-incrementing number, primary key
-- make       should be a string
-- model      should be a string
-- year       should be a number
-- owner_id   should be a number, foreign key

CREATE TABLE IF NOT EXISTS vehicles (vehicle_id SERIAL PRIMARY KEY,
                      make varchar(20),
                      model varchar(20),
                      year integer,
                      owner_id int references users(user_id))

-- === INSERT STATEMENT ===============

-- Complete the insert statement below. The values below need to be inserted into the 'vehicles' table.

insert into vehicles (make, model, year, owner_id)
values ('Toyota', 'Camry', 1991, 1)

insert into vehicles (make, model, year, owner_id)
values ('Honda', 'Civic', 1995, 1)

insert into vehicles (make, model, year, owner_id)
values ('Ford', 'Focus', 2005, 1)

insert into vehicles (make, model, year, owner_id)
values ('Ford', 'Taurus', 2003, 2)

insert into vehicles (make, model, year, owner_id)
values ('VW', 'Bug', 2010, 2)

insert into vehicles (make, model, year, owner_id)
values ('Mini', 'Coup', 2013, 3)
