const axios = require("axios");

function addRRpair(RRpair) {
  const request = RRpair.request;
  const response = RRpair.response;

  axios.post("http://localhost:4000/api/add/RRpair", {
    request: request,
    response: response,
  });
}

function isImage(request, response) {
  const accept = request.headers["Accept"];
  const content_type = response.header["Content-Type"];
  if (
    (accept !== undefined && accept.substr(0, 5) === "image") ||
    (content_type !== undefined && content_type.substr(0, 5) === "image")
  ) {
    return true;
  }
  return false;
}

module.exports = {
  summary: "a rule to hack response",
  *beforeSendResponse(requestDetail, responseDetail) {
    const newResponse = responseDetail.response;

    const dont_intercept = ["image/jpeg", "image/png", "image/webp"];

    const parsedRequest = {
      ...requestDetail.requestOptions,
      protocol: requestDetail.protocol,
      url: requestDetail.url,
    };

    // if (checkOccurence(newResponse.header["Content-Type"], dont_intercept)) {
    if (isImage(parsedRequest, newResponse)) {
      return new Promise((resolve, reject) => {
        resolve({ response: newResponse });
      });
    }

    const body = newResponse.body.toString();
    newResponse.body = body;

    const RRpair = {
      request: parsedRequest,
      response: newResponse,
    };

    addRRpair(RRpair);

    return new Promise((resolve, reject) => {
      resolve({ response: newResponse });
    });
    // }
  },

  *beforeSendRequest(requestDetail) {
    var input = requestDetail;
  },
};
