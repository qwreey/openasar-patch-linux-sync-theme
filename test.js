const { spawn } = require('child_process')
const monitor = spawn('gsettings', ['monitor','org.gnome.desktop.interface','color-scheme'])
let current
monitor.stdout.setEncoding('utf8')

monitor.stdout.on('data', function(data) {
    data=data.toString().match(/color-scheme: '(.*)'/)[1]
    if (!data) return
    if (current == data) return
    current = data
    console.log(data === "prefer-dark" ? 'dark' : 'light')
})

