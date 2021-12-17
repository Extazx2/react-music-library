import {library} from "@fortawesome/fontawesome-svg-core"
import {faCaretDown, faCaretUp, faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import {AppBar, Box, Button, Toolbar, Typography, Grid} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import {alpha, styled} from '@mui/material/styles';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink, Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import {getAlbums, getSongs} from "./services/library.js";
import Player from "./components/player/index.js";
import AlbumList from './components/album/index.jsx';
import Library from './components/library';
import {
    selectAlbums,
    selectQuery,
    updateQuery,
    selectSongs,
    loadSongs,
    selectSortDirection, selectSortProperty, loadAlbums
} from './reducers/musicSlice.js';

library.add([faCaretUp,faCaretDown,faSearch])

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '35ch',
            },
        },
    },
}));


function App() {
    const query = useSelector(selectQuery)
    const sortDirection = useSelector(selectSortDirection)
    const sortProperty = useSelector(selectSortProperty)

    const songs = useSelector(selectSongs)
    const albums = useSelector(selectAlbums)
    console.log("songs et albums", songs, albums)

    const dispatch = useDispatch()

    const loadSongsAtAppStart = useCallback((q) => {
        getSongs(q, {property: sortProperty, direction: sortDirection})
            .then((data) => {
                dispatch(loadSongs(data))
            })
    }, [])

    const loadAlbumsAtAppStart = useCallback(() => {
        getAlbums()
            .then((alb) => {
                dispatch(loadAlbums(alb))
            })
    }, [])

    useEffect(() => {
        loadSongsAtAppStart(query)
        loadAlbumsAtAppStart()
    }, [loadSongsAtAppStart, query, sortProperty, sortDirection, loadAlbumsAtAppStart])

    const handleSearchChangeRedux = useCallback((e) => {
        dispatch(updateQuery(e.target.value))
    }, [])

    return (
        <div className="App">
            <AppBar>
                <Toolbar>
                    <Typography
                        variant="h3"
                        sx={{mr: 2}}
                    >
                        Music Library
                    </Typography>
                    <Box sx={{flexGrow: 1}}>
                        <Button variant="contained" disableElevation component={RouterLink} to="/albums">Albums</Button>
                        <Button variant="contained" disableElevation component={RouterLink} to="/songs">Songs</Button>
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            defaultValue={query}
                            placeholder="Search Song, Album or Artist…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => dispatch(updateQuery(e.target.value))}
                            // onChange={handleSearchChangeRedux}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Routes>
                        <Route path={"/albums"} element={<AlbumList />} />
                        <Route path={"/songs"} element={<Library />} />
                        <Route path="*" element={<Navigate to={"/songs"} />} />
                    </Routes>
                </Grid>
                <Grid item xs={3}>
                    <Player />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
