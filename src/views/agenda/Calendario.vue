<template>
  <Card class="mb-4">
    <template #content>
      <div class="flex justify-content-end">
        <Button :loading="genLoading" @click="showSidebarEventi" label="Crea Evento"></Button>
      </div>
    </template>
  </Card>
  <Card>
    <template #content>
      <CalendarBuilder viewsOptions="dayGridMonth,timeGridWeek,timeGridDay listYear" :callsToCalendar="callsToCalendar"
        eventsEndpoint="Calendar/GetEvents/0" initialView="dayGridMonth"
        @event_Calendar_ClickedEvent="showDetailsEvent">
      </CalendarBuilder>
    </template>
  </Card>
  <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <SidebarEventi @event_HideSidebarEventi="hideSidebarEventi" @event_refreshEvents="refreshCalendar"
      :sidebarData="sidebarEventiData"></SidebarEventi>
  </Sidebar>

  <Sidebar v-model:visible="detailsEventVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideDetailEvent')">

    <DetailsEvent :sidebarData="detailsEventData" @event_HideDetailEvent="hideDetailsEvent"></DetailsEvent>
  </Sidebar>

</template>


<script setup>
import {
  ref
} from 'vue'
import AxiosService from '@/axiosServices/AxiosService'
import CalendarBuilder from '../../components/CalendarBuilder.vue'
import SidebarEventi from '../../components/sidebars/SidebarEventi.vue'
import DetailsEvent from '../../components/sidebars/DetailsEvent.vue'

const genLoading = ref(false)


// SIDEBAR DETAILS EVENT
const detailsEventVisible = ref(false)
const detailsEventData = ref({
  statesOptions: []
})
async function showDetailsEvent(event) {

  //get states event options for SIDEBAR DETAILS EVENT
  const serviceGET_states = new AxiosService('Options/GetStatiEvento')
  await serviceGET_states.read()
    .then(res => {
      detailsEventData.value.statesOptions = res
    })

  detailsEventVisible.value = true
  detailsEventData.value = event
}
function hideDetailsEvent() {
  detailsEventVisible.value = false
}


// SIDEBAR EDIT EVENT
const sidebarEventiVisible = ref(false)
const sidebarEventiData = ref({})
async function showSidebarEventi() {
  genLoading.value = true

  const serviceGET = new AxiosService('Options/GetUsers')
  await serviceGET.read()
    .then(res => {
      console.log("🚀 ~ file: SidebarEventi.vue ~ line 206 ~ getOptionsUsers ~ res", res)
      sidebarEventiData.value.userOptions = res
    })




  sidebarEventiVisible.value = true
  genLoading.value = false
}
function hideSidebarEventi() {
  sidebarEventiVisible.value = false
  sidebarEventiData.value = {}
}
const callsToCalendar = ref(0)
function refreshCalendar() {
  callsToCalendar.value++
}
// function showClickedEvent(event) {
//   sidebarEventiVisible.value = true
//   Object.assign(sidebarEventiData.value, event);
// }

</script>