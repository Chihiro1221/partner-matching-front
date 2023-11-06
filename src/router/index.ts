import {createRouter, createWebHashHistory} from 'vue-router';
import teamVue from '../views/team.vue';
import userVue from '../views/user.vue';
import homeVue from '../views/home.vue';
import Search from '../views/search.vue';
import UserEdit from '../views/user-edit.vue';
import UserList from '../views/user-list.vue';
import loginVue from '../views/login.vue';
import {useUserStore} from "../store/userStore";

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {title: '主页'},
            component: homeVue,
        },
        {
            path: '/search',
            name: 'search',
            meta: {title: '搜索'},
            component: Search,
        },
        {
            path: '/user/list',
            name: 'user-list',
            meta: {title: '搜索结果'},
            component: UserList,
        },
        {
            path: '/team',
            name: 'team',
            meta: {title: '组队'},
            component: teamVue,
        },
        {
            path: '/user',
            name: 'user',
            meta: {title: '个人中心'},
            component: userVue,
        },
        {
            path: '/user/edit',
            name: 'user-edit',
            meta: {title: '修改信息'},
            component: UserEdit,
        },
        {
            path: '/user/login',
            name: 'user-login',
            meta: {title: '登录'},
            component: loginVue,
        },
    ],
});
router.afterEach(async (to, _) => {
    const userStore = useUserStore();
    if (to.path === '/user/login') return;
    await userStore.getUserInfo();
})
export default router;
