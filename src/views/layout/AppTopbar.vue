<template>
  <div class="topbar d-flex align-items-center">
    <transition name="expand">
      <div v-if="showHamburger" class="hamburger-wrapper">
        <i class="pi pi-bars hamburger-toggle" @click="onMenuToggle"></i>
      </div>
    </transition>
    <span>
      <span class="fw-bold">Data Rete</span></span>
    <div class="ms-auto d-flex align-items-center">
      <span class="me-2">Ciao,
        <strong>{{
        Object.keys(loggedUser).length != 0 ? loggedUser.nome : "User"
        }}</strong></span>
      <Button disabled class="p-button-sm p-button-secondary text-uppercase me-2 text-center"
        style="min-width: 29px"><strong>{{
        Object.keys(loggedUser).length != 0 ? loggedUser.nome.charAt(0) : "U"
        }}</strong></Button>
      <Button class="p-button-sm p-button-secondary" @click="logout">LogOut</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/auth";
export default {
  props: {
    showHamburger: Number,
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        console.log("logout")
        this.$router.push("login");
      });
    },
  },
  computed: mapGetters(["loggedUser"]),
};
</script>

<style>
.hamburger-wrapper {
  overflow: hidden;
  width: 1.5rem;
  height: 100%;
  display: grid;
  place-content: center left;
}

.hamburger-toggle {
  cursor: pointer;
}

.expand-enter-active,
.expand-leave-active {
  transition-property: width, height;
  transition-duration: 0.4s;
  transition-timing-function: ease-out;
}

.expand-enter-from,
.expand-leave-to {
  width: 0px;
  height: 0px;
}
</style>