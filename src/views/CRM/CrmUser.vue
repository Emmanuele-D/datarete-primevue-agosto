

<template>
  <div>
    <Card v-if="currentCrm" class="mb-4">
      <template #content>
        <div class="flex align-items-center">
          <Avatar icon="pi pi-user" class="mr-4" size="xlarge" />
          <h2>{{ currentCrm.nome }} {{ currentCrm.cognome }}</h2>
        </div>
        <div class="flex align-items-center mt-4">
          <Button @click="newItemType = 1" icon="pi pi-file" class="p-button-rounded mr-2"></Button>
          <Button @click="newItemType = 2" icon="pi pi-calendar" class="p-button-rounded mr-2"></Button>
          <!-- <Button @click="newItemType = 3" icon="pi pi-inbox" class="p-button-rounded"></Button> -->
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  currentCrm: Object
})
// eslint-disable-next-line no-undef
const emits = defineEmits('event_changeType')




const newItemType = ref(1)
watch(newItemType, () => {
  emits('event_changeType', newItemType.value)
})



</script>