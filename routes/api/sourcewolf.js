const router = require("express").Router();

const util = require("util");
const exec = util.promisify(require("child_process").exec);

router.post("/single/", (req, res) => {
    let endpoint = req.body.endpoint;

    async function execute() {
        let { stdout, stderr } = await exec(
            `python3 sourcewolf/sourcewolf.py -u ${endpoint}`
        );
        // console.log("OUTPUT", stdout);
        console.log("stderr:\n", stderr);
        res.status(200).json({ output: stdout });
    }
    execute();
});

router.post("/bruteforce/", (req, res) => {
    const endpoint = req.body.fuzzURL;
    const wordlist = req.body.wordlist;

    async function bruteforce() {
        let { stdout, stderr } = await exec(
            `python3 sourcewolf/sourcewolf.py -b ${endpoint} -w ${wordlist}`
        );
        console.log("OUTPUT", stdout);
        console.log("stderr:\n", stderr);
        res.status(200).json({ output: stdout });
    }
    bruteforce();
});

module.exports = router;
