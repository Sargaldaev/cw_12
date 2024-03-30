import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Gallery from './models/Gallery';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('galleries');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, user,user2,user3] = await User.create(
    {
      username: 'Bob',
      password: '123',
      displayName: 'Bob',
      avatar: 'fixtures/user.png',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'John',
      password: '123',
      displayName: 'John',
      avatar: 'fixtures/admin.png',
      role: 'admin',
      token: crypto.randomUUID(),
    },
    {
      username: 'Triss',
      password: '123',
      displayName: 'Triss',
      avatar: 'fixtures/user.png',
      role: 'user',
      token: crypto.randomUUID(),
    },

    {
      username: 'Max',
      password: '123',
      displayName: 'Max',
      avatar: 'fixtures/user.png',
      role: 'user',
      token: crypto.randomUUID(),
    },
  );
  await Gallery.create(
    {
      user: user._id,
      title: 'IPhone 11 Pro-max',
      image: 'fixtures/Iphone.jpg',
    },
    {
      user: user._id,
      title: 'Mercedes s class',
      image: 'fixtures/Mercedes1.jpg',
    },
    {
      user: admin._id,
      title: 'BMW sport-car',
      image: 'fixtures/BMW.jpg',
    },
    {
      user: admin._id,
      title: 'Samsung 20 Ultra',
      image: 'fixtures/samsung.jpg',
    },
    {
      user: user2._id,
      title: 'Summer atmosphere\n',
      image: 'fixtures/summer.jpg',
    },
    {
      user: user2._id,
      title: 'Cold winter',
      image: 'fixtures/winter.jpg',
    },
    {
      user: user2._id,
      title: 'Golden autumn',
      image: 'fixtures/autumn.png',
    },

    {
      user: user3._id,
      title: 'New-York city',
      image: 'fixtures/new-york.png',
    },
    {
      user: user3._id,
      title: 'Shanghai city',
      image: 'fixtures/shanghai.jpg',
    },
    {
      user: user3._id,
      title: 'Bishkek city',
      image: 'fixtures/bishkek.jpg',
    },
  );
  await db.close();
};

run().catch(console.error);
