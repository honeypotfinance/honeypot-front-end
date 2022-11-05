<template>
  <div class="charts fill">
    <section class="charts-header jspace">
      <div class="divcol font2">
        <span>HNY/POT</span>
        <span>$200</span>
        <div class="acenter">
          <v-icon color="var(--success)">mdi-trending-up</v-icon>
          <span style="--c: var(--success)">22%</span>
        </div>
      </div>

      <v-btn
        icon width="32px" height="32px" class="aspect" title="expand chart" style="top: -10px"
        @click="$parent.$parent.$refs.modal.modalChart = true">
        <img src="~/assets/sources/icons/expand.svg" alt="expand chart" class="aspect" style="--w: 16px">
      </v-btn>
    </section>

    <ApexChart
      ref="chart"
      width="100%"
      :height="height"
      type="line"
      :options="chartOptions"
      :series="chartSeries"
    ></ApexChart>

    <v-btn-toggle v-model="selection" mandatory class="charts-footer">
      <v-btn
        v-for="item in dataControlsChart" :key="item"
        @click="updateData(item)">
        {{item}}
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
  props: {
    height: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      dataControlsChart: [ "1d", "1w", "1y", "all" ],
      selection: 3,
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
      switch (timeline) {
        case '1d': {
          this.$refs.chart.zoomX(new Date('28 Jan 2017').getTime());
          this.selection = 0
          break
        }
        case '1w': {
          this.$refs.chart.zoomX(new Date('27 Sep 2017').getTime());
          this.selection = 1
          break
        }
        case '1y': {
          this.$refs.chart.zoomX(new Date('27 Feb 2017').getTime());
          this.selection = 2
          break
        }
        default: {
          this.$refs.chart.resetSeries();
          this.selection = 3
        }
      }
    },
  }
};
</script>

<style src="~/assets/styles/components/charts.scss" lang="scss" />
