<template>
  <div class="wrapper">
    <h3 class="pl-4">Attività CRM</h3>

    <div class=" px-4 pb-5 md:px-6 lg:px-8">
      <div class="grid mb-2">
        <div class="sm:col-12 md:col-4 lg:col-4">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Lead da Lavorare</span>
                <div v-if="loading" class="text-900 font-medium text-xl"><i class="pi pi-spin pi-spinner"></i></div>
                <div v-else class="text-900 font-medium text-xl">{{ dashboardData.leadDaLavorare }}</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-12 md:col-4 lg:col-4">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Nuovi Lead</span>
                <div v-if="loading" class="text-900 font-medium text-xl"><i class="pi pi-spin pi-spinner"></i></div>
                <div v-else class="text-900 font-medium text-xl">{{ dashboardData.nuoviLead }}</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-12 md:col-4 lg:col-4">
          <div class="surface-200 shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3 text-gray-400">Attività di oggi</span>
                <div class="text-900 font-medium text-xl text-gray-400">0</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-map-marker text-orange-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>



        <div class="col-12">
          <div class="surface-card shadow-2 p-3 border-round">
            <span class="block text-500 font-medium mb-3">Leads caldi</span>
            <DataTable v-if="dashboardData.leadCaldi.length > 0" :loading="loading" :value="dashboardData.leadCaldi"
              :paginator="true" :rows="5">
              <Column field="actions" header="Azioni">

                <template #body="{ data }">

                  <i @click="gotoCrm(data)" class="pi pi-eye cursor-pointer"></i>
                </template>

              </Column>
              <Column field="NOME" header="Nome"></Column>
              <Column field="COGNOME" header="Cognome"></Column>
              <Column field="ORIGINE" header="Origine"></Column>
              <Column field="COMMERCIALE" header="Commerciale"></Column>
              <Column field="GIORNI_INGRESSO_LEAD" header="Giorni ingresso lead"></Column>
            </DataTable>
          </div>
        </div>
        <div class="mt-4 pt-2">
          <h3 class="pl-2">Prestito SI - Notizie</h3>

          <div>
            <Card class="col-7 mb-4 ">
              <template #content>
                <h4>16 DICEMBRE 2022 - HOTEL
                  ARISTON PAESTUM</h4>
                <div class="grid">
                  <div class="col-4">
                    <img src="@/assets/images/psday.png" class="cursor-pointer" style="width:100%" />
                  </div>
                  <div class="col-8">
                    <p>Ritorna, dopo tre anni di stop, l’appuntamento con il PrestitoSì Day! La convention nazionale di
                      PrestitoSì, evento unico in Italia con tanto divertimento e un programma ricchissimo. Ricorre
                      anche l’anniversario del 10° anno di attività della nostra Grande Famiglia PrestitoSì e siamo
                      felici di festeggiare l’inizio di una nuova era per noi della Holding H2B e di tutto il Gruppo
                      PrestitoSì Finance S.p.A.</p>
                  </div>
                </div>
              </template>
            </Card>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import AxiosService from '@/axiosServices/AxiosService';

const router = useRouter()
const store = useStore()

const loading = ref(true)

console.log('getter livelli login', store.getters["getLivelliLogin"])
console.log('getter logget user', store.getters["loggedUser"])

function gotoCrm(data) {
  router.push('/crm/' + data.id)
}

const dashboardData = ref({
  nuoviLead: 0,
  leadDaLavorare: 0,
  leadCaldi: []
})
function getIndexes() {
  dashboardData.value = {
    nuoviLead: 0,
    leadDaLavorare: 0,
    leadCaldi: []
  }
  loading.value = true
  const service = new AxiosService('Dashboard/GetCRMDashboard')
  service.read()
    .then(res => {
      console.log("🚀 ~ file: Dashboard.vue:181 ~ getIndexes ~ res", res)
      dashboardData.value = res
    })
    .finally(() => {
      loading.value = false
    })
}


getIndexes()

</script>

<style lang="scss" scoped>

</style>