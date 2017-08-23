export const googlePageSpeedResult = {
  'kind': 'pagespeedonline#result',
  'id': 'https://grazia.com.au/',
  'responseCode': 200,
  'title': 'Grazia Australia',
  'ruleGroups': {
    'SPEED': {
      'score': 50
    }
  },
  'pageStats': {
    'numberResources': 78,
    'numberHosts': 23,
    'totalRequestBytes': '14359',
    'numberStaticResources': 56,
    'htmlResponseBytes': '151898',
    'cssResponseBytes': '231203',
    'imageResponseBytes': '3753463',
    'javascriptResponseBytes': '1699779',
    'otherResponseBytes': '157853',
    'numberJsResources': 21,
    'numberCssResources': 2
  },
  'formattedResults': {
    'locale': 'en_US',
    'ruleResults': {
      'AvoidLandingPageRedirects': {
        'localizedRuleName': 'Avoid landing page redirects',
        'ruleImpact': 0.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Your page has no redirects. Learn more about {{BEGIN_LINK}}avoiding landing page redirects{{END_LINK}}.',
          'args': [
            {
              'type': 'HYPERLINK',
              'key': 'LINK',
              'value': 'https://developers.google.com/speed/docs/insights/AvoidRedirects'
            }
          ]
        }
      },
      'EnableGzipCompression': {
        'localizedRuleName': 'Enable compression',
        'ruleImpact': 0.4693,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Compressing resources with gzip or deflate can reduce the number of bytes sent over the network.'
        },
        'urlBlocks': [
          {
            'header': {
              'format': '{{BEGIN_LINK}}Enable compression{{END_LINK}} for the following resources to reduce their transfer size by {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/EnableCompression'
                },
                {
                  'type': 'BYTES',
                  'key': 'SIZE_IN_BYTES',
                  'value': '3.5KiB'
                },
                {
                  'type': 'PERCENTAGE',
                  'key': 'PERCENTAGE',
                  'value': '55%'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/images/logo.svg'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '2.2KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '58%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/images/grazia-logo.svg'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '51%'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      'LeverageBrowserCaching': {
        'localizedRuleName': 'Leverage browser caching',
        'ruleImpact': 5.336111111111111,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.'
        },
        'urlBlocks': [
          {
            'header': {
              'format': '{{BEGIN_LINK}}Leverage browser caching{{END_LINK}} for the following cacheable resources:',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/LeverageBrowserCaching'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': '{{URL}} (expiration not specified)',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://aamcftag.aamsitecertifier.com/aam.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} (expiration not specified)',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://aamcftag.aamsitecertifier.com/adserver.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://m.addthisedge.com/live/boost/ra-566f6d1f6e901a9a/_ate.track.config_resp'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '60 seconds'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://s7.addthis.com/js/300/addthis_widget.js'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '10 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://t.auditedmedia.org.au/?id=GTM-PK7PR2R'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '15 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://www.googletagmanager.com/gtm.js?id=GTM-KXL4H6'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '15 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://www.googletagservices.com/tag/js/gpt.js'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '15 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://connect.facebook.net/en_US/fbevents.js'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '20 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://connect.facebook.net/en_US/sdk.js'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '20 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://connect.facebook.net/signals/config/1605592966428386?v=2.7.19'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '20 minutes'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}} ({{LIFETIME}})',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://www.google-analytics.com/analytics.js'
                    },
                    {
                      'type': 'DURATION',
                      'key': 'LIFETIME',
                      'value': '2 hours'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      'MainResourceServerResponseTime': {
        'localizedRuleName': 'Reduce server response time',
        'ruleImpact': 0.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Your server responded quickly. Learn more about {{BEGIN_LINK}}server response time optimization{{END_LINK}}.',
          'args': [
            {
              'type': 'HYPERLINK',
              'key': 'LINK',
              'value': 'https://developers.google.com/speed/docs/insights/Server'
            }
          ]
        }
      },
      'MinifyCss': {
        'localizedRuleName': 'Minify CSS',
        'ruleImpact': 0.7599,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Compacting CSS code can save many bytes of data and speed up download and parse times.'
        },
        'urlBlocks': [
          {
            'header': {
              'format': '{{BEGIN_LINK}}Minify CSS{{END_LINK}} for the following resources to reduce their size by {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
                },
                {
                  'type': 'BYTES',
                  'key': 'SIZE_IN_BYTES',
                  'value': '7.4KiB'
                },
                {
                  'type': 'PERCENTAGE',
                  'key': 'PERCENTAGE',
                  'value': '24%'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': 'Minifying {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction) after compression.',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/css/grazia.min-ver-636076789122030845.css'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '7.4KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '24%'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      'MinifyHTML': {
        'localizedRuleName': 'Minify HTML',
        'ruleImpact': 0.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Your HTML is minified. Learn more about {{BEGIN_LINK}}minifying HTML{{END_LINK}}.',
          'args': [
            {
              'type': 'HYPERLINK',
              'key': 'LINK',
              'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
            }
          ]
        }
      },
      'MinifyJavaScript': {
        'localizedRuleName': 'Minify JavaScript',
        'ruleImpact': 0.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Your JavaScript content is minified. Learn more about {{BEGIN_LINK}}minifying JavaScript{{END_LINK}}.',
          'args': [
            {
              'type': 'HYPERLINK',
              'key': 'LINK',
              'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
            }
          ]
        }
      },
      'MinimizeRenderBlockingResources': {
        'localizedRuleName': 'Eliminate render-blocking JavaScript and CSS in above-the-fold content',
        'ruleImpact': 10.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Your page has {{NUM_SCRIPTS}} blocking script resources and {{NUM_CSS}} blocking CSS resources. This causes a delay in rendering your page.',
          'args': [
            {
              'type': 'INT_LITERAL',
              'key': 'NUM_SCRIPTS',
              'value': '7'
            },
            {
              'type': 'INT_LITERAL',
              'key': 'NUM_CSS',
              'value': '2'
            }
          ]
        },
        'urlBlocks': [
          {
            'header': {
              'format': 'None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML.'
            }
          },
          {
            'header': {
              'format': '{{BEGIN_LINK}}Remove render-blocking JavaScript{{END_LINK}}:',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/BlockingJS'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/layouts/system/VisitorIdentification.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://securepubads.g.doubleclick.net/gpt/pubads_impl_142.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://ajax.aspnetcdn.com/ajax/mvc/5.2.3/jquery.validate.unobtrusive.min.js'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/js/application.min-ver-636076789123124583.js'
                    }
                  ]
                }
              }
            ]
          },
          {
            'header': {
              'format': '{{BEGIN_LINK}}Use asynchronous versions{{END_LINK}} of the following scripts:',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/UseAsync'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://www.googletagservices.com/tag/js/gpt.js'
                    }
                  ]
                }
              }
            ]
          },
          {
            'header': {
              'format': '{{BEGIN_LINK}}Optimize CSS Delivery{{END_LINK}} of the following:',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://fonts.googleapis.com/css?family=EB+Garamond'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': '{{URL}}',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/css/grazia.min-ver-636076789122030845.css'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      'OptimizeImages': {
        'localizedRuleName': 'Optimize images',
        'ruleImpact': 93.4926,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'Properly formatting and compressing images can save many bytes of data.'
        },
        'urlBlocks': [
          {
            'header': {
              'format': '{{BEGIN_LINK}}Optimize the following images{{END_LINK}} to reduce their size by {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/OptimizeImages'
                },
                {
                  'type': 'BYTES',
                  'key': 'SIZE_IN_BYTES',
                  'value': '913KiB'
                },
                {
                  'type': 'PERCENTAGE',
                  'key': 'PERCENTAGE',
                  'value': '36%'
                }
              ]
            },
            'urls': [
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/headers/newsfeed/newsfeedtile_swim.ashx?as=1&w=1280&mw=1280&la=en&hash=FC6682A873C8ED4369029336CBB334B964899A75'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '381.9KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '76%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/justin-bieber/kjforadidas.ashx?as=1&w=1280&mw=1280&la=en&hash=E5EDD6551EE593F324879468B4C515E67BC3F15C'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '177.7KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '76%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/culture/1607/jennifer-aniston/jenniferanistontile.ashx?as=1&w=1280&mw=1280&la=en&hash=ED31E57B06BC9D3B2EB11724AB23C61DCDFE99C0'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '115.5KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '45%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/m/mollini-aw17/becks.ashx?as=1&w=1280&mw=1280&la=en&hash=D9CAC0102954BCFBAFCC2692E051E0DD3F2FA6F6'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '76.4KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '18%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1706/armani/hr_06_31201_flat_as_c.ashx?as=1&w=2000&mw=2000&la=en&hash=F5007C498400A33DCAF3C33260D9CDE96D978C3B'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '75KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '14%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/runway/couture-aw18/fendi/fendicouturefw17paris8836.ashx?as=1&w=1280&mw=1280&la=en&hash=46B7B99AF599F9D6509A64824837E4CFB28D701D'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '28.1KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '11%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1604/leonardo-dicaprio-girlfriends/screen-shot-20160420-at-20218-pm.ashx?as=1&w=250&mw=250&la=en&hash=3B2A6F5F4C93D383B152F84B3C1DA8E9CFE9581C'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '11.8KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '11%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1706/armani/hr_03_30868_flat_as_c.ashx?as=1&w=250&mw=250&la=en&hash=7381EC2503B3F16BC5346415E13BCFCC64F30B9F'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '5.7KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '25%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/m/mollini-aw17/marten.ashx?as=1&w=250&mw=250&la=en&hash=F0BA8B529957BE22B0EE4599D7874E46512CE524'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '5.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '24%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/fashion/1706/shoe-drop-series-tile/shoe-drop-series-tile.ashx?as=1&w=250&mw=250&la=en&hash=A7DCD29F494915F60322542A142C43A1063DC76F'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '5KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '28%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1707/cover-up/grazia-_1707_cover-up-tile/grazia-_1707_cover-up-tile2/grazia-_1707_cover-up-tile3.ashx?as=1&w=250&mw=250&la=en&hash=3E1D8A38A689C6611AFD88C18FB08B3F892F4915'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '4.8KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '32%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/runway/couture-aw18/fendi/fendicouturefw17paris8850.ashx?as=1&w=250&mw=250&la=en&hash=B031DF548C6993E8474E39989E55FD1744660B5D'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '4.6KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '17%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/runway/couture-aw18/maison-margiela/mm_artisanal_aw17_look21_gyg3397.ashx?as=1&w=250&mw=250&la=en&hash=641B2746DCC12E58E8CDF8F006885D0763EBA0A0'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '4.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '16%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/images/website/mondadorilogo.ashx?h=25&w=270&la=en&hash=592A97F9AAC62C313CA26CD85D994A907A9BB38E'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '2.8KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '62%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1706/deepest-catch/deepestcatch_grazia_1706_11.ashx?as=1&w=250&mw=250&la=en&hash=34B698BDEFDA1E1EDDDB2F4A52AF7E3FD160FA4C'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.9KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '12%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/series/david-jones-re-her-style/graziaxre_yanyan01_tile.ashx?as=1&w=250&mw=250&la=en&hash=DC1C55270F68C0533006A46A26630CE4A4E9A27E'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.6KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '12%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1702/natalie-portman-gives-birth/katyorlandosplitgrazia.ashx?as=1&w=250&mw=250&la=en&hash=502377811A952A2A524DB2045D9050EE3CA49AC7'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.4KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '14%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/email-campaign/grazia/grazialogo.ashx?h=72&w=194&la=en&hash=472F8B8FDEDF9D39426EDA330BB87F791E9B2169'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '50%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/fashion/1707/duskii-miami-swim/xpanoduskii.ashx?as=1&w=250&mw=250&la=en&hash=BEA8BAC2E61DCCB035AE8BF545977671D5D83759'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '14%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/fashion/1707/fendi-cruise-2017-look-book/tilenew.ashx?as=1&w=250&mw=250&la=en&hash=A6D660119D600AA78BB7D5CAC537BEC1E7F6DDD0'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '13%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/people/persona-grazia/c/laetitia-casta/personagrazia_lc.ashx?as=1&w=250&mw=250&la=en&hash=B89BA6C0937A607539A4B69BF4720D8C3484BBD7'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '1,014B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '13%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/people/persona-grazia/w/vera-wang/vera_wang_pg.ashx?as=1&w=250&mw=250&la=en&hash=56C0A10CA8E630EE170B5C4CBED637DB58C4D760'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '966B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '15%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/images/user-small.png'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '946B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '33%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/assets/images/search-icon.png'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '908B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '51%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/daily-edit/beauty/1708/ole-henriksen/three_little_wondersholding.ashx?as=1&w=250&mw=250&la=en&hash=A533E15C6182F1930532F779248A9D740B7863CF'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '857B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '17%'
                    }
                  ]
                }
              },
              {
                'result': {
                  'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                  'args': [
                    {
                      'type': 'URL',
                      'key': 'URL',
                      'value': 'https://grazia.com.au/-/media/grazia/people/persona-grazia/a/virgil-abloh/virgilabloh_bwv3.ashx?as=1&w=250&mw=250&la=en&hash=B9C762F7F57F616E0B53C63A779C01DD61CF8536'
                    },
                    {
                      'type': 'BYTES',
                      'key': 'SIZE_IN_BYTES',
                      'value': '829B'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '15%'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      'PrioritizeVisibleContent': {
        'localizedRuleName': 'Prioritize visible content',
        'ruleImpact': 0.0,
        'groups': [
          'SPEED'
        ],
        'summary': {
          'format': 'You have the above-the-fold content properly prioritized. Learn more about {{BEGIN_LINK}}prioritizing visible content{{END_LINK}}.',
          'args': [
            {
              'type': 'HYPERLINK',
              'key': 'LINK',
              'value': 'https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent'
            }
          ]
        }
      }
    }
  },
  'version': {
    'major': 1,
    'minor': 15
  }
};
