<template>
  <Card>
    <template #content>
      <CrmPostPutNota v-if="newItemType == 1"></CrmPostPutNota>
      <CrmPostPutAppuntamento v-if="newItemType == 2"></CrmPostPutAppuntamento>
      <CrmPostPutPratica v-if="newItemType == 3"></CrmPostPutPratica>
    </template>
  </Card>
</template>

<script setup>
import CrmPostPutNota from '@/components/CRM/CrmPostPutNota.vue';
import CrmPostPutAppuntamento from '@/components/CRM/CrmPostPutAppuntamento.vue';
import CrmPostPutPratica from '@/components/CRM/CrmPostPutPratica.vue';

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  newItemType: Number
})
</script>