<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

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
    const route = useRoute();
    const schedules = ref<Schedule[]>([]);

    onMounted(() => {
      const data = route.query.data as string;
      if (data) {
        schedules.value = JSON.parse(decodeURIComponent(data)).schedule;
      }
    });

    return { schedules };
  },
});
</script>

<template>
  <div>
    <h1>Work Schedule</h1>
    <table class="table-custom">
      <thead>
        <tr>
          <th>Date</th>
          <th>Employee 1</th>
          <th>Hours 1</th>
          <th>Employee 2</th>
          <th>Hours 2</th>
          <th>Employee 3</th>
          <th>Hours 3</th>
          <th>Employee 4</th>
          <th>Hours 4</th>
          <th>Employee 5</th>
          <th>Hours 5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(schedule, index) in schedules" :key="index">
          <td>{{ schedule.date }}</td>
          <td v-for="slot in 5" :key="slot">
            <div v-if="schedule.assignments[slot - 1]">
              {{ schedule.assignments[slot - 1].employee }}
            </div>
          </td>
          <td v-for="slot in 5" :key="slot + 5">
            <div v-if="schedule.assignments[slot - 1]">
              {{ schedule.assignments[slot - 1].hours }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>