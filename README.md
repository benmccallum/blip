# blip

> An app for testing business websites for speed, mobile-friendliness and security. Find businesses around a location and test their websites en masse, or just test one website by URL.


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
- Purge Azure CDN on kudu deploy in deploy.cmd (see [REST API](https://docs.microsoft.com/en-us/rest/api/cdn/Endpoints/PurgeContent)). May require swapping over to Verizon CDN as Akamai CDN doesn't support wildcard purge (see [user request](https://feedback.azure.com/forums/169397-cdn/suggestions/16800949-make-full-purge-and-wildcard-purge-for-akamai-cdn))
- Externalise jQuery and bootstrap JS in webpack to save on bandwidth for users and me (see [Webpack doc](https://webpack.github.io/docs/library-and-externals.html))
- Scrape business' email from website?
- Export results to CSV.
