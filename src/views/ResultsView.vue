<script setup>
import { ref, watch, onMounted } from "vue";
import dayjs from "dayjs";
import useStockService from "@/services/stockService";
import { useRoute } from 'vue-router'

const route = useRoute()
const timeInterval = ref('1week');
const options = ref(['5min', '15min', '1h', '1day', '1week', '1month']);
const chart = ref(null);
const series = ref([]);

const chartOptions = ref({
  chart: {
    type: "candlestick",
    height: 750,
  },
  title: {
    text: "",
    align: "left",
  },
  xaxis: {
    type: "datetime",
    labels: {
      formatter: function(val) {
        return dayjs(val).format('MMM DD HH:mm')
      }
    }
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
});
// CandleStick Chart Data
/// y axis [open, high, low, close]
function convertToCandlestickData(data) {
  const candlestickData = data.values.map(item => ({
    x: new Date(item.datetime).getTime(),
    y: [parseFloat(item.open), parseFloat(item.high), parseFloat(item.low), parseFloat(item.close)]
  }));

  candlestickData.sort((a, b) => a.x - b.x);
  return [{
    name: 'candle',
    data: candlestickData
  }];
}

async function updateChart(data) {
  chartOptions.value.title.text = `${data.meta.symbol} - ${data.meta.interval} - ${data.meta.currency}`;
  await chart.value.updateOptions(chartOptions.value);
}

watch(timeInterval, async (newValue) => {
  const data = await useStockService.getTimeSeries(route.params.symbol, newValue);
  if (!data) return;
  updateChart(data);
  series.value = convertToCandlestickData(data);
  chart.value.updateSeries(series.value);
});

watch(route, async () => {
  location.reload();
});

onMounted(async () => {
  const data = await useStockService.getTimeSeries(route.params.symbol, timeInterval.value);
  if (!data) return;
  updateChart(data);
  series.value = convertToCandlestickData(data);
  chart.value.updateSeries(series.value);
});
</script>

<template>
  <main
    class="flex flex-column flex-nowrap justify-content-center align-items-center ml-5 mt-5"
  >
    <div class="card flex justify-content-center">
      <SelectButton v-model="timeInterval" :options="options" aria-labelledby="basic" />
    </div>
    <apexchart
      ref="chart"
      type="candlestick"
      height="750"
      width="1200"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </main>
</template>
