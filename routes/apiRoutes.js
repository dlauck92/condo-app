var db = require("../models");
module.exports = function (app, ) {


        //create a workorder
    app.post("/api/CreateWorkOrder", function (req, res) {
        db.WorkOrder.create({
          ticket_title: req.body.ticket_title,
          ticket_body: req.body.ticket_body,
          unit_num: req.body.unit_num,
          complete: false
          
        }).then(newWorkOrder => {
          res.json(newWorkOrder);
    
        });
      });
        //update open workorder
    //   app.put("/api/WorkOrder/:id", function(req, res) {
    //     db.WorkOrder.update({
        
    //         ticket_title: req.body.ticket_title,
    //         ticket_body: req.body.ticket_body,
    //         unit_num: req.body.unit_num,
    //         complete: req.body.complete
    //     }, {
    //       where: {
    //         id: req.body.id
    //       }
    //     }).then(updateWorkOrder => {
    //       res.json(updateWorkOrder);
    //         // console.log(updateWorkOrder);
    //     });
    //   });
        //find all pending workers
      app.get("/api/ClosedWorkOrder/:unit_num", function (req, res) {
        db.WorkOrder.findAll({

            ticket_title: req.body.ticket_title,
            ticket_body: req.body.ticket_body,
            unit_num: req.body.unit_num,
            complete: req.body.complete
        }, {
            where: {
                unit_num: req.body.unit_num,
                complete: true
            }
        }).then(OpenWorkOrder => {
          res.json(OpenWorkOrder);
        });
      });

      app.get("/api/OpenWorkOrder/:unit_num", function (req, res) {
        db.WorkOrder.findAll({

            ticket_title: req.body.ticket_title,
            ticket_body: req.body.ticket_body,
            unit_num: req.body.unit_num,
            complete: req.body.complete
        }, {
            where: {
                unit_num: req.body.unit_num,
                complete: false
            }
        }).then(OpenWorkOrder => {
          res.json(OpenWorkOrder);
        });
      });
  

};