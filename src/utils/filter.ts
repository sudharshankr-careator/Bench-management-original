export const imageFileFilter = (req, file, callback) => {
  //this is a middleware...a middleware takes three arguments
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false); //error msg comes in terminal
  }
  callback(null, true);
};

export const DocsFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|doc|png|jpeg|jpg|docx|xlsx)$/)) {
    return callback(new Error('Only Docs files are allowed!'), false);
  }
  callback(null, true);
};
