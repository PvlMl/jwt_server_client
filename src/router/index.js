import { createWebHistory, createRouter } from "vue-router";

import Registration from "../views/Registration.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
const routes = [
    {
        path: '/reg',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/user',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;