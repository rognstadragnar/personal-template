const about = require("./partials/about.js")
const portfolio = require("./partials/portfolio.js")
const resume = require("./partials/resume.js")

console.log(about, portfolio, resume)

module.exports = {
  title: "yes",
  name: "name",
  sections: {
    about,
    portfolio,
    resume,
  }
}