const express = require('express');
const sellerController = require('../controllers/sellerController');
const sellerRouter = express.Router();
const multer = require('multer');
const { fileFilter } = require('../utils/file-util');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename:(req,file,cb) => {
    cb(null,Math.random().toString(36).substring(2,8)+ '-' + file.originalname);
  },
})
sellerRouter.post('/products',multer({storage:storage}).single('image') ,sellerController.createProduct);
sellerRouter.get('/products',sellerController.getProducts);
sellerRouter.delete('/products/:id', sellerController.deleteProducts);

module.exports = sellerRouter;
