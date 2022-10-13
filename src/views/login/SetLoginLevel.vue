<template>
  <div class="login-wrapper">
    <form class="form-signin" @submit.prevent="enter">
      <img class="logo mb-1" :src="company.logo" />
      <h1 class="h3 mb-4 font-weight-normal">{{ company.nome }}</h1>

      <h2>Seleziona il livello di Login</h2>

      <Dropdown class="mb-3" v-model="level_selected" :showClear="true" optionLabel="text"
        placeholder="Seleziona un'opzione" :options="level_options"></Dropdown>

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Entra
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AxiosService from "@/axiosServices/AxiosService";

export default {
  name: "SetLoginLevel",
  created() {
    this.level_selected = 0;
    this.service = new AxiosService('Options/GetLoginLevels')
  },
  mounted() {
    this.service.read()
      .then(res => {
        this.level_options = res
      })
  },
  data() {
    return {
      level_selected: 0,
      level_options: [],
    };
  },
  service: null,
  methods: {
    enter() {
      console.log("livello selezionato", this.level_selected);
    },
  },
  computed: {
    ...mapGetters(["company"]),
  },
};
</script>
