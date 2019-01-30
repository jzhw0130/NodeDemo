import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mysql from 'mysql';

import OperationMySQL from './mysql/OperationMySQL';
import {
   createPost,
   updatePost,
   fetchPost,
   fetchAllPosts,
   deletePost
} from './mongo/OperationMongo';

require('dotenv').config();

console.log('--------------------------');
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`process.env.PORT: ${process.env.PORT}`);
console.log(`process.env.FIG: ${process.env.FIG}`);
console.log('--------------------------');

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

app.post('/users/create', (req, res) => {
   OperationMySQL.createUser(req, res);
});

app.get('/users/:id', (req, res) => {
   OperationMySQL.fetchUser(req, res);
});

app.get('/users', (req, res) => {
   OperationMySQL.fetchAllUsers(req, res);
});

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server start at port ${process.env.PORT || 3000}`);
});

const connectMongo = () => {
   return mongoose.connect(
      'mongodb://mongoadmin:secret@mongo:27017/admin',
      { useNewUrlParser: true },
      error => {
         if (error) {
            // console.log(`Connecting mongo: ${error}`);
            setTimeout(connectMongo, 5000);
         } else {
            console.log('Connect mongo success');
         }
      }
   );
};

connectMongo();

export const connectionMySQLPool = mysql.createPool({
   connectionLimit: 10,
   host: 'mysql',
   port: 3306,
   user: 'root',
   password: 'password',
   database: 'Posts'
});

const checkConnectionOfMySQL = () => {
   connectionMySQLPool.getConnection((error, connection) => {
      if (error) {
         // console.log(`Connecting mysql: ${error}`);
         setTimeout(checkConnectionOfMySQL, 5000);
      } else {
         OperationMySQL.initSchema(connection);
         console.log(`Connect mysql success on thread: ${connection.threadId}`);
      }
   });
};

checkConnectionOfMySQL();
