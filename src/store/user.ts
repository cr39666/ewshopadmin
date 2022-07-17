import {defineStore} from 'pinia';
import {login, user} from '@/api/auth';

export interface IUserState {
    token: string;
    username: string;
    avatar: string;
    permissions: string[];
    info: Object;
}

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): IUserState => ({
        token: localStorage.getItem('token') || '',
        username: '',
        avatar: '',
        permissions: [],
        info: {},
    }),
    getters: {
        getToken(): string {
            return this.token;
        },
        getAvatar(): string {
            return this.avatar;
        },
        getUserName(): string {
            return this.username;
        },
        getPermissions(): string[] {
            return this.permissions;
        },
        async getUserInfo(): Object {
            // 判断 this.info 是否是空对象
            if(!this.info?.id) {
                this.getUser();
            }
            return this.info;
        }
    },
    actions: {
        setToken(token: string) {
            localStorage.setItem('token', token);
            this.token = token;
        },
        setAvatar(avatar: string) {
            this.avatar = avatar;
        },
        setUserInfo(info: Object) {
            this.info = info;
        },
        setUserName(username: string) {
            this.username = username;
        },
        setPermissions(permissions: string[]) {
            this.permissions = permissions;
        },
        async login(userInfo: Object) {
            try {
                const response = await login(userInfo);
                if (response.access_token) {
                    this.setToken(response.access_token);
                    this.getUser();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getUser() {
            try {
                const response = await user();
                this.setUserInfo(response);
                this.setAvatar(response.avatar_url);
                this.setUserName(response.name);
                return response;
            } catch (error) {
                console.log(error);
            }
        }

    }
})