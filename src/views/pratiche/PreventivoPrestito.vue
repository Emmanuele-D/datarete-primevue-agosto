<template>
  <div class="wrapper">
    <h1 class="mb-4">Preventivo Prestito</h1>

    <div class="grid">
      <div class="col-12 col-lg-4">
        <Card>
          <template #content>
            <h2 class="mb-4" role="button">
              <span @click="setClienteDataRete" :class="{ 'grey-text': cliente == 'nuovo' }">Cliente DataRete </span>/
              <span @click="setNuovoCliente" :class="{ 'grey-text': cliente == 'datarete' }">Nuovo Cliente</span>
            </h2>

            <div v-if="loading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <div v-if="cliente == 'datarete'" class="flex flex-column w-full">
                <label>Seleziona il cliente</label>
                <Dropdown :options="clientiOptions" optionLabel="text" optionValue="value" v-model="tmpCliente.id"
                  @change="getRetail(tmpCliente.id)">
                </Dropdown>
              </div>
              <div v-else-if="cliente == 'nuovo'">
                <div class="flex flex-column w-full">
                  <label>Nome</label>
                  <InputText type="text" v-model="tmpCliente.nome"></InputText>
                </div>
                <div class="flex flex-column w-full">
                  <label>Cognome</label>
                  <InputText type="text" v-model="tmpCliente.cognome"></InputText>
                </div>
                <div class="flex flex-column w-full">
                  <label>Email</label>
                  <InputText type="text" v-model="tmpCliente.email"></InputText>
                </div>
                <div class="flex flex-column w-full mb-4">
                  <label>Telefono</label>
                  <InputText type="text" v-model="tmpCliente.cellulare"></InputText>
                </div>
                <div class="flex flex-column w-full mb-4">
                  <label>Data di nascita</label>
                  <Calendar v-model="tmpCliente.data_nascita"></Calendar>
                </div>
                <div class="flex flex-column w-full mb-4">
                  <label>Data di assunzione</label>
                  <Calendar v-model="tmpCliente.data_assunzione"></Calendar>
                </div>
                <div class="flex flex-column w-full mb-4">
                  <label>Genere</label>
                  <Dropdown :options="genereOptions" optionLabel="text" optionValue="value" v-model="tmpCliente.genere">
                  </Dropdown>
                </div>
                <div class="flex justify-content-end">
                  <Button :loading="loading" label="Salva"></Button>
                </div>
                <div class="w-full flex  align-items center mt-2">
                  <Checkbox v-model="nuovaAnagrafica" :binary="true"></Checkbox>
                  <label class="ml-2">Salva come nuova anagrafica</label>
                </div>
              </div>
            </div>
          </template>
        </Card>
        <Card class="mt-4">
          <template #content>
            <h2>Prestito personale</h2>
            <div class="flex flex-column w-full">
              <label>Reddito del richiedente</label>
              <InputText type="text" v-model="tmpPrestito.reddito"></InputText>
            </div>
            <div class="flex flex-column w-full">
              <label>Importo richiesto</label>
              <InputText type="text" v-model="tmpPrestito.importo"></InputText>
            </div>
            <div class="flex flex-column w-full mb-4">
              <label>Durata</label>
              <Dropdown type="text" v-model="tmpPrestito.durata" :options="durataOptions"></Dropdown>
            </div>
          </template>
        </Card>
        <div class="flex justify-content-end mt-4">
          <Button label=" paintFakeData" @click="paintFakeData"></Button>
          <Button @click="calcola" :loading="loading" label="Calcola"></Button>
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <div v-for="(item, index) of reducedRisultato" :key="index">
          <Card v-if="item.Stato == ''" class="mb-4 py-4 px-2">
            <template #content>
              <div class="grid ">
                <div class="col-8 flex flex-column align-items-start">
                  <h2 class="mb-2">{{ item.Denominazione_istituto }}</h2>
                  <span> {{ item.Descrizione_prodotto }}</span>
                </div>
                <div v-if="item.logo" class="col-4 flex justify-content-end">
                  <img :src="'https://prestitosi.mediafacile.it/WS/preventivi/partner/' + item.logo">
                </div>
              </div>

              <Divider></Divider>
              <div class="flex justify-content-between">
                <div>
                  <div>IMPORTO EROGATO</div>
                  <div style="font-size:2rem">{{ formateDivise(item.Importo_erogato) }}</div>
                </div>
                <div>
                  <div>TAEG</div>
                  <div style="font-size:2rem">{{ item.TAEG }}</div>
                </div>
                <div>
                  <div>RATA</div>
                  <div style="font-size:2rem">{{ formateDivise(item.Importo_rata) }}</div>
                </div>
              </div>
              <Divider></Divider>
              <div class="grid">
                <div class="col-9">
                  <span>Polizza: </span>
                  <span>{{ item.Descrizione_polizza }}</span>

                </div>
                <div class="col-3 flex justify-content-end">
                  <Button @click="showModal(item)" label="Dettagli" class="p-button-outlined"></Button>
                </div>
              </div>
            </template>
          </Card>

        </div>
        <Divider class="mt-4 mb-4"></Divider>
        <div v-for="(item, index) of reducedRisultato" :key="index">

          <Card v-if="item.Stato.length > 0" class="mb-4 py-4 px-2">
            <template #header>
              <div class="w-full flex justify-content-end pr-4">
                <InlineMessage severity="warn" class="mr-4">Non abilitato</InlineMessage>
              </div>
            </template>
            <template #content>
              <div class="grid ">
                <div class="col-8 flex flex-column align-items-start" style="color:darkgray">
                  <h2 class="mb-2">{{ item.Denominazione_istituto }}</h2>
                  <span> {{ item.Descrizione_prodotto }}</span>
                </div>
                <div v-if="item.logo" class="col-4 flex justify-content-end">
                  <img :src="'https://prestitosi.mediafacile.it/WS/preventivi/partner/' + item.logo">
                </div>
              </div>

              <Divider></Divider>

              <div class="grid ">
                <div class="col-9">
                  <span style="font-weight: bold">Non Abilitato: </span>
                  <span style="color:brown">{{ item.Stato }}</span>

                </div>
                <div class="col-3 flex justify-content-end">
                  <Button disabled @click="showModal(item)" label="Dettagli" class="p-button-outlined"></Button>
                </div>
              </div>
            </template>
          </Card>
        </div>



      </div>
    </div>
  </div>
  <Dialog class="mr-4" :header="tmpItem.Denominazione_istituto" v-model:visible="modalVisible" position="right"
    :breakpoints="{ '960px': '400px', '640px': '300px' }" :style="{ width: '400px' }">

    <div class="flex flex-column ">
      <span style="font-weight:bold">{{ tmpItem.Descrizione_prodotto }}</span>
      <span>{{ tmpItem.Descrizione_polizza }}</span>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>Importo Rata</span>
        <span>{{ formateDivise(tmpItem.Importo_rata) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Durata</span>
        <span>{{ tmpItem.Durata }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Restituito</span>
        <span>{{ formateDivise(tmpItem.Importo_erogato) }}</span>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>Importo Interessi</span>
        <span>{{ formateDivise(tmpItem.Importo_interessi) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Imposta</span>
        <span>{{ formateDivise(tmpItem.Importo_imposta) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Commissione</span>
        <span>{{ formateDivise(tmpItem.Importo_commissione || '0,00') }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Polizza</span>
        <span>{{ formateDivise(tmpItem.Importo_polizza) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Spese Istruttoria</span>
        <span>{{ formateDivise(tmpItem.Importo_spese_registro) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Altre Spese</span>
        <span>{{ formateDivise(tmpItem.Importo_spese_altre) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Provvigione</span>
        <span>{{ formateDivise(tmpItem.Importo_provvigione) }}</span>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>TAN</span>
        <span>{{ tmpItem.TAN }} %</span>
      </div>
      <div class="flex justify-content-between">
        <span>TAEG</span>
        <span>{{ tmpItem.TAEG }} %</span>
      </div>
      <div class="flex justify-content-between">
        <span>TEG</span>
        <span>{{ tmpItem.TEG }} %</span>
      </div>
    </div>
  </Dialog>
</template>

<script setup >
import AxiosService from '@/axiosServices/AxiosService';

import axios from "axios";
import { ref } from 'vue'

const loading = ref(false)


// CLIENTE
const cliente = ref('datarete')
const tmpCliente = ref({})
const nuovaAnagrafica = ref(true)

function setClienteDataRete() {
  resetTmpCliente()
  cliente.value = 'datarete'
}

function setNuovoCliente() {
  resetTmpCliente()
  cliente.value = 'nuovo'
}

const clientiOptions = ref()
function getClienti() {
  loading.value = true
  const service = new AxiosService('Options/getRetails')
  service.read()
    .then(res => clientiOptions.value = res)
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
}

function resetTmpCliente() {
  tmpCliente.value = {}
}

function getRetail(id) {
  loading.value = true
  const service = new AxiosService('Anagrafiche/Retail/' + id)
  service.read()
    .then(res => tmpCliente.value = res)
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
}

const genereOptions = [
  {
    text: 'Uomo',
    value: 'M'
  },
  {
    text: 'Donna',
    value: 'F'
  }
]


// PRESTITO
const tmpPrestito = ref({})
const durataOptions = [10, 15, 20, 25, 30, 35, 40]


//CALCOLA
const risultato = ref()

function calcola() {

  const options = {
    method: 'GET',
    url: 'https://prestitosi.mediafacile.it/fmi/xml/fmresultset.xml',
    params: {
      Passkey: '3A1D8712',
      Tipo_contratto: 'Prestito',
      Cliente: 'Emmanuele Durante',
      Data_nascita: '12-14-1990',
      Data_assunzione: '02-09-2001',
      Sesso: 'M',
      Tipo_rapporto: 'Pubblico',
      Durata: '48',
      Importo_richiesto: '10000',
      Reddito_richiedenti: '70000',
      ID_listino: '0006',
      '-new': '',
      '-lay': 'ws-preventivo',
      '-db': 'mediafacile-ai-prestitosi',
      '-script': 'calcola-preventivi-ws'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });


  // const data_nascita = formatData(tmpCliente.value.data_nascita)
  // const data_assunzione = formatData(tmpCliente.value.data_assunzione)
  // const service = new AxiosService('axios')
  // service.readCustomEndpoint(`https://prestitosi.mediafacile.it/fmi/xml/fmresultset.xml?Passkey=3A1D8712&Tipo_contratto=Prestito&Cliente=${tmpCliente.value.nome}&Data_nascita=${data_nascita}&Data_assunzione=${data_assunzione}&Sesso=${tmpCliente.value.genere}&Tipo_rapporto=Pubblico&Durata=${tmpPrestito.value.durata * 12}&Importo_richiesto=${tmpPrestito.value.importo}&Reddito_richiedenti=${tmpPrestito.value.reddito}&ID_listino=0006&-new&-lay=ws-preventivo&-db=mediafacile-ai-prestitosi&-script=calcola-preventivi-ws`)
  //   .then(res => {
  //     console.log("🚀 ~ file: PreventivoPrestito.vue ~ line 163 ~ calcola ~ res", res)
  //     risultato.value = res
  //   })
}

var parseString = require('xml2js').parseString;
function paintFakeData() {

  axios.get('https://posadas-core.datarete.cloud/Drive/testData.xml')
    .then(response => {
      console.log("🚀 ~ file: PreventivoPrestito.vue ~ line 321 ~ paintFakeData ~ response", response)
      // var self = this;
      parseString(response.data, function (err, result) {
        console.log("🚀 ~ file: PreventivoPrestito.vue ~ line 222 ~ result", result.fmresultset.resultset[0].record)

        result.fmresultset.resultset[0].record.map(item => {
          return item.field.map(field => {
            field.nome = field.$.name
            field.value = field.data[0]
            delete field.$
            delete field.data
          })
        })
        risultato.value = result.fmresultset.resultset[0].record

        risultato.value.forEach(item => {
          const newItem = item.field.filter(field => {

            if (
              field.nome == 'Durata' ||
              field.nome == 'TAEG' ||
              field.nome == 'Importo_rata' ||
              field.nome == 'Importo_erogato' ||
              field.nome == 'Descrizione_prodotto' ||
              field.nome == 'Denominazione_istituto' ||
              field.nome == 'Importo_interessi' ||
              field.nome == 'Importo_imposta' ||
              field.nome == 'Importo_polizza' ||
              field.nome == 'Importo_spese_registro' ||
              field.nome == 'Importo_spese_altre' ||
              field.nome == 'Importo_provvigione' ||
              field.nome == 'TAN' ||
              field.nome == 'TEG' ||
              field.nome == 'Stato' ||
              field.nome == 'Descrizione_polizza' ||
              field.nome == 'logo'
            ) {
              return true
            }
            return false
          })
          filteredRisultato.value.push(newItem)
        })

        filteredRisultato.value.forEach(item => {
          const newItem = item.reduce((obj, item) => ({ ...obj, [item.nome]: item.value }), {});
          reducedRisultato.value.push(newItem)
        })


        console.log("🚀 ~ file: PreventivoPrestito.vue ~ line 228 ~ risultato.value", reducedRisultato.value)
      });
    })
}

const reducedRisultato = ref([])
const filteredRisultato = ref([])


//UTILS
function formatData(data) {
  return data.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replaceAll("/", "-")
}

const tmpItem = ref({})
const modalVisible = ref(false)
function showModal(item) {
  tmpItem.value = {}
  modalVisible.value = true
  tmpItem.value = { ...item }
}

function hideModal() {
  tmpItem.value = {}
  modalVisible.value = false
}

function formateDivise(string) {

  return (parseFloat(string.replace(',', '.'))).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  })
}

// SET UP COMPONENT
getClienti()
</script>

<style lang="scss" scoped>
.grey-text {
  color: grey;
}
</style>