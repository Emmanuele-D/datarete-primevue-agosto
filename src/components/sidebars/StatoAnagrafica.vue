<template>

  <Toast></Toast>


  <div class="wrapper">
    <div v-if="sidebarData.id">
      <h3 class="mb-4">Modifica Stato Anadrafica</h3>
      <div class="flex flex-column col-12 col-md-5">
        <label for="nome">Nome Stato </label>
        <InputText id="nome" type="text" v-model="sidebarData.nome" />
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="sidebarData.displayLead" :binary="true" @change="toggleDisplayCliente" />
        <label class="ml-3" for="contatto-principale">Lead</label>
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="sidebarData.displayCliente" :binary="true" @change="toggleDispalyLead" />
        <label class="ml-3" for="contatto-principale">Cliente</label>
      </div>
    </div>
    <div v-else>
      <h3 class="mb-4">Nuovo Stato Anadrafica</h3>
      <div class="flex flex-column col-12 col-md-5">
        <label for="nome">Nome Stato </label>
        <InputText id="nome" type="text" v-model="sidebarData.nome" />
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="sidebarData.displayLead" :binary="true" @change="toggleDisplayCliente" />
        <label class="ml-3" for="contatto-principale">Lead</label>
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="sidebarData.displayCliente" :binary="true" @change="toggleDispalyLead" />
        <label class="ml-3" for="contatto-principale">Cliente</label>
      </div>
    </div>
    <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
      <Button label="Salva" @click="save"></Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import AxiosService from '@/axiosServices/AxiosService';

const emit = defineEmits(['event_HideStatoAnagrafica', 'event_refreshList'])

const servicePOST = new AxiosService('Options/StatiAnagrafiche/AddStato')
const servicePUT = new AxiosService('Options/StatiAnagrafiche/UpdateStato')
const toast = useToast()

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})


function toggleDisplayCliente() {
  if (props.sidebarData.displayCliente) {
    props.sidebarData.displayCliente = false
  }
}
function toggleDispalyLead() {
  if (props.sidebarData.displayLead) {
    props.sidebarData.displayLead = false
  }
}


function save() {
  if (props.sidebarData.id) {
    servicePUT.update(props.sidebarData)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: props.sidebarData.nome, life: 3000 });
          emit('event_refreshList')
          emit('event_HideStatoAnagrafica')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Errore nella modifica dello stato', detail: error, life: 3000 });
        emit('event_refreshList')
        emit('event_HideStatoAnagrafica')
      })
  } else {
    servicePOST.create(props.sidebarData)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: props.sidebarData.nome, life: 3000 });
          emit('event_refreshList')
          emit('event_HideStatoAnagrafica')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Errore nella creazione dello stato', detail: error, life: 3000 });
        emit('event_refreshList')
        emit('event_HideStatoAnagrafica')
      })
  }
}
</script>