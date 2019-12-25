const AMDF = require("./detectors/amdf");
const ACF2PLUS = require("./detectors/acf2plus")

const frequencies = require("./tools/frequencies");

module.exports = {
  ACF2PLUS,
  AMDF,
  frequencies,
};
