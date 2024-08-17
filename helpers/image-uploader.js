const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file , callbackfunction) {
        callbackfunction(null, './uploads');
    },

    filename: function(req, file , callbackfunction) {
        callbackfunction(null, new Date().getTime() + path.extname(file.originalname));
    }
});


const fileFilter = (req, file , callbackfunction) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callbackfunction(null, true);
    } else {
        callbackfunction(new Error('Unsupported File type'), false);
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
})

module.exports = {
    upload: upload
}