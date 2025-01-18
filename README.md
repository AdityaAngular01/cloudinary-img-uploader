## `cloudinary-img-uploader` - NPM Package

This package allows you to upload files to Cloudinary using Express, Multer, and Cloudinary's API. It simplifies integrating Cloudinary file uploads into your Node.js applications.

---

### Table of Contents

1. [Installation](#installation)
2. [Setup](#setup)
3. [Usage](#usage)
4. [API](#api)
5. [Example](#example)

---

### Installation

To install the `cloudinary-img-uploader` package, run the following command:

```bash
npm install cloudinary-img-uploader
```

You will also need the required dependencies:

```bash
npm install cloudinary multer multer-storage-cloudinary express dotenv
```

---

### Setup

1. **Environment Variables**: Ensure you have the following environment variables set up in your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

These credentials are necessary to connect to your Cloudinary account.

2. **Cloudinary Configuration**: The `CloudinaryUploader` class uses Cloudinary's API to upload files. It is initialized with your Cloudinary credentials.

---

### Usage

1. **Import the Package**:

```javascript
const CloudinaryUploader = require('cloudinary-img-uploader');
```

2. **Initialize CloudinaryUploader**:

You need to create an instance of `CloudinaryUploader` by passing in your Cloudinary credentials from the `.env` file.

```javascript
const uploader = new CloudinaryUploader({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});
```

3. **Set Up the Upload Middleware**:

Use the `getSingleUploaderMiddleware` or `getMultipleUploaderMiddleware` methods to set up the file upload middleware.

For a single file upload:

```javascript
const uploadMiddleware = uploader.getSingleUploaderMiddleware("custom", "uploads");
```

For multiple file uploads:

```javascript
const uploadMiddleware = uploader.getMultipleUploaderMiddleware("images", "uploads");
```

4. **Set Up Express Route**:

Use the middleware to handle file uploads in your Express routes.

```javascript
const express = require("express");
const app = express();

app.post("/upload", uploadMiddleware, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: req.file.path,
    });
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({
      error: "File upload failed!",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### API

#### `CloudinaryUploader(options)`

Constructor to initialize CloudinaryUploader with Cloudinary API credentials.

**Parameters:**

- `options.cloudName`: Your Cloudinary cloud name.
- `options.apiKey`: Your Cloudinary API key.
- `options.apiSecret`: Your Cloudinary API secret.

#### `initializeUploader(folderName)`

This method initializes the uploader with the folder name where uploaded images will be stored. The folder name is optional and defaults to `uploads`. Allowed file formats are restricted to `jpg`, `png`, and `jpeg`.

**Parameters:**

- `folderName`: The folder in Cloudinary where files will be uploaded.

#### `getSingleUploaderMiddleware(image, folderName)`

This method returns a middleware for handling single file uploads.

**Parameters:**

- `image`: The field name for the uploaded file (default: `"image"`).
- `folderName`: The folder name in Cloudinary (default: `"uploads"`).

Returns a middleware function that you can use in your Express routes.

#### `getMultipleUploaderMiddleware(images, folderName)`

This method returns a middleware for handling multiple file uploads.

**Parameters:**

- `images`: The field name for the uploaded files (default: `"images"`).
- `folderName`: The folder name in Cloudinary (default: `"uploads"`).

Returns a middleware function that you can use in your Express routes.

---

### Example

Here's a complete example of setting up and using the `CloudinaryUploader` with Express:

```javascript
const express = require("express");
const CloudinaryUploader = require("cloudinary-img-uploader");
require("dotenv").config();

const uploader = new CloudinaryUploader({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMiddleware = uploader.getSingleUploaderMiddleware("custom", "uploads");

const app = express();

app.post("/upload", uploadMiddleware, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: req.file.path,
    });
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({
      error: "File upload failed!",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---
# cloudinary-img-uploader
