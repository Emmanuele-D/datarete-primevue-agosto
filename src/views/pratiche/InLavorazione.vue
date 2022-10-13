<template>
  <div class="wrapper">
    <h1>{{
    pageTitle
    }}</h1>
    <TableBuilder @event_ShowSidebar_nuovoAppuntamento="$router.push('/eventi')" @event_ShowSidebar_creaPratica="null"
      @event_ShowSidebar_elimina="null" :data="tableItems" :headersConfig="columns" :showAzioni="false"
      :config="config">
    </TableBuilder>





  </div>
</template>

<script setup>
import { ref } from 'vue'

// IMPORT COMPONENTS
import TableBuilder from '../../components/TableBuilder.vue'


// id, 
// nome cliente, 
// nome agente, 
// data inserimento, 
// importo richiesto, 
// durata, 
// ultimo stato, 
// data ultimo stato

const columns = [
  { field: 'nome_cliente', header: "Nome Cliente", visible: true, type: 'String', order: 1, frozen: true, sortable: true },
  { field: 'nome_agente', header: "Nome Agente", visible: true, type: 'String', order: 2, frozen: false, sortable: false },
  { field: 'data_inserimento', header: "Data Inserimento", visible: true, type: 'Date', order: 3, frozen: false, sortable: false },
  { field: 'importo_richiesto', header: "Importo Richiesto", visible: true, type: 'Number', order: 4, frozen: false, sortable: false },
  { field: 'durata', header: "Durata", visible: true, type: 'Number', order: 5, frozen: false, sortable: false },
  { field: 'ultimo_stato', header: "Ultimo Stato", visible: true, type: 'String', order: 6, frozen: false, sortable: false },
  { field: 'data_ultimo_stato', header: "Data Ultimo Stato", visible: true, type: 'Date', order: 7, frozen: false, sortable: false },
]

const tableItems = [
  {
    id: 0,
    nome_cliente: 'Mario Rossi',
    nome_agente: 'Emmanuele Durante',
    data_inserimento: new Date(),
    importo_richiesto: 10000,
    durata: 3,
    ultimo_stato: 'in lavorazione',
    data_ultimo_stato: new Date()
  },
  {
    id: 0,
    nome_cliente: 'Giuseppe Fabbri',
    nome_agente: 'Emmanuele Durante',
    data_inserimento: new Date(),
    importo_richiesto: 22000,
    durata: 2,
    ultimo_stato: 'in lavorazione',
    data_ultimo_stato: new Date()
  },
  {
    id: 0,
    nome_cliente: 'Luca Bianchi',
    nome_agente: 'Emmanuele Durante',
    data_inserimento: new Date(),
    importo_richiesto: 180000,
    durata: 10,
    ultimo_stato: 'in lavorazione',
    data_ultimo_stato: new Date()
  },
  {
    id: 0,
    nome_cliente: 'Leonardo Verdi',
    nome_agente: 'Emmanuele Durante',
    data_inserimento: new Date(),
    importo_richiesto: 300000,
    durata: 4,
    ultimo_stato: 'in lavorazione',
    data_ultimo_stato: new Date()
  }
]


// TABLE BUILDER
const config = ref({
  zebra: true,
  menuItems: [
    // {
    //   label: 'Inserisci',
    //   icon: "pi pi-fw pi-plus",
    //   items: [
    //     {
    //       label: "Nuova Anagrafica",
    //       command: () => { nuovaAnagraficaVisible.value = true }
    //     },
    //   ]
    // },
    // {
    //   label: 'Viste',
    //   icon: 'pi pi-fw pi-file',
    //   items: []
    // }
  ]
})

let pageTitle = ref('')



</script>