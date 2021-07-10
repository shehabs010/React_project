import Vue from 'vue';
import App from './App.vue';

import VueFirestore from 'vue-firestore';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.css';
import VueRouter from 'vue-router';
import StarRating from 'vue-star-rating';
import router from './routers';
import { fb } from './assets/firebase';
import Swal from 'sweetalert2';
import { store } from './store';
import filter from './assets/filters'

// import storePlugin from './storePlugin'

// Vue.use(storePlugin)

Vue.use(VueRouter);
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

require("firebase/firestore");


Vue.use(VueFirestore, {
    key: 'id', // the name of the property. Default is '.key'.
    enumerable: true //  whether it is enumerable or not. Default is true.
})
export const bus = new Vue();
window.Toast = Toast;
Vue.config.productionTip = false

Vue.component('navbar', require('./components/header/Navbar.vue').default);
Vue.component('product', require('./components/shared/productCard/productCard.vue').default);
Vue.component('not-found', require('./components/shared/404.vue').default);
Vue.component('search', require('./components/shared/productCard/searchBox.vue').default);
Vue.component('about', require('./views/About.vue').default);
Vue.component('website', require('./Layout/website.vue').default);
Vue.component('star-rating', StarRating)
Vue.component('product-details', require('./components/product/ProductDetail.vue').default);
Vue.component('loading', require('./components/shared/Loading.vue').default);
Vue.component('min-cart', require('./components/shared/MinCart.vue').default);
Vue.component('login', require('./components/shared/Login.vue').default);
Vue.component('bread-crumb', require('./components/shared/BreadCrumb/breadCrumb.vue').default);
//Vue.component('popup', require('./components/shared/Popup.vue').default);
Vue.component('profile', require('./components/shared/Profile.vue').default);
Vue.component('hero', require('./views/Hero.vue').default);

let app = '';
fb.auth().onAuthStateChanged(function(user) {
    if (!app) {
        new Vue({
            router,
            store,
            filter,
            render: h => h(App)
        
        }).$mount('#app')

    }
});