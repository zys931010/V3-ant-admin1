<template>
  <div class="app-logo">
    <img src="@/assets/img/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">vue3-admin</h2>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    collapsed: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    color: white;
    margin-bottom: 0;
  }
}
</style>
