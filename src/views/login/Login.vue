<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <header>
            <img src="@/assets/img/logo.png" alt="logo" />
            <h1>vue3-admin</h1>
          </header>
          <a-form :model="form" @submit="handleSubmit" @submit.prevent>
            <a-form-item>
              <a-input
                v-model:value="form.username"
                size="large"
                placeholder="Username"
                style="min-width: 245.333px"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                v-model:value="form.password"
                size="large"
                placeholder="Password"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" size="large" @click="handleSubmit" block>
                Login in
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const state = reactive({
      form: {
        username: "",
        password: "",
      },
    });

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const handleSubmit = async () => {
      const { username, password } = state.form;
      if (username === "" || password === "")
        return message.warn("用户名或密码不能为空！");
      // 调用store方法
      const res = await store.dispatch("LoginResult", state.form);

      if (res.code === 200) {
        //获取登录成功后要跳转的路由
        const toPath = decodeURIComponent(route.query?.redirect || "/");
        message.success("登录成功！");

        let tokenResult = localStorage.getItem("token");
        const result = await store.dispatch("GetInfo", tokenResult);
        const { username, avatar } = result.data;
        if (result.code === 200) {
          localStorage.setItem("username", username);
          localStorage.setItem("avatar", avatar);
        }

        router.replace(toPath).then(() => {
          if (route.name === "login") {
            router.replace("/");
          }
        });
      } else {
        message.info("登录失败");
      }
    };

    return {
      ...toRefs(state),
      handleSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  background: url("@/assets/img/logins/login-bg.svg");
  background-size: cover;
  &-form {
    width: calc(100% - 40px);
    height: 380px;
    padding: 4vh;
    margin-top: calc((100vh - 380px) / 2);
    margin-right: 20px;
    margin-left: 20px;
    // background-color: lightblue;
    // background: url("@/assets/img/logins/login-bg-dark.svg");
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    background-color: #efefef;
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        display: inline-block;
        width: 40px;
      }
      h1 {
        margin-bottom: 0;
        font-size: 24px;
        color: #222;
        text-align: center;
      }
    }
    form {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>
