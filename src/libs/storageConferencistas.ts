import multer from 'multer'

const storage = multer.diskStorage({
    destination: 'public/conferencistas',
    filename: (req, file, cb) => {
        
        cb(null, file.originalname)
    }
});
export default multer({storage});