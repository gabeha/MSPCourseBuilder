drop table if exists choices_test;
drop table if exists assignments_test;
drop table if exists assignments_join_choices_test;

CREATE TABLE if not exists choices_test (
	choice_id serial PRIMARY KEY,
	choice_subject VARCHAR (100),
	choice_code int
);

INSERT INTO choices_test (choice_subject, choice_code)
VALUES
('PHY', 2001),
('BIO', 3004);


create table if not exists assignments_test (
	assignment_id integer primary key,
	assignment_type varchar(100)
);

insert into assignments_test (assignment_id, assignment_type) values
(1, 'Written Exam'),
(2, 'Presentation');

create table if not exists assignments_join_choices_test (
	ajct_id serial primary key,
	choice_id integer,
	assignment_id integer
);

insert into assignments_join_choices_test (choice_id, assignment_id) values
(1,1),
(1,2),
(2,1);

select a.assignment_type, c.choice_subject, c.choice_code
from assignments_join_choices_test ajc
inner join assignments_test a
on ajc.assignment_id = a.assignment_id
inner join choices_test c
on ajc.choice_id = c.choice_id;

delete from assignments_join_choices_test where choice_id = 1 and assignment_id = 2;


select a.assignment_type 
from assignments_test a
inner join choices_test c
ON c.assignment_ids @> '{1}';

select testv1();
select unnest(assignment_ids) from choices_test;