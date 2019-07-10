
const BASE_API_URL = "/api/v1"

const URL_LOCAL = `http://127.0.0.1:3333${BASE_API_URL}`
const URL_PROD = `..${BASE_API_URL}`

export const UPLOAD_URL = process.env.NODE_ENV === "development" ? `${URL_LOCAL}/upload` : `${URL_PROD}/upload`
