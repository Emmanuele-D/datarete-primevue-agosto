<template>
  <Toast></Toast>
  <div>

    <TabView>
      <TabPanel header="Status">
        <Card>
          <template #content>
            <Dropdown class="mb-4 w-full" v-model="statusSelected" :options="statusOptions" optionLabel="text"
              placeholder="Seleziona lo Status" />

            <Dropdown v-if="statusSelected && statusSelected.substatusOptions" class="mb-4 w-full"
              v-model="substatusSelected" :options="statusSelected.substatusOptions" optionLabel="text"
              placeholder="Seleziona il Sotto-Status" />
            <Divider />

            <div v-if="statusSelected" class="flex flex-column">
              <div v-if="statusSelected.value == 4" class="flex flex-column">
                <label>Data prossimo rinnovo</label>
                <Calendar v-model="dataProssimoRinnovo" :minDate="new Date()"></Calendar>
              </div>
              <div v-if="statusSelected.value == 4" class="flex flex-column">
                <label>Data ricontatto</label>
                <Calendar v-model="dataProssimoRinnovo" :minDate="new Date()"></Calendar>
              </div>
            </div>

            <div>
              <label>Note</label>
              <Textarea v-model="note"></Textarea>
            </div>

            <div class="w-full flex justify-content-end mt-2">
              <Button :loading="loading" label="Salva"></Button>
            </div>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Script">
        <Card style="height: 100%; overflow-y:scroll">
          <template #content>
            <Dropdown class="mb-4 w-full" v-model="scriptSelected" :options="scriptsOptions" optionLabel="titolo"
              optionValue="testo" placeholder="Seleziona lo Script" />
            <Divider />

            <span v-if="scriptSelected" v-html="scriptSelected"></span>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Questionari">
        <Card>
          <template #content>
            <Dropdown @change="resetTmpRispostaQuestionario" class="mb-4 w-full" v-model="questionarioSelected"
              :options="questionariOptions" optionLabel="title" placeholder="Seleziona il Questionario" />
            <Divider />
            <div class="question" v-for="question of questionarioSelected.questions" :key="question.id">

              <h5 class="mt-4">{{ question.question }}</h5>
              <Dropdown class="w-full mb-4" v-model="tmpRispostaQuestionario[question.question]"
                :options="question.answers" optionLabel="answer" optionValue="answer"></Dropdown>

            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button :loading="loading" @click="salvaQuestionarioComeNota" label="Salva"></Button>
            </div>
          </template>
        </Card>
      </TabPanel>
    </TabView>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

// eslint-disable-next-line no-undef
const emits = defineEmits(['reloadFeed'])

const loading = ref(false)
const route = useRoute()
const toast = useToast()

const scriptSelected = ref('')
const scriptsOptions = ref([])

const serviceGETScripts = new AxiosService('Script/GetScripts')
function getScripts() {
  loading.value = true
  serviceGETScripts.read()
    .then(res => {
      if (res) {
        scriptsOptions.value = res
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const questionarioSelected = ref('')
const questionariOptions = ref([])
const tmpRispostaQuestionario = ref({ oggetto: null, messaggio: [] })

const serviceGETQuestionari = new AxiosService('Surveys/GetSurveys')
function getQuestionari() {
  loading.value = true
  questionariOptions.value.splice(0)
  serviceGETQuestionari.read()
    .then(res => {
      if (res) {
        questionariOptions.value = res
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

function resetTmpRispostaQuestionario() {
  tmpRispostaQuestionario.value = {}
}

function salvaQuestionarioComeNota() {

  loading.value = true
  const servicePOST = new AxiosService('Crm/InsertCrmRecord/' + route.params.idAnagrafica)

  const nuovaNota = {
    oggetto: questionarioSelected.value.title,
    data: new Date(),
    id_type: 1,
    messaggio: ''
  }

  const entries = Object.entries(tmpRispostaQuestionario.value)

  entries.forEach(entry => {
    nuovaNota.messaggio = nuovaNota.messaggio + '<p><strong>' + entry[0] + '</strong></p><p>' + entry[1] + '</p><br>'
  })

  servicePOST.create(nuovaNota)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Nuova risposta al questionario registrata',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch((err) => {
      toast.add(
        {
          severity: 'error',
          summary: 'Errore nella registrazione della risposta al questionario',
          detail: err,
          life: 3000
        }
      );
    })
    .finally(() => {
      loading.value = false
      emits('reloadFeed')
    })
}


const statusSelected = ref()
const statusOptions = ref([
  {
    text: 'Da lavorare',
    value: 1
  },
  {
    text: 'In lavorazione',
    value: 2
  },
  {
    text: 'Fake',
    value: 3,
    substatusOptions: [
      {
        text: 'Numero inesistente',
        value: 1
      },
      {
        text: 'Anagrafica errata',
        value: 2
      }
    ]
  },
  {
    text: 'DPR',
    value: 4,
  },
  {
    text: 'Non fattibile',
    value: 5,
    substatusOptions: [
      {
        text: 'ATC non assumibile',
        value: 1
      },
      {
        text: 'Reddito non dimostrabile',
        value: 2
      },
      {
        text: 'Pensione non cedibile',
        value: 3
      },
      {
        text: 'Altra tipologia contratto',
        value: 4
      },
      {
        text: "Limite massimo d'età",
        value: 5
      },
      {
        text: 'Invalidità',
        value: 6
      }
    ]
  },
  {
    text: 'Non risponde',
    value: 6,
    substatusOptions: [
      {
        text: 'Messaggio inviato',
        value: 1
      }
    ]
  },
  {
    text: 'Da richiamare',
    value: 7
  },
  {
    text: 'Non interessato',
    value: 8
  },
  {
    text: 'Duplicato',
    value: 9
  },
  {
    text: 'Attesa documenti',
    value: 10
  },
  {
    text: 'Preventivo inviato',
    value: 11
  },
  {
    text: 'Preventivo non accettato',
    value: 12
  },
  {
    text: 'Preventivo accettato',
    value: 13
  },
])

const substatusSelected = ref()
const substatusOptions =

  getScripts()
getQuestionari()
</script>