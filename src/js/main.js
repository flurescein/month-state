import styles from '../scss/main.scss'

import DateTime from 'luxon/src/datetime.js'

window.Moon = require('moonjs')

const datepicker = document.getElementById('datepicker')

const startDate = DateTime.local()

const getRandomStats = date => Array.from({
    length: date.daysInMonth
}, () => Math.floor(Math.random() * 10))

const app = new Moon({
    el: 'body',
    data: {
        date: startDate,
        stats: getRandomStats(startDate),
        isOptionsOpen: false,
        presets: require('./presets.json'),
        barColor: 'linear-gradient(to bottom, #00d2ff, #3a7bd5)',
        highlightColor: '#F7DC6F',
        maxHighlightColor: '#82E0AA',
        minHighlightColor: '#E74C3C',
        dateHighlightColor: '#F44336'
    },
    methods: {
        maxValue() {
            return Math.max(...this.get('stats'))
        },
        indexToDate(n) {
            return Number(n) + 1
        },
        updateDate() {
            const newDate = DateTime.fromFormat(datepicker.value, 'y-MM-dd')
            app.set('date', newDate)
            this.callMethod('randomazeValues')
        },
        randomazeValues() {
            this.set('stats', getRandomStats(this.get('date')))
        },
        repaintBar(index, color) {
            document.getElementById(`bar-${index}`).style.background = color
        },
        repaintDate(index, color) {
            document.getElementById(`date-${index}`).style.background = color
        },
        highlightWeekAndDate(index, barColor, maxColor, minColor, dateColor) {
            this.callMethod('repaintDate', [index, dateColor])

            const stats = this.get('stats')
            const date = this.get('date')
            const indexDate = DateTime.local(date.year, date.month, index + 1)

            const weekStats = stats
                .map((v, i) => ({
                    value: v,
                    day: i + 1
                }))
                .filter(s => DateTime.local(date.year, date.month, s.day).weekNumber ==
                             indexDate.weekNumber)

            const maxWeekValue = Math.max(...weekStats.map(s => s.value))
            const minWeekValue = Math.min(...weekStats.map(s => s.value))

            weekStats.forEach(s => {
                if (s.value == maxWeekValue) {
                    this.callMethod('repaintBar', [s.day - 1, maxColor])
                } else if (s.value == minWeekValue) {
                    this.callMethod('repaintBar', [s.day - 1, minColor])
                } else {
                    this.callMethod('repaintBar', [s.day - 1, barColor])
                }

            })
        },
        repaintAllBarsAndDates(barsColor, datesColor) {
            this.get('stats').forEach((_, i) => {
                this.callMethod('repaintDate', [i, datesColor])
                this.callMethod('repaintBar', [i, barsColor])
            })
        },
        invertOptionsState() {
            this.set('isOptionsOpen', !this.get('isOptionsOpen'))

            if (this.get('isOptionsOpen')) {
                document.getElementById('options').style.top = 'calc(100vh - 300px)'
            } else {
                document.getElementById('options').style.top = '100vh'
            }
        },
        setPreset(date, values) {
            this.set('date', DateTime.fromFormat(date, 'y-MM-dd'))
            datepicker.value = date
            this.set('stats', values)
        }
    }
})

datepicker.value = startDate.toFormat('y-MM-dd')
