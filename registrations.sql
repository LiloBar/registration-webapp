drop table if exists reg_numbers, towns;

drop table if exists towns;
create table towns (
    id serial not null primary key,
    town_name varchar(50) not null,
    town_tag varchar(50) not null
);

create table reg_numbers (
    id serial not null primary key,
    reg_number varchar(50) not null,
    town_id int not null,
    FOREIGN KEY (town_id) REFERENCES towns(id)
);
 INSERT INTO towns (town_name, town_tag) VALUES ('Cape Town', 'CA');
 INSERT INTO towns (town_name, town_tag) VALUES ('Ceres', 'CT');
 INSERT INTO towns (town_name, town_tag) VALUES ('Strand', 'CEY');
 INSERT INTO towns (town_name, town_tag) VALUES ('Paarl', 'CJ');
INSERT INTO towns (town_name, town_tag) VALUES ('Malmesbury', 'CK');

