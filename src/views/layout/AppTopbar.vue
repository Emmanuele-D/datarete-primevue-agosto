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
            (loggedUser).id ? loggedUser.nome : "User"
        }}</strong>
      </span>
      <div class="grid-center">
        <Avatar v-if="loggedUser.imgprofilo" class="mr-2" :image="loggedUser.imgprofilo"></Avatar>
        <Avatar v-else class="mr-2" :label="(loggedUser).id ? loggedUser.nome.slice(0, 1) : 'U'"></Avatar>
      </div>

      <Button class="p-button-sm p-button-secondary" @click="logout">LogOut</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/auth";
import Avatar from "primevue/avatar";
import AxiosService from "@/axiosServices/AxiosService";
export default {
  props: {
    showHamburger: Number,
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    logout: function () {
      const service = new AxiosService('Auth/Logout')
      service.create().then(res => console.log(res)).catch(err => console.log(err))
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        console.log("logout");
        this.$router.push("login");
      });
    },
  },
  computed: mapGetters(["loggedUser"]),
  components: { Avatar }
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