<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as XLSX from 'xlsx';
import axios from "axios";
import { useRouter } from 'vue-router';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default defineComponent({
  setup() {
    const router = useRouter();
    const fileData = ref<any>(null);

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          fileData.value = XLSX.utils.sheet_to_json(worksheet);
          console.log(fileData.value);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const processWithChatGPT = async () => {
      if (!fileData.value) {
        console.error("No file data available");
        return;
      }

      try {
        const templateResponse = await axios.get('/work_schedule_prompt.txt');
        const promptTemplate = templateResponse.data;

        // Replace <INPUT-DATA> with the actual JSON data
        const prompt = promptTemplate.replace('<INPUT-DATA>', JSON.stringify(fileData.value, null, 2));

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: "user",
            content: prompt
          }]
        }, {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        const processedData = response.data.choices[0].message.content;
        console.log(processedData);
        await router.push({ name: 'schedule', query: { data: encodeURIComponent(processedData) } });
      } catch (error) {
        console.error(error);
      }
    };

    return { handleFileUpload, processWithChatGPT };
  },
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Upload Excel File</h1>
    <input type="file" @change="handleFileUpload" class="button-custom" />
    <button @click="processWithChatGPT" class="button-custom mt-4">Create Schedule</button>
  </div>
</template>
