import albumsCollection from "./albums.json"
import songsCollection from "./songs.json"

function getAlbums() {
    return Promise.resolve(albumsCollection)
}

function getSongs() {
    // For each song in the songsCollection, we will try to find the matching album
    const songs = songsCollection.map(song => {
        // We try to find the album whose id is the same as the album id of the song
        const album = albumsCollection.find(alb => alb.id === song.album_id)
        // If we find the album, we can set the property album in the song object
        if (album) {
            song.album = album
        }
        return song
    })
    return Promise.resolve(songs)
}

export default {
    getAlbums,
    getSongs
}