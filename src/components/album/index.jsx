import {Box, Card, CardContent, CardMedia, Container, Typography} from '@mui/material';
import {useSelector} from "react-redux";
import {selectAlbums} from "../../reducers/musicSlice.js";


const AlbumList = () => {
    const albums = useSelector(selectAlbums)

    return (
        <>
            <Container fixed>
                <h1>Album list</h1>
                <Box sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: "repeat(3, 1fr)",
                    justifyItems: "center"
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