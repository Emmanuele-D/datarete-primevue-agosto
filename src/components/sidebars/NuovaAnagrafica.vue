<template>

  <Toast></Toast>



  <div class="wrapper">
    <h1>Nuova Anagrafica Clienti</h1>
    <Card class="mb-4">
      <template #title>Dati Anagrafici</template>
      <template #content>
        <div class="grid p-input-filled form-group">

          <div class="flex flex-column col-12 col-lg-6">
            <label for="first-name">Nome</label>
            <InputText id="first-name" type="text" v-model="anagraficaClienti.nome" />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="last-name">Cognome</label>
            <InputText id="last-name" type="text" v-model="anagraficaClienti.cognome" />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="email">Email</label>
            <InputText id="email" type="email" v-model="anagraficaClienti.email" />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="codice-fiscale">Codice Fiscale</label>
            <InputText id="codice-fiscale" type="text" v-model="anagraficaClienti.codiceFiscale" />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="sex">Sesso</label>
            <Dropdown id="sex" :showClear="true" :options="options.sex" v-model="anagraficaClienti.idSesso"
              optionValue="value" optionLabel="text" placeholder="Seleziona un'opzione"></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="birth-date">Data di nascita</label>
            <Calendar id="birth-date" v-model="anagraficaClienti.dataNascita" dateFormat="dd-mm-yy" />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Cittadinanza</label>
            <InputText id="citizenship" type="text" v-model="anagraficaClienti.cittadinanza" />
          </div>

          <ChooserGeography :nazioneSelected="anagraficaClienti.idNazioneNascita"
            :regioneSelected="anagraficaClienti.idRegioneNascita"
            :provinciaSelected="anagraficaClienti.idProvinciaNascita" :cittaSelected="anagraficaClienti.idCittaNascita"
            @event_geoFilter="populateTempItemFromGeoFilter($event, anagraficaClienti)"></ChooserGeography>
          <!-- <div class="flex flex-column col-12 col-lg-3">
            <label for="birth-nation">Nazione Nascita</label>
            <Dropdown id="birth-nation" :showClear="true" :options="options.birthNation" optionLabel="nome"
              optionValue="id" placeholder="Seleziona un'opzione" v-model="anagraficaClienti.idNazioneNascita"
              @change="getRegions(anagraficaClienti.idNazioneNascita)"></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-3">
            <label for="birth-region">Regione Nascita</label>
            <Dropdown id="birth-nation" :showClear="true" :options="options.birthRegion" optionLabel="nome"
              optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
              emptyMessage="Seleziona prima una nazione..." placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idRegioneNascita" @change="getProvinces(anagraficaClienti.idRegioneNascita)"
              :filter="true">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-3">
            <label for="birth-province">Provincia Nascita</label>
            <Dropdown id="birth-province" :showClear="true" :options="options.birthProvince" optionLabel="nome"
              optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
              emptyMessage="Seleziona prima una regione..." placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idProvinciaNascita" @change="getCities(anagraficaClienti.idProvinciaNascita)"
              :filter="true">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-3">
            <label for="birth-city">Città Nascita</label>
            <Dropdown id="birth-city" :showClear="true" :options="options.birthCity" optionLabel="nome" optionValue="id"
              emptyFilterMessage="Nessuna corrispondenza trovata" emptyMessage="Seleziona prima una provincia..."
              placeholder="Seleziona un'opzione" v-model="anagraficaClienti.idCittaNascita" :filter="true"></Dropdown>
          </div> -->
          <div class="flex flex-column col-12 col-lg-4">
            <label for="marital-status">Stato Civile</label>
            <Dropdown id="marital-status" :showClear="true" :options="options.maritalStatus" optionLabel="text"
              optionValue="value" placeholder="Seleziona un'opzione" v-model="anagraficaClienti.idStatoCivile">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="job-activity-type">Tipo Occupazione</label>
            <Dropdown id="job-activity-type" :showClear="true" :options="options.jobActivityType" optionLabel="text"
              optionValue="value" placeholder="Seleziona un'opzione" v-model="anagraficaClienti.idTipoOccupazione">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="job">Professione</label>
            <InputText id="job" type="text" v-model="anagraficaClienti.professione" />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="contract-date">Data di assunzione</label>
            <Calendar id="contract-date" v-model="anagraficaClienti.dataAssunzione" dateFormat="dd-mm-yy" />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="expiration-date">Data di scadenza contratto</label>
            <Calendar :disabled="anagraficaClienti.contrattoIndeterminato" id="expiration-date"
              v-model="anagraficaClienti.dataScadenzaContratto" dateFormat="dd-mm-yy" />
            <div class="flex align-items-center">
              <Checkbox inputId="undetermined" v-model="anagraficaClienti.contrattoIndeterminato" :binary="true"
                @change="resetExpirationDate" />
              <label for="undetermined" style="margin:  1rem">Indeterminato</label>
            </div>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Nome Azienda</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.nomeAzienda" />
          </div>
          <div class="flex align-items-center col-12 col-lg-4">
            <Checkbox inputId="undetermined" v-model="anagraficaClienti.personaPoliticamenteEsposta" :binary="true" />
            <label for="undetermined" style="margin:  1rem">Persona politicamente esposta</label>
          </div>
          <div class="flex align-items-center col-12 col-lg-4">
            <Checkbox inputId="undetermined" v-model="anagraficaClienti.guidatoreAbituale" :binary="true" />
            <label for="undetermined" style="margin:  1rem">Guidatore abituale</label>
          </div>
        </div>



      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Indirizzi</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.indirizzi" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="indirizzo">
            <div class="flex flex-column col-12 ">
              <label :for="'indirizzo-tipo-' + index">Tipo indirizzo</label>
              <Dropdown :options="tipiIndirizzoOptions" optionLabel="text" optionValue="value"
                v-model="item.idTipoIndirizzo"></Dropdown>
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label :for="'indirizzo-' + index">Indirizzo</label>
              <InputText :id="'indirizzo-' + index" type="text" v-model="item.indirizzo" />
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label :for="'n-civico-' + index">N. Civico</label>
              <InputText :id="'n-civico-' + index" type="text" v-model="item.numeroCivico" />
            </div>
            <ChooserGeography :nazioneSelected="item.idNazione" :regioneSelected="item.idRegione"
              :provinciaSelected="item.idProvincia" :cittaSelected="item.idCitta"
              @event_geoFilter="populateTempItemFromGeoFilter($event, item)"></ChooserGeography>
            <!-- <div class="flex flex-column col-12 col-lg-3">
              <label for="birth-nation">Nazione </label>
              <Dropdown id="birth-nation" :showClear="true" :options="options.birthNation" optionLabel="nome"
                optionValue="id" placeholder="Seleziona un'opzione" v-model="item.idNazione"
                @change="getRegions(item.idNazione)"></Dropdown>
            </div>
            <div class="flex flex-column col-12 col-lg-3">
              <label for="birth-region">Regione </label>
              <Dropdown id="birth-nation" :showClear="true" :options="options.birthRegion" optionLabel="nome"
                optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una nazione..." placeholder="Seleziona un'opzione"
                v-model="item.idRegione" @change="getProvinces(item.idRegione)" :filter="true">
              </Dropdown>
            </div>
            <div class="flex flex-column col-12 col-lg-3">
              <label for="birth-province">Provincia </label>
              <Dropdown id="birth-province" :showClear="true" :options="options.birthProvince" optionLabel="nome"
                optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una regione..." placeholder="Seleziona un'opzione"
                v-model="item.idProvincia" @change="getCities(item.idProvincia)" :filter="true">
              </Dropdown>
            </div>
            <div class="flex flex-column col-12 col-lg-3">
              <label for="birth-city">Città </label>
              <Dropdown id="birth-city" :showClear="true" :options="options.birthCity" optionLabel="nome"
                optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una provincia..." placeholder="Seleziona un'opzione"
                v-model="item.idCitta" :filter="true"></Dropdown>
            </div> -->
          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i @click="anagraficaClienti.indirizzi.splice(index, 1)" role="button" class="pi pi-trash"
              style="font-size: 1.7rem"></i>

          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.indirizzi.length == 0">Inserisci un nuovo indirizzo </span><i
            @click="addRowIndirizzi" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Contatti</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.contatti" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="contatto">
            <div class="flex flex-column col-12 ">
              <label :for="'contatto-tipo-' + index">Tipo contatto</label>
              <Dropdown :options="tipiContattoOptions" optionLabel="text" optionValue="value"
                v-model="item.idTipoContatto"></Dropdown>
            </div>
            <div class="flex flex-column col-12 col-md-5">
              <label :for="'contatto-nome-' + index">Nome Contatto</label>
              <InputText :id="'contatto-nome-' + index" type="text" v-model="item.nome" />
            </div>
            <div class="flex flex-column col-12 col-md-5">
              <label :for="'contatto-valore-' + index">Contatto</label>
              <InputText :id="'contatto-valore-' + index" type="text" v-model="item.valore" />
            </div>
            <div class="flex justify-content-center align-items-end col-12 col-md-2">
              <Checkbox class="contatti" :disabled="item.principale" inputId="contatto-principale"
                v-model="item.principale" :binary="true" @change="checkOnlyOnePrincipale(index)" />
              <label class="ml-3" for="contatto-principale">Principale</label>
            </div>
          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i v-if="!item.principale" @click="anagraficaClienti.contatti.splice(index, 1)" role="button"
              class="pi pi-trash pb-1" style="font-size: 1.5rem"></i>
          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.contatti.length == 0">Inserisci un nuovo contatto </span>
          <i @click="addRowContatti" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Documenti</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.documenti" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="documento">
            <div class="flex flex-column col-12 ">
              <label :for="'documento-tipo-' + index">Tipo documento</label>
              <Dropdown :options="tipidocumentoOptions" optionLabel="text" optionValue="value"
                v-model="item.idTipoDocumento"></Dropdown>
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label :for="'doc-numero-' + index">Numero</label>
              <InputText :id="'doc-numero-' + index" type="text" v-model="item.numero" />
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label :for="'doc-rilasciato-da-' + index">Rilasciato da</label>
              <InputText :id="'doc-rilasciato-da-' + index" type="text" v-model="item.rilasciatoDa" />
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label>Data di Rilascio</label>
              <Calendar v-model="item.dataRilascio" :minDate="new Date()"></Calendar>
            </div>
            <div class="flex flex-column col-12 col-lg-6">
              <label>Data di Scadenza</label>
              <Calendar v-model="item.dataScadenza" :minDate="item.dataRilascio || new Date()"></Calendar>
            </div>

          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i @click="anagraficaClienti.documenti.splice(index, 1)" role="button" class="pi pi-trash"
              style="font-size: 1.7rem"></i>

          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.documenti.length == 0">Inserisci un nuovo documento </span><i
            @click="addRowDocumenti" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="flex justify-content-end mt-4">
          <Button :loading="loading" label="Salva" @click="saveForm"></Button>
        </div>
      </template>
    </Card>
  </div>



