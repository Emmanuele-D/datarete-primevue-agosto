<template>
  <div class="wrapper grid">
    <div class="col-3" style="height: 90vh; overflow-y:scroll">
      <CrmUser :currentCrm="currentCrm" @event_changeType="event_changeType"></CrmUser>
      <CRMQuestionariEScript @reloadFeed="reloadFeed"></CRMQuestionariEScript>
    </div>
    <div class="col-6" style="overflow-y:scroll; height: 90vh">
      <CrmCreateNewItem @reloadFeed="reloadFeed" :newItemType="newItemType" class="mb-4"></CrmCreateNewItem>
      <CrmFeed :reloadFeed="doReloadFeed" :newItemType="newItemType" @feedReloaded="feedReloaded"></CrmFeed>
    </div>
    <div class="col-3">
      <CrmSideMenu :currentCrm="currentCrm"></CrmSideMenu>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CrmFeed from './CrmFeed.vue';
import CrmCreateNewItem from './CrmCreateNewItem.vue';
import CrmSideMenu from '../../components/CRM/CrmSideMenu.vue';
import CrmUser from './CrmUser.vue';
import CRMQuestionariEScript from './CRMQuestionariEScript.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useRoute } from 'vue-router'


const route = useRoute()

const newItemType = ref(1)
function event_changeType(ev) {
  newItemType.value = ev
}
const doReloadFeed = ref(false)
function reloadFeed() {
  doReloadFeed.value = true
}

function feedReloaded() {
  doReloadFeed.value = false
}

const currentCrm = ref()

function getAnagrafica() {
  const serviceGET = new AxiosService('Auth/Users/' + route.params.idAnagrafica)
  serviceGET.read().then((res) => {
    currentCrm.value = res
  })
}

getAnagrafica()
</script>