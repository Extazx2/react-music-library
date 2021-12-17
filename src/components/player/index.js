import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import {Box, Card, CardContent, CardMedia, CircularProgress, IconButton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectPlaylist} from "../../reducers/musicSlice.js";

const Player = () => {
    const playlist = useSelector(selectPlaylist)

    const [songPlayed, setSongPlayed] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioPlayer] = useState(new Audio(""))
    const [songIndex, setSongIndex] = useState(0)

    const loadSong = () => {
        if (playlist.length > 0) {
            audioPlayer.src = "/songs/" + playlist[songIndex].file
            audioPlayer.load()
        }
    }

    const playSong = () => {
        loadSong()
        setIsPlaying(true)
        audioPlayer.play()
            .catch((_) => setIsPlaying(false))
    }

    const pauseSong = () => {
        setIsPlaying(false)
        audioPlayer.pause()
    }

    const playNextSong = () => {
        audioPlayer.pause()
        const currentSong = playlist[songIndex]
        const nextIndex = songIndex+1
        console.log(nextIndex)
        // Bug présent : le premier clic sur le bouton RELANCE la première chanson
        if (nextIndex <= playlist.length) {
            const nextSong = playlist[nextIndex]
            console.log(nextSong)
            setSongIndex(nextIndex)
            setSongPlayed(nextSong)
            setIsPlaying(true)
            audioPlayer.src = "/songs/" + nextSong.file
            audioPlayer.load()
            playSong()
        }
        console.log(songPlayed)
    }

    const playPreviousSong = () => {

    }

    return (
        <>
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
                            <IconButton aria-label="previous">
                                <SkipPreviousIcon/>
                            </IconButton>
                            <IconButton aria-label="play/pause">
                                {isPlaying
                                ? <PauseIcon sx={{height: 38, width: 38}} onClick={() => pauseSong()}/>
                                : <PlayArrowIcon sx={{height: 38, width: 38}} onClick={() => playSong()}/> }
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
                    <CardMedia
                        component="img"
                        sx={{width: 151}}
                        image={""}
                        alt={""}
                    />
                </Card>
            }

            {playlist.map((song) => <Typography>{song.title}</Typography>)}
        </>

    )
}

export default Player