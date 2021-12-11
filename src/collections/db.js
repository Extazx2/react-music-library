import albumsCollection from "./albums.json"
import songsCollection from "./songs.json"

const delayedResolve = (payload) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(payload), 800)
  })
}

const getAlbums = () => {
  return Promise.resolve(albumsCollection)
}

const getSongs = (query = "", sort = { property: "title", direction: "asc" }) => {
  // For each song in the songsCollection, we will try to find the matching album
  let songs = songsCollection.map(song => {
    // We try to find the album whose id is the same as the album id of the song
    const album = albumsCollection.find(alb => alb.id === song.album_id)
    // If we find the album, we can set the property album in the song object
    if (album) {
      song.album = album
    }
    return song
  })
  songs = sortList(filterList(songs, query), sort)
  return delayedResolve(songs)
}

const filterList = (list, query) => {
  query = (query || "").trim()
  if (query.length < 1) return list
  return list.filter(item => {
    const pattern = new RegExp(query, "gi")
    return pattern.test(item.title) || pattern.test(item.album.title) || pattern.test(item.album.artist)
  })
}

const sortList = (list, sort) => {
  const newList = [].concat(list)
  return newList.sort((a, b) => {
    let value1, value2 = null;
    if (sort.property === 'title') {
      value1 = a.title;
      value2 = b.title;
    } else if (sort.property === 'album') {
      value1 = a.album.title;
      value2 = b.album.title;
    } else if (sort.property === 'artist') {
      value1 = a.album.artist;
      value2 = b.album.artist;
    } else if (sort.property === 'duration') {
      value1 = a.duration;
      value2 = b.duration;
    }
    value1 = (typeof value1 === "string") ? value1.toLowerCase() : value1;
    value2 = (typeof value2 === "string") ? value2.toLowerCase() : value2;

    if (value1 === value2) return 0;
    let result = value1 > value2;
    result = sort.direction === 'desc' ? !result : result;
    return result ? 1 : -1;
  });
}

const db = {
  getAlbums,
  getSongs
}
export default db