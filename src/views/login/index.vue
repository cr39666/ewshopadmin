<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" src="~@/assets/images/logo.png" alt="" />
        </div>
      </div>
      <div class="view-account-form">
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入邮箱">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { PersonOutline, LockClosedOutline} from '@vicons/ionicons5';
import {useUserStore} from "@/store/user";
import {useRouter} from "vue-router";
import { useMessage } from 'naive-ui'


const message=useMessage();
window.$message = useMessage()
interface FormState {
  email: string;
  password: string;
}
const userStore=useUserStore();
const router=useRouter();
const formRef = ref();
const loading = ref(false)
const formInline = reactive({
  username: 'super@a.com',
  password: '123123',
});
const rules = {
  username: { required: true, message: '请输入邮箱', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const handleSubmit = (e:Event)=>{
  //阻止默认事件执行
  // e.preventDefault();
  // 表单验证
  formRef.value.validate(async (error:any)=>{
    if(error){
      return;
    }
    // 接收数据
    const {username,password} = formInline;
    // 调整数据结构
    const data: FormState = {
      email:username,
      password,
    }
    // 显示登陆中
    loading.value = true;
    // 执行登陆操作
    userStore.login(data).then(res=>{
      //关闭登录按钮转圈圈
      // 成功后跳转到首页
      // 失败后提示
      loading.value=false;
      message.success("登录成功",
          { duration: 500 })
      router.push({name:'dashboard'})
    }).catch(err=>{
      loading.value=false;
      message.error('登录失败')
    })
  });
}
</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>