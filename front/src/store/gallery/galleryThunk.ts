import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Gallery } from '../../types';


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