<template>
  <div class="grid w-100">
    <div class="flex flex-column align-items-start 
        col-6 md:col-4">
      <label for="nazione">Nazione</label>
      <div class="flex align-items-center">
        <Dropdown @change="getRegioni(nazioneSelected)" id="nazione" v-model="nazioneSelected" :options="nazioneOptions"
          optionLabel="nome" optionValue="id" placeholder="Seleziona la Nazione">
        </Dropdown>
      </div>
    </div>
    <div class="flex flex-column align-items-start 
        col-6 md:col-4">
      <label for="regione">Regione</label>
      <div class="flex align-items-center">
        <Dropdown @change="getProvince(regioneSelected)" id="regione" v-model="regioneSelected"
          :options="regioneOptions" optionLabel="nome" optionValue="id" placeholder="Seleziona la Regione">
        </Dropdown>

      </div>
    </div>
    <div class="flex flex-column align-items-start 
        col-6 md:col-4">
      <label for="provincia">Provincia</label>
      <div class="flex align-items-center">
        <Dropdown @change="getCitta(provinciaSelected)" id="provincia" v-model="provinciaSelected"
          :options="provinciaOptions" optionLabel="nome" optionValue="id" placeholder="Seleziona la Provincia">
        </Dropdown>

      </div>
    </div>
    <div class="flex flex-column align-items-start 
        col-6 md:col-4">
      <label for="citta">Città</label>
      <div class="flex align-items-center">
        <Dropdown @change="emitGeoFilter" id="citta" v-model="cittaSelected" :options="cittaOptions" optionLabel="nome"
          optionValue="id" placeholder="Seleziona la Città"></Dropdown>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  nazioneSelected: Number,
  regioneSelected: Number,
  provinciaSelected: Number,
  cittaSelected: Number
})


// eslint-disable-next-line no-undef
const emit = defineEmits(['event_geoFilter'])

const isSetup = ref(true)

const nazioneSelected = ref(props.nazioneSelected)
const nazioneOptions = ref([])
async function getNazioni() {

  isSetup.value ? null : restartResetField('regioni')

  const serviceGET = new AxiosService('Options/Geographic/GetNazioni')
  await serviceGET.read()
    .then(res => {
      nazioneOptions.value = res
      if (nazioneSelected.value) {
        getRegioni(nazioneSelected.value)
      }
    })
    .catch(error => console.log(error))
}


const regioneSelected = ref(props.regioneSelected)
const regioneOptions = ref([])
async function getRegioni(idNazione) {
  isSetup.value ? null : restartResetField('province')
  const serviceGET = new AxiosService('Options/Geographic/GetRegioni/' + idNazione)
  await serviceGET.read()
    .then(res => {
      regioneOptions.value = res
      if (regioneSelected.value) {
        getProvince(regioneSelected.value)
      }
    })
    .catch(error => console.log('getRegioni', error))
}


const provinciaSelected = ref(props.provinciaSelected)
const provinciaOptions = ref([])
async function getProvince(idRegione) {
  isSetup.value ? null : restartResetField('citta')
  const serviceGET = new AxiosService('Options/Geographic/GetProvince/' + idRegione)
  await serviceGET.read()
    .then(res => {
      provinciaOptions.value = res
      if (provinciaSelected.value) {
        getCitta(provinciaSelected.value)
      }
    })
    .catch(error => console.log(error))
}

const cittaSelected = ref(props.cittaSelected)
const cittaOptions = ref([])
async function getCitta(idProvincia) {
  const serviceGET = new AxiosService('Options/Geographic/GetCitta/' + idProvincia)
  await serviceGET.read()
    .then(res => {
      cittaOptions.value = res
    })
    .catch(error => console.log(error))
}

function emitGeoFilter() {
  emit('event_geoFilter', {
    idNazione: nazioneSelected.value ? nazioneSelected.value.id : 0,
    idRegione: regioneSelected.value ? regioneSelected.value.id : 0,
    idProvincia: provinciaSelected.value ? provinciaSelected.value.id : 0,
    idCitta: cittaSelected.value ? cittaSelected.value.id : 0,
    Regione: regioneSelected.value ? regioneSelected.value.nome : 0,
    Provincia: provinciaSelected.value ? provinciaSelected.value.nome : 0,
    Citta: cittaSelected.value ? cittaSelected.value.nome : 0
  })
}

function restartResetField(scope) {

  switch (scope) {
    case 'regioni':
      regioneOptions.value.splice(0)
      regioneSelected.value = null
      provinciaOptions.value.splice(0)
      provinciaSelected.value = null
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
    case 'province':
      provinciaOptions.value.splice(0)
      provinciaSelected.value = null
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
    case 'citta':
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
  }

}

async function setupComponent() {
  await getNazioni()
  this.isSetup.value = false
}


setupComponent()
</script>