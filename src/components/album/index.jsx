import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, Container, Typography} from '@mui/material';
import {getAlbums} from '../../services/library.js';


const AlbumList = ({query}) => {
    const [albums, setAlbums] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        loadAlbums()
    }, [query])

    const loadAlbums = () => {
        getAlbums(query)
            .then(setAlbums)
            .catch(setError)
    }

    return (
        <>
            <Container fixed>
                <h1>Album list</h1>
                {error}
                <Box sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: "repeat(3, 1fr)"
                }}>
                    {albums.map(album => {
                        return <Card sx={{maxWidth: 300}}>
                            <CardMedia
                                component='img'
                                height={140}
                                image={album.thumbnail}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {album.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {album.artist}
                                </Typography>
                            </CardContent>
                        </Card>
                    })}
                </Box>
            </Container>
        </>
    )
}

export default AlbumList