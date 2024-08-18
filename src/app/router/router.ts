import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { MainPage } from "@pages/main";


const routes: RouteRecordRaw[] = [{ path: "/", component: MainPage }];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
