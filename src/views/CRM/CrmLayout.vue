<template>
  <div class="w-full flex justify-content-between my-4 ">
    <div @click="openSetStato(step)"
      class="clip-path flex justify-content-center align-items-center text-xs bg-blue-200 py-2 px-4 text-black-alpha-90 font-normal border-round-md text-center cursor-pointer"
      :class="{ 'step-attivo': step.id == currentCrm.idLastStatus }" v-for="step in stepsItems" :key="step.label">
      {{ step.nome }}
    </div>
  </div>
  <div class="wrapper grid">
    <div v-if="showLeftSideMenu" class="col-3" style="height: 90vh; overflow-y:scroll">
      <CrmUser :currentCrm="currentCrm" :currentStatoAnagrafica="currentStatoAnagrafica"
        @event_changeType="event_changeType"></CrmUser>
      <CRMQuestionariEScript v-if="showLeftSideMenu" @reloadFeed="reloadFeed"></CRMQuestionariEScript>
    </div>
    <div class="col" style="overflow-y:scroll; height: 90vh">

      <CrmFeed :currentProfile="currentCrm" :reloadFeed="doReloadFeed" @feedReloaded="feedReloaded"></CrmFeed>
    </div>

  </div>




  <Dialog header="Gestisci Stato" v-model:visible="setStatoVisible" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', height: '60vh' }" :modal="true">

    Imposta il nuovo stato <span class="font-bold">{{ statusSelected.nome }}</span>

    <div class="my-4" v-if="statusSelected.child.length > 0">
      <Dropdown :filter="true" class="w-full" :options="statusSelected.child" optionLabel="nome" optionsValue="id"
        v-model="statusSelected.sottostato"></Dropdown>
    </div>
    <div class="my-4" v-if="statusSelected.recallDateRequired">
      <label>Data recall</label>
      <Calendar class=" w-full" v-model="statusSelected.DATA_RECALL"></Calendar>
    </div>
    <div class="my-4" v-if="statusSelected.nome == 'DPR'">
      <label>Data possibile rinnovo</label>
      <Calendar class=" w-full" v-model="statusSelected.DATA_POSSIBILE_RINNOVO"></Calendar>
    </div>
    <div class="my-4" v-if="statusSelected.nome == 'DA RICHIAMARE'">
      <label>Data</label>
      <Calendar class=" w-full" v-model="statusSelected.DATA_DA_RICHIAMARE"></Calendar>
    </div>
    <Divider />

    <div>
      <label>Note</label>
      <Textarea v-model="note"></Textarea>
    </div>

    <div class="w-full flex justify-content-end mt-2">
      <Button
        :disabled="(statusSelected.child.length > 0 && !statusSelected.sottostato) || (statusSelected.nome == 'DPR' && !statusSelected.DATA_POSSIBILE_RINNOVO) || (statusSelected.nome == 'DA RICHIAMARE' && !statusSelected.DATA_DA_RICHIAMARE)"
        :loading="loading" label="Salva" @click="salvaStato"></Button>
    </div>

  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import CrmFeed from './CrmFeed.vue';
// import CrmCreateNewItem from './CrmCreateNewItem.vue';
import CrmUser from './CrmUser.vue';
import CRMQuestionariEScript from './CRMQuestionariEScript.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useRoute } from 'vue-router'
import store from '@/store';

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  showLeftSideMenu: {
    type: Boolean,
    default: true
  },

})
const route = useRoute()
const loading = ref(false)

const stepsItems = ref([])
async function getStati(idPadre) {
  stepsItems.value.splice(0)
  loading.value = true
  let risultato
  const service = new AxiosService('Options/StatiAnagrafiche/GetStati/' + idPadre)
  await service.read()
    .then(res => risultato = res)
    .finally(() => loading.value = false)
  return risultato
}

stepsItems.value = await getStati('0')

