import fs from 'fs';
import path from 'path';

function deletePhoto(filePath: string) {
  // Fix missing slash if needed
  let fixedPath = filePath.replace('productsproduct', 'products/product');

  // Extract filename from fixed path
  const fileName = path.basename(fixedPath);

  // Resolve absolute path to backend/uploads/products/filename
  const newPath = path.resolve(__dirname, 'src/../../../uploads/products', fileName);

  console.log("Resolved Path:", newPath);

  if (fs.existsSync(newPath)) {
    fs.unlink(newPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`✅ File "${fileName}" has been successfully removed.`);
      }
    });
  } else {
    console.warn(`⚠️ File not found at: ${newPath}`);
  }
}

export default deletePhoto;