</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '../../axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast';
import ChooserGeography from '@/components/ChooserGeography.vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['event_refreshList', 'event_HideNuovaAnagrafica'])
const toast = useToast()


//GET SIDEBARDATA
function setupSidebar() {
  if (props.sidebarData) {

    const serviceGET = new AxiosService('Anagrafiche/Retail/' + props.sidebarData.id)
    serviceGET.read().then(res => anagraficaClienti.value = res).catch(err => console.log(err))

    // Object.assign(anagraficaClienti.value, props.sidebarData);
  }
}

//CLOSE SIDEBAR
function closeSidebar() {
  anagraficaClienti.value = {
    NOME: '',
    COGNOME: '',
    CODICE_FISCALE: '',
    ID_SESSO: "",
    NASCITA_DATA: '',
    CITTADINANZA: '',
    NASCITA_NAZIONE_ID: '',
    NASCITA_REGIONE_ID: '',
    NASCITA_PROVINCIA_ID: '',
    NASCITA_CITTA_ID: '',
    ID_STATO_CIVILE: '',
    ID_TIPO_OCCUPAZIONE: '',
    PROFESSIONE: '',
    DATA_ASSUNZIONE: '',
    DATA_SCADENZA_CONTRATTO: '',
    CONTRATTO_INDETERMINATO: '',
    DENOMINAZIONE_AZIENDA: '',
    POLITICAMENTE_ESPOSTO: false,
    GUIDATORE_ABILE: false,
    indirizzi: [],
    contatti: [],
    documenti: [],
    indirizziDelete: [],
    contattiDelete: [],
    documentiDelete: []
  }
  emit('event_HideNuovaAnagrafica')
}

