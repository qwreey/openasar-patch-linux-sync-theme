[ -e openasar ] && rm -rf openasar
git clone https://github.com/GooseMod/OpenAsar openasar --depth 1
cd openasar/src
npm add dbus-native
cd ..

echo "" >> src/bootstrap.js
cat ../inject.js >> src/bootstrap.js
rm src/node_modules/abstract-socket/build/node_gyp_bins/python3
asar pack src app.asar
[ -e /opt/discord/resources/app.asar ] && sudo cp app.asar /opt/discord/resources/app.asar
cd ..
