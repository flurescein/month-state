<template>
  <div id="app">
    <chart :date="date"
           :stats="stats" 
           :width="chartWidth" />
    
    <div class="control-buttons">
      <control-button icon="redo" @click.native="randomizeStats" />
      <control-button icon="calendar" @click.native="openedMenu = 'date'" />
      <control-button icon="align-justify" @click.native="openedMenu = 'presets'" />
      <control-button icon="info" @click.native="openedMenu = 'about'" />
    </div>
    <popup-menu :menu-state="openedMenu" 
                menu-name="date"
                @close-button-clicked="openedMenu = undefined">
      <h1>Date</h1>
      <input class="date-selector" 
             type="date"
             :value="date.toISODate()"
             @input="setDate($event.target.value)">
    </popup-menu>
    <popup-menu :menu-state="openedMenu" 
                menu-name="presets"
                @close-button-clicked="openedMenu = undefined">
      <h1>Presets</h1>
      <p class="preset"
         v-for="(preset, index) in presets"
         :key="index"
         @click="setPreset(index)">
        {{ preset.name }}
      </p>
    </popup-menu>
    <popup-menu :menu-state="openedMenu" 
                menu-name="about"
                @close-button-clicked="openedMenu = undefined">
      <h1>About</h1>
      <p>Before you is a project written by flurescein for an introductory test on an internship in JetBrains.</p>
    </popup-menu>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

import Chart from './Chart.vue'
import ControlButton from './ControlButton.vue'
import PopupMenu from './PopupMenu.vue'

import presets from '../presets.json'

export default {
  name: 'app',
  components: { 
    Chart, 
    ControlButton,
    PopupMenu
  },
  data() {
    return {
      date: DateTime.local(),
      stats: [],
      chartWidth: 'calc(100vw - 100px)',
      openedMenu: undefined,
      presets
    }
  },
  methods: {
    randomizeStats() {
      this.stats = Array.from({ 
        length: this.date.daysInMonth 
      }, () => Math.floor(Math.random() * 10))
    },
    setDate(ISODateString) {
      this.date = DateTime.fromISO(ISODateString)
      this.randomizeStats()
    },
    setPreset(presetIndex) {
      this.date = DateTime.fromISO(this.presets[presetIndex].date)
      this.stats = this.presets[presetIndex].values
    }
  },
  created() {
    this.randomizeStats()
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Oxygen:400,700');

  $background-black: #17202A;

  body {
    margin: 0;
    background: $background-black;
  }

  .control-buttons {
    position: fixed;
    top: 0;
    right: 15px;

    .control-button {
      margin-top: 15px;
    }
  }

  .date-selector {
    border: 1px $background-black solid;
  }

  .preset {
    cursor: pointer;
    text-decoration: underline #333;
  }
</style>
