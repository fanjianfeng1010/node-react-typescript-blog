import { action } from 'typesafe-actions'
import { categoryActionTypes, Category } from './types'

export const fetchRequest = () => action(categoryActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: Category[]) => action(categoryActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(categoryActionTypes.FETCH_ERROR, message)
