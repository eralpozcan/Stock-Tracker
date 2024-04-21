<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { CandlestickController } from 'chartjs-chart-financial'; // CandlestickController'ı doğru şekilde import ettiğinizden emin olun
import 'chartjs-adapter-date-fns';
import useStockService from '@/services/stockService';

const chartRef = ref(null);
const myChart = ref(null);

Chart.register(CandlestickController, ...registerables);

const chartData = ref([
  { t: 1616054400, o: 122, h: 125, l: 120, c: 123 },
  { t: 1616140800, o: 123, h: 126, l: 121, c: 124 },
  { t: 1616227200, o: 124, h: 127, l: 122, c: 125 },
]);

function createChart(){
  myChart.value = new Chart(chartRef.value, {
    type: 'candlestick',
    data: {
      datasets: [{
        label: 'Stock Price',
        data: chartData.value.map(data => ({
          t: data.t,
          o: data.o,
          h: data.h,
          l: data.l,
          c: data.c
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'day'
          }
        }
      }
    }
  });
}

onMounted(() => {
  createChart();
});
</script>

<template>
  <main class="flex justify-content-center align-items-center ml-5 mt-5" style="height: 600px;">
    <canvas ref="chartRef"></canvas>
  </main>
</template>
