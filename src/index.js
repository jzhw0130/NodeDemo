import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid';
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

mongoose.connect(
   'mongodb://localhost:27000/NodeDemo',
   error => {
      if (error) {
         console.log(`Connect mongo error: ${error}`);
         process.exit(-1);
      } else {
         console.log('Connect mongo success');
      }
   }
);
