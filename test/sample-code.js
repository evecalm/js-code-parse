export default {
  name: 'actionsheet',
  mounted () {
    this.hasHeaderSlot = !!this.$slots.header
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.weui-tabbar')
      this.$refs.iOSMenu &&
        this.$refs.iOSMenu.addEventListener(
          'transitionend',
          this.onTransitionEnd
        )
    })
  },
  components: {
    Abc,
    Header,
    Title
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    theme: {
      type: String,
      default: 'ios'
    },
    menus: {
      type: [Object, Array],
      default: () => ({})
    },
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hasHeaderSlot: false,
      show: false
    }
  },
  methods: {
    onTransitionEnd () {
      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')
    },
    onMenuClick (text, key) {
      if (typeof text === 'string') {
        this.emitEvent('on-click-menu', key, text)
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value || text.value === 0) {
            this.emitEvent('on-click-menu', text.value, text)
          } else {
            this.emitEvent('on-click-menu', '', text)
            this.show = false
          }
        }
      }
    },
    onClickingMask () {
      this.$emit('on-click-mask')
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent (event, menu, item) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        let _item = item
        if (typeof _item === 'object') {
          _item = JSON.parse(JSON.stringify(_item))
        }
        this.$emit(event, menu, _item)
        this.$emit(`${event}-${menu}`)
        this.closeOnClickingMenu && (this.show = false)
      }
    },
    fixIos (zIndex) {
      if (
        this.$el.parentNode &&
        this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1
      ) {
        return
      }
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function shit (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
    this.$refs.iOSMenu &&
      this.$refs.iOSMenu.removeEventListener(
        'transitionend',
        this.onTransitionEnd
      )
  }
}
