import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { MainPage } from "@pages/main";

const routes: RouteRecordRaw[] = [{ path: "/", component: MainPage }];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
