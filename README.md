# blip

> An app for testing business websites for speed, mobile-friendliness, security and HTML5 compatibility. Find businesses around a location and test their websites en masse, or just test one website by URL.

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

## Roadmap

### Must dos

- Google AdSense submission + approval
- Ads (WIP)
- Each radar result add a "Go to detais >" link to laser page?
- Externalise jQuery and bootstrap JS in webpack to save on bandwidth for users and me (see [Webpack doc](https://webpack.github.io/docs/library-and-externals.html))
- Upgrade to PWA Vue template or latest webpack template.
- Implement service worker for offline-first support with nice 'you are offline' messaging to user.
- Fix issue with ishtml5 tester getting weird results (forbidden, etc)
- Properly use lodash or drop it.


### Nice to haves

- Wrap bootstrap classes into my own semantic classes with `extend`
- Validate that passing place into mutation/action and editing off that is good practice.
- Include a web accessibility test. Find a free one and use it, or host [AATT by paypal](https://github.com/paypal/AATT) somewhere and use that...
- If IsHtml5 says the site is down, cancel axios requests for that place too (requires restructure of cancellation tokens and may not be worth it...)
- Scrape business' email from business' website?
- Offer export of results to CSV if do-able client side.
