import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addSongToPlaylist, selectSongs, updateSortDirection, updateSortProperty} from '../../reducers/musicSlice.js';
import {SortIcon} from '../common/SortIcon';
import './style.scss'

const Library = () => {
    const dispatch = useDispatch()

    const songs = useSelector(selectSongs)

    const [sort, setSort] = useState({
        property: "title",
        direction: "asc"
    })

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

    const handleSongClicked = (song) => {
        dispatch(addSongToPlaylist(song))
    }

    //     <div style={{display: "flex"}></div>

    const listItems = songs.map(song => (
        <TableRow key={song.id} hover onClick={() => handleSongClicked(song)}>
            <TableCell>{song.title}</TableCell>
            <TableCell>{song.album.title}</TableCell>
            <TableCell>{song.album.artist}</TableCell>
            <TableCell>{song.duration.toFixed(2)}</TableCell>
        </TableRow>
    ))

    return (
        <>
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