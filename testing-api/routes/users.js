var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
const pdf = require("../bin/pdf");
const moment = require("moment");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/customer-input", async function (req, res, next) {
  const result = await Customer.create(req.body);
  let path = "";
  const total = await Customer.find();
  pdf.GeneratePDF({ result, total: total.length }, async function (err, res) {
    path = res.filename.split("/").pop();
    await result.update({
      path: path.replace("/public", ""),
    });
  });

  return res.status(200).json({
    data: result,
    path: `http://localhost:4000/${result.nama}_${moment(
      result.createdAt
    ).unix()}.pdf`,
  });
});

router.get("/customer-input", async function (req, res, next) {
  const data = await Customer.find();
  return res.status(200).json(data);
});

module.exports = router;
