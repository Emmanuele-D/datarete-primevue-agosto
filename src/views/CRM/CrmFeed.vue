<template>
  <div class="wrapper">
    <div>
    </div>
    <TabView v-if="filtroAttivita.length > 0" ref="tabview1" v-model:activeIndex="active">
      <TabPanel header="Tutte le Attività">
        <Card class="mb-2 " v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemNota v-if="item.id_type == 1" :item="item"></CrmItemNota>
            <CrmItemAppuntamento v-if="item.id_type == 2" :item="item"></CrmItemAppuntamento>
            <CrmItemPratica v-if="item.id_type == 3" :item="item"></CrmItemPratica>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Note">
        <Card class="mb-2" v-for="item of filtroAttivita" :key="item.id">
          <template #content>
            <CrmItemNota :item="item"></CrmItemNota>
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import CrmItemNota from '@/components/CRM/CrmItemNota.vue';
import CrmItemAppuntamento from '@/components/CRM/CrmItemAppuntamento.vue';
import CrmItemPratica from '@/components/CRM/CrmItemPratica.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useRoute } from 'vue-router'

const route = useRoute()

// eslint-disable-next-line no-undef
const props = defineProps({
  newItemType: Number
})

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



}


getCrmItems()
</script>