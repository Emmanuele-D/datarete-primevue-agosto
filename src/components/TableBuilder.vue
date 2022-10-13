

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from 'vuex'
import TableSkeleton from './skeletons/TableSkeleton.vue';

const props = defineProps({
  headersConfig: Array,
  data: Array,
  config: Object,
  showAzioni: Boolean
});

const emit = defineEmits(['event_editRowItem', 'event_ShowSidebar_eye'])

const store = useStore()

const contentLoading = computed(() => store.getters.contentLoading)

const currentItem = ref()

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};

const menu = ref()
const items = ref([
  {
    label: 'Modifica',
    icon: 'pi pi-fw pi-pencil',
    event: 'edit',
  },
  {
    label: 'Crea Appuntamento',
    icon: 'pi pi-fw pi-calendar-plus',
    event: 'nuovoAppuntamento'
  },
  {
    label: 'Crea Pratica',
    icon: 'pi pi-fw pi-file',
    event: 'creaPratica'
  },
  {
    label: 'Elimina',
    icon: 'pi pi-fw- pi-trash',
    event: 'elimina'
  }
])

function toggle(event, data) {
  currentItem.value = data
  menu.value.toggle(event);
}

const top_tmenu_0 = ref()
function toggleTopMenu(event) {

  top_tmenu_0.value.toggle(event)
}

function getColDataType(colDataType) {
  if (colDataType == 'String') {
    return 'text';
  } else {
    return colDataType.toLowerCase();
  }
}



const headers = computed(() => {
  let finalArr = []

  finalArr = props.headersConfig.filter(x => x.visible == true)
  finalArr.sort((a, b) => {
    if (a.order) {
      return a.order > b.order ? 1 : -1
    }
    return -1
  })
  return finalArr
})

const globalFilters = computed(() => {
  return headers.value.filter(x => x.type != 'Boolean').map(x => x.field)
})

let filtersObj = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS
  }
})

watch(() => props.headersConfig, populateFiltersObj(props.headersConfig)

)
function populateFiltersObj(value) {
  value.forEach(element => {
    switch (element.type) {
      case "String":
        filtersObj.value[element.field] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        break
      case "Number":
        filtersObj.value[element.field] = {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
        break
      case "Date":
        filtersObj.value[element.field] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
        break
      case "Boolean":
        filtersObj.value[element.field] = {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
        break
    }
  })
}

populateFiltersObj(props.headersConfig)

function formatDate(value) {

  if (value) {
    return new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return ''
}

function getBadgeColor(value, colors) {
  const color = colors[value]
  if (color) {
    return {
      'background-color': color
    }
  }
  return {
    'background-color': 'grey'
  }
}
</script>

<template>

  <div v-if="contentLoading">
    <TableSkeleton></TableSkeleton>
  </div>


  <div v-else class="datatable-container">

    <div class=" flex justify-content-between align-items-center  mb-4">

      <Card class="w-100">
        <template #content>
          <div class="w-100 flex justify-content-between align-items-center">

            <Menubar :model="config.menuItems" class="w-100">

              <template #end>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filtersObj['global'].value" placeholder="Cerca..." />
                </span>
              </template>
            </Menubar>
          </div>
        </template>
      </Card>
    </div>

    <div>
      <Card>
        <template #content>
          <DataTable :value="data" :stripedRows="config.zebra" v-model:filters="filtersObj"
            :globalFilterFields="globalFilters" filterDisplay="menu" :paginator="true" :rows="10"
            :resizableColumns="true" :scrollable="true" table-layout="auto" ref="dt">
            <template #header>
              <div style="text-align: right">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
              </div>
            </template>
            <Column v-if="showAzioni" header="Azioni" style="min-width: 10px; max-width: 100px" :frozen="true">
              <template #body="{ data }">
                <div class="flex">
                  <i role="button" class="pi pi-fw pi-eye" @click="$emit('event_ShowSidebar_eye', data)"></i>
                  <i role="button" class="ml-3 pi pi-fw pi-cog" @click="toggle($event, data)" aria-haspopup="true"
                    aria-controls="overlay_tmenu"></i>
                </div>
                <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true">
                  <template #item="{ item }">
                    <div @click="$emit('event_ShowSidebar_' + item.event, currentItem)" class="tieredmenu-item">
                      <i :class="item.icon"></i>
                      <span>{{ item.label }}</span>
                    </div>
                  </template>
                </TieredMenu>

              </template>
            </Column>
            <Column v-for="col of headers" :field="col.field" :header="col.header" :key="col.field" :frozen="col.frozen"
              alignFrozen="true" :dataType="getColDataType(col.type)" :sortable="col.sortable"
              :showFilterMatchModes="true" :showFilterOperator="false" style="min-width: 50px">

              <template #filter="{ filterModel }">
                <TriStateCheckbox v-if="col.type == 'Boolean'" v-model="filterModel.value" />

                <InputText v-if="col.type == 'String'" type="text" v-model="filterModel.value" placeholder="Cerca..." />

                <Calendar v-if="col.type == 'Date'" v-model="filterModel.value" dateFormat="dd/mm/yy"
                  placeholder="dd/mm/yyyy" />

                <InputNumber v-if="col.type == 'Number'" type="number" v-model="filterModel.value" />
              </template>

              <template #body="{ data }">

                <div v-if="contentLoading">
                  <Skeleton></Skeleton>
                </div>

                <div v-else>
                  <span v-if="col.type == 'Date'"> {{ formatDate(data[col.field]) }}</span>

                  <Badge v-else-if="col.badge == true" :value="data[col.field]"
                    :style="getBadgeColor(data[col.field], col.badgeColors)"></Badge>

                  <span v-else-if="col.type == 'Boolean'">
                    <i v-if="data[col.field] == true" class="pi pi-fw pi-check"></i>
                    <i v-else class="pi pi-fw pi-times"></i>
                  </span>
                  <template v-else>{{ data[col.field] }}</template>
                </div>

              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>

</template>