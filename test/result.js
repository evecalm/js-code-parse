[
  {
    "indentify": "export default ",
    "type": "object",
    "value": "{\n  name: 'actionsheet',\n  mounted () {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  },\n  components: {\n    Abc,\n    Header,\n    Title\n  },\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  },\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  },\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  },\n  beforeDestroy () {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }\n}",
    "raw": "export default {\n  name: 'actionsheet',\n  mounted () {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  },\n  components: {\n    Abc,\n    Header,\n    Title\n  },\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  },\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  },\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  },\n  beforeDestroy () {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }\n}",
    "valueType": "object",
    "children": [
      {
        "indentify": "name",
        "type": "keyVal",
        "value": "'actionsheet'",
        "raw": "\n  name: 'actionsheet'",
        "valueType": "string"
      },
      {
        "indentify": "mounted ",
        "type": "bracket",
        "value": "()",
        "raw": "\n  mounted ()",
        "valueType": "bracket"
      },
      {
        "type": "funcBlock",
        "value": " {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  }",
        "raw": " {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  }"
      },
      {
        "indentify": "components",
        "type": "keyVal",
        "value": "{\n    Abc,\n    Header,\n    Title\n  }",
        "raw": "\n  components: {\n    Abc,\n    Header,\n    Title\n  }",
        "valueType": "object",
        "children": [
          {
            "indentify": "Abc",
            "type": "statement",
            "value": "",
            "raw": "\n    Abc",
            "valueType": "statement"
          },
          {
            "indentify": "Header",
            "type": "statement",
            "value": "",
            "raw": "\n    Header",
            "valueType": "statement"
          },
          {
            "indentify": "Title\n  ",
            "type": "statement",
            "value": "",
            "raw": "\n    Title\n  ",
            "valueType": "statement"
          }
        ]
      },
      {
        "indentify": "props",
        "type": "keyVal",
        "value": "{\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  }",
        "raw": "\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  }",
        "valueType": "object",
        "children": [
          {
            "indentify": "value",
            "type": "keyVal",
            "value": "Boolean",
            "raw": "\n    value: Boolean",
            "valueType": "statement"
          },
          {
            "indentify": "showCancel",
            "type": "keyVal",
            "value": "Boolean",
            "raw": "\n    showCancel: Boolean",
            "valueType": "statement"
          },
          {
            "indentify": "cancelText",
            "type": "keyVal",
            "value": "String",
            "raw": "\n    cancelText: String",
            "valueType": "statement"
          },
          {
            "indentify": "theme",
            "type": "keyVal",
            "value": "{\n      type: String,\n      default: 'ios'\n    }",
            "raw": "\n    theme: {\n      type: String,\n      default: 'ios'\n    }",
            "valueType": "object",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "value": "String",
                "raw": "\n      type: String",
                "valueType": "statement"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "value": "'ios'",
                "raw": "\n      default: 'ios'",
                "valueType": "string"
              }
            ]
          },
          {
            "indentify": "menus",
            "type": "keyVal",
            "value": "{\n      type: [Object, Array],\n      default: () => ({})\n    }",
            "raw": "\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    }",
            "valueType": "object",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "value": "[Object, Array]",
                "raw": "\n      type: [Object, Array]",
                "valueType": "array"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "value": "() => ({})",
                "raw": "\n      default: () => ({})",
                "valueType": "bracket"
              }
            ]
          },
          {
            "indentify": "closeOnClickingMask",
            "type": "keyVal",
            "value": "{\n      type: Boolean,\n      default: true\n    }",
            "raw": "\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    }",
            "valueType": "object",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "value": "Boolean",
                "raw": "\n      type: Boolean",
                "valueType": "statement"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "value": "true\n    ",
                "raw": "\n      default: true\n    ",
                "valueType": "statement"
              }
            ]
          },
          {
            "indentify": "closeOnClickingMenu",
            "type": "keyVal",
            "value": "{\n      type: Boolean,\n      default: true\n    }",
            "raw": "\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }",
            "valueType": "object",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "value": "Boolean",
                "raw": "\n      type: Boolean",
                "valueType": "statement"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "value": "true\n    ",
                "raw": "\n      default: true\n    ",
                "valueType": "statement"
              }
            ]
          }
        ]
      },
      {
        "indentify": "data ",
        "type": "bracket",
        "value": "()",
        "raw": "\n  data ()",
        "valueType": "bracket"
      },
      {
        "type": "funcBlock",
        "value": " {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  }",
        "raw": " {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  }"
      },
      {
        "indentify": "methods",
        "type": "keyVal",
        "value": "{\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  }",
        "raw": "\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  }",
        "valueType": "object",
        "children": [
          {
            "indentify": "onTransitionEnd ",
            "type": "bracket",
            "value": "()",
            "raw": "\n    onTransitionEnd ()",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    }",
            "raw": " {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    }"
          },
          {
            "indentify": "onMenuClick ",
            "type": "bracket",
            "value": "(text, key)",
            "raw": "\n    onMenuClick (text, key)",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    }",
            "raw": " {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    }"
          },
          {
            "indentify": "onClickingMask ",
            "type": "bracket",
            "value": "()",
            "raw": "\n    onClickingMask ()",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    }",
            "raw": " {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    }"
          },
          {
            "indentify": "emitEvent ",
            "type": "bracket",
            "value": "(event, menu, item)",
            "raw": "\n    emitEvent (event, menu, item)",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    }",
            "raw": " {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    }"
          },
          {
            "indentify": "fixIos ",
            "type": "bracket",
            "value": "(zIndex)",
            "raw": "\n    fixIos (zIndex)",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }",
            "raw": " {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }"
          }
        ]
      },
      {
        "indentify": "watch",
        "type": "keyVal",
        "value": "{\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  }",
        "raw": "\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  }",
        "valueType": "object",
        "children": [
          {
            "indentify": "show ",
            "type": "bracket",
            "value": "(val)",
            "raw": "\n    show (val)",
            "valueType": "bracket"
          },
          {
            "type": "funcBlock",
            "value": " {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    }",
            "raw": " {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    }"
          },
          {
            "indentify": "value",
            "type": "keyVal",
            "value": "{\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }",
            "raw": "\n    value: {\n      handler: function shit (val) {\n        this.show = val\n      },\n      immediate: true\n    }",
            "valueType": "object",
            "children": [
              {
                "indentify": "handler",
                "type": "keyVal",
                "value": "function shit ",
                "raw": "\n      handler: function shit ",
                "valueType": "statement"
              },
              {
                "type": "bracket",
                "value": "(val)",
                "raw": "(val)"
              },
              {
                "type": "funcBlock",
                "value": " {\n        this.show = val\n      }",
                "raw": " {\n        this.show = val\n      }"
              },
              {
                "indentify": "immediate",
                "type": "keyVal",
                "value": "true\n    ",
                "raw": "\n      immediate: true\n    ",
                "valueType": "statement"
              }
            ]
          }
        ]
      },
      {
        "indentify": "beforeDestroy ",
        "type": "bracket",
        "value": "()",
        "raw": "\n  beforeDestroy ()",
        "valueType": "bracket"
      },
      {
        "type": "funcBlock",
        "value": " {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }",
        "raw": " {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }"
      }
    ]
  }
]