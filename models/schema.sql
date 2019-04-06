
 -- DROP DATABASE IF EXISTS condo_App_db;
-- --  -- Creates the "condoApp_db" database 
-- CREATE DATABASE condoApp_db;

USE condoApp_db;

-- Values for testing purposes
-- INSERT INTO Users (userName, email, password, lastLogin, status, user_profile_pic,first_name,last_name,address,phone,owner,boardManager,tentant,createdAt, updatedAt)
-- VALUES ('tlmclaughlin1966@gmail.com', 'tlmclaughlin1966@gmail.com', 'password','2019-02-11 12:11:22.111','active', 'pic.jpeg','David',' Mclaughlin','248 Westberry circle','330-111-1111','1','1','1','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111');


-- INSERT INTO Posts (post_title, post_body, createdAt, updatedAt, UserId)
-- VALUES ('Board Meeting on 3-16-19', 'Meeting will be held at Drews unit #252 at 6:30pm. Topics are fixing loose siding and basement leak at unit #302', '2019-02-11 12:11:22', '2019-02-11 12:11:22', '1');


INSERT INTO WorkOrders (ticket_title, ticket_body, unit_num, complete,createdAt, updatedAt,UserId)
VALUES ('Work order','Roof leaking in front of unit',248,'1','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111',1);


-- INSERT INTO Announcements (announcement_title, announcement_body,createdAt, updatedAt,UserId)
-- VALUES ('Notice To All Residents','Fertilizer will be applied to the lawn on 5-10-19','2019-02-11 12:11:22.111','2019-02-11 12:11:22.111','1');


--  