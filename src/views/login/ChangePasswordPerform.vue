<template>
  <div class="login-wrapper">
    <form class="form-signin" @submit.prevent="request">
      <img class="logo mb-1" :src="company.logo" />
      <h1 class="h3 mb-4 font-weight-normal">{{ company.nome }}</h1>

      <h2>Cambia password</h2>
      <div class="grid justify-content-center mt-4">
        <div class="col-12">
          <h5>Nuova Password</h5>
          <Password v-model="newPassword" toggleMask></Password>
        </div>
        <div class="col-12">
          <h5>Conferma Password</h5>
          <Password v-model="confirmPassword" toggleMask></Password>
        </div>
        <div class="col-12 mt-4">
          <button :disabled="!newPasswordCheck" @click="perform" class="btn btn-lg btn-primary btn-block" type="submit">
            Cambia password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AxiosService from "@/axiosServices/AxiosService";

export default {
  name: "ChangePasswordPerform",
  data() {
    return {
      invalid: false,
      newPassword: "",
      confirmPassword: "",
      email: "",
      emailCode: ''
    };
  },
  service: null,
  created() {
    this.service = new AxiosService('ChangePassword/')
    this.emailCode = this.$route.params.code
  },
  methods: {
    perform() {

      if (this.newPasswordCheck) {
        this.service.updateCustomEndpoint('ChangePassword/Perform/' + this.emailCode + '/' + this.newPasswordCheck).then(res => {
          if (res) {
            this.$router.push("login");
          } else {
            this.$router.push("changepasswordrequest");
          }
        })
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapGetters(["company"]),
    newPasswordCheck() {
      return this.newPassword == this.confirmPassword ? this.confirmPassword : false
    }
  },
};
</script>
