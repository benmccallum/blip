export const googlePageSpeedResult = function () {
  return {
    desktop: {
      'kind': 'pagespeedonline#result',
      'id': 'https://grazia.com.au/',
      'responseCode': 200,
      'title': 'Grazia Australia',
      'ruleGroups': {
        'SPEED': {
          'score': Math.floor(Math.random() * 100)
        }
      },
      'pageStats': {
        'numberResources': 80,
        'numberHosts': 23,
        'totalRequestBytes': '14484',
        'numberStaticResources': 57,
        'htmlResponseBytes': '151555',
        'cssResponseBytes': '231203',
        'imageResponseBytes': '6034387',
        'javascriptResponseBytes': '1735689',
        'otherResponseBytes': '158224',
        'numberJsResources': 22,
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
            'ruleImpact': 1.4895833333333333,
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
                          'value': 'https://t.auditedmedia.org.au/?id=GTM-PK7PR2R'
                        },
                        {
                          'type': 'DURATION',
                          'key': 'LIFETIME',
                          'value': '15 minutes'
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
                          'value': 'https://securepubads.g.doubleclick.net/gpt/pubads_impl_147.js'
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
            'ruleImpact': 199.40500000000003,
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
                      'value': '1.9MiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '53%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/harry-william-kate-visit-diana-memorial-garden/royalsgardengrazia.ashx?as=1&w=1280&mw=1280&la=en&hash=683135303E3386B32A3DE6AF94713571F7F53B45'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '589.7KiB'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '72%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/chrissy-teigen-john-legend-another-baby/chrissy.ashx?as=1&w=1280&mw=1280&la=en&hash=AB489C4672B0F40F4CBBF8BE840D0A47A2AABD55'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '406.2KiB'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '72%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1708/versace/tile_1.ashx?as=1&w=2000&mw=2000&la=en&hash=B24DF970195116DFCAB063BFACC308B99CD071D1'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '220.5KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1706/diego-submission/diego-submission_0005_layer-1.ashx?as=1&w=1280&mw=1280&la=en&hash=806D209F65AE85FBBDDA74FEB5D0930DEC2687DB'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '150.7KiB'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '27%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/beauty/1708/khaki-lipstick/khakilipsick.ashx?as=1&w=1280&mw=1280&la=en&hash=79D931EE33C048F17639627E9C8C2570CEB93603'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '136.9KiB'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '42%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/runway/swim-17/duskii-ss17-miami-swim/821013312.ashx?as=1&w=1280&mw=1280&la=en&hash=90796BB7C5593B5AE537EEE02B11F89A65D8CFA5'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '19.8KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/harry-william-kate-visit-diana-memorial-garden/royalsgardengrazia.ashx?as=1&w=250&mw=250&la=en&hash=C1030A8474AB625B616F05D811295ABE2E47948F'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '2.1KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1708/warm-up/bodyrhythms_03tile.ashx?as=1&w=250&mw=250&la=en&hash=D9647DCB9E51B75FABF758E53DED0A6A3D55F92B'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '1.9KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/harry-william-kate-visit-diana-memorial-garden/blakelivelytilebabybody.ashx?as=1&w=250&mw=250&la=en&hash=725198DA386BF02F64B086A6C683A087670808D7'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '1.6KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1708/gucci-across-the-universe/gucci-out-of-this-world-tilef.ashx?as=1&w=250&mw=250&la=en&hash=2CB937A4E6C8C34CDDBEE99C41C26F867B23151C'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '1.5KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1708/versace/tile_1.ashx?as=1&w=250&mw=250&la=en&hash=91942DFA76E156C74AD5D049ECB2074752F86AE4'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '1.5KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/fashion/1708/customisation-round-up/shoesofpreytile.ashx?as=1&w=250&mw=250&la=en&hash=C4D55EBB032BFF17861A92EC90D649A9081F9B8F'
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
    },
    mobile: {
      'kind': 'pagespeedonline#result',
      'id': 'https://grazia.com.au/',
      'responseCode': 200,
      'title': 'Grazia Australia',
      'ruleGroups': {
        'SPEED': {
          'score': Math.floor(Math.random() * 100)
        },
        'USABILITY': {
          'score': Math.floor(Math.random() * 100)
        }
      },
      'pageStats': {
        'numberResources': 60,
        'numberHosts': 23,
        'totalRequestBytes': '10670',
        'numberStaticResources': 38,
        'htmlResponseBytes': '151585',
        'cssResponseBytes': '231203',
        'imageResponseBytes': '929951',
        'javascriptResponseBytes': '1715797',
        'otherResponseBytes': '157166',
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
          'AvoidPlugins': {
            'localizedRuleName': 'Avoid plugins',
            'ruleImpact': 0.0,
            'groups': [
              'USABILITY'
            ],
            'summary': {
              'format': 'Your page does not appear to use plugins, which would prevent content from being usable on many platforms. Learn more about the importance of {{BEGIN_LINK}}avoiding plugins{{END_LINK}}.',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/AvoidPlugins'
                }
              ]
            }
          },
          'ConfigureViewport': {
            'localizedRuleName': 'Configure the viewport',
            'ruleImpact': 0.0,
            'groups': [
              'USABILITY'
            ],
            'summary': {
              'format': 'Your page specifies a viewport matching the device\'s size, which allows it to render properly on all devices. Learn more about {{BEGIN_LINK}}configuring viewports{{END_LINK}}.',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/ConfigureViewport'
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
            'ruleImpact': 2.234375,
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
                          'value': 'https://t.auditedmedia.org.au/?id=GTM-PK7PR2R'
                        },
                        {
                          'type': 'DURATION',
                          'key': 'LIFETIME',
                          'value': '15 minutes'
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
            'ruleImpact': 40.0,
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
                          'value': 'https://securepubads.g.doubleclick.net/gpt/pubads_impl_147.js'
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
            'ruleImpact': 14.261100000000003,
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
                      'value': '139.3KiB'
                    },
                    {
                      'type': 'PERCENTAGE',
                      'key': 'PERCENTAGE',
                      'value': '16%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1708/gucci-across-the-universe/gucci-out-of-this-world-tilef.ashx?as=1&w=2000&mw=2000&la=en&hash=3656770CF553489B61CF36B7C252E3B25600900E'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '53.1KiB'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '20%'
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
                          'value': 'https://grazia.com.au/-/media/grazia/lookbooks-fashion-shoots/2017/00-grazia-style-books/1707/cover-up/grazia-_1707_cover-up-3.ashx?as=1&w=768&mw=768&la=en&hash=FB411EF05DD9B66D5FA2E05A22218B7497723B1E'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '19.6KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/harry-william-kate-visit-diana-memorial-garden/royalsgardengrazia.ashx?as=1&w=768&mw=768&la=en&hash=31382984C569008586DD60BCC4C54720A7740FBF'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '17.2KiB'
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
                      'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                      'args': [
                        {
                          'type': 'URL',
                          'key': 'URL',
                          'value': 'https://grazia.com.au/-/media/grazia/runway/couture-aw18/maison-margiela/mm_artisanal_aw17_look01_gyg2760.ashx?as=1&w=768&mw=768&la=en&hash=2486B49FA0169E52ADFF98F5CB47D46A4F6E9618'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '15.6KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/beauty/1708/khaki-lipstick/khakilipsick.ashx?as=1&w=768&mw=768&la=en&hash=E9324A4FAC47504FFE5CB45C053806D4ECC947BC'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '14.3KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/daily-edit/entertainment/1705/vmas/parisjackson.ashx?as=1&w=768&mw=768&la=en&hash=45EEDC644E01E0BC76A8D22EBEF1A8BD97155F8A'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '9KiB'
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
                          'value': 'https://grazia.com.au/-/media/grazia/headers/newsfeed/newsfeedtile_swim.ashx?as=1&w=768&mw=768&la=en&hash=C155702876EDEBC7F4E5786A1435978C17FCE932'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '7.8KiB'
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
                          'value': 'https://grazia.com.au/-/media/images/website/mondadorilogo.ashx?h=25&w=270&la=en&hash=592A97F9AAC62C313CA26CD85D994A907A9BB38E'
                        },
                        {
                          'type': 'BYTES',
                          'key': 'SIZE_IN_BYTES',
                          'value': '898B'
                        },
                        {
                          'type': 'PERCENTAGE',
                          'key': 'PERCENTAGE',
                          'value': '20%'
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
          },
          'SizeContentToViewport': {
            'localizedRuleName': 'Size content to viewport',
            'ruleImpact': 0.0,
            'groups': [
              'USABILITY'
            ],
            'summary': {
              'format': 'The contents of your page fit within the viewport. Learn more about {{BEGIN_LINK}}sizing content to the viewport{{END_LINK}}.',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/SizeContentToViewport'
                }
              ]
            }
          },
          'SizeTapTargetsAppropriately': {
            'localizedRuleName': 'Size tap targets appropriately',
            'ruleImpact': 0.0,
            'groups': [
              'USABILITY'
            ],
            'summary': {
              'format': 'All of your page\'s links/buttons are large enough for a user to easily tap on a touchscreen. Learn more about {{BEGIN_LINK}}sizing tap targets appropriately{{END_LINK}}.',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately'
                }
              ]
            }
          },
          'UseLegibleFontSizes': {
            'localizedRuleName': 'Use legible font sizes',
            'ruleImpact': 0.0,
            'groups': [
              'USABILITY'
            ],
            'summary': {
              'format': 'The text on your page is legible. Learn more about {{BEGIN_LINK}}using legible font sizes{{END_LINK}}.',
              'args': [
                {
                  'type': 'HYPERLINK',
                  'key': 'LINK',
                  'value': 'https://developers.google.com/speed/docs/insights/UseLegibleFontSizes'
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
    }
  };
};
