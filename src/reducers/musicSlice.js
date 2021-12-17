import {createSlice} from "@reduxjs/toolkit";

export const musicSlice = createSlice({
    name: "music",
    initialState: {
        query: "",
        sortDirection: "asc",
        sortProperty: "title",
        //
        songPlaying: "",
        songs: [],
        albums: [],
        playlist: [],
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
        },
        //
        loadSongs: (state, action) => {
            state.songs = action.payload
        },
        loadAlbums: (state, action) => {
            state.albums = action.payload
        },
        addSongToPlaylist: (state, action) => {
            state.playlist.push(action.payload)
        }
    }
})


//Usage : store.dispatch(updateQuery())
export const {
    updateQuery,
    updateSortDirection,
    updateSortProperty,
    //
    loadSongs,
    loadAlbums,
    addSongToPlaylist,
} = musicSlice.actions

// Soit on appelle selectQuery pour récupérer la valeur.
// Soit on peut appeler "useSelector((state) => state.music.query)"
// state fait référence au state global
// music fait référence qu nom du reducer
export const selectQuery = state => state.music.query
export const selectSortDirection = state => state.music.sortDirection
export const selectSortProperty = state => state.music.sortProperty

export const selectSongs = state => state.music.songs
export const selectAlbums = state => state.music.albums
export const selectPlaylist = state => state.music.playlist
export const selectAllMusicStore = state => state.music

export default musicSlice.reducer