function event_changeType(ev) {
  newItemType.value = ev
}
const doReloadFeed = ref(false)
function reloadFeed() {
  doReloadFeed.value = true
}

function feedReloaded() {
  doReloadFeed.value = false
}

const currentCrm = ref()

function getAnagrafica() {
  currentCrm.value = {}
  const serviceGET = new AxiosService('Anagrafiche/Retail/' + route.params.idAnagrafica)
  serviceGET.read().then((res) => {
    currentCrm.value = res
  })
}

const setStatoVisible = ref(false)
const statusSelected = ref()
const statusOptions = ref([])
function getStatusOptions() {
  loading.value = true
  const service = new AxiosService('Options/StatiAnagrafiche/GetStati')
  service.read()
    .then(res => statusOptions.value = res)
    .finally(() => {
      loading.value = false
    })
}

function openSetStato(stato) {
  setStatoVisible.value = true
  statusSelected.value = stato
}

const note = ref()
function salvaStato() {
  const stato = {
    ID_STATO: statusSelected.value.id,
    NOTE: note.value
  }

  if (statusSelected.value.sottostato) {
    stato.ID_SOTTOSTATO = statusSelected.value.sottostato.id
  }

  if (statusSelected.value.DATA_RECALL) {
    stato.DATA_RECALL = statusSelected.value.DATA_RECALL
  }
  if (statusSelected.value.DATA_POSSIBILE_RINNOVO) {
    stato.DATA_POSSIBILE_RINNOVO = statusSelected.value.DATA_POSSIBILE_RINNOVO
  }


  loading.value = true
  const service = new AxiosService('')
  service.updateWithoutId('Anagrafiche/UpdateStatus/' + route.params.idAnagrafica, stato)
    .then(res => console.log(res))
    .finally(() => {
      loading.value = false
      setStatoVisible.value = false
      reloadFeed()
      getCurretnStatoAnagrafica()
      getAnagrafica()
      if (statusSelected.value.DATA_DA_RICHIAMARE) {
        createEvent(statusSelected.value)
      }
    })
}

async function createEvent(event) {
  console.log("???? ~ file: CrmLayout.vue:167 ~ createEvent ~ event", event)

  let numero_di_teledono = null
  let currentGetCrm = null
  const serviceGET = new AxiosService('Anagrafiche/Retail/' + route.params.idAnagrafica)
  serviceGET.read()
    .then((res) => {
      currentGetCrm = res
    })
    .finally(() => {
      currentGetCrm.contatti.forEach(element => {
        if (element.TipoContatto == 'Cellulare') {
          numero_di_teledono = element.valore
        }


        const service = new AxiosService('Calendar/AddEvent')
        service.create({
          id_type: 4,
          id_anagrafica: route.params.idAnagrafica,
          title: 'Richiamare ' + currentCrm.value.nome + ' ' + currentCrm.value.cognome,
          description: numero_di_teledono,
          start: new Date(event.DATA_DA_RICHIAMARE),
          end: new Date(event.DATA_DA_RICHIAMARE),
          partecipanti: [
            {
              id_utente: store.getters.loggedUser.id,
            }
          ]
        })
          .then(res => console.log("DA RICHIAMARE - CREATE EVENT : ", res))
      })
    })





}

const currentStatoAnagrafica = ref()
function getCurretnStatoAnagrafica() {
  currentStatoAnagrafica.value = {}
  const service = new AxiosService('Anagrafiche/GetLastStatusInfo/' + route.params.idAnagrafica)
  service.read()
    .then(res => currentStatoAnagrafica.value = res)

}
getCurretnStatoAnagrafica()


getStatusOptions()
getAnagrafica()
</script>


<style>
.clip-path {
  clip-path: polygon(93% 0, 100% 51%, 93% 99%, 0% 100%, 7% 51%, 0% 0%);
  width: 7%
}

.step-attivo {
  background-color: #2196f3 !important;
  color: white !important;
  font-weight: 700 !important;
}
</style>