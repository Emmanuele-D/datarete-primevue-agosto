<template>
  <div class="sidebar no-scrollbar">
    <div class="sidebar-header d-flex justify-content-between align-items-center">
      <div class="logo-image" :style="{ backgroundImage: 'url(' + company.logo + ')' }"></div>
      <i class="double-arrow left" @click="onMenuToggle"></i>
    </div>

    <div v-for="(group, i) of model" :key="i">
      <div class="sidebar-group-lable">{{ group.group }}</div>
      <AppSubmenu :items="group.items" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
    </div>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu";
import { mapGetters } from "vuex";
export default {
  props: {
    model: Array,
  },

  methods: {
    onMenuItemClick() {
      this.$emit("menuitem-click");
    },
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
  },
  components: {
    AppSubmenu: AppSubmenu,
  },
  computed: mapGetters(["company"]),
};
</script>

<style lang="scss">
.double-arrow {
  border: solid #515151;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    padding: 5px;
    top: -6px;
    left: -6px;
    border: solid #2c2c2c;
    border-width: 0 3px 3px 0;
  }

  &.left {
    transform: rotate(135deg);
  }
}
</style>