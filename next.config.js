const withMDX = require("@next/mdx")();
module.exports = withMDX({
  pageExtensions: ["js", "mdx"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
});
