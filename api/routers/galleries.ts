import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Gallery from '../models/Gallery';
import permit from '../middleware/permit';

const galleriesRouter = express.Router();

galleriesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const gallery = new Gallery({
      user: user._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
    });
    await gallery.save();
    return res.send(gallery);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(422).send(e);
    }
    next(e);
  }
});

galleriesRouter.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
      const gallery = await Gallery.find({_id});
      return res.send(gallery);

  } catch (e) {
    res.send(e);
  }
});


galleriesRouter.get('/', async (req, res) => {
  try {
    const {userId} = req.query;

    if (userId) {
      const user = await Gallery.findOne({user: userId});

      if (user) {
        const userGalleries = await Gallery.find({user: userId}).populate('user', 'displayName role');
        return res.send(userGalleries);
      }
    }

    const galleries = await Gallery.find().populate('user', 'username displayName role');
    return res.send(galleries);
  } catch {
    return res.sendStatus(500);
  }
});




galleriesRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  const userId = user._id.toString();
  const _id = req.params.id;

  try {
    if (user.role === 'admin') {
      const galleryId = await Gallery.findByIdAndDelete(_id);
      if (!galleryId) {
        return res.status(404).send({message: 'Gallery not found'});
      }
      return res.send({message: 'Gallery deleted'});
    }

    const galleryId = await Gallery.findOne({_id});
    const galleryUser = galleryId?.user.toString();

    if (!galleryId) {
      return res.status(404).send({message: 'Gallery not found'});
    }

    if (userId === galleryUser) {
      await Gallery.deleteOne({_id: galleryId._id});
      return res.send({message: 'Gallery deleted'});
    } else if (userId !== galleryUser) {
      return res.send({message: 'Cannot be deleted'});
    }
  } catch (e) {
    return res.send(e);
  }
});


export default galleriesRouter;
