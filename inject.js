const dbus = require('dbus-native')
const sessionBus = dbus.sessionBus()
const { nativeTheme } = require('electron')
let current

const updateTheme = isDarkTheme=>{
    nativeTheme.themeSource = isDarkTheme ? 'dark' : 'light'
}

sessionBus.getService('org.freedesktop.portal.Desktop').getInterface(
    '/org/freedesktop/portal/desktop',
    'org.freedesktop.portal.Settings', function(err, desktop) {

    desktop.Read('org.freedesktop.appearance','color-scheme',function(err,value){
        current = value[1][0][1][0]
        updateTheme(current===1)
    })
    desktop.on('SettingChanged',function(namespace,key,value){
        if(namespace !== 'org.freedesktop.appearance' || key !== 'color-scheme') return
        let newValue = value[1][0]
        if (current === newValue) return
        current = newValue
        updateTheme(current===1)
    })
})
