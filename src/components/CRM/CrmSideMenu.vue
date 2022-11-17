<template>

  <Accordion v-if="currentCrm" :multiple="true" :activeIndex="[]">
    <AccordionTab>
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Anagrafica</h4>
          Dati generali dell'Anagrafica
        </div>
      </template>
      <strong>Nome: </strong> {{ currentCrm.nome }}<br>
      <strong>Cognome: </strong>: {{ currentCrm.cognome }}<br>
      <strong>Email: </strong>: {{ currentCrm.email }}<br>
      <strong>Telefono: </strong>: {{ currentCrm.telefono }}<br>
      <strong>Ruolo: </strong>: {{ currentCrm.ruolo }}<br>
    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Contatti</h4>
          Tabella con i contatti di {{ currentCrm.nome }}
        </div>
      </template>

    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Appuntamenti</h4>
          Tabella con i prossimi appuntamenti di {{ currentCrm.nome }}
        </div>
      </template>
      <div class="mb-4 flex justify-content-end">
        <Button :loading="genLoading" @click="creaEvento" label="Aggiungi appuntamento"></Button>
      </div>
      <div style="height:250px; overflow-y: scroll;">
        <CalendarBuilder :callsToCalendar="currentCrm.callsToCalendar"
          :eventsEndpoint="'Calendar/GetEvents/' + currentCrm.id + '/0'" initialView="listYear">
        </CalendarBuilder>
      </div>
    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Pratiche</h4>
          Tabella con le pratiche relative a {{ currentCrm.nome }}
        </div>
      </template>

    </AccordionTab>

  </Accordion>

  <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <SidebarEventi :sidebarData="sidebarEventiData"></SidebarEventi>
  </Sidebar>

</template>

<script setup>
import { ref } from 'vue'
// import { useStore } from 'vuex';
import AxiosService from '@/axiosServices/AxiosService';
import CalendarBuilder from '../CalendarBuilder.vue';
import SidebarEventi from '../sidebars/SidebarEventi.vue';

// eslint-disable-next-line no-unused-vars, no-undef
const emit = defineEmits(['event_showSidebar_sidebarEventi', 'event_HideSidebarClienti'])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
  currentCrm: Object
})
console.log("CURRENT CRM", props.currentCrm)
// const store = useStore()

// const currentCrm = store.getters['getCurrentCrm']

const genLoading = ref(false)

const sidebarEventiData = ref({ userOptions: [] })
const sidebarEventiVisible = ref(false)

async function creaEvento() {
  genLoading.value = true
  console.log('CREA EVENTO FROM CLIENTI')

  const serviceGET = new AxiosService('Options/GetUsers')
  await serviceGET.read()
    .then(res => {
      console.log("🚀 ~ file: SidebarEventi.vue ~ line 206 ~ getOptionsUsers ~ res", res)
      sidebarEventiData.value.userOptions = res
    })

  sidebarEventiVisible.value = true
  genLoading.value = false



}
</script>