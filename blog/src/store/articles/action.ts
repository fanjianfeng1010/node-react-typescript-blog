import { action } from 'typesafe-actions'
import { BlogActionTypes, Blog } from './types'

export const fetchRequest = () => action(BlogActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: Blog[]) => action(BlogActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(BlogActionTypes.FETCH_ERROR, message)
