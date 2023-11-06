// stores/counter.js
import {defineStore} from 'pinia'
import {getUserInfo} from "../apis/user";
import {showToast} from "vant";
import router from "../router";
import {User} from "../types/models";

interface UserStore {
    userInfo: User | null;
    isLogin: boolean
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: null,
            isLogin: false
        } as UserStore;
    },
    actions: {
        async getUserInfo() {
            const response = await getUserInfo()
            if (response.code !== 0) {
                router.push("/")
                showToast("请您登陆")
            }
            this.userInfo = response.data;
            this.isLogin = true;
        }
    },
})