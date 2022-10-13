<template>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>Prenotazione Sale</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>
    <div class="grid">
      <div class="col-4 elenco-sale ">
        <Card @click="selezionaSala(sala)" role="button" v-for="sala in sale" :key="sala.nome" class=" sala mb-4 ">
          <template #content>
            <div class="grid mb-2">
              <div class="col-7 image">
                <Image :src="require('@/assets/images/' + sala.img)"></Image>
              </div>
              <div class="col-5 flex flex-column">
                <h2>{{ sala.nome }}</h2>
                <span class="flex mb-2">
                  <p><i class="pi-users pi pi-fw mr-2"></i>
                  </p>{{ sala.capienza }}
                </span>
                <span>

                </span>
              </div>
            </div>
            <div class="grid">
              <div class="col-12">
                <Chip class="mb-1 mr-2" v-for="(item, i) in sala.dettagli" :key="i" :label="item"></Chip>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-8">
        <div class="grid">
          <div class="col-12 flex justify-content-between align-items-center mb-4">
            <h2 style="margin:0">Sala: {{salaSelezionata.nome}}</h2>
            <Button :disabled="!salaSelezionata.nome" icon="pi pi-fw pi-calendar-plus" @click="showDialogPrenotazione"
              label="Prenota"></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 card-calendario">
            <Card>
              <template #content>
                <CalendarBuilder viewsOptions="timeGridWeek,timeGridDay listMonth" :key="calendarioSala"
                  :eventslist="salaSelezionata.eventi" initialView="timeGridWeek">
                </CalendarBuilder>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog @hide="resolveDialog('Annulla')" v-model:visible="dialogPrenotazioneVisible"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
    <template #header>
      <h2>{{ salaSelezionata.nome }}</h2>
    </template>

    <div class="grid mb-4">
      <div class="col-12 px-2">
        <div class="grid">
          <div class="col-6 flex flex-column mb-2">
            <label for="a-nome-di">A nome di</label>
            <strong>{{ aNomeDi }}</strong>
          </div>
        </div>
        <div class="grid">
          <div class=" col-6 flex flex-column mb-2">
            <label for="inizio">Inizio</label>
            <Calendar @date-select="setMinDate" inputId="inizio" :minDate="new Date()" v-model="prenotazioneStart"
              :showTime="true" :showSeconds="false" />
          </div>
          <div class=" col-6 flex flex-column mb-2">
            <label for="fine">Fine</label>
            <Calendar inputId="fine" :minDate="minPrenotazioneEnd" v-model="prenotazioneEnd" :showTime="true"
              :showSeconds="false" />
          </div>
          <div class=" col-12 flex flex-column mb-2">
            <label for="motivo">Motivo</label>
            <InputText inputId="motivo" v-model="motivo" />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button @click="resolveDialog('Annulla')" label="Annulla" icon="pi pi-times" class="p-button-text" />
      <Button @click="resolveDialog('Conferma')" label="Conferma" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import user from '@/store/modules/user';

import CalendarBuilder from '@/components/CalendarBuilder.vue';


// DIALOG NEW RESERVATION
const dialogPrenotazioneVisible = ref(false)
const prenotazioneStart = ref('')
const prenotazioneEnd = ref('')
const minPrenotazioneEnd = ref('')
const aNomeDi = user.state.user.nome + " " + user.state.user.cognome
const motivo = ref('')
function showDialogPrenotazione() {
  dialogPrenotazioneVisible.value = true
}
function setMinDate() {
  minPrenotazioneEnd.value = prenotazioneStart.value
}
function resolveDialog(action) {
  switch (action) {
    case 'Annulla':
      prenotazioneEnd.value = ''
      prenotazioneStart.value = ''
      minPrenotazioneEnd.value = ''
      dialogPrenotazioneVisible.value = false
      break
    case 'Conferma':
      dialogPrenotazioneVisible.value = false
      console.log('evento confermato')
      break
    default:
      dialogPrenotazioneVisible.value = false
      break
  }
}
// DATA SALE RIUNIONE
const sale = [
  {
    nome: 'Sala uno',
    img: 'office1.jpg',
    capienza: 4,
    eventi: [{
      title: 'emmanuele',
      start: '2022-09-07T10:00:00',
      end: '2022-09-07T16:00:00',
      display: 'background',
      backgroundColor: '#708090',
      borderColor: 'red'
    }],
    dettagli: ['Proiettore', 'Computer']
  },
  {
    nome: 'Sala due',
    img: 'office2.jpg',
    capienza: 10,
    eventi: [{
      title: 'sala due evento',
      start: '2022-09-07T07:00:00',
      end: '2022-09-07T08:00:00',
      display: 'background',
      backgroundColor: '#708090',
    }, {
      title: 'sala due EVENTO GRANDE',
      start: '2022-09-10T09:00:00',
      end: '2022-09-10T18:00:00',
      display: 'background',
      backgroundColor: '#708090',
    }],
    dettagli: ['Proiettore', 'Computer', 'Bevande calde']
  },
  {
    nome: 'Sala tre',
    img: 'office3.jpg',
    capienza: 2,
    eventi: [{
      title: 'sala due EVENTO GRANDE',
      start: '2022-09-05T09:00:00',
      allDay: true,
      display: 'background',
      backgroundColor: '#708090',
    }],
    dettagli: []
  },
  {
    nome: 'Sala quattro',
    img: 'office4.jpg',
    capienza: 6,
    eventi: [],
    dettagli: ['proiettore', 'computer', 'Bevande calde']
  },
]


// CALENDARIO

const eventsList = [
  {
    title: 'emmanuele',
    start: '2022-09-07T10:00:00',
    end: '2022-09-07T16:00:00',
    // display: 'background',
    backgroundColor: '#708090'
  }
]

const calendarioSala = ref('')
const salaSelezionata = ref({})
function selezionaSala(sala) {
  salaSelezionata.value = {}
  salaSelezionata.value = sala
  calendarioSala.value = salaSelezionata.value.nome
}
</script>