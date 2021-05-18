const router = require("express").Router();
const axios = require("axios");

const ProjectName = require("../../models/ProjectName");
const Project = require("../../models/Project");

const projectSelected = (req) => {
  if (req.cookies === undefined || req.cookies["projectID"] === undefined) {
    return false;
  }
  return true;
};

// initialize an empty project
const addEmptyProject = (project, id) => {
  const data = {
    _id: id,
    name: project.name,
  };
  const projectData = new Project(data);

  projectData
    .save()
    .then((item) => {
      console.log("Created empty project");
    })
    .catch((err) => console.log("Failed initilizaing project", err));
};

// add new project
router.post("/add/", (req, res) => {
  const projectName = new ProjectName(req.body);

  projectName
    .save()
    .then(async (item) => {
      const projectID = item["id"];
      addEmptyProject(projectName, item["_id"]);

      res.cookie("projectID", projectID);

      axios
        .post("http://localhost:6500/switchProject/", {
          projectID: projectID,
        })
        .catch((err) => {
          console.log("Error", err);
        });

      res.status(200).json({ projectID: projectID });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to save!" });
    });
});

// deletes a project
router.post("/delete/", (req, res) => {
  const projectID = req.body.projectID;

  ProjectName.deleteOne({ _id: projectID })
    .then((item) => {
      Project.deleteOne({ _id: projectID })
        .then((item) =>
          res.status(200).send({ message: `${projectID} deleted!` })
        )
        .catch((err) => console.log("Error", err));
    })
    .catch((err) => console.log("Error", err));
});

// fetches all the project meta data
router.get("/fetch/all/", (req, res) => {
  ProjectName.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// fetch the current project details
router.get("/fetch/details/", (req, res) => {
  if (projectSelected(req) === false) {
    res.status(401).json({ message: "No project is currently selected!" });
    return;
  }

  const projectID = req.cookies["projectID"];

  Project.findOne({ _id: projectID })
    .then((project) => {
      res.status(200).json({ project: project });
    })
    .catch((err) => {
      console.log("Err", err);
      res.status(500).json({ message: "Operation failed!" });
    });
});

// switch working project
router.post("/switch/", (req, res) => {
  const newProjectID = req.body.projectID;
  axios
    .post("http://localhost:6500/switchProject/", {
      projectID: newProjectID,
    })
    .catch((err) => {
      console.log("Error", err);
    });
  res.cookie("projectID", newProjectID).send({
    message: "Switched to " + newProjectID,
  });
});

module.exports = router;
