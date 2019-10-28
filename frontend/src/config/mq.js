import Vue from 'vue'
import VueMq from 'vue-mq'

// vue media query para uma responsividade maior (breakpoints de dispositivos)
Vue.use(VueMq, {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})