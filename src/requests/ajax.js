import axios from 'axios'
const baseURL='http://127.0.0.1:3000'
const ajax = axios.create({
  baseURL:baseURL,        //api请求的baseURL
  timeout: 0,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  maxContentLength: 2000,
  transformResponse: [function (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    // if (data.status === 403) {
    //   console.log(data);
    //   localStorage.removeItem('mt-username')
    //   router.push('/login');
    // }
    return data
  }]
})

// get
export const _get = (req) => {
  return ajax.get(req.url, { params: req.data })
}

// post
export const _post = (req) => {
  return ajax({ method: 'post', url: `/${req.url}`, data: req.data })
}

// patch
export const _put = (req) => {
  return ajax({ method: 'put', url: `/${req.url}`, data: req.data })
}

// delete
export const _delete = (req) => {
  return ajax({ method: 'delete', url: `/${req.url}`, data: req.data })
}

// post and no withCredentials
export const _postNoWithCredentials = (req) => {
  return axios({ method: 'post', url: `/${req.url}`, data: req.data, withCredentials: false })
}
