module.exports = (request, response, template) => {
    template = template[0];

    const header = (presence, location) => {
        const headers = response.headers;
        const headerKey = template["header-key"].toLowerCase();
        const headerValue = template["header-value"].toLowerCase();

        if (presence === true && location === "response") {
            if (
                headers[`${headerKey}`].toLowerCase() === headerKey &&
                headers["${headerValue}"].toLowerCase() === headerValue
            ) {
                console.log("Issue!!!!!!!!!!!!!");
            }
        } else if (presence === false && location === "response") {
            if (headers[`${headerKey}`] === undefined) {
                return "x-frame-options";
            }
        }
    };

    if (template.type === "header") {
        header(template.presence, template.location);
    }
};
