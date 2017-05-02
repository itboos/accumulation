function ajax(type='GET', url='', data={}, _header, async=true){
	//设置请求头，默认为 application/x-www-form-urlencoded
	const header=_header || "application/x-www-form-urlencoded";
	return new Promise((resolve, reject) => { //定义一个promise
		type = type.toUpperCase();
		let requestObj;

		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject("Microsoft.XMLHTTP"); // IE6以下
		}

		if (type == 'GET') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
			requestObj.open(type, url, async);
			//requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.setRequestHeader("Content-type", header);
			requestObj.send();
		}else if (type == 'POST') {
			requestObj.open(type, url, async);alert(header);
			//requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.setRequestHeader("Content-type", header);
			requestObj.send(JSON.stringify(data));
		}else {
			reject('error type');
		}

		requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					resolve(obj);
				}else {
					reject(requestObj);
				}
			}
		}
	})
}
// jsonp的方法
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

export {
	ajax,jsonp
}
