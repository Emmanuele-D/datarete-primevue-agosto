<template>
  <div class="wrapper">
    <h1>Pratica: {{ id_pratica }}</h1>
    <div class="grid">
      <dic class="col-3">
        <Card>
          <template #header>
            <div class="bg-gray-800 px-4 text-white">
              Dettagli pratica
            </div>
          </template>
          <template #content>
            <h2 class="mb-4">Prestito</h2>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Numero</span>
              <span class="font-semibold">QT10561</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Inserita</span>
              <span>{{ new Date('2022-11-03').toLocaleDateString('it-IT') }}</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Cliente</span>
              <span>PIGHI MASSIMILIANO</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Agente istituto</span>
              <a href="#" class=" cursor-pointer">Mario Rossi - Younited</a>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Importo</span>
              <span href="#" class="font-semibold"> € 330.000,00</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Durata</span>
              <span href="#" class="font-semibold">25 anni</span>
            </div>
            <Divider></Divider>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Stato pratica</span>
              <Dropdown v-model="statoPraticaSelected" :options="statoPraticaOptions" optionLabel="text"
                optionValue="value" placeholder="Seleziona uno stato" />
            </div>
            <div class="text-gray-500">
              <div class="mb-4 flex justify-content-between">
                <span>Inserito</span>
                <span>{{ new Date('2022-11-03').toLocaleDateString('it') }}</span>
              </div>
              <div class="mb-4 flex justify-content-between">
                <span>In Attesa</span>
                <span>{{ new Date('2022-11-10').toLocaleDateString('it') }}</span>
              </div>
              <div class="font-semibold mb-4 flex justify-content-between">
                <span>Presa in carico</span>
                <span>{{ new Date().toLocaleDateString('it') }}</span>
              </div>
            </div>
          </template>
        </Card>
      </dic>
      <dic class="col-9">
        <Card>
          <template #content>
            <TabView ref="tabview1">
              <TabPanel header="Storico">
                <CrmLayout :showLeftSideMenu="false" :showRightSideMenu="false"></CrmLayout>
              </TabPanel>
              <TabPanel header="Documenti">
                <TestTry2></TestTry2>
              </TabPanel>
              <TabPanel header="Compensi">
                <DataTable :value="compensiData" :stripedRows="true" :paginator="true" :rows="10"
                  :resizableColumns="true" :scrollable="true" table-layout="auto" ref="dt">
                  <Column field="data_inserito" header="Inserito" :sortable="true">
                    <template #body="{ data }">
                      {{ new Date(data.data_inserito).toLocaleDateString('it') }}
                    </template>
                  </Column>
                  <Column field="descrizione" header="Descrizione"></Column>
                  <Column field="tipo" header="Tipo"></Column>
                  <Column field="importo" header="Importo" #body="{ data }">
                    <span
                      :class="{ 'text-pink-500': data.tipo == 'Uscita', 'text-green-500': data.tipo == 'Entrata' }">€ {{
                          data.importo.toFixed(2)
                      }}</span>
                  </Column>
                  <Column field="stato" header="Stato"></Column>
                </DataTable>
              </TabPanel>
              <TabPanel header="Appunti">
                <Textarea :rows="10" v-model="appunti"></Textarea>
                <div class="flex justify-content-end w-full">
                  <Button label="Salva"></Button>
                </div>
              </TabPanel>

              <TabPanel header="Questionari">
                <DataTable :value="questionariData" :stripedRows="true" :paginator="true" :rows="10"
                  :resizableColumns="true" :scrollable="true" table-layout="auto" ref="dt">

                  <Column field="data" header="Data">
                    <template #body="{ data }">
                      {{ data.data.toLocaleDateString('it') }}
                    </template>
                  </Column>
                  <Column field="nome" header="Nome"></Column>
                  <Column field="stato" header="Stato"></Column>
                  <Column field="azioni" header="Azioni">
                    <template #body>
                      <Button @click="showSidebarQuestionari" icon="pi pi-pencil" class="p-button-rounded"></Button>
                    </template>
                  </Column>
                </DataTable>
              </TabPanel>
              <TabPanel header="Altri Impegni">
                <DataTable :value="altriImpegniData" :stripedRows="true" :paginator="true" :rows="10"
                  :resizableColumns="true" :scrollable="true" table-layout="auto" ref="dt">
                  <Column header="Azioni">
                    <template #body="{ data }">
                      <Button @click="showSidebarAltriImpegni(data)" icon="pi pi-pencil" class="p-button-rounded" />
                    </template>
                  </Column>
                  <Column field="tipo" header="Tipo"></Column>
                  <Column field="decorrenza" header="Decorrenza"></Column>
                  <Column field="importo_rata" header="Importo Rata"></Column>
                  <Column field="gestione" header="Gestione"></Column>
                  <Column field="erogato" header="Erogato">
                    <template #body="{ data }">
                      <i v-if="data.erogato" class="pi pi-check"></i>
                      <i v-else class="pi pi-times"></i>
                    </template>
                  </Column>
                  <Column field="istituto" header="Istituto"></Column>
                  <Column field="durata_rate" header="Durata Rate"></Column>
                  <Column field="tan" header="TAN"></Column>
                  <Column field="estingue" header="Estingue">
                    <template #body="{ data }">
                      <i v-if="data.estingue" class="pi pi-check"></i>
                      <i v-else class="pi pi-times"></i>
                    </template>
                  </Column>
                  <Column field="perc_mediazione" header="perc_mediazione"></Column>

                </DataTable>
              </TabPanel>
            </TabView>
          </template>
        </Card>
      </dic>
    </div>
  </div>
  <Sidebar v-model:visible="sidebarAltriImpegniVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <div class="wrapper">
      <h1>Modifica impegno</h1>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Tipo</span>
        <InputText type="text" v-model="sidebarAltriImpegniData.tipo"></InputText>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Decorrenza</span>
        <Calendar v-model="sidebarAltriImpegniData.decorrenza"></Calendar>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Importo Rata</span>
        <InputNumber type="number" v-model="sidebarAltriImpegniData.importo_rata"></InputNumber>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Gestione</span>
        <InputText type="text" v-model="sidebarAltriImpegniData.gestione"></InputText>
      </div>
      <div class="flex w-full justify-content-start gap-4 align-items-center mb-4 ">
        <InputSwitch v-model="sidebarAltriImpegniData.erogato"></InputSwitch>
        <span>Erogato</span>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Istituto</span>
        <InputText type="text" v-model="sidebarAltriImpegniData.istituto"></InputText>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Durata Rate</span>
        <InputNumber type="number" v-model="sidebarAltriImpegniData.durata_rate"></InputNumber>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>TAN</span>
        <InputNumber type="number" v-model="sidebarAltriImpegniData.tan"></InputNumber>
      </div>
      <div class="flex w-full justify-content-start gap-4 align-items-center mb-4 ">
        <InputSwitch v-model="sidebarAltriImpegniData.estingue"></InputSwitch>
        <span>Estingue</span>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Percentuale Mediazione</span>
        <InputNumber type="number" v-model="sidebarAltriImpegniData.perc_mediazione"></InputNumber>
      </div>
      <div class="w-full flex justify-content-end">
        <Button label="Salva"></Button>
      </div>
    </div>
  </Sidebar>
  <Sidebar v-model:visible="sidebarQuestionariVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <div class="wrapper">
      <h1>Quesionario</h1>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <div class="w-full flex justify-content-end">
        <Button label="Salva"></Button>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

