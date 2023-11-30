import {createRouter, createWebHistory, useRouter} from 'vue-router';
import teamList from '../views/team-list.vue';
import teamEdit from '../views/team-edit.vue';
import userVue from '../views/user.vue';
import homeVue from '../views/home.vue';
import Search from '../views/search.vue';
import UserEdit from '../views/user-edit.vue';
import UserList from '../views/user-list.vue';
import loginVue from '../views/login.vue';
import {useUserStore} from '../store/userStore';
import whiteList from '../constant/whiteList';
import teamCreatedVue from '../views/team-created.vue';
import teamJoinedVue from '../views/team-joined.vue';

const router = createRouter({
    history: createWebHistory(),
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
            name: 'team-list',
            meta: {title: '组队'},
            component: teamList,
        },
        {
            path: `/team/edit/:id?`,
            name: 'team-edit',
            meta: {title: '编辑队伍'},
            component: teamEdit,
        },
        {
            path: '/team/created',
            name: 'team-created',
            meta: {title: '创建的队伍'},
            component: teamCreatedVue,
        },
        {
            path: '/team/joined',
            name: 'team-joined',
            meta: {title: '加入的队伍'},
            component: teamJoinedVue,
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
router.beforeEach(async (to, _) => {
    const router = useRouter()
    const userStore = useUserStore();
    if (whiteList.includes(to.path)) return true;
    try {
        await userStore.getUserInfo();
    } catch (e) {
        //...
    }
    if (userStore.isLogin === false) {
        router.push({
            name: "user-login",
            query: {
                redirect: to.path
            }
        })
        return false;
    }
    return true;
});
export default router;
