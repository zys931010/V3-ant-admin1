<template>
  <a-layout class="app-wapper">
    <!-- 左sider -->
    <a-layout-sider
      class="app-sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <app-logo :collapsed="collapsed"></app-logo>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <icon-font type="icon-facebook" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 右main -->
    <a-layout>
      <!-- header -->
      <a-layout-header class="app-header" style="background: #fff; padding: 0">
        <a-row>
          <a-col>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
          </a-col>
          <a-col>
            <!-- header右侧头像像信息 -->

            <app-avatar></app-avatar>
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- content -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { reactive, toRefs } from "vue";
import AppAvatar from "@/layout/avatar/index.vue";
import AppLogo from "@/layout/logo/index.vue";

import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

export default {
  components: {
    IconFont,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppAvatar,
    AppLogo,
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
.app-wapper {
  .app-sider {
    left: 0;
    height: 100vh;
    overflow: auto;
  }
}
.app-header {
  padding: 0;
  background: #fff;
  .ant-row {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
</style>
