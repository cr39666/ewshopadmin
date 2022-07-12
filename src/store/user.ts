import {defineStore} from 'pinia';
import {login,user} from "@/api/auth";

export interface IUserState{
    token:string;
    username:string;
    avatar:string;
    permissions:string[];
    info:Object;
}

export const useUserStore=defineStore({
    id:'app-user',
    state:():IUserState=>({
        token:localStorage.getItem('token')||'',
        username:'',
        avatar:'',
        permissions:[],
        info:{},
    }),
    getters:{
        getToken():string{
            return this.token;
        },
        getUserName():string{
            return this.username;
        },
        getAvatar():string{
            return this.avatar;
        },
        getPermissions():string[]{
            return this.permissions;
        },
        async getUserInfo():Object{
            //判断this.info 是否是空对象
            if(this.info?.id){
                this.getUser();
            }else{

            }
            return this.info;
        }
    },
    actions:{
        setToken(token:string){
            this.token=token;
            // sessionStorage只保存在当前标签页中只支持刷新，
            // 而localStorage可以支持刷新和新标签页打开
            localStorage.setItem('token',token);
        },
        setUserName(username:string){
            this.username=username;
        },
        setAvatar(avatar:string){
            this.avatar=avatar;
        },
        setPermissions(permissions:string[]){
            this.permissions=permissions;
        },
        setUserInfo(info:string){
            this.info=info;
        },
        async login(userInfo:Object){
            try{
                const response=await login(userInfo);
                if(response.access_token){
                    this.setToken(response.access_token);
                    this.getUser();
                }
            }catch (error){
                console.log(error);
            }
        },
        async getUser(){
            try{
                const response=await user();
                console.log(response);
                this.setUserInfo(response);
                this.setAvatar(response.avatar);
                this.setUserName(response.name)
            }catch (error){
                console.log(error);
            }
        }

    }
})