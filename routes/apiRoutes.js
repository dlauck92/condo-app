var db = require("../models");

module.exports = function (app, ) {


  //create a new work order 
  app.post("/CreateWorkOrder/:id", function (req, res) {
    db.WorkOrder.create({
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: false
    }).then(newWorkOrder => {
      res.json(newWorkOrder);
      console.log("new work order", newWorkOrder);
    }).catch(err => res.send(err)
    );
  });

  //update open workorder by ticket title and unit number
  app.put("/UpdateWorkOrder/:ticket_title", function (req, res) {
    db.WorkOrder.update({
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete
    }, {
        where: {
          ticket_title: req.body.ticket_title,
          unit_num: req.body.unit_num,
          complete: false
        }
      }).then(updateWorkOrder => {
        res.json(updateWorkOrder);
        console.log("Update Work order", updateWorkOrder);
      }).catch(err => res.send(err)
      );
  });

  //find all closed workers by unit number
  app.get("/ClosedWorkOrder/:id", function (req, res) {
    db.WorkOrder.findAll({

      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete
    }, {
        where: {
          id: req.body.id,
          complete: true
        }
      }).then(ClosedWorkOrder => {
        res.json(ClosedWorkOrder);
        console.log("Closed work orders", ClosedWorkOrder);
      }).catch(err => res.send(err)
      );
  });

  // find all open work orders by unit number
  app.get("/OpenWorkOrder/:id", function (req, res) {

    db.WorkOrder.findAll({
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete
    }, {
        where: {
          id: req.body.id,
          complete: false
        }
      }).then(OpenWorkOrder => {
        res.json(OpenWorkOrder);
        console.log("Open Work Orders", OpenWorkOrder);
      }).catch(err => res.send(err)
      );
  });
  app.get("/api/FindOneWorkOrder/:ticket_title", function (req, res) {
    db.WorkOrder.findOne({ 
      where: { ticket_title: req.params.ticket_title 
      } 
    }).then(WorkOrder => {
      res.json(WorkOrder);
    });
  });

  app.post("/user", function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      
    }).then(newUser => {
      res.json(newUser);
      console.log("apiRoutes sends new user", newUser);
    }).catch(err => res.send(err)
    );
  });

  app.post("/user/login", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
      
    }).then(newUser => {
      res.json(newUser);
      console.log("apiRoutes sends logged in", newUser);
    }).catch(err => res.send(err)
    );
  });

  app.get("/user", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(isUser => {
      res.json(isUser);
      console.log("new user", isUser);
    }).catch(err => res.send(err)
    );
  });

};