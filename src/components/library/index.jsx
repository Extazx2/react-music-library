import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectQuery,
    selectSortDirection,
    selectSortProperty,
    updateSortDirection,
    updateSortProperty
} from '../../reducers/musicSlice.js';
import {getSongs} from "../../services/library";
import {SortIcon} from '../common/SortIcon';
import './style.scss'

const Library = ({query}) => {
    const [songs, setSongs] = useState([])
    const query3 = useSelector(selectQuery)
    const sortDirection = useSelector(selectSortDirection)
    const sortProperty = useSelector(selectSortProperty)
    const dispatch = useDispatch()

    const [sort, setSort] = useState({
        property: "title",
        direction: "asc"
    })
    const [error, setError] = useState(null)

    const loadSongs = useCallback((q) => {
        getSongs(q, sort)
            .then(setSongs) // syntax equals (data => setSongs(data))
            .catch(setError)
    }, [sort])

    useEffect(() => {
        loadSongs(query3)
    }, [loadSongs, query3, sort]) // We update the list of songs when we change the sort filter

    const updateSort = (newProperty) => {
        let { property, direction } = sort
        if (newProperty === property) {
            direction = direction === "asc" ? "desc" : "asc"
            dispatch(updateSortDirection(direction))
        }
        dispatch(updateSortProperty(newProperty))
        property = newProperty
        setSort({
            property,
            direction
        })
    }

    const listItems = songs.map(song => (
        <TableRow key={song.id} hover>
            <TableCell>{song.title}</TableCell>
            <TableCell>{song.album.title}</TableCell>
            <TableCell>{song.album.artist}</TableCell>
            <TableCell>{song.duration.toFixed(2)}</TableCell>
        </TableRow>
    ))

    const errorMessage = !error ? null : <div className="error message">{error}</div>

    return (
        <>
            {errorMessage}
            <TableContainer>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell onClick={() => updateSort('title')}>
                                Title <SortIcon sort={sort} name="title" />
                            </TableCell>
                            <TableCell onClick={() => updateSort('album')}>
                                Album <SortIcon sort={sort} name="album" />
                            </TableCell>
                            <TableCell onClick={() => updateSort('artist')}>
                                Artist <SortIcon sort={sort} name="artist" />
                            </TableCell>
                            <TableCell onClick={() => updateSort('duration')}>
                                Duration <SortIcon sort={sort} name="duration" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listItems}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Library