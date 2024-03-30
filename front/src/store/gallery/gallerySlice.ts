import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Gallery, ValidationError} from '../../types';
import {deleteGallery, fetchData, galleryFullInfo} from './galleryThunk.ts';

export interface GalleryState {
  galleries: Gallery[];
  galleryInfo: Gallery[];
  modalItem: Gallery | null;
  fetchLoad: boolean;
  createError: ValidationError | null;
  deleteGalleryLoad: string;
  galleryInfoLoad: boolean;
}

const initialState: GalleryState = {
  galleries: [],
  galleryInfo: [],
  createError: null,
  modalItem: null,
  fetchLoad: false,
  galleryInfoLoad: false,
  deleteGalleryLoad: ''
};

export const GallarySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    changeModalItem: (state, {payload}) => {
      state.modalItem = payload;
    },
    clearModalItem: (state) => {
      state.modalItem = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: GalleryState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state: GalleryState, action: PayloadAction<Gallery[]>) => {
      state.fetchLoad = false;
      state.galleries = action.payload;
    });
    builder.addCase(fetchData.rejected, (state: GalleryState) => {
      state.fetchLoad = false;
    });


    builder.addCase(galleryFullInfo.pending, (state: GalleryState) => {
      state.galleryInfoLoad = true;
    });
    builder.addCase(galleryFullInfo.fulfilled, (state: GalleryState, action: PayloadAction<Gallery[]>) => {
      state.galleryInfoLoad = false;
      state.galleryInfo = action.payload;
    });
    builder.addCase(galleryFullInfo.rejected, (state: GalleryState) => {
      state.galleryInfoLoad = false;
    });


    builder.addCase(deleteGallery.pending, (state: GalleryState) => {
      state.deleteGalleryLoad = '';
    });
    builder.addCase(deleteGallery.fulfilled, (state: GalleryState, action) => {
      state.deleteGalleryLoad = action.meta.arg || '';
    });
    builder.addCase(deleteGallery.rejected, (state: GalleryState) => {
      state.deleteGalleryLoad = '';
    });

  },
});

export const galleryReducer = GallarySlice.reducer;
export const {changeModalItem, clearModalItem} = GallarySlice.actions;
