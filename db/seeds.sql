USE department_db;


INSERT INTO department (department_name)
VALUES ('Sales'),
("IT"),
("Finance"),
("Legal");
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 2, 1),
("Kevin", "Tupik", 3, NULL),
("Kunal", "Singh", 4, 4),
("Malia", "Brown", 4, 4),
("Sarah", "Lourd", 4, 4),
("Tom", "Allen", 4, 4),
("Tina", "Lee", 4, 4),
("Mark", "Taylor", 4, 4),
("Katie", "Smith", 4, 4);

