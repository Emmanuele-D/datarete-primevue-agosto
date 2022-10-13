<template>

  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>{{ view.title }}</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Aggiungi Opzione" @click="showSidebar({})" class="p-button=info"></Button>
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
          <Column field="img" header="IMG">
            <template #body="{data}">
              <img style="width:200px" :src="require('../../assets/images/' + data.img)" alt="">
            </template>
          </Column>
          <Column field="nome" header="NOME">
            <template #body="{ data }">
              <h5>{{ data.nome }}</h5>
            </template>
          </Column>
          <Column field="capienza" header="CAPIENZA">
            <template #body="{data}">
              <i class="pi pi-fw pi-user mr-2"></i>{{data.capienza}}
            </template>
          </Column>
          <Column field="dettagli" header="DETTAGLI">
            <template #body="{data}">
              <div class="flex flex-wrap">
                <Chip class="mb-2 mr-2" v-for="(item, i) in data.dettagli" :key="i" :label="item"></Chip>
              </div>
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
    <OptionsManager :sidebarData="sidebarData">
    </OptionsManager>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// import { useConfirm } from "primevue/useconfirm";
// import { useToast } from 'primevue/usetoast'

// import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import OptionsManager from '@/components/sidebars/OptionsManager.vue';

const store = useStore()
// function setContentLoading_true() {
//   store.dispatch('CONTENTLOADING_TRUE')
// }
// function setContentLoading_false() {
//   store.dispatch('CONTENTLOADING_FALSE')
// }
const contentLoading = computed(() => store.getters.contentLoading)

// const confirm = useConfirm()
// const toast = useToast()

const data = ref([
  {
    nome: 'Sala uno',
    img: 'office1.jpg',
    capienza: 4,
    dettagli: ['Proiettore', 'Computer']
  },
  {
    nome: 'Sala due',
    img: 'office2.jpg',
    capienza: 10,
    dettagli: ['Proiettore', 'Computer', 'Bevande calde']
  },
  {
    nome: 'Sala tre',
    img: 'office3.jpg',
    capienza: 2,
    dettagli: []
  },
  {
    nome: 'Sala quattro',
    img: 'office4.jpg',
    capienza: 6,
    dettagli: ['Proiettore', 'Computer', 'Bevande calde']
  },
])

// // GET DATA FOR THE VIEW
// function getViewData() {
//   const serviceGET = new AxiosService(view.endpointGET)
//   setContentLoading_true()
//   serviceGET.read()
//     .then(res => {
//       if (res) {
//         data.value ? data.value.length = 0 : null
//         data.value = res
//         toast.add({ severity: 'success', summary: 'Lista Opzioni Caricata', life: 3000 });
//         setContentLoading_false()
//       }
//     })
//     .catch(err => {
//       toast.add({ severity: 'error', summary: 'Errore nel caricamento della lista delle Opzioni', detail: err, life: 3000 });
//       setContentLoading_false()
//     })
// }

// SETTING VIEW
const view = {
  title: 'Gestione Sale Riunione',
  endpointGET: null,
  endpointPOST: null,
  endpointPUT: null, // /ID
  endpointDELETE: null // /ID
}

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view,
  event: {}
})
function showSidebar(event) {
  sidebarData.value.event = event
  sidebarVisible.value = true
}
function hideSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {
    view: view,
    event: {}
  }
}

// // DELETE OPTION
// function confirmDelete(element) {
//   confirm.require({
//     message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
//     header: 'Conferma Eliminazione',
//     icon: 'pi pi-fw pi-trash',
//     acceptClass: 'p-button-danger',
//     accept: () => {
//       deleteStato(element)
//     },
//     reject: () => {
//       return
//     }
//   })
// }
// const serviceDELETE = new AxiosService(view.endpointDELETE)
// function deleteStato(element) {
//   serviceDELETE.delete(element.id).
//     then(res => {
//       if (res) {
//         toast.add({ severity: 'success', summary: 'Opzione Eliminata', detail: element.nome, life: 3000 });
//         data.value ? data.value.length = 0 : null
//         getViewData()
//       }
//     })
//     .catch(error => {
//       toast.add({ severity: 'error', summary: "Errore nell'eliminazione dell'opzione'", detail: error, life: 3000 });
//       data.value ? data.value.length = 0 : null
//       getViewData()
//     })
// }

// getViewData()
</script>