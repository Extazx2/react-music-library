import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import {Box, Card, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectPlaylist} from "../../reducers/musicSlice.js";

const PlayPauseButton = ({handlePlay, handlePause, isPlaying}) => {
    return isPlaying
        ? <PauseIcon sx={{height: 38, width: 38}} onClick={() => handlePause()}/>
        : <PlayArrowIcon sx={{height: 38, width: 38}} onClick={() => handlePlay()}/>
}

const Player = () => {
    // List of songs to be played, stored in redux
    const playlist = useSelector(selectPlaylist)

    // Song actually played
    const [songPlayed, setSongPlayed] = useState(null)
    // Boolean to know if a song is playing or not
    const [isPlaying, setIsPlaying] = useState(false)
    // The Audio tag in which we play songs
    const [audioPlayer] = useState(new Audio(""))
    // Index of the selected songs in the playlist
    const [songIndex, setSongIndex] = useState(0)


    // Play launch the songs at current index
    // Pause stop the songs at current index
    // Next song plays the next song in the list
    // It won't do anything if there are no elements after
    // Previous plays previous songs in the list
    // It does nothing if it's the first song in the list

    const loadSong = (index) => {
        if (playlist.length > 0) {
            const songToLoad = playlist[index].file
            setSongPlayed(songToLoad)
            audioPlayer.src = "/songs/" + songToLoad
            audioPlayer.load()
        }
    }

    const playSong = () => {
        if (songPlayed == null) {
            loadSong(songIndex)
        }
        setIsPlaying(true)
        audioPlayer.play()
            .catch((_) => setIsPlaying(false))
    }

    const pauseSong = () => {
        setIsPlaying(false)
        audioPlayer.pause()
    }

    const playNextSong = () => {
        const nextIndex = songIndex+1
        if (nextIndex < (playlist.length)){
            audioPlayer.pause()
            setSongIndex(nextIndex)
        }
    }

    const playPreviousSong = () => {
        if (songIndex !== 0) {
            const previousIndex = songIndex - 1
            setSongIndex(previousIndex)
        }
    }

    useEffect(() => {
        loadSong(songIndex)
        playSong()
    }, [songIndex]) // Seulement songIndex en dépendances pour éviter les boucles infinies

    return (
        <Container fixed>
            { (playlist.length > 0)
                ? <Card sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {playlist[songIndex].title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {playlist[songIndex].album.artist}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                            <IconButton aria-label="previous" onClick={() => playPreviousSong()}>
                                <SkipPreviousIcon/>
                            </IconButton>
                            <IconButton aria-label="play/pause">
                                <PlayPauseButton
                                    handlePause={pauseSong}
                                    handlePlay={playSong}
                                    isPlaying={isPlaying}
                                />
                            </IconButton>
                            <IconButton aria-label="next" onClick={() => playNextSong()}>
                                <SkipNextIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{width: 151}}
                        image={playlist[songIndex].album.thumbnail}
                        alt={playlist[songIndex].title}
                    />
                </Card>
                : <Card sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                            <IconButton aria-label="previous">
                                <SkipPreviousIcon/>
                            </IconButton>
                            <IconButton aria-label="play/pause">
                                <PlayArrowIcon sx={{height: 38, width: 38}}/>
                            </IconButton>
                            <IconButton aria-label="next" onClick={() => playNextSong()}>
                                <SkipNextIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            }

            {playlist.map((song) => <Typography>{song.title}</Typography>)}
        </Container>
    )
}

export default Player