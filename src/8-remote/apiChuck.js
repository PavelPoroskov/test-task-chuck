import {get} from './fetch-methods'
import {CHUCK_API_URL} from '@/config'


const getJoke = () => get(`${CHUCK_API_URL}/jokes/random`).then(json => {
  const {id, value} = json
  return {id, value}
})

export const apiChuck = {
  getJoke
}