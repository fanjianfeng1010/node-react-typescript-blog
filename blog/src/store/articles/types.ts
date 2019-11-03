import { Category } from '../category/types'
export interface ResponseData<T> {
  code: number
  msg: string
  data: T
}

export interface Blog extends ApiResponse {
  readonly _id: string
  readonly title: string
  readonly content: string
  readonly summary: string
  readonly category: Category
  readonly commentCount?: number
  readonly viewsCount?: number
  readonly likeCount?: number
  readonly createdAt: string
  readonly tags?: string[]
  readonly pre?: string
  readonly next?: string
  readonly imgUrl?: string
}

export interface Dataresponse {
  code: number
  msg: string
  data: ResponseData<Blog[]>
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum BlogActionTypes {
  FETCH_REQUEST = '@@blog/FETCH_REQUEST',
  FETCH_SUCCESS = '@@blog/FETCH_SUCCESS',
  FETCH_ERROR = '@@blog/FETCH_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface BlogState {
  readonly loading: boolean
  readonly data: Blog[]
  readonly errors?: string
}
