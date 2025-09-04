export const fileFilter = (req,file,cb) => {
  //const isValidFile = file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/jpg';
  const isValidFile = ['image/png','image/jpeg','image/jpeg','image/jpeg'].includes(file.mimetype);
  cb(null,isValidFile);
}