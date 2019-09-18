export const packages = {
  "alert": {
    "intro": "<p>Alert component for feedback.</p>\n",
    "whenToUse": "<ul>\n<li>When you need to show alert messages to users.</li>\n<li>When you need a persistent static container which is closable by user actions.</li>\n</ul>\n",
    "cols": 2,
    "directives": [
      {
        "name": "Alert",
        "meta": "{\n  selector: 'ant-alert, [antAlert]',\n  templateUrl: './alert.html',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "message",
            "description": "Content of Alert",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          },
          {
            "name": "type",
            "description": "Type of Alert styles",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"info\""
          }
        ],
        "inputs": {
          "message": "message",
          "type": null
        },
        "outputs": {}
      }
    ]
  },
  "button": {
    "intro": "<p>To trigger an operation.</p>\n",
    "whenToUse": "<p>A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.</p>\n",
    "cols": 2,
    "directives": [
      {
        "name": "Button",
        "meta": "{\n  selector: '[antBtn]',\n  templateUrl: './button.html',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "color",
            "type": {
              "tokens": [
                [
                  15,
                  "\"primary\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"dashed\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"danger\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "ghost",
            "description": "make background transparent and invert text and border colors",
            "type": {
              "tokens": [
                [
                  0,
                  "boolean"
                ]
              ]
            },
            "defaultValue": "false"
          },
          {
            "name": "icon",
            "description": "set the icon of button",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "iconOnly",
            "type": {
              "tokens": [
                [
                  0,
                  "boolean"
                ]
              ]
            },
            "defaultValue": "false"
          },
          {
            "name": "loading",
            "description": "set the loading status of button",
            "type": {
              "tokens": [
                [
                  0,
                  "boolean"
                ]
              ]
            },
            "defaultValue": "false"
          },
          {
            "name": "shape",
            "type": {
              "tokens": [
                [
                  15,
                  "\"circle\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "size",
            "type": {
              "tokens": [
                [
                  15,
                  "\"large\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"small\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          }
        ],
        "inputs": {
          "color": null,
          "ghost": null,
          "icon": null,
          "iconOnly": null,
          "loading": null,
          "shape": null,
          "size": null
        },
        "outputs": {}
      },
      {
        "name": "ButtonGroup",
        "meta": "{\n  selector: 'ant-btn-group, [antBtnGroup]',\n}",
        "properties": [
          {
            "name": "size",
            "type": {
              "tokens": [
                [
                  15,
                  "\"large\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"small\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          }
        ],
        "inputs": {
          "size": null
        },
        "outputs": {}
      }
    ]
  },
  "dropdown": {
    "intro": "<p>A dropdown list.</p>\n",
    "whenToUse": "<p>If there are too many operations to display, you can wrap them in a <code>Dropdown</code>. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.</p>\n",
    "cols": 2,
    "directives": [
      {
        "name": "Dropdown",
        "meta": "{\n  selector: '[antDropdown]',\n  host: {\n    '[class.ant-dropdown-link]': `true`,\n    '[class.ant-dropdown-trigger]': `true`,\n  },\n  providers: [\n    { provide: MENU_PREFIX, useFactory: menuPrefixFactory, deps: [] },\n  ],\n}",
        "properties": [
          {
            "name": "contentOverlay",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Overlay",
        "meta": "{\n  selector: '[antOverlay]',\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      }
    ]
  },
  "element": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": [
      {
        "name": "AsideElement",
        "meta": "{\n  selector: 'aside:not([antNoEffect])',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"aside\""
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Element",
        "meta": "{\n  selector: 'ant-element',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "FooterElement",
        "meta": "{\n  selector: 'footer:not([antNoEffect])',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"footer\""
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "HeaderElement",
        "meta": "{\n  selector: 'header:not([antNoEffect])',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"header\""
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "LiElement",
        "meta": "{\n  selector: 'li:not([antNoEffect])',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"li\""
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "MainElement",
        "meta": "{\n  selector: 'main:not([antNoEffect])',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "tag",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"main\""
          }
        ],
        "inputs": {},
        "outputs": {}
      }
    ]
  },
  "extension": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": [
      {
        "name": "Expansion",
        "meta": "{\n  selector: '[antExtExpansion], [antDropdown], [antSubMenu]',\n  exportAs: 'antExtExpansion',\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Governor",
        "meta": "{\n  selector: `\n    [antExtGovernor],\n    ant-alert, [antAlert],\n    ant-btn-group, [antBtnGroup],\n    [antBtn],\n    ant-col, [antCol],\n    ant-row, [antRow],\n    [antIcon],\n    [antMenuItemGroupContainer],\n    [antMenuItemGroup],\n    [antMenuItem],\n    [antMenu],\n    [antSubMenu],\n    ant-radio-btn, [antRadioBtn],\n    ant-radio-group,\n  `,\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Hover",
        "meta": "{\n  selector: '[antExtHover], [antMenuItem]',\n  exportAs: 'antExtHover',\n}",
        "properties": [
          {
            "name": "changes",
            "type": {
              "tokens": [
                [
                  0,
                  "Observable"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "boolean"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      }
    ]
  },
  "fragment": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": [
      {
        "name": "Content",
        "meta": "{\n  selector: '[antContent]',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "template",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          },
          {
            "name": "type",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"antContent\""
          },
          {
            "name": "viewContainer",
            "type": {
              "tokens": [
                [
                  0,
                  "ViewContainerRef"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Footer",
        "meta": "{\n  selector: '[antFooter]',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "template",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          },
          {
            "name": "type",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"antFooter\""
          },
          {
            "name": "viewContainer",
            "type": {
              "tokens": [
                [
                  0,
                  "ViewContainerRef"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Fragment",
        "meta": "{\n  selector: 'ant-fragment',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "template",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          },
          {
            "name": "type",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          },
          {
            "name": "viewContainer",
            "type": {
              "tokens": [
                [
                  0,
                  "ViewContainerRef"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Header",
        "meta": "{\n  selector: '[antHeader]',\n}",
        "properties": [
          {
            "name": "injector",
            "type": {
              "tokens": [
                [
                  0,
                  "Injector"
                ]
              ]
            }
          },
          {
            "name": "template",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          },
          {
            "name": "type",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"antHeader\""
          },
          {
            "name": "viewContainer",
            "type": {
              "tokens": [
                [
                  0,
                  "ViewContainerRef"
                ]
              ]
            }
          }
        ],
        "inputs": {},
        "outputs": {}
      }
    ]
  },
  "grid": {
    "intro": "<p>24 Grids System.</p>\n<h2>Design concept</h2>\n<div class=\"grid-demo\">\n<div class=\"ant-row demo-row\">\n<div class=\"ant-col-24 demo-col demo-col-1\">\n  100%\n</div>\n</div>\n<div class=\"ant-row demo-row\">\n  <div class=\"ant-col-6 demo-col demo-col-2\">\n    25%\n  </div>\n  <div class=\"ant-col-6 demo-col demo-col-3\">\n    25%\n  </div>\n  <div class=\"ant-col-6 demo-col demo-col-2\">\n    25%\n  </div>\n  <div class=\"ant-col-6 demo-col demo-col-3\">\n    25%\n  </div>\n</div>\n<div class=\"ant-row demo-row\">\n  <div class=\"ant-col-8 demo-col demo-col-4\">\n    33.33%\n  </div>\n  <div class=\"ant-col-8 demo-col demo-col-5\">\n    33.33%\n  </div>\n  <div class=\"ant-col-8 demo-col demo-col-4\">\n    33.33%\n  </div>\n</div>\n<div class=\"ant-row demo-row\">\n  <div class=\"ant-col-12 demo-col demo-col-1\">\n    50%\n  </div>\n  <div class=\"ant-col-12 demo-col demo-col-3\">\n    50%\n  </div>\n</div>\n<div class=\"ant-row demo-row\">\n  <div class=\"ant-col-16 demo-col demo-col-4\">\n    66.66%\n  </div>\n  <div class=\"ant-col-8 demo-col demo-col-5\">\n    33.33%\n  </div>\n</div>\n</div>\n<p>In most business situations, Ant Design needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 aliquots.</p>\n<p>We name the divided area 'box'. We suggest four boxes for horizontal arrangement at most, one at least. Boxes are proportional to the entire screen as shown in the picture above. To ensure a high level of visual comfort, we customize the typography inside of the box based on the box unit.</p>\n<h2>Outline</h2>\n<p>In the grid system, we define the frame outside the information area based on <code>row</code> and <code>column</code>, to ensure that every area can have stable arrangement.</p>\n<p>Following is a brief look at how it works:</p>\n<ul>\n<li>Establish a set of <code>column</code> in the horizontal space defined by <code>row</code> (abbreviated col)</li>\n<li>Your content elements should be placed directly in the <code>col</code>, and only <code>col</code> should be placed directly in <code>row</code></li>\n<li>The column grid system is a value of 1-24 to represent its range spans. For example, three columns of equal width can be created by <code>.col-8</code> (<code>span=8</code>).</li>\n<li>If the sum of <code>col</code> spans in a <code>row</code> are more than 24, then the overflowing <code>col</code> as a whole will start a new line arrangement.</li>\n</ul>\n<h2>Flex layout</h2>\n<p>Our grid systems support Flex layout to allow the elements within the parent to be aligned horizontally - left, center, right, wide arrangement, and decentralized arrangement. The Grid system also supports vertical alignment - top aligned, vertically centered, bottom-aligned. You can also define the order of elements by using <code>order</code>.</p>\n<p>Flex layout uses a 24 grid layout to define the width of each &quot;box&quot;, but does not rigidly adhere to the grid layout.</p>\n",
    "whenToUse": null,
    "cols": 1,
    "directives": [
      {
        "name": "Column",
        "meta": "{\n  selector: 'ant-col, [antCol]',\n}",
        "properties": [
          {
            "name": "offset",
            "description": "the number of cells to offset Col from the left",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "offsetXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "order",
            "description": "raster order, used in <code>flex</code> layout mode",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "orderXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pull",
            "description": "the number of cells that raster is moved to the left",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pullXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "push",
            "description": "the number of cells that raster is moved to the right",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "pushXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "span",
            "description": "raster number of cells to occupy, 0 corresponds to <code>display: none</code>",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "spanXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          }
        ],
        "inputs": {
          "offset": null,
          "offsetLg": "offset.lg",
          "offsetMd": "offset.md",
          "offsetSm": "offset.sm",
          "offsetXl": "offset.xl",
          "offsetXs": "offset.xs",
          "offsetXxl": "offset.xxl",
          "order": null,
          "orderLg": "order.lg",
          "orderMd": "order.md",
          "orderSm": "order.sm",
          "orderXl": "order.xl",
          "orderXs": "order.xs",
          "orderXxl": "order.xxl",
          "pull": null,
          "pullLg": "pull.lg",
          "pullMd": "pull.md",
          "pullSm": "pull.sm",
          "pullXl": "pull.xl",
          "pullXs": "pull.xs",
          "pullXxl": "pull.xxl",
          "push": null,
          "pushLg": "push.lg",
          "pushMd": "push.md",
          "pushSm": "push.sm",
          "pushXl": "push.xl",
          "pushXs": "push.xs",
          "pushXxl": "push.xxl",
          "span": null,
          "spanLg": "span.lg",
          "spanMd": "span.md",
          "spanSm": "span.sm",
          "spanXl": "span.xl",
          "spanXs": "span.xs",
          "spanXxl": "span.xxl"
        },
        "outputs": {}
      },
      {
        "name": "Row",
        "meta": "{\n  selector: 'ant-row, [antRow]',\n}",
        "properties": [
          {
            "name": "align",
            "description": "the vertical alignment of the flex layout",
            "type": {
              "tokens": [
                [
                  15,
                  "\"top\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"middle\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"bottom\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutter",
            "description": "spacing between grids",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            },
            "defaultValue": "0"
          },
          {
            "name": "gutterLg",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutterMd",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutterSm",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutterXl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutterXs",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "gutterXxl",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "justify",
            "description": "horizontal arrangement of the flex layout",
            "type": {
              "tokens": [
                [
                  15,
                  "\"start\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"end\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"center\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"space-around\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"space-between\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "type",
            "description": "layout mode",
            "type": {
              "tokens": [
                [
                  15,
                  "\"flex\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          }
        ],
        "inputs": {
          "align": null,
          "gutter": null,
          "gutterLg": "gutter.lg",
          "gutterMd": "gutter.md",
          "gutterSm": "gutter.sm",
          "gutterXl": "gutter.xl",
          "gutterXs": "gutter.xs",
          "gutterXxl": "gutter.xxl",
          "justify": null,
          "type": null
        },
        "outputs": {}
      }
    ]
  },
  "icon": {
    "intro": "<p>Semantic vector graphics.</p>\n<h2>Icons naming convention</h2>\n<p>We provide semantic name for every icon, and naming rules are as follows:</p>\n<ul>\n<li>Scanning line icon has the similar name with its solid one，but it's distinguished by <code>-o</code>, for example, <code>question-circle</code> (a full circle) and <code>question-circle-o</code> (an empty circle);</li>\n<li>Naming sequence：<code>[name]-[shape?]-[outline?]-[direction?]</code>.</li>\n</ul>\n<blockquote>\n<p><code>?</code> means is optional.</p>\n</blockquote>\n<p>See more design detail at <a href=\"/docs/spec/icon\">here</a>.</p>\n<h2>How To Use</h2>\n<p>Use tag <Icon /> to create an icon and set its type in the type prop, for example:</p>\n<pre><code class=\"language-html\">&lt;i antIcon=&quot;link&quot;&gt;&lt;/i&gt;\n</code></pre>\n<h2>Local deployment</h2>\n<p>By default, icons are deployed at <a href=\"http://iconfont.cn\">iconfont.cn</a>, publicly available repository of a huge set of icons. In case you need to use a locally deployed version of the icon font, you can refer to <a href=\"https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont\">this example</a>。</p>\n<h2>List of icons</h2>\n<blockquote>\n<p>Click the icon and copy the code。</p>\n</blockquote>\n<h3>Directional Icons</h3>\n<p><icon-set class=\"icons\" catigory=\"direction\">TODO: add support for icon demo</icon-set></p>\n<h3>Suggested Icons</h3>\n<p><icon-set class=\"icons\" catigory=\"suggestion\">TODO: add support for icon demo</icon-set></p>\n<h3>Application Icons</h3>\n<p><icon-set class=\"icons\" catigory=\"other\">TODO: add support for icon demo</icon-set></p>\n<h3>Brand and Logos</h3>\n<p><icon-set class=\"icons\" catigory=\"logo\">TODO: add support for icon demo</icon-set></p>\n",
    "whenToUse": null,
    "cols": 2,
    "directives": [
      {
        "name": "Icon",
        "meta": "{\n  selector: '[antIcon]',\n}",
        "properties": [
          {
            "name": "spin",
            "description": "Rotate icon with animation",
            "type": {
              "tokens": [
                [
                  0,
                  "boolean"
                ]
              ]
            },
            "defaultValue": "false"
          },
          {
            "name": "type",
            "description": "Type of ant design icon",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          }
        ],
        "inputs": {
          "spin": null,
          "type": null
        },
        "outputs": {}
      }
    ]
  },
  "layout": {
    "intro": "<p>Handling the overall layout of a page.</p>\n<h2>Specification</h2>\n<h3>Size</h3>\n<p>The first level navigation is inclined left near a logo, and the secondary menu is inclined right.</p>\n<ul>\n<li>Top Navigation (almost systems): the height of the first level navigation <code>64px</code>, the second level navigation <code>48px</code>.</li>\n<li>Top Navigation(contents page): the height of the first level navigation <code>80px</code>, the second level navigation <code>56px</code>.</li>\n<li>Calculation formula of a top navigation: <code>48+8n</code>.</li>\n<li>Calculation formula of an aside navigation: <code>200+8n</code>.</li>\n</ul>\n<h3>Interaction rules</h3>\n<ul>\n<li>The first level navigation and the last level navigation should be distincted by visualization;</li>\n<li>The current item should have the highest priority of visualization;</li>\n<li>When the current navigation item is collapsed, the stlye of the current navigation item will be applied to its parent level;</li>\n<li>The left side navigation bar has support for both the accordion and expanding styles, you can choose the one that fits your case best.</li>\n</ul>\n<h2>Visualization rules</h2>\n<p>Style of a navigation should conform to its level.</p>\n<ul>\n<li>\n<p><strong>Emphasis by colorblock</strong></p>\n<p>When background color is a deep color, you can use this pattern for the parent level navigation item of current page.</p>\n</li>\n<li>\n<p><strong>The highlight match stick</strong></p>\n<p>When background color is a light color, you can use this pattern for the current page navigation item, we recommed using it for the last item of the navigation path.</p>\n</li>\n<li>\n<p><strong>Hightlighted font</strong></p>\n<p>From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.</p>\n</li>\n<li>\n<p><strong>Enlarge the size of the font</strong></p>\n<p><code>12px</code>、<code>14px</code> is a standard font size of navigations，<code>14px</code> is used for the first and the second level of the navigation. You can choose a appropriate font size in terms of the level of your navigation.</p>\n</li>\n</ul>\n<h2>Component Overview</h2>\n<ul>\n<li><code>Layout</code>: The layout wrapper, in which <code>Header</code> <code>Sider</code> <code>Content</code> <code>Footer</code> or <code>Layout</code> itself can be nested, and can be placed in any parent container.</li>\n<li><code>Header</code>: The top layout with default style, in which any element can be nested, and must be placed in <code>Layout</code>.</li>\n<li><code>Sider</code>: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in <code>Layout</code>.</li>\n<li><code>Content</code>: The content layout with default style, in which any element can be nested, and must be placed in <code>Layout</code>.</li>\n<li><code>Footer</code>: The bottom layout with default style, in which any element can be nested, and must be placed in <code>Layout</code>.</li>\n</ul>\n<blockquote>\n<p>Based on <code>flex layout</code>, please pay attention to the <a href=\"http://caniuse.com/#search=flex\">compatibility</a>.</p>\n</blockquote>\n",
    "whenToUse": null,
    "cols": 1,
    "directives": [
      {
        "name": "LayoutContent",
        "meta": "{\n  selector: 'ant-layout-content, [antLayoutContent]',\n  host: {\n    '[class.ant-layout-content]': 'true',\n  },\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "LayoutFooter",
        "meta": "{\n  selector: 'ant-layout-footer, [antLayoutFooter]',\n  host: {\n    '[class.ant-layout-footer]': 'true',\n  },\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "LayoutHeader",
        "meta": "{\n  selector: 'ant-layout-header, [antLayoutHeader]',\n  host: {\n    '[class.ant-layout-header]': 'true',\n  },\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "Layout",
        "meta": "{\n  selector: 'ant-layout, [antLayout]',\n  host: {\n    '[class.ant-layout]': `true`,\n    '[class.ant-layout-has-sider]': `siders.length > 0`,\n  },\n  providers: [\n    { provide: ElementContainer, useExisting: forwardRef(() => Layout) },\n  ],\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      },
      {
        "name": "LayoutSider",
        "meta": "{\n  selector: 'ant-layout-sider, [antLayoutSider]',\n  templateUrl: './sider.html',\n  host: {\n    '[class.ant-layout-sider]': 'true',\n  },\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "width",
            "description": "width of the sidebar",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            },
            "defaultValue": "200"
          }
        ],
        "inputs": {
          "width": null
        },
        "outputs": {}
      }
    ]
  },
  "menu": {
    "intro": "<p>Menu list of Navigation.</p>\n",
    "whenToUse": "<p>Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.</p>\n<p>More layouts with navigation: <a href=\"/components/layout\">layout</a>.</p>\n",
    "cols": 1,
    "directives": [
      {
        "name": "MenuItemGroup",
        "meta": "{\n  selector: '[antMenuItemGroup]',\n  templateUrl: './item-group.html',\n  exportAs: 'antMenuItemGroup',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "antMenuItemGroup",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"\""
                ]
              ]
            }
          },
          {
            "name": "key",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          },
          {
            "name": "title",
            "description": "title of the group",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          }
        ],
        "inputs": {
          "antMenuItemGroup": null,
          "key": null,
          "title": null
        },
        "outputs": {}
      },
      {
        "name": "MenuItemGroupContainer",
        "meta": "{\n  selector: '[antMenuItemGroupContainer]',\n  templateUrl: './item-group-container.html',\n  exportAs: 'antMenuItemGroupContainer',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "itemGroup",
            "type": {
              "tokens": [
                [
                  0,
                  "TemplateRef"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "void"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          }
        ],
        "inputs": {
          "itemGroup": null
        },
        "outputs": {}
      },
      {
        "name": "Menu",
        "meta": "{\n  selector: '[antMenu]',\n  templateUrl: './menu.html',\n  exportAs: 'antMenu',\n  providers: [\n    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Menu) },\n    { provide: FragmentContainer, useExisting: forwardRef(() => Menu) },\n  ],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "mode",
            "description": "type of the menu",
            "type": {
              "tokens": [
                [
                  15,
                  "\"vertical\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"vertical-left\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"vertical-right\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"horizontal\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"inline\""
                ]
              ]
            },
            "defaultValue": "\"vertical\""
          },
          {
            "name": "role",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"menu\""
          },
          {
            "name": "tabIndex",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"0\""
          },
          {
            "name": "theme",
            "description": "color theme of the menu",
            "type": {
              "tokens": [
                [
                  15,
                  "\"light\""
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  15,
                  "\"dark\""
                ]
              ]
            },
            "defaultValue": "\"light\""
          }
        ],
        "inputs": {
          "mode": null,
          "role": null,
          "tabIndex": null,
          "theme": null
        },
        "outputs": {}
      },
      {
        "name": "MenuItem",
        "meta": "{\n  selector: '[antMenuItem]',\n  exportAs: 'antMenuItem',\n}",
        "properties": [
          {
            "name": "disabled",
            "description": "whether menu item is disabled or not",
            "type": {
              "tokens": [
                [
                  0,
                  "boolean"
                ]
              ]
            },
            "defaultValue": "false"
          },
          {
            "name": "key",
            "description": "unique id of the menu item",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          },
          {
            "name": "role",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            },
            "defaultValue": "\"menuitem\""
          }
        ],
        "inputs": {
          "disabled": null,
          "key": null,
          "role": null
        },
        "outputs": {}
      },
      {
        "name": "SubMenu",
        "meta": "{\n  selector: '[antSubMenu]',\n  templateUrl: './sub-menu.html',\n  exportAs: 'antSubMenu',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "key",
            "description": "unique id of the sub menu",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          },
          {
            "name": "title",
            "description": "title of the sub menu",
            "type": {
              "tokens": [
                [
                  0,
                  "string"
                ]
              ]
            }
          }
        ],
        "inputs": {
          "key": null,
          "title": null
        },
        "outputs": {}
      }
    ]
  },
  "radio": {
    "intro": "<p>Radio.</p>\n",
    "whenToUse": "<ul>\n<li>Used to select a single state in multiple options.</li>\n<li>The difference between Select is that Radio is visible to user and can facilitate the comparison of choice, which makes there shouldn't be too many of them.</li>\n</ul>\n",
    "cols": 2,
    "directives": [
      {
        "name": "RadioButton",
        "meta": "{\n  selector: 'ant-radio-btn, [antRadioBtn]',\n  templateUrl: './radio-button.html',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "value",
            "description": "According to value for comparison, to determine whether the selected",
            "type": {
              "tokens": [
                [
                  0,
                  "TODO(type): typeParameter"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          }
        ],
        "inputs": {
          "value": null
        },
        "outputs": {}
      },
      {
        "name": "RadioGroup",
        "meta": "{\n  selector: 'ant-radio-group',\n  providers: [\n    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RadioGroup) },\n  ],\n}",
        "properties": [],
        "inputs": {},
        "outputs": {}
      }
    ]
  },
  "responsive": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": []
  },
  "slider": {
    "intro": "<p>A Slider component for displaying current value and intervals in range.</p>\n",
    "whenToUse": "<p>To input a value in a range.</p>\n",
    "cols": 2,
    "directives": [
      {
        "name": "Slider",
        "meta": "{\n  selector: 'ant-slider, [antSlider]',\n  templateUrl: './slider.html',\n  host: {\n    '[class.ant-slider]': `true`,\n    '[class.ant-slider-with-marks]': `marks`,\n    '[style.display]': `'block'`,\n  },\n  providers: [\n    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Slider) },\n  ],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  preserveWhitespaces: false,\n}",
        "properties": [
          {
            "name": "markItems",
            "type": {
              "tokens": [
                [
                  0,
                  "Array"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "TODO(type): reflection"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          },
          {
            "name": "markMarginLeft",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            }
          },
          {
            "name": "markWidth",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            }
          },
          {
            "name": "marks",
            "description": "Tick mark of Slider, key must be in closed interval [min, max]",
            "type": {
              "tokens": [
                [
                  0,
                  "TODO(type): reflection"
                ],
                [
                  0,
                  " "
                ],
                [
                  14,
                  "|"
                ],
                [
                  0,
                  " "
                ],
                [
                  0,
                  "null"
                ]
              ]
            },
            "defaultValue": "null"
          },
          {
            "name": "max",
            "description": "The maximum value the slider can slide to",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            },
            "defaultValue": "100"
          },
          {
            "name": "min",
            "description": "The minimum value the slider can slide to",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            },
            "defaultValue": "0"
          },
          {
            "name": "percentage",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            }
          },
          {
            "name": "range",
            "type": {
              "tokens": [
                [
                  0,
                  "number"
                ]
              ]
            }
          },
          {
            "name": "stepItems",
            "type": {
              "tokens": [
                [
                  0,
                  "Array"
                ],
                [
                  14,
                  "<"
                ],
                [
                  0,
                  "number"
                ],
                [
                  14,
                  ">"
                ]
              ]
            }
          }
        ],
        "inputs": {
          "marks": null,
          "max": null,
          "min": null
        },
        "outputs": {}
      }
    ]
  },
  "testing": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": []
  },
  "util": {
    "intro": null,
    "whenToUse": null,
    "cols": 2,
    "directives": []
  }
}