function checkOnlyOnePrincipale(index) {
  anagraficaClienti.value.contatti.forEach((element, i) => {
    if (i != index)
      element.principale = false
  })
}

function addRowDocumenti() {
  anagraficaClienti.value.documenti.push({
    id: 0,
    idTipoDocumento: 0,
    numero: null,
    rilasciatoDa: null,
    dataRilascio: null,
    dataScadenza: null,
    idProvinciaRilascio: 0,
    idCittaRilascio: 0
  })
}

function addRowContatti() {
  let object = {
    id: 0,
    idTipoContatto: 0,
    nome: null,
    valore: null,
    principale: false
  }
  if (!anagraficaClienti.value.contatti.length) {
    object.principale = true
  }
  anagraficaClienti.value.contatti.push(object)
}

function addRowIndirizzi() {
  anagraficaClienti.value.indirizzi.push({
    id: 0,
    idTipoIndirizzo: 0,
    indirizzo: "",
    numeroCivico: "",
    idNazione: 0,
    idRegione: 0,
    idProvincia: 0,
    idCitta: 0
  })
}
const loading = ref(false)
function saveForm() {
  loading.value = true
  const servicePOST = new AxiosService('Anagrafiche/AddRetail')
  const servicePUT = new AxiosService('Anagrafiche/SaveRetail')
  if (anagraficaClienti.value.ID || anagraficaClienti.value.id) {
    servicePUT.update(anagraficaClienti.value)
      .then(() => {
        toast.add(
          {
            severity: 'success',
            summary: 'Anagrafica Clienti modificata',
            detail: anagraficaClienti.value.NOME,
            life: 3000
          }
        )
        emit('event_refreshList')
        emit('event_HideNuovaAnagrafica')
      })
      .catch(error => {
        toast.add(
          {
            severity: 'error',
            summary: "Errore nella modifica dell'anagrafica",
            detail: error,
            life: 3000
          }
        )
        emit('event_refreshList')
        emit('event_HideNuovaAnagrafica')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    servicePOST.create(anagraficaClienti.value)
      .then(res => {
        if (res) {
          toast.add(
            {
              severity: 'success',
              summary: 'Nuova Anagrafica Clienti creata',
              detail: anagraficaClienti.value.NOME,
              life: 3000
            }
          )
          emit('event_refreshList')
          emit('event_HideNuovaAnagrafica')
        }
      })
      .catch(error => {
        toast.add(
          {
            severity: 'error',
            summary: "Errore nella creazione dell'anagrafica",
            detail: error,
            life: 3000
          }
        )
        emit('event_refreshList')
        emit('event_HideNuovaAnagrafica')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function resetExpirationDate() {
  anagraficaClienti.value.dataScadenzaContratto = ''
}

function getSex() {
  const service = new AxiosService('GetSesso')
  service.getOptions('GetSesso')
    .then(res => {
      if (res) {
        options.value.sex.push(...res)
      }
    })
}
getSex()


function getMaritalStatus() {
  const service = new AxiosService('GetStatoCivile')
  service.getOptions('GetStatoCivile')
    .then(res => {
      if (res) {
        options.value.maritalStatus.push(...res)
      }
    })
}
getMaritalStatus()

function jobActivityType() {
  const service = new AxiosService('GetTipoOccupazione')
  service.getOptions('GetTipoOccupazione')
    .then(res => {
      if (res) {
        options.value.jobActivityType.push(...res)
      }
    })
}
jobActivityType()

function getNations() {
  const service = new AxiosService('Geographic/GetNazioni')
  service.getOptions('Geographic/GetNazioni')
    .then(res => {
      if (res) {
        options.value.birthNation.push(...res)
      }
    })
}
getNations()

function getRegions(idNation) {

  options.value.birthRegion.splice(0)
  options.value.birthProvince.splice(0)
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetRegioni/' + idNation)
    .then(res => {
      if (res) {
        options.value.birthRegion.push(...res)
      }
    })
}

function getProvinces(idRegion) {
  options.value.birthProvince.splice(0)
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetProvince/' + idRegion)
    .then(res => {
      if (res) {
        options.value.birthProvince.push(...res)
      }
    })
}

function getCities(idProvince) {
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetCitta')

  service.getOptions('Geographic/GetCitta/' + idProvince)
    .then(res => {
      if (res) {
        options.value.birthCity.push(...res)
      }
    })
}

const anagraficaClienti = ref({
  nome: '',
  cognome: '',
  codiceFiscale: '',
  idSesso: "",
  dataNascita: '',
  cittadinanza: '',
  idNazioneNascita: '',
  idRegioneNascita: '',
  idProvinciaNascita: '',
  idCittaNascita: '',
  idStatoCivile: '',
  idTipoOccupazione: '',
  professione: '',
  dataAssunzione: '',
  dataScadenzaContratto: '',
  contrattoIndeterminato: '',
  nomeAzienda: '',
  personaPoliticamenteEsposta: false,
  guidatoreAbituale: false,
  indirizzi: [],
  contatti: [],
  documenti: [],
  indirizziDelete: [],
  contattiDelete: [],
  documentiDelete: []
})

const options = ref({
  sex: [],
  birthNation: [],
  birthRegion: [],
  birthProvince: [],
  birthCity: [],
  maritalStatus: [],
  jobActivityType: []
})

function populateTempItemFromGeoFilter(event, item) {
  item.idNazione ? item.idNazione = event.idNazione : item.idNazioneNascita = event.idNazione
  item.idRegione ? item.idRegione = event.idRegione : item.idRegioneNascita = event.idRegione
  item.idProvincia ? item.idProvincia = event.idProvincia : item.idProvinciaNascita = event.idProvincia
  item.idCitta ? item.idCitta = event.idCitta : item.idCittaNascita = event.idCitta

}

const tipiIndirizzoOptions = ref()
function getTipiIndirizzo() {
  const serviceGET = new AxiosService('Options/GetTipoIndirizzo')
  serviceGET.read().then(res => tipiIndirizzoOptions.value = res).catch(err => console.log(err))
}

getTipiIndirizzo()

const tipidocumentoOptions = ref()
function getTipiDocumento() {
  const serviceGET = new AxiosService('Options/GetTipoDocumento')
  serviceGET.read().then(res => tipidocumentoOptions.value = res).catch(err => console.log(err))
}

getTipiDocumento()

const tipiContattoOptions = ref()
function getTipiContatto() {
  const serviceGET = new AxiosService('Options/GetTipoContatto')
  serviceGET.read().then(res => tipiContattoOptions.value = res).catch(err => console.log(err))
}


setupSidebar()

getTipiContatto()
</script>