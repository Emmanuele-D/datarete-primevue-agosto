<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast></Toast>
  <div class="wrapper">
    <h1>{{
        pageTitle
    }}</h1>
    <TableBuilder @event_ShowSidebar_eye="goToCrm" @event_ShowSidebar_edit="showEditAnagrafica"
      @event_ShowSidebar_nuovoAppuntamento="$router.push('agenda/calendario')" @event_ShowSidebar_creaPratica="null"
      @event_ShowSidebar_elimina="confirmDelete" :data="tableItems" :headersConfig="columns" :config="config"
      :showAzioni="true">
    </TableBuilder>
    <Sidebar v-model:visible="sidebarClientiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
      <SidebarClienti :sidebarData="sidebarClientiData">
      </SidebarClienti>
    </Sidebar>

    <Sidebar v-model:visible="nuovaAnagraficaVisible" :baseZIndex="10000" position="right" class="p-sidebar-lg">
      <NuovaAnagrafica :sidebarData="nuovaAnagraficaData">
      </NuovaAnagrafica>
    </Sidebar>


    <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
      <SidebarEventi :sidebarData="sidebarEventiData"></SidebarEventi>
    </Sidebar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CRM_POST } from "../../store/actions/crm";
import { useStore } from 'vuex'
import router from '@/router'
import axios from 'axios'
import AxiosService from '../../axiosServices/AxiosService'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from "primevue/useconfirm";



// IMPORT COMPONENTS
import TableBuilder from '../../components/TableBuilder.vue'

// IMPORT SIDEBARS
import SidebarClienti from '../../components/sidebars/SidebarClienti.vue'
import NuovaAnagrafica from '../../components/sidebars/NuovaAnagrafica.vue'
import SidebarEventi from '../../components/sidebars/SidebarEventi.vue'

const confirm = useConfirm()
const toast = useToast()
// SET STORE UTILITIES
const store = useStore()
function setContentLoading_true() {
  store.dispatch('CONTENTLOADING_TRUE')
}
function setContentLoading_false() {
  store.dispatch('CONTENTLOADING_FALSE')
}

// SET EVENTS
// eslint-disable-next-line no-unused-vars, no-undef
const emit = defineEmits(['event_Menubar_Inserisci', 'event_ShowSidebar_elimina'])

// SIDEBAR EVENTI
const sidebarEventiVisible = ref(false)
const sidebarEventiData = ref()
// function showSidebarEventi(event) {
//   sidebarEventiVisible.value = true
//   sidebarEventiData.value = event
// }


// SIDEBAR NUOVA ANAGRAFICA 
const nuovaAnagraficaVisible = ref(false)
const nuovaAnagraficaData = ref()
// function showNuovaAnagrafica() {
//   nuovaAnagraficaVisible.value = true
// }
function hideNuovaAnagrafica() {
  nuovaAnagraficaVisible.value = false
  nuovaAnagraficaData.value = {}
}

// SIDEBAR MODIFICA ANAGRAFICA
function showEditAnagrafica(event) {
  nuovaAnagraficaVisible.value = true
  nuovaAnagraficaData.value = event
}

// SIDEBAR CLIENTI 
const sidebarClientiVisible = ref(false)
const sidebarClientiData = ref()
function showSidebarClienti(event) {
  sidebarClientiData.value = event
  sidebarClientiData.value.callsToCalendar == 0
  sidebarClientiVisible.value = true
}
// function hideSidebarClienti() {
//   sidebarClientiVisible.value = false
// }
function refreshEvents() {
  sidebarClientiData.value.callsToCalendar++
}



// TABLE BUILDER
const config = ref({
  zebra: true,
  menuItems: [
    {
      label: 'Inserisci',
      icon: "pi pi-fw pi-plus",
      items: [
        {
          label: "Nuova Anagrafica",
          command: () => { nuovaAnagraficaVisible.value = true }
        },
      ]
    },
    {
      label: 'Viste',
      icon: 'pi pi-fw pi-file',
      items: []
    }
  ]
})

let pageTitle = ref('')
// // get viste
const viste = ref([])
async function getViews() {
  setContentLoading_true()
  const service = new AxiosService('getTableInfo')
  await service.readCustomEndpoint('https://posadas-core.datarete.cloud/api/Tables/GetTableInfo/1')
    .then(res => {
      if (res) {
        pageTitle.value = res.nome
        res.visualizzazioni.forEach(element => {
          viste.value.push(element)

          // create obj to show "viste list" in the menu
          let visteForMenu = JSON.parse(JSON.stringify(viste.value))
          visteForMenu.map(x => {
            x.label = x.nome
            x.command =
              delete x.nome
          })
          config.value.menuItems[1].items = visteForMenu

        })
      }
    })
  getColumns()
}
// // get columns 
let columns = ref([])
let dateColumns = []
async function getColumns(idVista) {
  const service = new AxiosService('getTableView')

  if (idVista) {
    await service.readCustomEndpoint('https://posadas-core.datarete.cloud/api/Tables/GetTableView/1/' + idVista)
      .then(res => {
        if (res) {
          dateColumns = (res.colonne.filter(column => column.type == "Date")).map(x => x.field)
          columns.value = res.colonne
        }
      })
  } else {
    await service.readCustomEndpoint('https://posadas-core.datarete.cloud/api/Tables/GetTableView/1/' + viste.value[0].id)
      .then(res => {
        if (res) {
          dateColumns = (res.colonne.filter(column => column.type == "Date")).map(x => x.field)
          columns.value = res.colonne
        }
      })
  }
  getTableItems()
  return columns.value
}

// // get rows
let tableItems = ref([])
function getTableItems() {
  axios.get('https://posadas-core.datarete.cloud/api/Anagrafiche/Retail?serverPagination=false&fromIndex=0&takeElements=0&type=clienti', {
    // params: {
    //   // "serverPagination": false,
    //   "fromIndex": 0,
    //   "takeElements": 0,
    //   "type": "clienti"
    // }
  })
    .then(res => {
      if (res) {
        res.data.forEach(element => {
          dateColumns.forEach(keyDate => {
            if (element[keyDate]) {
              element[keyDate] = new Date(element[keyDate])
            }
          })
        })
        tableItems.value = res.data
      }
    })
  setContentLoading_false()
}

// // build table

// GO TO CRM
function goToCrm(ev) {
  console.log("🚀 ~ file: Clienti.vue ~ line 205 ~ goToCrm ~ sidebarClientiData.value", ev)
  store.dispatch(CRM_POST, ev)

  router.push('/crm/' + ev.ID)
}

function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.NOME + " " + element.COGNOME + '"',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteRetail(element)
    },
    reject: () => {
      return
    }
  })
}

function deleteRetail(element) {
  const serviceDELETE = new AxiosService('Anagrafiche/DeleteRetail')
  serviceDELETE.delete(element.id || element.ID).
    then(res => {
      if (res) {
        toast.add({ severity: 'success', summary: 'Opzione Eliminata', detail: element.nome, life: 3000 });
        tableItems.value ? tableItems.value.length = 0 : null
        getTableItems()
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "Errore nell'eliminazione dell'opzione'", detail: error, life: 3000 });
      tableItems.value ? tableItems.value.length = 0 : null
      getTableItems()
    })
}



getViews()

</script>