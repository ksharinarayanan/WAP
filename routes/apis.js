// intended to add req-res pair to DB

const express = require("express");
const router = express.Router();

// req res model
const RRpair = require("../models/RRpair");

// project model
const Project = require("../models/Project");

// all apis related to project management
const projectAPI = require("./api/project");

const projectSelected = (req) => {
  if (req.cookies === undefined || req.cookies["projectName"] === undefined) {
    return false;
  }
  return true;
};

router.use("/projects", projectAPI);

// add request-response pair to a particular project!
router.post("/add/RRpair/", (req, res) => {
  // return 401 if a project is not selected!
  if (projectSelected(req) === false) {
    res.status(401).json({ message: "No project is currently selected!" });
    return;
  }

  const projectName = req.cookie["projectName"];
  //
  // const query = {"name": projectName}
  //
  //
  // .then(item => console.log("Updated!"))
  // .catch(err => console.log("Failed updating", err))

  // var rrpair = new RRpair(req.body);
  //
  // rrpair
  //   .save()
  //   .then((item) => {
  //     console.log("Item saved to DB!");
  //   })
  //   .catch((err) => {
  //     console.log("unable to save to database", err);
  //   });
});

// fetch all the request-response pair for a particular project!
router.get("/get/RRpair/", (req, res) => {
  if (projectSelected(req) === false) {
    res.status(401).json({ message: "No project is currently selected!" });
    return;
  }

  const projectName = req.cookies["projectName"].name;

  console.log(projectName);

  Project.findOne({ name: projectName })
    .then((project) => res.status(200).json({ project: project }))
    .catch((err) => {
      console.log("Err", err);
      res.status(500).json({ message: "Operation failed!" });
    });
});

module.exports = router;
