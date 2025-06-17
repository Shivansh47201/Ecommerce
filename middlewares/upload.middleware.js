import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Local disk storage
const uploadPath = path.join(__dirname, '../public/products/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  },
});

const uploadLocal = multer({ storage }).array('images', 5);

const upload = (req, res, next) => {
  uploadLocal(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      req.cloudImages = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });

        req.cloudImages.push({
          public_id: result.public_id,
          url: result.secure_url,
          localPath: file.path, 
        });
      }

      next();
    } catch (cloudErr) {
      return res.status(500).json({ message: cloudErr.message });
    }
  });
};

export default upload;
