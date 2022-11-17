<template>
  <div>
    <h1>Prenotazione Sala Riunione</h1>
    <h3>{{ sidebarData.nome }}</h3>
  </div>

  <div class="flex flex-column w-full justify-content-start">
    <label>Data e Ora di Inizio</label>
    <Calendar :minDate="new Date()" v-model="tmpItem.dataora_inizio" :showTime="true" :showSeconds="false"></Calendar>
  </div>
  <div class="flex flex-column w-full justify-content-start my-4">
    <label>Data e Ora di Inizio</label>
    <Calendar :minDate="new Date(tmpItem.dataora_inizio)" v-model="tmpItem.dataora_fine" :showTime="true"
      :showSeconds="false">
    </Calendar>
  </div>

  <div class="flex flex-column w-full justify-content-start my-4">
    <label>Descrizione</label>
    <InputText type="text" v-model="tmpItem.descrizione"></InputText>
  </div>

  <div class="flex justify-content-end w-full">
    <Button label="Prenota" @click="prenotaSala"></Button>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { ref } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarData: Object
})

const store = useStore()
const id_utente = ref(store.state.user.user.id)

const tmpItem = ref({
  id_utente_prenotazione: id_utente.value,
  id_sala: props.sidebarData.id,
  dataora_inizio: '',
  dataora_fine: '',
})

function prenotaSala() {
  const service = new AxiosService('Plugin/PrenotazioneSale')
  service.create(tmpItem.value)
    .then(res => console.log(res))
}

</script>