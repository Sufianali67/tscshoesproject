const url = require("url");
const urlObj = url.parse(document.location.href, true);
const AppMode = [process.env.REACT_APP_ENV];

let development;
if (urlObj.hostname.indexOf("localhost") != -1) {
  development = urlObj.protocol + "//" + urlObj.hostname + ":1339";
} else {
  development = urlObj.protocol + "//" + urlObj.hostname;
}

const production = "";

let baseURL = "";
switch (AppMode[0]) {
  case "dev":
    baseURL = development;
    break;
  case "pro":
    baseURL = production;
    break;
  default:
    baseURL = development;
}

export { baseURL };
