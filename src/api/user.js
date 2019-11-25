import request from '../utils/request'
import ROOT_URL from '../../config/aip_root'

console.log(process.env.BASE_API)
const api = {
  userLogin: (params) => request.post('login', params, {
    baseUrl: ROOT_URL.ROOT_URL_BASE_API
  })
}

export default api
