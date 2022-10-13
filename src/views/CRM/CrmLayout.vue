<template>
  <div class="wrapper grid">
    <div class="col-3">
      <CrmUser @event_changeType="event_changeType"></CrmUser>

    </div>
    <div class="col-6" style="overflow-y:scroll; height: 100vh">
      <CrmCreateNewItem :newItemType="newItemType" class="mb-4"></CrmCreateNewItem>
      <CrmFeed :newItemType="newItemType"></CrmFeed>
    </div>
    <div class="col-3">
      <CrmSideMenu></CrmSideMenu>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CrmFeed from './CrmFeed.vue';
import CrmCreateNewItem from './CrmCreateNewItem.vue';
import CrmSideMenu from '../../components/CRM/CrmSideMenu.vue';
import CrmUser from './CrmUser.vue';
const newItemType = ref(1)
function event_changeType(ev) {
  newItemType.value = ev
}
</script>