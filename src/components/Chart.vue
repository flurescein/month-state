<template>
  <div class="chart" :style="{ width }">
    <div class="bar"
         v-for="(value, index) in stats"
         :key="index"
         :style="{
           width: `calc(100px + ((100% - 100px) * ${(value - minValue) / (maxVale - minValue)}))`,
           background: getBackgroundColor(index)
         }"
         @mouseover="setHighlightedIndex(index)"
         @mouseout="setHighlightedIndex(undefined)">
      <div class="date">{{ index + 1 }}</div>
      <input type="number" v-model.number="stats[index]">
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'chart',
  props: {
    date: DateTime,
    stats: Array,
    width: String
  },
  data() {
    return {
      highlightedIndex: undefined,
      colors: {
        standard: 'linear-gradient(to right, #4568dc, #b06ab3)',
        highlighted: '#F7DC6F',
        max: '#27AE60',
        min: '#E74C3C'
      }
    }
  },
  computed: {
    maxVale() {
      return Math.max(...this.stats)
    },
    minValue() {
      return Math.min(...this.stats)
    },
    highlightedWeek() {
      return this.highlightedIndex != undefined
        ? this.getDateFromIndex(this.highlightedIndex).weekNumber
        : undefined
    },
    highlightedWeekStats() {
      return this.stats.filter((_, index) =>
        this.getDateFromIndex(index).weekNumber == this.highlightedWeek)
    },
    highlightedWeekMax() {
      return Math.max(...this.highlightedWeekStats)
    },
    highlightedWeekMin() {
      return Math.min(...this.highlightedWeekStats)
    }
  },
  methods: {
    setHighlightedIndex(index) {
      this.highlightedIndex = index
    },
    getDateFromIndex(index) {
      return DateTime.local(this.date.year, this.date.month, index + 1)
    },
    getBackgroundColor(index) {
      const weekNumber = this.getDateFromIndex(index).weekNumber

      return weekNumber != this.highlightedWeek
        ? this.colors.standard
        : this.stats[index] == this.highlightedWeekMax
          ? this.colors.max
          : this.stats[index] == this.highlightedWeekMin
            ? this.colors.min
            : this.colors.highlighted
    }
  }
}
</script>

<style lang="scss">
  $bar-radius: 0 15px 15px 0;

  .chart {
    transition: width 1s;

    .bar {
      height: 50px;
      margin: 15px 0;
      background: linear-gradient(to right, #4568dc, #b06ab3);
      border-radius: $bar-radius;
      position: relative;

      transition: width 1s;

      .date, input {
        font: 14px Oxygen, sans-serif;
        font-weight: 700;
        color: #17202A;
      }

      .date {
        position: absolute;
        margin-left: 15px;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;
        cursor: default;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        border-radius: $bar-radius;
        text-align: end;
        background: none;
        border: none;
        padding: 0 15px 0 0;
        outline: none;

        &:focus {
          background: white;
        }

        &[type=number]::-webkit-inner-spin-button,
        &[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type='number'] {
          -moz-appearance:textfield;
        }
      }
    }
  }
</style>
