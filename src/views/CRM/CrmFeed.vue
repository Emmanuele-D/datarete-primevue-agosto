<template>
  <div class="wrapper">
    <Toast></Toast>
    <ConfirmDialog></ConfirmDialog>
    <div>
    </div>
    <TabView v-if="filtroAttivita.length > 0" ref="tabview1" v-model:activeIndex="active">
      <TabPanel header="Tutte le Attività">
        <Card class="mb-2 " v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemNota @confirmDeleteItem="confirmDeleteItem($event)" @reloadFeed="getCrmItems"
              v-if="item.id_type == 1" :item="item">
            </CrmItemNota>
            <CrmItemAppuntamento v-if="item.id_type == 2" :item="item"></CrmItemAppuntamento>
            <CrmItemPratica v-if="item.id_type == 3" :item="item"></CrmItemPratica>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Note">
        <Card class="mb-2" v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemNota @confirmDeleteItem="confirmDeleteItem($event)" @reloadFeed="getCrmItems" :item="item">
            </CrmItemNota>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Appuntamenti">
        <Card class="mb-2" v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemAppuntamento :item="item"></CrmItemAppuntamento>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Pratiche">
        <Card class="mb-2" v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemPratica :item="item"></CrmItemPratica>
          </template>
        </Card>
      </TabPanel>
    </TabView>
    <div v-else>
      <Card>
        <template #content>
          <div class="grid-center">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CrmItemNota from '@/components/CRM/CrmItemNota.vue';
import CrmItemAppuntamento from '@/components/CRM/CrmItemAppuntamento.vue';
import CrmItemPratica from '@/components/CRM/CrmItemPratica.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useRoute } from 'vue-router'

import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
const toast = useToast()
const confirm = useConfirm()
const route = useRoute()

// eslint-disable-next-line no-undef
const props = defineProps({
  newItemType: Number,
  reloadFeed: Boolean
})

// eslint-disable-next-line no-undef
const emits = defineEmits(['feedReloaded'])


// 1==nota, 2==appuntamenti, 3==pratiche
const active = ref(0)
const filtroAttivita = computed(() => {
  if (props.newItemType == 0) return tutteLeAttivita
  return tutteLeAttivita.value.filter(x => x.id_type == props.newItemType)
})

const tutteLeAttivita = ref([])

function getCrmItems() {

  tutteLeAttivita.value.splice(0)
  console.log('getCrmItems')
  const serviceGET = new AxiosService('Crm/GetCrmRecord/')

  serviceGET.readCustomEndpoint('Crm/GetCrmRecord/' + route.params.idAnagrafica, '')
    .then(res => {
      tutteLeAttivita.value = res
    })
    .finally(() => {
      emits('feedReloaded')
    })

}

function confirmDeleteItem(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.oggetto + '"',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteItem(element)
    },
    reject: () => {
      return
    }
  })
}

function deleteItem(item) {
  const serviceDELETE = new AxiosService('Crm/DeleteCrmRecord/' + route.params.isAnagrafica)
  serviceDELETE.deleteCustomWQuery('Crm/DeleteCrmRecord/' + route.params.isAnagrafica, item.id)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Nota Eliminata',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch((err) => {
      toast.add(
        {
          severity: 'error',
          summary: "Errore nell'eliminazione della Nota",
          detail: err,
          life: 3000
        }
      );
    })
    .finally(() => {
      getCrmItems()
    })

}

getCrmItems()

watch(() => props.reloadFeed, (first, second) => {
  console.log(' do something')
  getCrmItems()
})

</script>