<template>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>Gestione Visitatori</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>
    <div class="grid">
      <div class="col-6">
        <h2 class="mb-4">Nuovo visitatore</h2>
        <Card>
          <template #content>
            <form @submit.prevent="handleSubmit">
              <div class="flex flex-column col-12">
                <label for="first-name">Nome</label>
                <InputText id="first-name" type="text" v-model="tempVisitatore.nome_visitatore" />
              </div>
              <div class="flex flex-column col-12">
                <label for="last-name">Cognome</label>
                <InputText id="last-name" type="text" v-model="tempVisitatore.cognome_visitatore" />
              </div>
              <div class="flex flex-column col-12">
                <label for="enterprise">Azienda</label>
                <InputText id="enterprise" type="text" v-model="tempVisitatore.azienda" />
              </div>
              <div class="flex flex-column col-12">
                <label for="target" style="color:grey">Destinatario</label>
                <InputText disabled id="target" type="text" v-model="tempVisitatore.destinatario" />
              </div>
              <div class="flex flex-column col-12">
                <label for="goal">Motivo della visita</label>
                <InputText id="goal" type="text" v-model="tempVisitatore.motivo" />
              </div>
              <div class="flex flex-column col-12">
                <label for="goal">Data della visita</label>
                <Calendar v-model="tempVisitatore.data_visita" :showTime="true" />
              </div>
              <div class="mt-4 flex justify-content-end">
                <Button @click="postVisitor" type="submit" label="Metti in coda"></Button>
              </div>
            </form>
          </template>
        </Card>
      </div>
      <div class="col-6 ">
        <h2 class="mb-4">Visitatori in attesa</h2>

        <VueDraggableNext class="dragArea list-group" :list="visitatori" @change="dragged($event)">
          <Card v-for="(item, i) in visitatori" :key="i" class=" mb-4">
            <template #content>
              <div class="grid">
                <div class="col-6 flex flex-column">
                  <span>
                    <h4>{{item.COGNOME_VISITATORE}} {{ item.NOME_VISITATORE }}</h4>
                  </span>
                  <span><i>{{ item.AZIENDA }}</i></span>
                </div>
                <div class="col-6 flex flex-column justify-content-between">
                  <!-- <span>
                    Per: {{item.destinatario}}
                  </span> -->
                  <span>{{ datetimeToString(item.DATA_VISITA) }}</span>
                  <span>Motivo: {{ item.MOTIVO }}</span>
                </div>
              </div>
              <div class="grid pt-2">
                <div class="col-12 flex justify-content-between">
                  <i role="button" @click="visitatori.splice(i, 1)" class="pi pi-fw pi-trash"></i>
                </div>
              </div>
            </template>
          </Card>
        </VueDraggableNext>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';
import { VueDraggableNext } from 'vue-draggable-next'
import { datetimeToString } from '../../utils/DatetimeUtils'

import { ref } from 'vue';

// GET VISITORS LIST [ON MOUNTED]
const serviceGETVisitors = new AxiosService('Plugin/Visitatori/Lista/')
onMounted(() => {
  getVisitors()
})

function getVisitors() {
  serviceGETVisitors.readCustomEndpoint('Plugin/Visitatori/Lista/2022-08-01/2022-09-13')
    .then(res => {
      visitatori.value.splice(0)
      visitatori.value = res
    })
}

// POST NEW VISITOR
const servicePOSTVisitor = new AxiosService('Plugin/Visitatori/AddVisit/')
function postVisitor() {
  servicePOSTVisitor.create(tempVisitatore.value)
    .then(res => console.log(res))
  getVisitors()
}

const tempVisitatore = ref({
  nome_visitatore: '',
  cognome_visitatore: '',
  azienda: '',
  motivo: '',
  id_user_visita: 1,
  data_visita: '',
  visto: false
})
const visitatori = ref([])

function handleSubmit() {
  const currentVisitatore = { ...tempVisitatore.value }
  visitatori.value.push(currentVisitatore)
}

function dragged(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
}
</script>
