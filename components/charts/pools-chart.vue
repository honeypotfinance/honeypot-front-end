<template>
  <div id="pools-chart" class="charts">
    <aside class="controls space wrap_inv" style="gap: 10px">
      <div class="center" style="gap: inherit">
        <v-tabs hide-slider>
          <v-tab v-for="item in dataSort" :key="item" class="tup" @change="filtersChart.sort = item">
            {{item}}
          </v-tab>
        </v-tabs>
        
        <v-select
          v-model="filtersChart.filter"
          :items="dataFilter"
          hide-details solo
          :menu-props="{offsetY: true}"
          class="font3"
          @input="updateData(filtersChart.filter)"
        >
          <template #append>
            <v-icon size="1.2em">mdi-chevron-down</v-icon>
          </template>
        </v-select>
      </div>

      <div class="divcol alignr" style="--fw: 700; gap: 5px">
        <span class="hspan jend">$11,632,685</span>
        <label class="jend">All time Volume</label>
      </div>
    </aside>

    <VueApexCharts
      ref="chart"
      :height="height"
      type="candlestick"
      :options="chartOptions"
      :series="chartSeries"
    ></VueApexCharts>
  </div>
</template>

<script>
export default {
  name: "ChartSwapComponent",
  props: {
    height: {
      type: String,
      default: "185.1px"
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataFilter: ["all time", "1y", "1d", "24h"],
      dataSort: ["tvl", "vol"],
      filtersChart: {
        filter: "all time",
        sort: "tvl",
      },
      // dataControlsChart: [ "1d", "1w", "1y", "all" ],
      // selection: 3,
      // series
      chartSeries: [
        {
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
          ]
        }
      ],
      // options
      chartOptions: {
        defaultLocale: 'en',
        grid: {
          show: false,
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#F7931A',
              downward: '#9A46E1'
            }
          }
        },
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
        // tooltip: {
        //   custom({series, seriesIndex, dataPointIndex, w}) {
        //     const
        //       [dateEpoch, value] = w.globals.initialSeries[seriesIndex].data[dataPointIndex],
        //       date = new Date(dateEpoch),
        //       day = date.getDate(),
        //       month = date.getMonth(),
        //       hr = date.getUTCHours(),
        //       m = "0" + date.getUTCMinutes(),
        //       time = `${hr}:${m.substr(-2)}`,
        //     fullDate = `${month.toMonthName()} ${day}, ${time}`;

        //     return `<span>${fullDate}</span>
        //     <span>Price: <b>$${value}</b></span>`;
        //   },
        //   marker: {
        //     show: false,
        //   },
        //   style: {
        //     fontSize: '11px',
        //   },
        // },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "#fff",
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
      },
    };
  },
  methods: {
    updateData(timeline) {
      switch (timeline) {
        case '1y': {
          this.$refs.chart.zoomX(new Date('27 Feb 2017').getTime());
          break
        }
        case '1d': {
          this.$refs.chart.zoomX(new Date('28 Jan 2017').getTime());
          break
        }
        case '24h': {
          this.$refs.chart.zoomX(new Date('27 Sep 2017').getTime());
          break
        }
        default: {
          this.$refs.chart.resetSeries();
        }
      }
    },
  }
};
</script>

<style src="~/assets/styles/components/charts.scss" lang="scss" />
