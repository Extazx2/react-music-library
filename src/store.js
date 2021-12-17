import {configureStore} from '@reduxjs/toolkit';
import musicReducer from './reducers/musicSlice'

export default configureStore({
    reducer: {
        music: musicReducer
    }
})