<template>
  <div id="charts" class="fill">
    <ApexChart
      ref="chart"
      width="100%"
      height="100%"
      type="line"
      :options="chartOptions"
      :series="chartSeries"
    ></ApexChart>

    <v-btn-toggle mandatory color="#60D2CA">
      <v-btn v-for="item in dataControlsChart" :key="item" color="transparent" @click="updateData(item)">
        <span>{{item}}</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
// autogenerate series functioin for style test
function generateDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
// autogenerate series functioin for style test

export default {
  name: "ChartSwapComponent",
  data() {
    return {
      dataControlsChart: [ "1d", "1w", "1y", "all" ],
      selection: 'all',
      // series
      chartSeries: [
        {
          name: '',
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
      ],
      // options
      chartOptions: {
        defaultLocale: 'en',
        grid: {
          show: false,
        },
        colors: ["#4ABCA4"],
        chart: {
          stacked: false,
          toolbar: {
            show: false,
            autoSelected: "zoom",
          },
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'butt',
          width: 4.5,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
          colors: ["#000"],
          strokeColors: ["#fff"],
          strokeWidth: 4,
          hover: {
            size: 8,
          },
        },
        tooltip: {
          marker: {
            show: false,
          },
          style: {
            fontSize: '11px',
          },
        },
        legend: {
          show: false,
          position: 'top',
          horizontalAlign: "start",
        },
        yaxis: {
          labels: {
            show: false,
          }
        },
        xaxis: {
          type: "datetime",
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          }
        },
      },
    };
  },
  methods: {
    updateData(timeline) {
      this.selection = timeline
      
      switch (timeline) {
        case '1d':
          this.$refs.chart.zoomX(
            new Date('28 Jan 2013').getTime(),
            new Date('27 Feb 2013').getTime()
          )
          break
        case '1w':
          this.$refs.chart.zoomX(
            new Date('27 Sep 2012').getTime(),
            new Date('27 Feb 2013').getTime()
          )
          break
        case '1y':
          this.$refs.chart.zoomX(
            new Date('27 Feb 2012').getTime(),
            new Date('27 Feb 2013').getTime()
          )
          break
        default:
          this.$refs.chart.zoomX(
            new Date('23 Jan 2012').getTime(),
            new Date('27 Feb 2013').getTime()
          )
      }
    },
  }
};
</script>

<style src="~/assets/styles/components/charts.scss" lang="scss" />
