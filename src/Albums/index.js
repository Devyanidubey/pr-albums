import * as React from 'react';
import { Avatar, TablePagination, Card, CardHeader, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import history from '../history';


export default function Albums() {
    const [albums, setAlbums] = React.useState([]);
    const [users, setUsers] = React.useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleClick = (albumId) => {
        history.push('/album/photos?albumId=' + albumId);
        window.location.reload();
    }

    React.useEffect(() => {
        const start = page * rowsPerPage;
        const limit = rowsPerPage;

        axios.get('https://jsonplaceholder.typicode.com/albums?_start='+ start +'&_limit=' + limit)
            .then(res => {
                if (res && res?.status === 200 && res?.data?.length > 0) {
                    setAlbums(res?.data);
                }
            })
    }, [page, rowsPerPage]);

    React.useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (res && res?.status === 200 && res?.data?.length > 0) {
                    setUsers(res?.data?.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}));
                }
            })
    }, []);

    return (
        <>
            <Grid container spacing={2} style={{ padding: '50px' }}>
                {
                    albums?.map((album, key) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                            <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }} onClick={() => handleClick(album.id)}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {Array.from(users?.[album.userId]?.name || 'Dummy')[0]}
                                        </Avatar>
                                    }
                                    title={users?.[album.userId]?.name || ''}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="https://dummyimage.com/800x600/000/fff&text=Album"
                                    alt="Album"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {album.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[20, 30, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