import TestTry2 from '../TestTry2.vue';
import CrmLayout from '../CRM/CrmLayout.vue';

const route = useRoute()
const id_pratica = route.params.idPratica

const statoPraticaSelected = ref(2)
const statoPraticaOptions = ref([
  {
    value: 0,
    text: 'Inserita'
  },
  {
    value: 1,
    text: 'In attesa'
  },
  {
    value: 2,
    text: 'Presa in carico'
  },
  {
    value: 3,
    text: 'Chiusa'
  },
])

const compensiData = ref([
  {
    id: 1,
    data_inserito: new Date('2022-11-03'),
    descrizione: 'Agente',
    tipo: 'Uscita',
    importo: 30,
    stato: 'inserito'
  },
  {
    id: 1,
    data_inserito: new Date('2022-11-03'),
    descrizione: 'Agente',
    tipo: 'Entrata',
    importo: 28,
    stato: 'inserito'
  }
])

const questionariData = ref([
  {
    data: new Date('2022-08-12'),
    nome: 'Persona giuridica',
    stato: 'completo'
  },
  {
    data: new Date('2022-07-15'),
    nome: 'Persona fisica',
    stato: 'completo'
  }
])

const sidebarQuestionariVisible = ref(false)
function showSidebarQuestionari(event) {
  sidebarQuestionariVisible.value = true
  console.log(event)
}

const altriImpegniData = ref([
  {
    tipo: 'Prestito',
    decorrenza: '22/11/2022',
    importo_rata: 1170,
    gestione: 'younited',
    erogato: false,
    istituto: 'younited',
    durata_rate: '25 anni',
    tan: '3',
    estingue: true,
    perc_mediazione: 3
  },
  {
    tipo: 'Prestito',
    decorrenza: '11/11/2022',
    importo_rata: 120,
    gestione: '--',
    erogato: true,
    istituto: '--',
    durata_rate: '30 anni',
    tan: '2',
    estingue: false,
    perc_mediazione: 5
  }
])

const sidebarAltriImpegniVisible = ref(false)
const sidebarAltriImpegniData = ref({
  tipo: '',
  decorrenza: '',
  importo_rata: 0,
  gestione: '',
  erogato: '',
  istituto: '',
  durata_rate: 0,
  tan: '',
  estingue: true,
  perc_mediazione: 0
})
function showSidebarAltriImpegni(event) {
  sidebarAltriImpegniVisible.value = true
  sidebarAltriImpegniData.value = { ...event }
}

const appunti = ref('')
</script>
