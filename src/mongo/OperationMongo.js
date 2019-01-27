import mongoose from 'mongoose';
import PostModel from './schema/PostModel';

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

   PostModel.findById(id, (error, result) => {
      response(res, result, error);
   });
};

export const deletePost = (req, res) => {
   const { id } = req.params;

   PostModel.deleteOne(
      {
         _id: id
      },
      error => {
         response(res, id, error);
      }
   );
};
