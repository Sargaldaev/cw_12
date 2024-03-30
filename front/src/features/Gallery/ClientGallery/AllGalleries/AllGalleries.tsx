import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store.ts';
import { useEffect } from 'react';
import { fetchData } from '../../../../store/gallery/galleryThunk.ts';
import { apiUrl } from '../../../../constants.ts';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Gallery } from '../../../../types';
import { changeModalItem, clearModalItem } from '../../../../store/gallery/gallerySlice.ts';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const AllGalleries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {galleries, modalItem, fetchLoad} = useSelector((state: RootState) => state.gallery);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleOpen = (item: Gallery) => {
    dispatch(changeModalItem(item));
  };

  const handleClose = () => {
    dispatch(clearModalItem());
  };
  return fetchLoad ? (
    <CircularProgress sx={{marginTop: 20, marginLeft: 50}} color="secondary"/>
  ) : (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>

      {galleries.map(item => (
        <Card sx={{width: 330, height: 380, backgroundColor: '#00796B'}} key={item._id}>
          <CardMedia
            onClick={() => handleOpen(item)}
            component="img"
            alt={item.title}
            height="300"
            image={apiUrl + item.image}
          />
          <Modal
            open={Boolean(modalItem)}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CardMedia
                component="img"
                sx={{height: 550,width:700}}
                image={apiUrl + modalItem?.image}
              />
              <CloseIcon onClick={handleClose} sx={{position: 'absolute', top: -15, right: -15}}/>
            </Box>
          </Modal>
          <CardContent>
            <Typography
              component="div"
              sx={{
                fontSize: 18,
                fontWeight: 550,
              }}
            >
              {item.title}
            </Typography>
          </CardContent>
          <CardActions sx={{position: 'relative'}}>
            <Button
              component={Link} to={`/author-galleries/${item.user._id}`}
              sx={{
                fontSize: 12,
                position: 'absolute',
                top: -18,
                right: 10,
                fontWeight: 800,
                textDecoration: 'underline',
              }}
            >
              By: {item.user.displayName}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );


};

export default AllGalleries;