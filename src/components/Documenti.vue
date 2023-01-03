<template>
  <div class="wrapper">

    <div v-for="item of data" :key="item.id">

      <h3 class="mb-4">{{ item.title }}</h3>
      <div class="grid mb-4 w-full" v-for="documento of item.documenti" :key="documento.id">
        <div class="col-12">
          <Card>
            <template #content>
              <div class="flex justify-content-between">
                <div class="col-4">
                  <h4>{{ documento.title }}</h4>
                  <FileUpload @uploader="uploadFile" mode="basic" uploadIcon="pi pi-paperclip" name="demo[]"
                    :customUpload="true" :previewWidth="50" :maxFileSize="90000000" :auto='true' />
                </div>

                <div class="col-8">
                  <DataTable :value="documento.files" :stripedRows="true" :rows="10" table-layout="auto">

                    <Column field="nome" header="NOME FILE"></Column>
                    <Column field="info" header="INFORMAZIONI FILE"></Column>
                    <Column header="AZIONI">
                      <template #body>
                        <Button icon="pi pi-file" class="p-button-rounded mr-2"></Button>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"></Button>
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
            </template>
          </Card>

        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';


const tempUrlFile = ref('')

function uploadFile(ev) {

  const service = new AxiosService('files')


  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service.postCustomEndpoint('Upload?type=' + 'DocumentiPratiche', '', formData)
      .then(res => {
        console.log("🚀 ~ file: Documenti.vue ~ line 60 ~ uploadFile ~ res", res)
        tempUrlFile.value = res
      });
  }

}


const data = [
  {
    id: 1,
    title: 'DOCUMENTI DI IDENTITÀ',
    documenti: [
      {
        id: 1,
        title: 'Carta di Identità del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '12/03/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '29/03/2022 - Mario Bianchi'
          }
        ]
      },
      {
        id: 2,
        title: 'Codice Fiscale del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '04/05/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '05/05/2022 - Mario Bianchi'
          },
          {
            id: 3,
            nome: 'file tre',
            info: '10/06/2022 - Mario Bianchi'
          },
          {
            id: 4,
            nome: 'file 4',
            info: '13/06/2022 - Mario Bianchi'
          }
        ]
      },
      {
        id: 1,
        title: 'Carta di Identità del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '12/03/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '29/03/2022 - Mario Bianchi'
          }
        ]
      },
      {
        id: 2,
        title: 'Codice Fiscale del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '04/05/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '05/05/2022 - Mario Bianchi'
          },
          {
            id: 3,
            nome: 'file tre',
            info: '10/06/2022 - Mario Bianchi'
          },
          {
            id: 4,
            nome: 'file 4',
            info: '13/06/2022 - Mario Bianchi'
          }
        ]
      },
      {
        id: 1,
        title: 'Carta di Identità del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '12/03/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '29/03/2022 - Mario Bianchi'
          }
        ]
      },
      {
        id: 2,
        title: 'Codice Fiscale del Legale Rappresentante',
        files: [
          {
            id: 1,
            nome: 'file uno',
            info: '04/05/2022 - Mario Bianchi'
          },
          {
            id: 2,
            nome: 'file 2',
            info: '05/05/2022 - Mario Bianchi'
          },
          {
            id: 3,
            nome: 'file tre',
            info: '10/06/2022 - Mario Bianchi'
          },
          {
            id: 4,
            nome: 'file 4',
            info: '13/06/2022 - Mario Bianchi'
          }
        ]
      }
    ]
  }
]
</script>