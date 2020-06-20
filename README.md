# blip

> An app for testing business websites for speed, mobile-friendliness, security and HTML5 compatibility. Find businesses around a location and test their websites en masse, or just test one website by URL.

Just wanna use it? Go to [blip.website](https://blip.website).

## Build Setup

Uses Vue CLI.

``` bash
# install dependencies
npm install

# serve for development
npm run serve

# build for production
npm run build
```

## Roadmap

- Think about using `<slot>`s for each `.test-container` using component
- Externalise jQuery and bootstrap JS in webpack to save on bandwidth for users and me (see [Webpack doc](https://webpack.github.io/docs/library-and-externals.html))
- Implement service worker for offline-first support with nice 'you are offline' messaging to user.
- Properly use lodash or drop it.
- Each radar result add a "Go to details >" link to laser page?
- Wrap bootstrap classes into my own semantic classes with `extend`
- Include a web accessibility test. Find a free one and use it, or host [AATT by paypal](https://github.com/paypal/AATT) somewhere and use that...
- Stand up a Google Lighthouse instance somewhere and use that instead of Google PageSpeed Insights
