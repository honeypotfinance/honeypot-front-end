<template>
  <div id="swap-chart" class="charts fill" :style="`--c-trend: ${isTrendUp ? 'var(--success)' : 'var(--error)'}`">
    <section class="charts-header jspace">
      <div class="divcol font2">
        <span>HNY/POT</span>
        <span>{{currentPrice ? `$${currentPrice}` : ''}}</span>
        <div class="acenter">
          <v-icon :color="isTrendUp ? 'var(--success)' : 'var(--error)'">mdi-trending-{{isTrendUp ? 'up' : 'down'}}</v-icon>
          <span style="--c: var(--c-trend)">{{trendingPercent}}</span>
        </div>
      </div>

      <v-btn
        icon width="32px" height="32px" class="aspect" title="expand chart" style="top: -10px"
        @click="$emit('model')">
        <img v-if="!closable" src="~/assets/sources/icons/expand.svg" alt="expand chart" class="aspect" style="--w: 16px">
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
    </section>

    <VueApexCharts
      ref="chart"
      width="100%"
      :height="height"
      type="line"
      :options="chartOptions"
      :series="chartSeries"
    ></VueApexCharts>

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
    const
      x = baseval,
      y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

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
    },
    closable: {
      type: Boolean,
      default: false,
    },
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
          custom({series, seriesIndex, dataPointIndex, w}) {
            const
              [dateEpoch, value] = w.globals.initialSeries[seriesIndex].data[dataPointIndex],
              date = new Date(dateEpoch),
              day = date.getDate(),
              month = date.getMonth(),
              hr = date.getUTCHours(),
              m = "0" + date.getUTCMinutes(),
              time = `${hr}:${m.substr(-2)}`,
            fullDate = `${month.toMonthName()} ${day}, ${time}`;

            return `<span>${fullDate}</span>
            <span>Price: <b>$${value}</b></span>`;
          },
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
  computed: {
    data() {
      return this.chartSeries[0].data;
    },
    currentPrice() {
      return this.data[this.data.length-1][1]
    },
    isTrendUp() {
      return this.data[this.data.length-1][1] > this.data[this.data.length-2][1]
    },
    trendingPercent() {
      return `
        ${((this.data[this.data.length-1][1] / this.data[this.data.length-2][1])
        * 100).toFixed(0)}%
      `;
    }
  },
  methods: {
    updateData(timeline) {
      switch (timeline) {
        case '1d': {
          this.selection = 0
          this.$refs.chart.zoomX(new Date(this.data[this.data.length-2][0]).getTime());
          break
        }
        case '1w': {
          this.selection = 1
          this.$refs.chart.zoomX(new Date(this.data[this.data.length-(1 + 7)][0]).getTime());
          break
        }
        case '1y': {
          this.selection = 2
          if (this.data.length-1 > this.data.length-(1 + 365)) return this.$alert('cancel', 'No data available');
          this.$refs.chart.zoomX(new Date(this.data[this.data.length-(1 + 365)][0]).getTime());
          break
        }
        default: {
          this.selection = 3
          this.$refs.chart.resetSeries();
        }
      }
    },
  }
};
</script>

<style src="~/assets/styles/components/charts.scss" lang="scss" />
