const baseAddressMap = {
 //test
 "localhost": "https://posadas-core.datarete.cloud/",

 //live
 "posadas.datarete.cloud": "https://posadas-core.datarete.cloud/",
}

const themesMap = {
 "localhost": "blue-theme",
 "posadas.datarete.cloud": "blue-theme",

}

const host = window.location.hostname;
const cleanedHost = host.replace(/[^a-z0-9._-]/gi, '').toLowerCase();

let baseAddress = null;
let theme = null;
if (cleanedHost) {
 baseAddress = baseAddressMap[host] || null;
 theme = themesMap[cleanedHost] || null;
}


const settingAddress = baseAddress + 'api/GetSettings';
const apiAddress = baseAddress + 'api/';
const driveAddress = baseAddress + 'Drive/';

export { baseAddress, settingAddress, apiAddress, driveAddress, theme };