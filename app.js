const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

class CloudinaryUploader {
	constructor({ cloudName, apiKey, apiSecret }) {
		cloudinary.config({
			cloud_name: cloudName,
			api_key: apiKey,
			api_secret: apiSecret,
		});
		// Initialize the storage once in the constructor
		this.storage = null;
		this.uploader = null;
	}

	// Initialize uploader storage with options like folder name and allowed formats
	initializeUploader(
		folderName
	) {
		// Check if storage is already initialized to prevent re-initializing
		if (!this.storage) {
			this.storage = new CloudinaryStorage({
				cloudinary: cloudinary,
				params: {
					folder: folderName,
					allowed_formats: ["jpg", "png", "jpeg"],
				},
			});

			// Initialize the multer uploader
			this.uploader = multer({ storage: this.storage });
		}
	}

	// Single file upload middleware
	getSingleUploaderMiddleware(
		image = "image",
		folderName = "uploads",
	) {
		this.initializeUploader(folderName);
		return this.uploader.single(image);
	}

	// Multiple files upload middleware
	getMultipleUploaderMiddleware(
		images = "images",
		folderName = "uploads",
	) {
		this.initializeUploader(folderName);
		return this.uploader.array(images);
	}
}

module.exports = CloudinaryUploader;
