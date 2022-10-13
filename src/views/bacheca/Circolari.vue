<template>
  <div class="wrapper">
    <h1>Circolari</h1>

    <div v-if="contentLoading">
      <TableSkeleton></TableSkeleton>
    </div>


    <div v-else class="datatable-container">



      <div class=" flex justify-content-between align-items-center  mb-4">

        <Card class="w-100">
          <template #content>
            <div class="w-100 flex justify-content-end align-items-center">

              <!-- <Menubar :model="config.menuItems" class="w-100">

                <template #end>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filtersObj['global'].value" placeholder="Cerca..." />
                  </span>
                </template>
              </Menubar> -->
              <Button @click="showNuovaCircolare" label="Nuova Circolare"></Button>
            </div>
          </template>
        </Card>
      </div>



      <div>
        <Card>
          <template #content>
            <DataTable :value="data" :stripedRows="true" filterDisplay="menu" :paginator="true" :rows="10"
              :resizableColumns="true" :scrollable="true" table-layout="auto" ref="dt">
              <template #header>
                <div style="text-align: right">
                  <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
              </template>
              <Column field="titolo" header="TITOLO">
                <template #body="{ data }">
                  {{ data.titolo }}
                </template>
              </Column>
              <Column field="argomento" header="ARGOMENTO">
                <template #body="{ data }">
                  {{ data.argomento }}
                </template>
              </Column>
              <Column field="priorita" header="PRIORITA">
                <template #body="{ data }">

                  <Tag rounded v-if="data.priorita == 0" severity="success" class="mr-2" value="Bassa"></Tag>
                  <Tag rounded v-if="data.priorita == 1" severity="info" class="mr-2" value="Normale"></Tag>
                  <Tag rounded v-if="data.priorita == 2" severity="warning" class="mr-2" value="Alta"></Tag>
                  <Tag rounded v-if="data.priorita == 3" severity="danger" class="mr-2" value="Urgente"></Tag>
                </template>

              </Column>
              <Column field="data" header="DATA">
                <template #body="{ data }">
                  {{ formatDate(data.dataPubblicazione) }} {{ formatTime(data.dataPubblicazione) }}
                </template>
              </Column>
              <Column field="linkDocumento" header="DOCUMENTO">

                <template #body="{ data }">
                  <Button v-if="data.urlFile.length != 0" icon="pi pi-file" @click="showDocumento(data.urlFile)"
                    class="p-button-rounded p-button-text ml-4" />

                </template>
              </Column>
              <Column field="linkDocumento" header="VISUALIZZAZIONI">
                <template #body="{ data }">
                  <Button icon="pi pi-fw pi-eye" @click="showCircolari"
                    class="p-button-rounded p-button-text ml-4"></Button>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <Dialog header="Visualizzatore documenti by ArkadiaGroup" v-model:visible="showDialogDocumento"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw', height: '60vh' }" :maximizable="true"
    :modal="true">
    <iframe :src="currentLinkCircolare" frameBorder="0" scrolling="auto" width="100%" height="95%"></iframe>
  </Dialog>
  <Sidebar v-model:visible="circolariVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideCircolari')">
    <CircolariViste></CircolariViste>
  </Sidebar>
  <Sidebar v-model:visible="nuovaCircolareVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <NuovaCircolare @event_HideNuovaCircolare="event_HideNuovaCircolare" :sidebarData="nuovaCircolareData">
    </NuovaCircolare>
  </Sidebar>

</template>

<script setup >
import { ref, computed } from 'vue'
// import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from 'vuex'
import TableSkeleton from '../../components/skeletons/TableSkeleton.vue';
import CircolariViste from '@/components/sidebars/CircolariViste.vue';
import AxiosService from '@/axiosServices/AxiosService';
import NuovaCircolare from '@/components/sidebars/NuovaCircolare.vue';

const store = useStore()

const contentLoading = computed(() => store.getters.contentLoading)


// GET LIST CIRCOLARI
const serviceGET = new AxiosService('Circolari/GetCircolari?idCurrentLevel=')
function getViewData() {
  serviceGET.readCustomEndpoint('Circolari/GetCircolari?idCurrentLevel=' + 1)
    .then(res => {
      data.value.length > 0 ? data.value.splice(0) : null
      data.value = res
    })
}

// SIDEBAR NUOVA CIRCOLARE
const nuovaCircolareData = ref({})
const nuovaCircolareVisible = ref(false)
function showNuovaCircolare() {
  nuovaCircolareVisible.value = true
}

function event_HideNuovaCircolare() {
  nuovaCircolareVisible.value = false
  nuovaCircolareData.value = {}
  getViewData()
}


//SIDEBAR VISTE CIRCOLARE
const circolariVisible = ref(false)
function showCircolari() {
  circolariVisible.value = true
}

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};

const data = ref([])

const currentLinkCircolare = ref('')
const showDialogDocumento = ref(false)
function showDocumento(link) {
  currentLinkCircolare.value = ''
  currentLinkCircolare.value = 'https://posadas-core.datarete.cloud/' + link
  showDialogDocumento.value = true
}

function formatDate(value) {

  if (value) {
    return new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return ''
}

function formatTime(value) {
  if (value) {
    return new Date(value).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }
}


getViewData()
</script>