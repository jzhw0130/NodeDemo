import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {
   createPost,
   updatePost,
   fetchPost,
   fetchAllPosts,
   deletePost
} from './mongo/OperationMongo';

var app = new express();

app.use(bodyParser.json());

app.get('/status', (req, res) => {
   res.status(200).send({
      status: 'Success'
   });
});

app.get('/posts', (req, res) => {
   fetchAllPosts(req, res);
});

app.post('/posts/create', (req, res) => {
   createPost(req, res);
});

app.get('/posts/:id', (req, res) => {
   fetchPost(req, res);
});

app.post('/posts/:id', (req, res) => {
   updatePost(req, res);
});

app.delete('/posts/:id', (req, res) => {
   deletePost(req, res);
});

app.listen(process.env.port | 3000, () => {
   console.log(`Server start at port ${process.env.port | 3000}`);
});

const connectMongo = () => {
   return mongoose.connect(
      'mongodb://mongoadmin:secret@mongo:27017/admin',
      { useNewUrlParser: true },
      error => {
         if (error) {
            console.log(`Connect mongo error: ${error}`);
            setTimeout(connectMongo, 5000);
         } else {
            console.log('Connect mongo success');
         }
      }
   );
};

connectMongo();
