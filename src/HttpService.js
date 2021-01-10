import axios from 'axios';
const HttpService = axios.create();

HttpService.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

HttpService.toQueryParams = (object) => {
  var str = [];
  for (var p in object)
  // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
    }
  return str.join('&');
};

export {
  HttpService,
};
