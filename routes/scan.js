module.exports = (request, response, template) => {
  const temp = request;
  request = response;
  response = temp;
  const header = (presence, location) => {
    const headers = response.header;
    const headerKey = template["header-key"];
    const headerValue = template["header-value"].toString();

    if (presence === true && location === "response") {
      if (headers[`${headerKey}`] === undefined) {
        console.log("Undefined!");
        return undefined;
      }
      if (headers[`${headerKey}`].toLowerCase() === headerValue.toLowerCase()) {
        console.log("Issue!");
        return template.id;
      } else {
        console.log(
          "Not equal",
          headers[`${headerKey}`].toLowerCase(),
          "and",
          headerValue.toLowerCase()
        );
      }
    } else if (presence === false && location === "response") {
      if (headers[`${headerKey}`] === undefined) {
        return template.id;
      }
    }

    return undefined;
  };

  if (template.type === "header") {
    return header(template.presence, template.location);
  }
};
