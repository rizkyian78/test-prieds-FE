/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */

const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const handlebars = require("handlebars");
const moment = require("moment");

async function GeneratePDF(data, callback, orientation = "portrait") {
  try {
    const saveTo = path.resolve(
      `${__dirname}`,
      `../public/pdf/${data.result.nama}_${moment(
        data.result.createdAt
      ).unix()}.pdf`
    );

    const file = await fs.readFileSync(
      path.resolve(__dirname, `../views/index.html`),
      "utf8"
    );
    data.total = data.total + 1;
    const templateCompile = handlebars.compile(file);
    const html = templateCompile({
      ...data.result._doc,
      total: data.total,
      date: moment(data.result.createdAt).format("L"),
      time: moment(data.result.createdAt).format("LTS"),
    });

    const options = {
      format: "A4",
      orientation,
      base: `file://${path.resolve(__dirname, "../public/pdf")}`,
    };

    pdf.create(html, options).toFile(saveTo, function (err, res) {
      if (typeof callback === "function") {
        callback(err, res);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

const Pdf = {
  GeneratePDF,
};

module.exports = Pdf;
