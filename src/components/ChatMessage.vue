<template>
  <div class="message-block" :class="message.id_user == IdUser ? 'position-u' : 'position-bo'">
    <div class="message flex flex-column" :class="message.id_user == IdUser ? 'style-u' : 'style-bo'">
      <span>{{ message.message }}</span>
      <span v-if="message.files.length > 0">




        <div>
          <!-- {{ fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] }} -->
          <img style="width: 100%"
            v-if="fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] == 'png' || fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] == 'jpg' || fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] == 'jpeg' || fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] == 'svg'"
            :src="'https://posadas-core.datarete.cloud/'+message.files[0].file_url">

          <iframe v-else-if="fileExtention('https://posadas-core.datarete.cloud'+message.files[0].file_url)[0] == 'pdf'"
            :src="'https://posadas-core.datarete.cloud/'+message.files[0].file_url" frameborder="0"></iframe>


        </div>
        <span><a target="_blank" :href="'https://posadas-core.datarete.cloud/'+message.files[0].file_url"
            style="margin: .5rem 0">
            {{ fileName(message.files[0].file_url) }}<br>
          </a></span>





      </span>
      <span style="font-size: .8rem; color:azure">{{ formatDateTime(message.data) }}</span>
    </div>
  </div>
</template>

<script setup>
import auth from '@/store/modules/auth';
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  message: Object
})

const IdUser = auth.state.IdUser

function formatDateTime(value) {
  if (value) {
    let dateString = ''
    dateString = new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    let timeString = ''
    timeString = new Date(value).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    })

    let totString = dateString + ' ' + timeString
    return totString
  }
  return ''
}

function fileExtention(file) {
  return (/[.]/.exec(file)) ? /[^.]+$/.exec(file) : undefined;
}

function fileName(file) {
  console.log("🚀 ~ file: ChatMessage.vue ~ line 48 ~ fileName ~ file", file)
  const fileArr = file.replaceAll(' ', '-').split('_')
  return fileArr[1]

}
</script>