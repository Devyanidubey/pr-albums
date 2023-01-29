import * as React from 'react';
import { TablePagination, Card, CardMedia, CardContent, Typography, Grid, Modal, Box } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Photos() {
    const [albums, setAlbums] = React.useState({});
    const [photo, setPhoto] = React.useState({});
    const [photos, setPhotos] = React.useState([]);
    const [users, setUsers] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleClick = (data) => {
        setPhoto(data)
        setOpen(!open);
    }

    const albumId = window.location?.search?.split('albumId=')?.[1];

    React.useEffect(() => {
        const start = page * rowsPerPage;
        const limit = rowsPerPage;

        axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId + '&_start=' + start + '&_limit=' + limit)
            .then(res => {
                if (res && res?.status === 200 && res?.data?.length > 0) {
                    setPhotos(res?.data);
                }
            })
    }, [page, rowsPerPage]);

    React.useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(res => {
                if (res && res?.status === 200 && res?.data?.length > 0) {
                    setAlbums(res?.data?.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}));
                }
            })
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (res && res?.status === 200 && res?.data?.length > 0) {
                    setUsers(res?.data?.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}));
                }
            })
    }, []);

    return (
        <>
            {
                albumId && photos && photos?.length > 0 ? (
                    <>
                        <Typography variant='h3' align='center' mt={5}>
                            {albums?.[albumId]?.title}
                        </Typography>
                        <Typography variant='h5' align='center'>
                            by {users?.[albums?.[albumId]?.userId]?.name}
                        </Typography>
                        <Grid container spacing={2} style={{ padding: '50px' }}>
                            {
                                photos?.map((photo, key) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                                        <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }} onClick={() => handleClick(photo)}>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={photo.thumbnailUrl}
                                                alt={photo.title}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {photo.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Modal
                            open={photo && open}
                            onClose={() => setOpen(!open)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <img src={photo?.thumbnailUrl} style={{ width: '100%', marginBottom: '20px' }} />
                                <Typography id="modal-modal-title" component="div">
                                    <b>Owner: </b> {users?.[albums?.[albumId]?.userId]?.name}
                                </Typography>
                                <Typography id="modal-modal-title" component="div">
                                    <b>Photo Title: </b> {photo?.title}
                                </Typography>
                                <Typography id="modal-modal-title" component="div">
                                    <b>Album Title: </b> {albums?.[albumId]?.title}
                                </Typography>
                            </Box>
                        </Modal>
                        <TablePagination
                            component="div"
                            count={50}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[20, 30, 50]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )
                    :
                    (
                        'Please check Album ID again.'
                    )
            }

        </>
    );
}
