import {createSlice} from "@reduxjs/toolkit";

export const musicSlice = createSlice({
    name: "music",
    initialState: {
        query: "",
        sortDirection: "ASC",
        sortProperty: "title"
    },
    reducers: {
        updateQuery: (state, action) => {
            state.query = action.payload
        },
        updateSortDirection: (state, action) => {
            state.sortDirection = action.payload
        },
        updateSortProperty: (state, action) => {
            state.sortProperty = action.payload
        }
    }
})


//Usage : store.dispatch(updateQuery())
export const { updateQuery, updateSortDirection, updateSortProperty } = musicSlice.actions

// Soit on appelle selectQuery pour récupérer la valeur.
// Soit on peut appeler "useSelector((state) => state.music.query)"
// state fait référence au state global
// music fait référence qu nom du reducer
export const selectQuery = state => state.music.query
export const selectSortDirection = state => state.music.sortDirection
export const selectSortProperty = state => state.music.sortProperty

export default musicSlice.reducer