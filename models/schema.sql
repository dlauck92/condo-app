-- DROP DATABASE IF EXISTS chap_db;
-- -- Creates the "chap_db" database 
-- CREATE DATABASE chap_db;

 USE chap_db;

-- Values for testing purposes
 INSERT INTO Users (name, username, about, email, password, last_login, status, createdAt, updatedAt)
 VALUES ('David McLaughlin', 'tlmclaughlin1966@gmail.com', 'owner', 'tlmclaughlin1966@gmail.com', 'password','2019-02-11 12:11:22.111','active','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111');


 INSERT INTO Posts (post_title, post_body, createdAt, updatedAt)
 VALUES ('Board Meeting on 3-16-19', 'Meeting will be held at Drews unit #252 at 6:30pm. Topics are fixing loose siding and basement leak at unit #302', '2019-02-11 12:11:22', '2019-02-11 12:11:22');


 INSERT INTO WorkOrders (ticket_title, ticket_body, unit_num, complete,createdAt, updatedAt)
 VALUES ('Work order 2','Pipe leaking ',250,'1','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111');


 INSERT INTO Announcements (announcement_title, announcement_body,createdAt, updatedAt)
 VALUES ('Notice To All Residents','Fertilizer will be applied to the lawn on 5-10-19','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111');


 