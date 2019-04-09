INSERT INTO project (name) VALUES ('Project 1');
INSERT INTO project (name) VALUES ('Project 2');
INSERT INTO project (name) VALUES ('Project 3');
INSERT INTO project (name) VALUES ('Project 4');
INSERT INTO project (name) VALUES ('Project 5');
INSERT INTO project (name) VALUES ('Project 6');
INSERT INTO project (name) VALUES ('Project 7');
INSERT INTO project (name) VALUES ('Project 8');
INSERT INTO project (name) VALUES ('Project 9');
INSERT INTO project (name) VALUES ('Project 10');
INSERT INTO project (name) VALUES ('Project 11');
INSERT INTO project (name) VALUES ('Project 12');

INSERT INTO task (name, completed, project_id) VALUES ('Task 1', false, (SELECT project_id FROM project WHERE name = 'Project 1'));
INSERT INTO task (name, completed, project_id) VALUES ('Task 2', false, (SELECT project_id FROM project WHERE name = 'Project 1'));
INSERT INTO task (name, completed, project_id) VALUES ('Task 3', false, (SELECT project_id FROM project WHERE name = 'Project 3'));
INSERT INTO task (name, completed) VALUES ('Task 4', false);