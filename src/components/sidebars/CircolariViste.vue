<!-- eslint-disable vue/no-mutating-props -->
<template>

  <h2>Visualizzazioni Circolari</h2>
  <div class="grid mb-4">
    <div class="col-6">
      <strong>Utente</strong>
    </div>
    <div class="col-3">
      <strong>Circ. Vista</strong>
    </div>
    <div class="col-3">
      <strong>Circ. Letta</strong>
    </div>
  </div>
  <div class="grid mb-2">
    <div class="col-6">
      Emmanuele Durante
    </div>
    <div class="col-3">
      <i class="pi pi-fw pi-check"></i>
    </div>
    <div class="col-3">

    </div>
  </div>
  <div class="grid mb-2">
    <div class="col-6">
      Massimiliano Pighi
    </div>
    <div class="col-3">
      <i class="pi pi-fw pi-check"></i>
    </div>
    <div class="col-3">
      <i class="pi pi-fw pi-check"></i>
    </div>
  </div>
  <div class="grid mb-2">
    <div class="col-6">
      Marcello Silva
    </div>
    <div class="col-3">

    </div>
    <div class="col-3">
      <i class="pi pi-fw pi-check"></i>
    </div>
  </div>

</template>

<script setup>

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})
</script>