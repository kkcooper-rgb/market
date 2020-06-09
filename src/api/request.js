import axios from "axios"

axios.defaults.baseURL = "http://123.207.32.32:8000/api/m3";
axios.interceptors.response.use(res=>res.data);

export default function request(url,data={},method="get"){
    return new Promise((resolve,reject)=>{
        let p = null;

        if (method === 'get') { //如果请求是get方式
            p = axios.get(url, {
                params:data
            })
        } else {
            p = axios.post(url, data)
        }

        //得到数据就会触发p的then函数
        p.then(res=>{
            resolve(res)
        })
    })
}
