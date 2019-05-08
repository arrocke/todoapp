'use strict';
const path = require('path')
const crypto = require("crypto")

// This transformer transforms css files into a javascript module that
// compiles the styles using postcss in the browser and then injects them into the document.
// It returns a promise so the setup script should use a beforeAll hook to wait for the styles to load.
module.exports = {
  process(src, filename) {
    return `
      const postcss = require('postcss')
      const postcssrc = require('postcss-load-config')
      const src = \`${src}\`
      const filename = \`${filename}\`
      const config = \`${path.resolve(__dirname, '../postcss.config.js')}\`
      
      // Load postcss config.
      module.exports = postcssrc({}, config)
        .then(({ plugins, options }) => 
          // Compile CSS.
          postcss(plugins)
            .process(src, { ...options, from: filename })
        )
        .then(({ css }) =>
          // Wait until after timeout to inject css into the document
          // because for some reason document is not defined immediately.
          new Promise((resolve) =>
            setTimeout(() => {
              const style = document.createElement('style')
              style.type = 'text/css'
              style.appendChild(document.createTextNode(css))
              document.head.appendChild(style)
              resolve()
            })))
    `
  },
  getCacheKey(src, filename) {
    return crypto.createHash('md5')
      .update(filename)
      .update("\0", "utf8")
      .update(src)
      .digest('HEX')
  }
}
