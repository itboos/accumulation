// 
const config = {
  callback: 'callback',
}

function generateCB() {
  //return `jsonp${Math.ceil(Math.random() * 1000000)}`;
  return `jsonp${Math.random().toString(36).substr(2)}`;
}

function removeCB(_name) {
  try {
    delete window[_name];
  } catch (e) {
    window[_name] = undefined;
  }
}

function createScript(_url, _id) {
  const script = document.createElement('script');
  script.setAttribute('src', _url);
  script.id = _id;
  script.type = 'text/javascript';
  script.async = true;
  //script.onload = handler; 脚本加载完毕后调用...
  //script.onerror = handler;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function removeScipt(_id) {
  const script = document.getElementById(_id);
  document.getElementsByTagName('head')[0].removeChild(script);
}

function jsonp(_url, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    const jsonp = options.callback || config.callback,
      cb = generateCB(), // get callback function name
      scriptId = cb;

    let query = [];
    Object.keys(params).forEach(key => {
      query.push(`${key}=${params[key]}`);
    })
    _url += (query.elngth === 0) ? '?' : `?${query.join('&')}`;
    _url += `&${jsonp}=${cb}`;

    // register the callback function
    window[cb] = (res) => {
      resolve(res);
      removeScipt(scriptId);
      removeCB(cb);
    }

    createScript(_url, scriptId);
  })
}

export default jsonp