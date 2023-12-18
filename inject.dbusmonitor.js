const { spawn } = require('child_process')
const { nativeTheme } = require('electron')
const monitor = spawn('dbus-monitor', ['path=/org/freedesktop/portal/desktop,interface=org.freedesktop.impl.portal.Settings'])
let current
monitor.stdout.setEncoding('utf8')
monitor.stdout.on('data', function(data) {
    data=data.toString().match(/signal[^\n]+\n *string "org.freedesktop.appearance"\n *string "color-scheme"\n *variant *uint32 (\d)/)?.[1]
    if (!data) return
    if (current !== data)
    current = data
    nativeTheme.themeSource = data === "1" ? 'dark' : 'light'
})

