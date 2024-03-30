import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;


const GallerySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },

  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});


const Gallery = mongoose.model('Gallery', GallerySchema);
export default Gallery;
