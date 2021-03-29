const router = require("express").Router();
const { stdout, stderr } = require("process");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const Tool = require("../../models/Tool");

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

    tool.save()
        .then((item) => {
            res.status(201).send({ message: "Created tool!" });
        })
        .catch((err) => {
            console.log("Error", err);
            res.status(500).send({ message: "An error occured" });
        });
});

module.exports = router;
