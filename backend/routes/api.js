const express = require("express");
const router = express.Router();
const Dir = require("../models/dir");

router.get("/", (req, res, next) => {
	// get placeholder
	Dir.find({})
		.then((data) => res.json(data))
		.catch(next);
});

router.post("/addDir", (req, res, next) => {
	if (req.body) {
		Dir.create(req.body)
			.then((data) => res.json(data))
			.catch(next);
	} else {
		res.json({
			error: "The input field is empty",
		});
	}
});

router.post("/updateDirDetails", async (req, res) => {
	try {
		let details = req.body.dirDetails;

		await Dir.updateOne(
			{ dirPath: req.body.dirPath },
			{
				$set: {
					dirData: details,
				},
			}
		);

		return res
			.status(200)
			.json({ message: `${req.body.dirPath} details updated successfully!` });
	} catch (error) {
		console.log("error message:", error);
		return res.status(500).json({ message: "Oops... looks like something went wrong" });
	}
});

router.get("/deleteDir", (req, res, next) => {
	Dir.findOneAndDelete({ dirPath: req.query.dirPath })
		.then((data) => res.json(data))
		.catch(next);
});

module.exports = router;
