import {ajax,jsonp} from './ajax.js';

export default {
	host: 'http://api.live.nagezan.net/cgi-bin/',
	defaultHead:'http://static.live.nagezan.net/live/fb284641-a4a6-4a2f-b596-abfb49ba037c.png',
	get(url,params,callback){
		ajax('get',params)
			.then( (res)=>{
				callback(res);
			})
			.catch( (error)=> {
				console.log(error);
			});
	},
	/*
	 header 参数为"Content-type", "application/x-www-form-urlencoded" 为可选参数
	 请求头，这个不同的接口可能会不同，可能的参数有  text/plain，application/x-www-form-urlencoded，
	 */
	post(url,params,callback){
		ajax('post',params)
			.then( (res)=>{
				callback(res);
			})
			.catch( (error)=> {
				console.log(error);
			});
	},
	jsonp(url,callback){
		jsonp(url).then( (res)=> {
		 callback(res);
		})
	},
}
