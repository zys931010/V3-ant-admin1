<template>
  <div class="app-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar"></a-avatar>
        {{ username }}
        <DownOutlined />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="Logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { DownOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";

export default {
  name: "AppAvatar",
  components: { DownOutlined },
  setup() {
    const store = useStore();
    // 全局路由
    const router = useRouter();
    // 当前页面路由
    const route = useRoute();

    const state = reactive({
      avatar: store.getters.avatar,
      username: store.getters.username,
    });

    const Logout = () => {
      Modal.confirm({
        title: "您确定要退出登录吗？",
        onOk() {
          store.dispatch("LogoutResult").then(() => {
            message.success("成功退出登录");
            router.replace({
              name: "login",
              query: {
                redirect: route.fullPath,
              },
            });
          });
        },
      });
    };

    return {
      ...toRefs(state),
      Logout,
    };
  },
};
</script>

<style lang="less" scoped>
.app-avatar {
  .ant-dropdown-line {
    display: block;
    min-height: 64px;
    cursor: pointer;
  }
}
</style>
