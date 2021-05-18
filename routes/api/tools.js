const router = require("express").Router();
const { stdout, stderr } = require("process");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const Tool = require("../../models/Tool");

// contains endpoints /api/tools/*

// TEST: execute CHAOS command!
router.post("/subfinder/", (req, res) => {
  let output;

  async function ls() {
    let { stdout, stderr } = await exec("subfinder -d guvi.in -silent");
    stdout = stdout.split("\n");

    console.log("OUTPUT", stdout);
    console.log("stderr:\n", stderr);
    res.status(200).send(stdout);
  }
  ls();
});

// add a tools
router.post("/add/", (req, res) => {
  // {name: "chaos", command: "chaos -d soundcloud.com"}
  const tool = new Tool(req.body);

  tool
    .save()
    .then((item) => {
      res.status(201).send({ message: "Created tool!" });
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).send({ message: "An error occured" });
    });
});

router.post("/execute/", (req, res) => {
  const command = req.body.command;

  async function ls() {
    let { stdout, stderr } = await exec(command);
    //stdout = stdout.split('\n');

    res.status(200).send(stdout);
  }
  ls();
});

router.get("/get/", (req, res) => {
  Tool.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/delete/", (req, res) => {
  const tool = req.body.tool;

  Tool.deleteOne(tool)
    .then((item) => {
      res.status(200).send({ message: `Deleted ${tool.name}` });
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred!" });
      console.log("Error", err);
    });
});

module.exports = router;
