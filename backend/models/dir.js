const mongoose = require("mongoose");

const DirSchema = new mongoose.Schema({
	dirPath: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
		required: true,
	},
	dirData: [
		{
			fileType: {
				type: String,
				required: true,
			},
			numOfLinks: {
				type: Number,
				required: true,
			},
			ownerName: {
				type: String,
				required: true,
			},
			groupName: {
				type: String,
				required: true,
			},
			sizeOfFile: {
				type: Number,
				required: true,
			},
			dateModified: {
				type: Date,
				required: true,
			},
			nameOfFile: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = Dir = mongoose.model("dir", DirSchema);
