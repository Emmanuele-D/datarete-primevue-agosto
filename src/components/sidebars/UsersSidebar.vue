<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Toast></Toast>

  <!--   -->
  <h1 v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="mb-4 flex justify-content-center w-full ">
    <div class="avatar-container">

      <Avatar v-if="sidebarData.event.imgprofilo" :image="sidebarData.event.imgprofilo" size="xlarge" shape="circle" />

      <Avatar v-else icon="pi pi-user" shape="circle" class="mr-2" size="xlarge" />


      <label class="custom-file-input-label" for="imgprofilo">
        <i v-if="!isSending" class="pi pi-fw pi-pencil"></i>
        <i v-else class="pi pi-spin pi-spinner"></i>
        <input ref="file" @change="uploadFile" class="custom-file-input" type="file" id="imgprofilo" name="imgprofilo"
          accept="image/*" capture>
      </label>
    </div>

  </div>
  <div class="form-container grid">
    <div class="flex flex-column col-12 mb-2">
      <label for="attivo">Attivo</label>
      <Checkbox id="attivo" :binary="true" v-model="sidebarData.event.attivo"></Checkbox>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="nome">Nome</label>
      <InputText :class="{ 'red-border': saveDisabled }" id="nome" type="text" v-model="sidebarData.event.nome">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="cognome">Cognome</label>
      <InputText :class="{ 'red-border': saveDisabled }" id="cognome" type="text" v-model="sidebarData.event.cognome">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-7 mb-2">
      <label for="email">Email</label>
      <InputText :class="{ 'red-border': saveDisabled }" id="email" type="email" v-model="sidebarData.event.email">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="telefono">Telefono</label>
      <InputText :class="{ 'red-border': saveDisabled }" id="telefono" type="text" v-model="sidebarData.event.telefono">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="cellulare">Cellulare</label>
      <InputText id="cellulare" type="text" v-model="sidebarData.event.cellulare"></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="datanascita">Data di nascita</label>
      <Calendar id="datanascita" type="text" v-model="sidebarData.event.datanascita"></Calendar>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="luogonascita">Luogo di Nascita</label>
      <InputText id="luogonascita" type="text" v-model="sidebarData.event.luogonascita"></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="codicefiscale">Codice Fiscale</label>
      <InputText id="codicefiscale" type="text" v-model="sidebarData.event.codicefiscale"></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="partitaiva">Partita IVA</label>
      <InputText id="partitaiva" type="text" v-model="sidebarData.event.partitaiva"></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="username">Username</label>
      <InputText :class="{ 'red-border': saveDisabled }" id="username" type="text" v-model="sidebarData.event.username">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="password">Password</label>
      <InputText id="password" type="text" v-model="sidebarData.event.password">
      </InputText>
    </div>
    <div class="  flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Livelli Abilitati</label>
      <MultiSelect :class="{ 'red-border': saveDisabled }" id="livelliAbilitati"
        v-model="sidebarData.event.livelliAbilitati" :options="loginLevelOptions" optionLabel="Nome" optionValue="Id">
      </MultiSelect>
    </div>
    <div class="  flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Sedi</label>
      <MultiSelect id="sedi" v-model="sidebarData.event.sediAzienda" :options="sediOptions" optionLabel="nome"
        optionValue="id"></MultiSelect>
    </div>
    <div class="  flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Utente Padre</label>
      <Dropdown id="sedi" v-model="sidebarData.event.id_padre" :options="usersOptions" optionLabel="Nome"
        optionValue="Id"></Dropdown>
    </div>
    <div class="  flex flex-column col-12 col-md-6 mb-2">
      <label for="ruolo">Ruolo</label>
      <InputText id="ruolo" type="text" v-model="sidebarData.event.ruolo">
      </InputText>
    </div>
  </div>



  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
    <Button :loading="formLoading" :disabled="saveDisabled" label="Salva" @click="save"></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

const emits = defineEmits(['event_HideUsersSidebar', 'event_refreshList'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const isSending = ref(false)
const file = ref(null)
function uploadFile() {
  console.log("🚀 ~ file: UsersSidebar.vue ~ line 120 ~ uploadFile ~ ev", file.value.files)

  const service = new AxiosService('files')
  if (!isSending.value) {
    isSending.value = true

    const formData = new FormData();
    formData.append("file", file.value.files[0]);


    service.postCustomEndpoint('Upload?type=' + 'UserAvatars', '', formData)
      .then(res => {
        // eslint-disable-next-line vue/no-mutating-props
        props.sidebarData.event.imgprofilo = 'https://posadas-core.datarete.cloud/' + res
      })
      .finally(() => {
        isSending.value = false
      })
  }
  return
}

const formLoading = ref(false)
function save() {
  formLoading.value = true
  if (props.sidebarData.event.id) {
    servicePUT.update(props.sidebarData.event)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideUsersSidebar')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideUsersSidebar')
      })
      .finally(() => {
        formLoading.value = false
      })
  } else {
    console.log('POST , ')
    servicePOST.create(props.sidebarData.event)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideUsersSidebar')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideUsersSidebar')
      })
      .finally(() => {
        formLoading.value = false
      })
  }
}

const serviceGETLoginLevels = new AxiosService('Options/GetLoginLevels')
const loginLevelOptions = ref([])
function getLoginLevels() {
  serviceGETLoginLevels.read()
    .then(res => {
      loginLevelOptions.value.length > 0 ? loginLevelOptions.value.splice(0) : null
      res.map(x => {
        x.Id = x.value
        x.Nome = x.text
        delete x.value
        delete x.text
      })
      loginLevelOptions.value = res
    })
}

const serviceGETSedi = new AxiosService('Gestione/SediAzienda/GetSedi')
const sediOptions = ref([])
function getSedi() {
  serviceGETSedi.read()
    .then(res => {
      sediOptions.value.length > 0 ? sediOptions.value.splice(0) : null

      sediOptions.value = res
    })
}

const serviceGETUsers = new AxiosService('Options/GetUsers')
const usersOptions = ref([])
function getUsers() {
  serviceGETUsers.read()
    .then(res => {
      usersOptions.value.length > 0 ? usersOptions.value.splice(0) : null
      res.map(x => {
        x.Id = x.value
        x.Nome = x.text
        delete x.value
        delete x.text
      })
      usersOptions.value = res
    })

}


const saveDisabled = computed(() => {
  if (
    !props.sidebarData.event.nome ||
    !props.sidebarData.event.cognome ||
    !props.sidebarData.event.telefono ||
    !props.sidebarData.event.username ||
    props.sidebarData.event.livelliAbilitati.length <= 0
  ) {
    return true
  } else {
    return false
  }
})

getLoginLevels()

getSedi()

getUsers()
</script>