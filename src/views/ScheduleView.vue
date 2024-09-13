<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as XLSX from "xlsx";
import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface Assignment {
  employee: string;
  hours: number;
}

interface Schedule {
  date: string;
  assignments: Assignment[];
}

export default defineComponent({
  setup() {
    const employeeInfo = ref<any>(null);
    const absencesInfo = ref<any>(null);
    const requirementsInfo = ref<any>(null);

    const schedules = ref<Schedule[]>([]);

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const employeeSheet = workbook.Sheets[workbook.SheetNames[0]];
          employeeInfo.value = XLSX.utils.sheet_to_json(employeeSheet, { raw: false });
          console.log(employeeInfo.value);

          const absencesSheet = workbook.Sheets[workbook.SheetNames[1]];
          absencesInfo.value = XLSX.utils.sheet_to_json(absencesSheet, { raw: false });
          console.log(absencesInfo.value);

          const requirementsSheet = workbook.Sheets[workbook.SheetNames[1]];
          requirementsInfo.value = XLSX.utils.sheet_to_json(requirementsSheet, { raw: false });
          console.log(requirementsInfo.value);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const processWithChatGPT = async () => {
      if (!employeeInfo.value) {
        console.error("No file data available");
        return;
      }

      try {
        const templateResponse = await axios.get('/work_schedule_prompt.txt');
        const promptTemplate = templateResponse.data;

        // Replace <INPUT-DATA> with the actual JSON data
        const prompt = promptTemplate
            .replace('<INPUT-EMPLOYEE-INFO>', JSON.stringify(employeeInfo.value, null, 2))
            .replace('<INPUT-ABSENCES-INFO>', JSON.stringify(absencesInfo.value, null, 2))
            .replace('<INPUT-REQUIREMENTS-INFO>', JSON.stringify(requirementsInfo.value, null, 2));

        console.log(prompt)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o',
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
        console.log(response)
        const responseContent = response.data.choices[0].message.content;
        console.log(responseContent)
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const processedData = JSON.parse(jsonMatch[0]);
          console.log(processedData);
          schedules.value = processedData.schedule;
          console.log(schedules.value);
        } else {
          console.error("No valid JSON found in the response content");
        }
      } catch (error) {
        console.error(error);
      }
    };
    return { schedules,  handleFileUpload, processWithChatGPT };
  },
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 custom-heading">AI Dienstplanerstellung</h1>
    <input type="file" @change="handleFileUpload" class="file-input mb-4"/>
    <button @click="processWithChatGPT" class="button-custom block">Plan erstellen</button>
    <table class="table-custom">
      <thead>
      <tr>
        <th>Datum</th>
        <th v-for="slot in 5" :key="slot">Mitarbeiter {{ slot }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(schedule, index) in schedules" :key="index">
        <td>{{ schedule.date }}</td>
        <td v-for="slot in 5" :key="slot">
          <div v-if="schedule.assignments[slot - 1] && schedule.assignments[slot - 1].hours > 0">
            {{ schedule.assignments[slot - 1].employee }} ({{ schedule.assignments[slot - 1].hours }} Stunden)
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>