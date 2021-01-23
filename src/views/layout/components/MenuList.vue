<template>
  <a-menu
    mode="inline"
    theme="dark"
    :default-selected-keys="selected"
    :default-open-keys="open"
    :inline-collapsed="collapsed"
    v-model="selected"
    :openKeys.sync="open"
  >
    <a-sub-menu v-for="route in $store.state.menuRoutes" :key="route.path">
      <span slot="title">
        <a-icon :type="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </span>
      <a-menu-item v-for="child in route.children" :key="child.name">
        <router-link :to="{ name: child.name }">
          <a-icon :type="child.meta.icon" />
          <span>{{ child.meta.title }} </span>
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    defaultSelected: [],
    defaultoOpen: [],
    selected: [],
    open: []
  }),
  created() {
    const [parent, child] = this.$route.matched;
    this.defaultSelected = this.selected = [child.name];
    this.defaultoOpen = this.open = [parent.path || "/"];
  },
  watch: {
    $route(to) {
      const [parent, child] = to.matched;
      this.selected = [child.name];
      this.open = [parent.path || "/"];
    }
  }
};
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  & > ul {
    height: 100%;
  }
}
</style>
