const withMDX = require("@next/mdx")();
module.exports = withMDX({
  pageExtensions: ["js", "mdx"],
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
});
