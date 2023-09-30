import { useContext } from 'react'
import Context from './Context'
export { default as withDatabase } from './with.js'
// export { default } from './Provider_filedata.js'
export { default } from './Provider.js'

export function useDatabase() {
    return useContext(Context)
}