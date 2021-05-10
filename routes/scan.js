module.exports = (request, response, template) => {
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

        return undefined;
    };

    if (template.type === "header") {
        return header(template.presence, template.location);
    }
};
