import mongoose from 'mongoose';
import PostModel from './schema/PostModel';
import RedisClient from '../redis';

const response = (res, model, error) => {
   if (error) {
      res.status(500).send({
         status: 0,
         error
      });
   } else {
      res.status(200).send({
         status: 1,
         result: model
      });
   }
};

export const fetchAllPosts = (req, res) => {
   PostModel.find((error, result) => {
      response(res, result, error);
   });
};

export const createPost = (req, res) => {
   const { title, description } = req.body;

   const newPost = new PostModel();
   newPost.title = title;
   newPost.description = description;

   newPost.save(error => {
      response(res, newPost, error);
   });
};

export const updatePost = (req, res) => {
   const { title, description } = req.body;
   const { id } = req.params;

   PostModel.updateOne({ _id: id }, { title, description }, (error, result) => {
      response(res, { id, title, description }, error);
   });
};

export const fetchPost = (req, res) => {
   const { id } = req.params;

   RedisClient.get(id, (error, cache) => {
      console.log(`Cache data: ${cache}`);

      if (cache) {
         response(res, JSON.parse(cache), null);
      } else {
         PostModel.findById(id, (error, result) => {
            RedisClient.set(id, JSON.stringify(result));
            response(res, result, error);
         });
      }
   });
};

export const deletePost = (req, res) => {
   const { id } = req.params;
   RedisClient.del(id);

   PostModel.deleteOne(
      {
         _id: id
      },
      error => {
         response(res, id, error);
      }
   );
};
