import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import InputFile from '../../../components/FileInput/FileInput.tsx';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GalleryCreate } from '../../../types';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { addImage } from '../../../store/gallery/galleryThunk.ts';
import LoadingButton from '@mui/lab/LoadingButton';

const AddImage = () => {
  const [image, setImage] = useState<GalleryCreate>({
    title: '',
    image: null,
  });


  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.user);
  const {createError,createLoad} = useSelector((state: RootState) => state.gallery);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user,navigate]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, files} = e.target;
    setImage((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const getFieldError = (name: string) => {
    try {
      return createError?.errors[name].message;
    } catch {
      return undefined;
    }
  };
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addImage(image)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Button
        component={Link} to={`/`}
      >
        Back
      </Button>

      <Box component="form" onSubmit={onFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={image.title}
          error={Boolean(getFieldError('title'))}
          helperText={getFieldError('title')}
          onChange={onChange}
        />
        <Box className="form-control">
          <InputFile
            onChange={onChange}
            name="image"
            image={image.image}
            helperText={getFieldError('image')}
            error={Boolean(getFieldError('image'))}
          />
        </Box>
        <LoadingButton loading={createLoad} sx={{marginTop: 2}} type="submit" fullWidth variant="contained" color="primary">
          Save
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default AddImage;
