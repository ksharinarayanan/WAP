const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RRpairSchema = new Schema({
  request: {
    hostname: {
      type: String,
    },
    port: {
      type: Number,
    },
    path: {
      type: String,
    },
    headers: {
      type: Map,
      of: String,
    },
    body: {
      type: String,
    },
    method: {
      type: String
    },
    protocol: {
      type: String
    }
  },

  response: {
    statusCode: {
      type: Number,
    },
    hostname: {
      type: String,
    },
    header: {
      type: Map,
      of: String,
    },
  },
});

module.exports = RRpair = mongoose.model("RRpair", RRpairSchema);
