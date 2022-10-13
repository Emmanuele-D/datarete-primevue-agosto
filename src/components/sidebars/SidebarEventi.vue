<template>
  <Toast />

  <h3>Nuovo Evento</h3>
  <FormBuilderSimple v-model="values" :elements="elements" :config="config">
  </FormBuilderSimple>



</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosServices/AxiosService';
import FormBuilderSimple from '../FormBuilderSimple.vue';
import { useToast } from "primevue/usetoast";
const toast = useToast()
// eslint-disable-next-line no-undef
const emit = defineEmits(['event_refreshEvents'])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})



// //GET SIDEBARDATA
// function setupSidebar() {
//   if (props.sidebarData) {
//     Object.assign(values.value, props.sidebarData);
//   }
// }

const config = {
  rowGap: "20px",
  columnGap: "18px",
};

let values = ref({
});

const elements = [
  {
    id: 'title',
    label: "Nome Evento",
    type: 'InputText',
    attr: {
      type: 'text'
    },
    size: [12, 12, 12],

  },
  {
    id: 'start',
    label: "Data Inizio",
    type: 'Calendar',
    attr: {
      dateFormat: 'dd-mm-yy',
      showTime: true
    },
    size: [12, 6, 6],
    events: {
      'date-select': setMinDate
    },
  },
  {
    id: 'end',
    label: "Data Fine",
    type: 'Calendar',
    attr: {
      dateFormat: 'dd-mm-yy',
      showTime: true,
      emmanuele: 'durante',
      minDate: null
    },
    size: [12, 6, 6],

  },
  {
    id: 'partecipanti',
    label: 'Partecipanti',
    type: 'MultiSelect',
    attr: {
      options: props.sidebarData.userOptions,
      optionLabel: 'text',
    },
    size: [12, 12, 12],

  },
  {
    id: 'description',
    label: "Descrizione",
    type: 'Textarea',
    attr: {
      rows: 5,
      cols: 30
    },
    size: [12, 12, 12],

  },
  {
    id: "formButton",
    type: "Button",
    size: [12, 12, 12],
    align: "end",
    newLine: true,
    attr: {
      label: "Salva",
      icon: "pi pi-check",
      iconPos: "right",
    },
    events: {
      click: save,
    },
  },
]


function setMinDate(formEvent) {
  getElement('end').attr.minDate = new Date(values.value[formEvent.id].toString())
}

function getElement(key) {
  return elements.find((x) => {
    return x.id === key;
  });
}

// function log(formEvent) {
//   // console.log("Log - ", getElement(formEvent.id).label, "- ", values.value[formEvent.id], "- ", formEvent.value);
// }

const servicePOST = new AxiosService('Calendar/AddEvent')
const servicePUT = new AxiosService('Calendar/UpdateEvent')
function save() {

  if (values.value.id) {
    delete values.value.source
    console.log("🚀 ~ file: SidebarEventi.vue ~ line 144 ~ save ~ values.value", values.value)
    servicePUT.updateCustomEndpoint('Calendar/UpdateEvent', values.value)
      .then(() => {
        emit('event_refreshEvents')
        toast.add(
          {
            severity: 'success',
            summary: 'Evento Modificato',
            // detail: values.value.title,
            life: 3000
          }
        );
      })
      .catch(error => {
        console.log("🚀 ~ file: SidebarEventi.vue ~ line 158 ~ save ~ error", error)
        toast.add(
          {
            severity: 'error',
            summary: 'Errore',
            detail: error,
            life: 3000
          }
        );
      })
  } else {
    servicePOST.create(values.value)
      .then(() => {
        emit('event_refreshEvents')
        toast.add(
          {
            severity: 'success',
            summary: 'Evento Creato',
            // detail: values.value.title,
            life: 3000
          }
        );
      })
      .catch(error => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore',
            detail: error,
            life: 3000
          }
        );
      })
  }
}



</script>