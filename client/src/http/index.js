// export * as api from './api'
// export {default as http} from './request'

import * as apiModule from './api'
import httpModule from './request'

export const api = apiModule;
export const http = httpModule;
