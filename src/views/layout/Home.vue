<template>
  <div id="home">
    <div class="menu" :class="{ collapsed: collapsed }">
      <menu-list :collapsed="collapsed" />
    </div>
    <div class="show">
      <fixed-header v-model="collapsed" />
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuList from "./components/MenuList";
import FixedHeader from "./components/Header";
export default {
  components: {
    MenuList,
    FixedHeader
  },
  data: () => ({
    collapsed: false
  })
};
</script>

<style lang="less">
#home {
  height: 100%;
  display: flex;

  & > .menu {
    flex: 0 0 auto;
    width: 200px;
    transition: width 0.5s ease-in-out;
    &.collapsed {
      width: 80px;
    }
    > .ant-menu {
      width: 100%;
    }
  }

  & > .show {
    flex: 1 1 auto;
    height: 100%;
  }
}
</style>
