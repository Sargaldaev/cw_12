import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store.ts';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { apiUrl } from '../../../../constants.ts';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteGallery, galleryFullInfo } from '../../../../store/gallery/galleryThunk.ts';
import CircularProgress from '@mui/material/CircularProgress';

const GalleryFullInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const {user} = useSelector((state: RootState) => state.user);
  const {galleryInfo, galleryInfoLoad, deleteGalleryLoad} = useSelector((state: RootState) => state.gallery);
  useEffect(() => {
    if (id) {
      dispatch(galleryFullInfo(id));
    }

    if (!galleryFullInfo.length) {
      console.log('nav1');
      navigate('/');
    }

  }, [dispatch, id]);

  const deletePhoto = async (Id: string) => {
    await dispatch(deleteGallery(Id));
    if (!galleryFullInfo.length) {
      console.log('nav2');
      navigate('/');
    }
    await dispatch(galleryFullInfo(id));
  };
  return galleryInfoLoad ? (
    <CircularProgress sx={{marginTop: 20, marginLeft: 50}} color="secondary"/>
  ) : (
    <>
      <Button component={Link} to={`/`} size="small">
        Back
      </Button>
      {galleryInfo.length && (
        <Typography>
          {galleryInfo[0].user.displayName}'s gallery
        </Typography>
      )}

      {
        user?._id === id ? (
          <Button sx={{position: 'absolute', top: 70, right: 80}} component={Link} to={`/addImage`} size="small">
            Add New Photo
          </Button>
        ) : null
      }
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
        {galleryInfo.map(item => (
          <Card sx={{width: 375, height: 400, position: 'relative'}}
                key={item._id}>
            <CardMedia
              component="img"
              alt={item.title}
              height="320"
              image={apiUrl + item.image}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              {
                user?._id === item.user._id &&
                  (
                    <Button
                      onClick={() => deletePhoto(item._id)}
                      disabled={deleteGalleryLoad === item._id}
                      size="small"
                      sx={{position: 'absolute', top: 350, right: 10, color: 'red', fontWeight: 700}}
                    >
                      {deleteGalleryLoad === item._id ? <CircularProgress/> : 'Delete'}
                    </Button>
                  )
              }
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  )
    ;
};

export default GalleryFullInfo;