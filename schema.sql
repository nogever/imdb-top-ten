drop table if exists days;
create table days (
    id integer primary key autoincrement,
    dates date not null
);

drop table if exists movies;
create table movies (
    id integer primary key autoincrement,
    title text not null,
    year text not null,
    rank integer not null,
    rating numeric not null,
    number_of_votes integer not null,
    date_id integer
);

