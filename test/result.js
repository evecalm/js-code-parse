[
  {
    "indentify": "export default ",
    "type": "object",
    "raw": "{\n  name: 'actionsheet',\n  mounted () {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  },\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  },\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  },\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  },\n  beforeDestroy () {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }\n}",
    "rawWrapper": "export default {\n  name: 'actionsheet',\n  mounted () {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  },\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  },\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  },\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  },\n  beforeDestroy () {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }\n}",
    "children": [
      {
        "indentify": "name",
        "type": "keyVal",
        "raw": "'actionsheet'",
        "rawWrapper": "\n  name: 'actionsheet'"
      },
      {
        "indentify": "mounted ",
        "type": "function",
        "raw": "() {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  }",
        "rawWrapper": "\n  mounted () {\n    this.hasHeaderSlot = !!this.$slots.header\n    this.$nextTick(() => {\n      this.$tabbar = document.querySelector('.weui-tabbar')\n      this.$refs.iOSMenu &&\n        this.$refs.iOSMenu.addEventListener(\n          'transitionend',\n          this.onTransitionEnd\n        )\n    })\n  }"
      },
      {
        "indentify": "props",
        "type": "keyVal",
        "raw": "{\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  }",
        "rawWrapper": "\n  props: {\n    value: Boolean,\n    showCancel: Boolean,\n    cancelText: String,\n    theme: {\n      type: String,\n      default: 'ios'\n    },\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    },\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    },\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }\n  }",
        "children": [
          {
            "indentify": "value",
            "type": "keyVal",
            "raw": "Boolean",
            "rawWrapper": "\n    value: Boolean"
          },
          {
            "indentify": "showCancel",
            "type": "keyVal",
            "raw": "Boolean",
            "rawWrapper": "\n    showCancel: Boolean"
          },
          {
            "indentify": "cancelText",
            "type": "keyVal",
            "raw": "String",
            "rawWrapper": "\n    cancelText: String"
          },
          {
            "indentify": "theme",
            "type": "keyVal",
            "raw": "{\n      type: String,\n      default: 'ios'\n    }",
            "rawWrapper": "\n    theme: {\n      type: String,\n      default: 'ios'\n    }",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "raw": "String",
                "rawWrapper": "\n      type: String"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "raw": "'ios'",
                "rawWrapper": "\n      default: 'ios'"
              }
            ]
          },
          {
            "indentify": "menus",
            "type": "keyVal",
            "raw": "{\n      type: [Object, Array],\n      default: () => ({})\n    }",
            "rawWrapper": "\n    menus: {\n      type: [Object, Array],\n      default: () => ({})\n    }",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "raw": "[Object, Array]",
                "rawWrapper": "\n      type: [Object, Array]"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "raw": "() => ({})",
                "rawWrapper": "\n      default: () => ({})"
              }
            ]
          },
          {
            "indentify": "closeOnClickingMask",
            "type": "keyVal",
            "raw": "{\n      type: Boolean,\n      default: true\n    }",
            "rawWrapper": "\n    closeOnClickingMask: {\n      type: Boolean,\n      default: true\n    }",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "raw": "Boolean",
                "rawWrapper": "\n      type: Boolean"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "raw": "true\n    ",
                "rawWrapper": "\n      default: true\n    "
              }
            ]
          },
          {
            "indentify": "closeOnClickingMenu",
            "type": "keyVal",
            "raw": "{\n      type: Boolean,\n      default: true\n    }",
            "rawWrapper": "\n    closeOnClickingMenu: {\n      type: Boolean,\n      default: true\n    }",
            "children": [
              {
                "indentify": "type",
                "type": "keyVal",
                "raw": "Boolean",
                "rawWrapper": "\n      type: Boolean"
              },
              {
                "indentify": "default",
                "type": "keyVal",
                "raw": "true\n    ",
                "rawWrapper": "\n      default: true\n    "
              }
            ]
          }
        ]
      },
      {
        "indentify": "data ",
        "type": "function",
        "raw": "() {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  }",
        "rawWrapper": "\n  data () {\n    return {\n      hasHeaderSlot: false,\n      show: false\n    }\n  }"
      },
      {
        "indentify": "methods",
        "type": "keyVal",
        "raw": "{\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  }",
        "rawWrapper": "\n  methods: {\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    },\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    },\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    },\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    },\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }\n  }",
        "children": [
          {
            "indentify": "onTransitionEnd ",
            "type": "function",
            "raw": "() {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    }",
            "rawWrapper": "\n    onTransitionEnd () {\n      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')\n    }"
          },
          {
            "indentify": "onMenuClick ",
            "type": "function",
            "raw": "(text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    }",
            "rawWrapper": "\n    onMenuClick (text, key) {\n      if (typeof text === 'string') {\n        this.emitEvent('on-click-menu', key, text)\n      } else {\n        if (text.type !== 'disabled' && text.type !== 'info') {\n          if (text.value || text.value === 0) {\n            this.emitEvent('on-click-menu', text.value, text)\n          } else {\n            this.emitEvent('on-click-menu', '', text)\n            this.show = false\n          }\n        }\n      }\n    }"
          },
          {
            "indentify": "onClickingMask ",
            "type": "function",
            "raw": "() {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    }",
            "rawWrapper": "\n    onClickingMask () {\n      this.$emit('on-click-mask')\n      this.closeOnClickingMask && (this.show = false)\n    }"
          },
          {
            "indentify": "emitEvent ",
            "type": "function",
            "raw": "(event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    }",
            "rawWrapper": "\n    emitEvent (event, menu, item) {\n      if (event === 'on-click-menu' && !/.noop/.test(menu)) {\n        let _item = item\n        if (typeof _item === 'object') {\n          _item = JSON.parse(JSON.stringify(_item))\n        }\n        this.$emit(event, menu, _item)\n        this.$emit(`${event}-${menu}`)\n        this.closeOnClickingMenu && (this.show = false)\n      }\n    }"
          },
          {
            "indentify": "fixIos ",
            "type": "function",
            "raw": "(zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }",
            "rawWrapper": "\n    fixIos (zIndex) {\n      if (\n        this.$el.parentNode &&\n        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1\n      ) {\n        return\n      }\n      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {\n        this.$tabbar.style.zIndex = zIndex\n      }\n    }"
          }
        ]
      },
      {
        "indentify": "watch",
        "type": "keyVal",
        "raw": "{\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  }",
        "rawWrapper": "\n  watch: {\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    },\n    value: {\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }\n  }",
        "children": [
          {
            "indentify": "show ",
            "type": "function",
            "raw": "(val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    }",
            "rawWrapper": "\n    show (val) {\n      this.$emit('input', val)\n      if (val) {\n        this.fixIos(-1)\n      } else {\n        setTimeout(() => {\n          this.fixIos(100)\n        }, 200)\n      }\n    }"
          },
          {
            "indentify": "value",
            "type": "keyVal",
            "raw": "{\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }",
            "rawWrapper": "\n    value: {\n      handler: function (val) {\n        this.show = val\n      },\n      immediate: true\n    }",
            "children": [
              {
                "indentify": "handler",
                "type": "keyVal",
                "raw": "function ",
                "rawWrapper": "\n      handler: function "
              },
              {
                "type": "function",
                "raw": "(val) {\n        this.show = val\n      }",
                "rawWrapper": "undefined {\n        this.show = val\n      }"
              },
              {
                "indentify": "immediate",
                "type": "keyVal",
                "raw": "true\n    ",
                "rawWrapper": "\n      immediate: true\n    "
              }
            ]
          }
        ]
      },
      {
        "indentify": "beforeDestroy ",
        "type": "function",
        "raw": "() {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }",
        "rawWrapper": "\n  beforeDestroy () {\n    this.fixIos(100)\n    this.$refs.iOSMenu &&\n      this.$refs.iOSMenu.removeEventListener(\n        'transitionend',\n        this.onTransitionEnd\n      )\n  }"
      }
    ]
  }
]