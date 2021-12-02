import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getSongs } from "../../services/library";
import "./style.scss"

const SortIcon = ({sort, name}) => {
    if (sort.property !== name) return null
    
    let icon = null
    if (sort.direction === "asc") {
        icon = "caret-up"
    } else if (sort.direction === "desc") {
        icon = "caret-down"
    } else {
        return null
    }

    return <FontAwesomeIcon icon={icon} />
}

const Library = () => {
    const [songs, setSongs] = useState([])
    const [sort, setSort] = useState({
        property: "title",
        direction: "asc"
    })
    const [error, setError] = useState(null)
    const [query, setQuery] = useState("")

    useEffect(() => {
        loadSongs()
    }, [query, sort]) // We update the list of songs when we change the sort filter

    const loadSongs = () => {
        getSongs(query, sort)
        .then(setSongs) // syntax equals (data => setSongs(data))
        .catch(setError)
    }

    const updateSort = (newProperty) => {
        let {property, direction} = sort
        if (newProperty === property) {
            direction = direction === "asc" ? "desc" : "asc"
        }
        property = newProperty
        setSort({
            property,
            direction
        })
    }

    const listItems = songs.map(song => (
        <div key={song.id} className="row">
            <div className="column title">{song.title}</div>
            <div className="column album">{song.album.title}</div>
            <div className="column artist">{song.album.artist}</div>
            <div className="column duration">{song.duration.toFixed(2)}</div>
        </div>
    ))

    const errorMessage = !error ? null : <div className="error message">{error}</div>

    return (
        <div className="Library">
            <div className="header">
                <h1>Library</h1>
                <div className="search-form">
                    <input
                    defaultValue={query}
                    onKeyUp={e => {
                        let typedQuery = e.target.value
                        if (e.code === "Enter") {
                            setQuery(typedQuery)
                        }
                    }} />
                </div>
            </div>
            {errorMessage}
            <div className="table-header">
                <div className="column title" onClick={() => updateSort('title')}>
                    Title <SortIcon sort={sort} name="title"/>
                </div>
                <div className="column album" onClick={() => updateSort('album')}>
                    Album <SortIcon sort={sort} name="album"/>
                </div>
                <div className="column artist" onClick={() => updateSort('artist')}>
                    Artist <SortIcon sort={sort} name="artist"/>
                </div>
                <div className="column duration" onClick={() => updateSort('duration')}>
                    Duration <SortIcon sort={sort} name="duration"/>
                </div>
            </div>
            {listItems}
        </div>
    )
}

export default Library