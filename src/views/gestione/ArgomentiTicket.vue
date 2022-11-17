<template>

  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Aggiungi Opzione" @click="showSidebar" class="p-button=info"></Button>
        </div>
      </template>
    </Card>

    <Card>
      <template #content>
        <div v-if="contentLoading">
          <TableSkeleton></TableSkeleton>
        </div>
        <DataTable v-else :value="data" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :scrollable="true" table-layout="auto" ref="dt">
          <Column field="nome" header="Nome">
            <template #body="{ data }">
              {{ data.nome }}
            </template>
          </Column>

          <Column header="Azioni" style="max-width: 200px">
            <template #body="{ data }">
              <Button @click="showSidebar(data)" icon="pi pi-fw pi-pencil"
                class="mr-2 p-button-rounded p-button-info"></Button>
              <Button @click="confirmDelete(data)" icon="pi pi-fw pi-trash"
                class="p-button-rounded p-button-danger"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')">
    <SbArgomentiTicket :sidebarData="sidebarData">
    </SbArgomentiTicket>
  </Sidebar>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import OptionsManager from '@/components/sidebars/OptionsManager.vue';
import SbArgomentiTicket from '@/components/sidebars/sbArgomentiTicket.vue';

const store = useStore()
function setContentLoading_true() {
  store.dispatch('CONTENTLOADING_TRUE')
}
function setContentLoading_false() {
  store.dispatch('CONTENTLOADING_FALSE')
}
const contentLoading = computed(() => store.getters.contentLoading)

const confirm = useConfirm()
const toast = useToast()

const data = ref()

// GET DATA FOR THE VIEW
function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET)
  setContentLoading_true()
  serviceGET.read()
    .then(res => {
      if (res) {
        data.value ? data.value.length = 0 : null
        data.value = res
        toast.add({ severity: 'success', summary: 'Lista Opzioni Caricata', life: 3000 });
        setContentLoading_false()
      }
    })
    .catch(err => {
      toast.add({ severity: 'error', summary: 'Errore nel caricamento della lista delle Opzioni', detail: err, life: 3000 });
      setContentLoading_false()
    })
}

// FILTER BY NATIONS && REGIONS
const nationOptions = ref()
const nationSelected = ref()
function getNations() {
  const service = new AxiosService('Geographic/GetNazioni')
  service.getOptions('Geographic/GetNazioni')
    .then(res => {
      if (res) {
        nationOptions.value = res
      }
    })
}
getNations()
const regionsOptions = ref()
const regionSelected = ref()
function getRegions() {
  const service = new AxiosService('Geographic/GetRegioni')
  service.getOptions('Geographic/GetRegioni/' + nationSelected.value)
    .then(res => {
      if (res) {
        regionsOptions.value = res
      }
    })
}
const provincesOptions = ref()
const provinceSelected = ref()
function getProvinces() {
  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetProvince/' + regionSelected.value)
    .then(res => {
      if (res) {
        provincesOptions.value = res
      }
    })
}
function geoFilter() {
  const service = new AxiosService('Geographic/GetCitta')
  service.getOptions('Geographic/GetCitta/' + provinceSelected.value)
    .then(res => {
      if (res) {
        data.value = res
      }
    })
}

// SETTING VIEW
const view = {
  title: 'Argomenti Ticket',
  // endpointGET: 'Options/Citta',
  // endpointPOST: 'Options/Citta',
  // endpointPUT: 'Options/Citta', // /ID
  // endpointDELETE: 'Options/Citta' // /ID
}

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view,
  event: {}
})
function showSidebar(event) {
  sidebarData.value.event = {
    ...event,
  }
  sidebarVisible.value = true
}

// DELETE OPTION
function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteStato(element)
    },
    reject: () => {
      return
    }
  })
}
const serviceDELETE = new AxiosService(view.endpointDELETE)
function deleteStato(element) {
  serviceDELETE.delete(element.id).
    then(res => {
      if (res) {
        toast.add({ severity: 'success', summary: 'Opzione Eliminata', detail: element.nome, life: 3000 });
        data.value ? data.value.length = 0 : null
        getViewData()
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "Errore nell'eliminazione dell'opzione'", detail: error, life: 3000 });
      data.value ? data.value.length = 0 : null
      getViewData()
    })
}

getViewData()
</script>