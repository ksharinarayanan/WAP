const router = require("express").Router();

const ProjectName = require("../../models/ProjectName");
const Project = require("../../models/Project");

// initialize an empty project
const addEmptyProject = (project) => {
  const data = {
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

// add new project name
router.post("/add/", (req, res) => {
  const projectName = new ProjectName(req.body);

  projectName
    .save()
    .then((item) => {
      res.cookie("projectName", projectName);

      addEmptyProject(projectName);

      res.status(200).json({ message: "Project saved!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to save!" });
    });
});

// fetches all the project names
router.get("/fetch/allNames/", (req, res) => {
  ProjectName.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
