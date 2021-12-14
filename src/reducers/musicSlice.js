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
        }
    }
})


//Usage : store.dispatch(updateQuery())
export const { updateQuery } = musicSlice.actions

// Soit on appelle selectQuery pour récupérer la valeur.
// Soit on peut appeler "useSelector((state) => state.music.query)"
// state fait référence au state global
// music fait référence qu nom du reducer
export const selectQuery = state => state.music.query

export default musicSlice.reducer