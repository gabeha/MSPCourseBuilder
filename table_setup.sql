drop table if exists timeslots;
drop table if exists days;
drop table if exists times;
drop table if exists module_join_period;
drop table if exists periods;
drop table if exists movies;
drop table if exists contacts;

drop table if exists modules;
drop table if exists descriptions;
drop table if exists teachers;
drop table if exists descriptions_join_teachers;
drop table if exists pre_reqs;
drop table if exists co_reqs;
drop table if exists recommended;


drop table if exists assessments;
drop table if exists timeslot_join_module;
drop table if exists timeslot_checker;

create table if not exists days (
  id serial primary key,
  name varchar(3)
);

create table if not exists times (
  id serial primary key,
  name varchar(2)
);

create table if not exists timeslots (
  id serial primary key,
  day_id integer,
  time_id integer,
  foreign key (day_id) references days (id),
  foreign key (time_id) references times (id)
);

create table if not exists teachers (
  id serial primary key,
  name varchar(50),
  email varchar(50),
  office varchar(20),
  specialisation varchar(20),
  pronouns varchar(20)
);

create table if not exists descriptions (
  id serial primary key,
  heading varchar(50),
  teacher_id integer,
  objectives varchar(2000),
  body varchar(3000),
  literature varchar(200),
  format varchar(200),
  assessment_type varchar(100)
);

create table if not exists modules (
  id serial primary key,
  subject varchar(3),
  code integer,
  description_id integer,
  foreign key (description_id) references descriptions (id)
);

create table if not exists periods (
	id integer unique primary key
);

create table if not exists descriptions_join_teachers(
	id serial primary key,
	description_id integer,
	teacher_id integer,
	foreign key (description_id) references descriptions (id),
	foreign key (teacher_id) references teachers (id)
);

create table if not exists pre_reqs (
	id serial primary key,
	module_id integer,
	pre_req_id integer,
	foreign key (module_id) references modules (id),
	foreign key (pre_req_id) references modules (id)
);

create table if not exists co_reqs (
	id serial primary key,
	module_id integer,
	co_req_id integer,
	foreign key (module_id) references modules (id),
	foreign key (co_req_id) references modules (id)
);

create table if not exists recommended (
	id serial primary key,
	module_id integer,
	recommended_id integer,
	foreign key (module_id) references modules (id),
	foreign key (recommended_id) references modules (id)
);


create table if not exists timeslot_join_module (
  id serial primary key,
  module_id integer,
  timeslot_id integer,
  foreign key (module_id) references modules (id),
  foreign key (timeslot_id) references timeslots (id)
);

create table if not exists module_join_period (
	id serial primary key,
	module_id integer,
	period_id integer,
	foreign key (module_id) references modules (id),
	foreign key (period_id) references periods (id)
);