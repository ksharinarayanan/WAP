// intended to add req-res pair to DB

const express = require("express");
const router = express.Router();

// req res model
const RRpair = require("../models/RRpair");

// project model
const Project = require("../models/Project");

// all apis related to project management
const projectAPI = require("./api/project");
const toolsAPI = require("./api/tools");

const projectSelected = (req) => {
  if (req.cookies === undefined || req.cookies["projectID"] === undefined) {
    return false;
  }
  return true;
};

router.use("/projects", projectAPI);
router.use("/tools", toolsAPI);

// add request-response pair to a particular project!
router.post("/add/RRpair/", (req, res) => {
  // return 401 if a project is not selected!
  if (projectSelected(req) === false) {
      console.log("Project not selected!");
    res.status(401).json({ message: "No project is currently selected!" });
    return;
  }

  if (
    req.body.request.hostname === "localhost" &&
    req.body.request.port === 9000
  ) {
    return;
  }

  const projectID = req.cookies["projectID"];

  if (req.body.response.header['Set-Cookie'] !== null){
      req.body.response.setCookie = req.body.response.header['Set-Cookie'];
      req.body.response.header['Set-Cookie'] = "true";
  }

  // emit event
  const eventEmitter = req.app.get("eventEmitter");
  eventEmitter.emit("newRRpair", req.body);

  Project.updateOne(
    { _id: projectID },
    {
      $push: { logs: req.body },
    }
  )
    .then((item) => {
      res.status(200).json({ message: "Added!" });
    })
    .catch((err) => {
      console.log("Error while adding rr pair!!!!!!!!!!");
      res.status(500).json({ message: "Failed to add the RR pair!" });
    });
});

// fetch all the request-response pair for a particular project!
router.get("/get/RRpair/", (req, res) => {
  if (projectSelected(req) === false) {
    res.status(401).json({ message: "No project is currently selected!" });
    return;
  }

  const projectID = req.cookies["projectID"];

  Project.findOne({ _id: projectID })
    .then((project) => res.status(200).json({ project: project }))
    .catch((err) => {
      console.log("Err", err);
      res.status(500).json({ message: "Operation failed!" });
    });
});

module.exports = router;
