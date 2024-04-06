import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from './rooterReducer.ts'

export const store = createStore(rootReducer)
