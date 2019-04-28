var db = require("../models");

module.exports = function (app) {


  //create a new work order 
  app.post("/CreateWorkOrder/:id", async function (req, res) {
    const UserId = await req.params.id;
    console.log('line 9: UserId',UserId);
     db.WorkOrder.create({
      UserId: req.body.UserId,
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete
    }).then(newWorkOrder => {
      res.json(newWorkOrder);
      console.log("new work order", newWorkOrder);
    }).catch(err => res.send(err)
    );
  });

  //update open work order by id
  app.put("/UpdateWorkOrder/:id", function (req, res) {
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

  //find all closed workers by User id
  app.get("/ClosedWorkOrder/:id", function (req, res) {
    UserId = req.params.id;
    db.WorkOrder.findAll({
      id: req.body.id,
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete,
      where: {
        UserId: UserId,
        complete: true
      },
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(ClosedWorkOrder => {
      res.json(ClosedWorkOrder);
      console.log("Closed work orders", ClosedWorkOrder);
    }).catch(err => res.send(err)
    );
  });
  // find all open work orders by id for administrator role only
  app.get("/AllOpenWorkOrders/:id", async(req, res)=> {
    
    const User = await db.User.findOne({ where: { id: req.params.id, role: 'admin' } });
    console.log('line 67',User);
    if (User !== null) {
      db.User.findAll({
        include: [
          {
            model: db.WorkOrder,
            where: {
              complete: false,
            },
          }
        ],
        order: [
          ["createdAt", "DESC"]
        ],
      }).then(Users => {
        const resObj = Users.map(User => {
          return Object.assign(
            {},
            {
              name: User.name,
              about: User.about,
              role: User.role,
              email: User.email,
              WorkOrder: User.WorkOrders.map(WorkOrder => {
                return Object.assign(
                  {},
                  {
                    ticket_id: WorkOrder.id,
                    unit_num: WorkOrder.unit_num,
                    ticket_title: WorkOrder.ticket_title,
                    ticket_body: WorkOrder.ticket_body,
                    createdAt: WorkOrder.createdAt,
                    updatedAt: WorkOrder.updatedAt
                  })
              })
            })
        });
        res.json(resObj);
        // console.log("All Open Work Orders", resObj);
      }).catch(err => res.send(err)
      );
    } else {
      //add alert*****
      results = console.log('You do not have permission to view these files. Contact your administrator to change your role.');
      res.redirect("/Form");
    };
  });

  // find all Closed/Completed work orders by Id for Administrator role only
  app.get("/AllClosedWorkOrders/:id" ,async(req, res)=> {
    
    const User = await db.User.findOne({ where: { id: req.params.id, role: 'admin' } });
    console.log('line 118',User);
    if (User !== null) {
      db.User.findAll({
        include: [
          {
            model: db.WorkOrder,
            where: {
              complete: true,
            },
          }
        ],
        order: [
          ["createdAt", "DESC"]
        ],
      }).then(Users => {
        const resObj = Users.map(User => {
          return Object.assign(
            {},
            {
              name: User.name,
              about: User.about,
              role: User.role,
              email: User.email,
              WorkOrder: User.WorkOrders.map(WorkOrder => {
                return Object.assign(
                  {},
                  {
                    ticket_id: WorkOrder.id,
                    unit_num: WorkOrder.unit_num,
                    ticket_title: WorkOrder.ticket_title,
                    ticket_body: WorkOrder.ticket_body,
                    createdAt: WorkOrder.createdAt,
                    updatedAt: WorkOrder.updatedAt
                  })
              })
            })
        });
        res.json(resObj);
        // console.log("All Closed Work Orders", resObj);
      }).catch(err => res.send(err)
      );
    } else {
      results = console.log('You do not have permission to view these files. Contact your administrator to change your role.');
      res.redirect("/Form");
    };
  });

  // find all open work orders by unit number
  app.get("/OpenWorkOrder/:id", function (req, res) {
    UserId = req.params.id;
    db.WorkOrder.findAll({

      id: req.body.id,
      ticket_title: req.body.ticket_title,
      ticket_body: req.body.ticket_body,
      unit_num: req.body.unit_num,
      complete: req.body.complete,
      where: {
        UserId: UserId,
        complete: false
      },
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(OpenWorkOrder => {
      res.json(OpenWorkOrder);
      console.log("Open Work Orders", OpenWorkOrder);
    }).catch(err => res.send(err)
    );
  });
  //find one work order last entered by user id
  app.get("/FindOneWorkOrder/:id", function (req, res) {
    UserId = req.params.id;
    var lastEntry = "";
    db.WorkOrder.max("createdAt").then(max => {
      lastEntry = max;
      return lastEntry;
    }).then(entry => {
      db.WorkOrder.findOne({
        id: req.body.id,
        ticket_title: req.body.ticket_title,
        ticket_body: req.body.ticket_body,
        unit_num: req.body.unit_num,
        complete: req.body.complete,
        where: {
          createdAt: entry,
          UserId: UserId,
        }
      }).then(findLast => {
        res.json(findLast);
      });
    });
  });
  // Register a new user
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
  // Login user
  app.post("/user/login", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }

    }).then(newUser => {
      res.json(newUser);
      // console.log("apiRoutes sends logged in", newUser);
    }).catch(err => res.send(err)
    );
  });

  // app.get("/user", function (req, res) {
  //   db.User.findOne({
  //     where: {
  //       username: req.body.username
  //     }
  //   }).then(isUser => {
  //     res.json(isUser);
  //     console.log("new user", isUser);
  //   }).catch(err => res.send(err)
  //   );
  // });

}