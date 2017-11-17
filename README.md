# blip

> An app for testing business websites for speed, mobile-friendliness and security. Find businesses around a location and test their websites en masse, or just test one website by URL.

Just wanna use it? Go to [blip.azureedge.net](https://blip.azureedge.net).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Potential Roadmap
- Fix issue with ishtml5 tester getting weird results (forbidden, etc)
- Properly use lodash or drop it.
- Include a web accessibility test. Find a free one and use it, or host [AATT by paypal](https://github.com/paypal/AATT) somewhere and use that...
- Externalise jQuery and bootstrap JS in webpack to save on bandwidth for users and me (see [Webpack doc](https://webpack.github.io/docs/library-and-externals.html))
- Upgrade to PWA Vue template or latest webpack template.
- Scrape business' email from business' website?
- Export results to CSV.
