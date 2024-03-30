import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Gallery, GalleryCreate, ValidationError } from '../../types';
import { isAxiosError } from 'axios';


export const fetchData = createAsyncThunk<Gallery[]>(
  'gallery/fetchData',
  async () => {
    try {
      const {data} = await axiosApi.get('/galleries');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const galleryFullInfo = createAsyncThunk<Gallery[], string>(
  'gallery/galleryFullInfo',
  async (id) => {
    try {
      const {data} = await axiosApi.get(`/galleries?userId=${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const addImage = createAsyncThunk<Gallery, GalleryCreate,{ rejectValue: ValidationError }>(
  'gallery/addImage',
  async (gallery,{ rejectWithValue }) => {
    try {

      const formData = new FormData();
      formData.append('title', gallery.title);
      if (gallery.image) {
        formData.append('image', gallery.image);
      }
      const {data} = await axiosApi.post<Gallery>('/galleries', formData);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const deleteGallery = createAsyncThunk<void, string>(
  'gallery/deleteGallery',
  async (id) => {
    try {
      await axiosApi.delete(`/galleries/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
);