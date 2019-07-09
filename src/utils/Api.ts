import axios from 'axios'

export const get:Function = (url:string,header:object = {}) => {
  return new Promise(async (resolve,reject)=>{
    try {
      const response = await axios.get(url,header)
      resolve(response)
    }catch(err){
      reject(err)
    }
  })
}

export const post:Function = (url:string,body:any,header:object = {}) => {
  return new Promise(async (resolve,reject)=> {
    try {
      const response = await axios.post(url,body,header)
      resolve(response)
    }catch(err){
      reject(err)
    }
  })
}

export const put:Function = (url:string,body:any,header:object = {}) => {
  return new Promise(async (resolve,reject)=> {
    try {
      const response = await axios.put(url,body,header)
      resolve(response)
    }catch(err){
      reject(err)
    }
  })
}

export const deleteApi:Function = (url:string,header:object = {}) => {
  return new Promise(async (resolve,reject)=> {
    try {
      const response = await axios.delete(url,header)
      resolve(response)
    }catch(err){
      reject(err)
    }
  })
}