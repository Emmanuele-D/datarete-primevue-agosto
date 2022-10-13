<template>
  <div v-if="viewMode == 'view'">
    <div class="flex">
      <div class=" flex-grow-1 flex align-items-center">
        <i class="pi pi-fw pi-file mr-2 pt-2"></i>
        <h4>{{ item.oggetto }}</h4>
      </div>
      <div class=" flex flex-column justify-content-end">
        <p style="font-style: italic; text-align: end" class="m-0">{{ formatDateTime(item.data) }}</p>
        <span><i class="pi pi-fw pi-user mr-2 mt-2"></i>{{ item.nomeUtente }}</span>
      </div>
    </div>
    <div class="grid mt-4">
      <div class="col-8 ">
        <span v-html="item.messaggio"></span>
      </div>
      <div class="col-4 flex justify-content-end">
        <Button @click="switchToEditMode" icon="pi pi-pencil" class="p-button-rounded"></Button>
      </div>
    </div>
  </div>
  <div v-if="viewMode == 'edit'">
    <CrmPostPutNota :item="item" @switchToView="switchToWiew"></CrmPostPutNota>
  </div>
  <!-- <Sidebar class="p-sidebar-md" @hide="hideSidebar" v-model:visible="sidebarVisible" :baseZIndex="10000"
    position="right">
    
  </Sidebar> -->
</template>

<script setup>
import { ref } from 'vue';
import CrmPostPutNota from './CrmPostPutNota.vue';
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object
})

const viewMode = ref('view')

function switchToEditMode() {
  viewMode.value = 'edit'
}

function switchToWiew() {
  viewMode.value = 'view'
}

function formatDateTime(value) {
  if (value) {
    let dateString = ''
    dateString = new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    let timeString = ''
    timeString = new Date(value).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    })

    let totString = dateString + ' ' + timeString
    return totString
  }
  return ''
}
// //SIDEBAR MANAGEMENT
// const sidebarVisible = ref(false)
// const sidebarData = ref()

// function showSidebar(event) {
//   sidebarVisible.value = true
//   sidebarData.value = event
// }

// function hideSidebar() {
//   sidebarVisible.value = false
//   sidebarData.value = {}
// }
</script>