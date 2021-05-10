// purpose: to add req-res pair to DB

const express = require("express");
const router = express.Router();

const fs = require("fs");
const yaml = require("js-yaml");

// req res model
const RRpair = require("../models/RRpair");

// project model
const Project = require("../models/Project");

// all apis related to project management
const projectAPI = require("./api/project");
const toolsAPI = require("./api/tools");

const scan = require("./scan");

const projectSelected = (req) => {
    if (req.cookies === undefined || req.cookies["projectID"] === undefined) {
        return false;
    }
    return true;
};

router.use("/projects", projectAPI);
router.use("/tools", toolsAPI);

const template_ids = ["scanner-templates/x-frame-options.yaml"];

const issues = {
    "x-frame-options": [],
};

const hostPresent = (array, host) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].request.hostname === host) {
            return true;
        }
    }
    return false;
};

const scanner = (request, response, eventEmitter) => {
    try {
        // read the scanner template

        var templates = [];

        for (var i = 0; i < template_ids.length; i++) {
            let fileContents = fs.readFileSync(template_ids[i], "utf8");
            let template = yaml.loadAll(fileContents);

            template = template[0];

            const issue = scan(request, response, template);

            if (issue !== undefined) {
                if (template.uniqueTo === "host") {
                    if (hostPresent(issues[`${issue}`], request.hostname)) {
                        // issue duplicate
                        console.log("Duplicate issue!");
                        return;
                    }
                    // add to object x-frame-options
                }

                const detailedIssue = {
                    request: request,
                    response: response,
                    template: template,
                };

                issues[`${issue}`].push(detailedIssue);
                console.log("New issue");
                eventEmitter.emit("newIssue", issues);
            }
        }
    } catch (e) {
        console.log("Error while reading template files");
    }
};

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

    if (req.body.response.header["Set-Cookie"] !== null) {
        req.body.response.setCookie = req.body.response.header["Set-Cookie"];
        req.body.response.header["Set-Cookie"] = "true";
    }

    // emit event
    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("newRRpair", req.body);

    scanner(req.body.response, req.body.request, eventEmitter);

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
            console.log("Error while adding rr pair!", err);
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
