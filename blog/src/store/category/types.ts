export interface ResponseData<T> {
  code: number
  msg: string
  data: T
}

export interface Category extends ApiResponse {
  readonly _id: string
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly articleCount: number
}

export interface Dataresponse {
  code: number
  msg: string
  data: ResponseData<Category[]>
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
export enum categoryActionTypes {
  FETCH_REQUEST = '@@category/FETCH_REQUEST',
  FETCH_SUCCESS = '@@category/FETCH_SUCCESS',
  FETCH_ERROR = '@@category/FETCH_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface CategoryState {
  readonly loading: boolean
  readonly data: Category[]
  readonly errors?: string
}
