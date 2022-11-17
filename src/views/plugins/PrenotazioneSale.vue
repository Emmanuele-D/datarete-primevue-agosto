<template>
  <Toast></Toast>
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
            <h2 style="margin:0">Sala: {{ salaSelezionata.nome }}</h2>
            <Button :disabled="!salaSelezionata.nome" icon="pi pi-fw pi-calendar-plus" @click="showSidebarPrenotazione"
              label="Prenota"></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 card-calendario">
            <Card>
              <template #content>

                <FullCalendar :options="options"></FullCalendar>

                <!-- <CalendarBuilder viewsOptions="timeGridWeek,timeGridDay listMonth" :key="calendarioSala"
                  :eventslist="salaSelezionata.eventi" initialView="timeGridWeek">
                </CalendarBuilder> -->
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>


  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')">
    <sbPrenotazioneSala :sidebarData="sidebarData"></sbPrenotazioneSala>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosServices/AxiosService'
// import { useToast } from 'primevue/usetoast'
import '../../../node_modules/@fullcalendar/core/vdom'// solves problem with Vite
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar'
import dayGridPlugin from '../../../node_modules/@fullcalendar/daygrid'
import timeGridPlugin from '../../../node_modules/@fullcalendar/timegrid'
import interactionPlugin from '../../../node_modules/@fullcalendar/interaction'
import listPlugin from '../../../node_modules/@fullcalendar/list'
import bootstrap5Plugin from '../../../node_modules/@fullcalendar/bootstrap5';
// import CalendarSkeleton from '../../components/skeletons/CalendarSkeleton.vue'
import itLocale from '@fullcalendar/core/locales/it';
import sbPrenotazioneSala from '../../components/sidebars/sbPrenotazioneSala.vue'
// import user from '@/store/modules/user';

// const toast = useToast()

// SIDEBAR 
const sidebarVisible = ref(false)
const sidebarData = ref(null)

function showSidebarPrenotazione() {
  sidebarVisible.value = true
  sidebarData.value = salaSelezionata.value
}


// DATA SALE RIUNIONE
const sale = [
  {
    id: 1,
    nome: 'Sala uno',
    img: 'office1.jpg',
    capienza: 4,
    dettagli: ['Proiettore', 'Computer', 'Bevande calde']
  },
  {
    id: 3,
    nome: 'Sala tre',
    img: 'office3.jpg',
    capienza: 2,
    dettagli: []
  },
  {
    id: 4,
    nome: 'Sala quattro',
    img: 'office4.jpg',
    capienza: 6,
    dettagli: ['proiettore', 'computer', 'Bevande calde']
  },
]


// CALENDARIO

// const events = ref(null)

const options = ref({
  datesSet: event => getEvents(event),
  plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrap5Plugin],
  themeSystem: "bootstrap5",
  headerToolbar: {

    right: 'timeGridWeek,timeGridDay listYear',
    center: 'title',
    left: 'prev,today,next'
  },
  lazyFetching: false,
  slotMinTime: '07:00',
  slotMaxTime: '22:00',
  slotDuration: '00:15:00',
  editable: true,
  height: 'auto',
  aspectRatio: 1,
  eventBackgroundColor: "#123123",
  eventBorderColor: "#ffffffff",
  events: [],
  initialView: 'timeGridWeek',
  eventDisplay: "auto",
  nowIndicator: true,
  locale: itLocale,

})

const currentDateInterval = ref([])


function getEvents(event) {
  const starting = event.startStr.slice(0, 10)
  const ending = event.endStr.slice(0, 10)

  if (
    currentDateInterval.value[0] != starting ||
    currentDateInterval.value[1] != ending

  ) {
    const service = new AxiosService('Plugin/PrenotazioneSale/' + starting + '/' + ending)
    service.readCustomEndpoint('Plugin/PrenotazioneSale/' + starting + '/' + ending)
      .then(res => {
        currentDateInterval.value[0] = event.startStr.slice(0, 10)
        currentDateInterval.value[1] = event.endStr.slice(0, 10)
        options.value.events = res.map(x => {
          return {
            start: x.dataora_inizio,
            end: x.dataora_fine,
            title: x.descrizione,
            id: x.id
          }
        })
        console.log('events.value, ', options.value.events)
      })
  }

}


const calendarioSala = ref('')
const salaSelezionata = ref({})
function selezionaSala(sala) {
  salaSelezionata.value = {}
  salaSelezionata.value = sala
  calendarioSala.value = salaSelezionata.value.nome
}
</script>