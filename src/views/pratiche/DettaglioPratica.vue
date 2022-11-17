<template>
  <div class="wrapper">
    <h1>Pratica: {{ id_pratica }}</h1>
    <div class="grid">
      <dic class="col-3">
        <Card>
          <template #header>
            <div class="bg-gray-800 px-4 text-white">
              Dettagli pratica
            </div>
          </template>
          <template #content>
            <h2 class="mb-4">Prestito</h2>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Numero</span>
              <span class="font-semibold">QT10561</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Inserita</span>
              <span>{{ new Date().toLocaleDateString('it-IT') }}</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Cliente</span>
              <span class="font-semibold">PIGHI MASSIMILIANO</span>
            </div>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Agente istituto</span>
              <span class="text-primary">Mario Rossi - Younited</span>
            </div>
            <Divider></Divider>
            <div class="campo-dettaglio mb-3 flex justify-content-between align-items-center">
              <span>Stato pratica</span>
              <Dropdown v-model="statoPraticaSelected" :options="statoPraticaOptions" optionLabel="name"
                optionValue="value" placeholder="Seleziona uno stato" />
            </div>
          </template>
        </Card>
      </dic>
      <dic class="col-9 bg-secondary">
        ciao
      </dic>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const id_pratica = route.params.idPratica

const statoPraticaSelected: ref(2)
const statoPraticaOptions = ref([
  {
    value: 0,
    text: 'Inserita'
  },
  {
    value: 1,
    text: 'In attesa'
  },
  {
    value: 0,
    text: 'Presa in carico'
  },
  {
    value: 0,
    text: 'Chiusa'
  },
])
</script>