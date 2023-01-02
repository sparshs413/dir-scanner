const cron = require("node-cron");
var request = require("request");
const { exec } = require("child_process");

function extractDirDetails(dirPath) {
	let dirData = [];

	exec("ls -al " + dirPath, async (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}

		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}

		var output = stdout;

		var splitted = output.split("\n");

		for (let i = 1; i < splitted.length - 1; i++) {
			var split2 = splitted[i].split(/\s+/);

			let data = {
				fileType: split2[0],
				numOfLinks: split2[1],
				ownerName: split2[2],
				groupName: split2[3],
				sizeOfFile: split2[4],
				dateModified: split2[5] + " " + split2[6] + " " + split2[7],
				nameOfFile: "",
			};

			let name = "";

			for (let j = 8; j < split2.length; j++) {
				name += split2[j];
				if (j != split2.length - 1) name += " ";
			}

			data.nameOfFile = name;
			dirData.push(data);
		}

		updateDirectoryData(dirPath, dirData);
	});
}

function updateDirectoryData(dirPath, dirData) {
	var options = {
		method: "POST",
		url: "http://localhost:5000/api/updateDirDetails",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			dirPath: dirPath,
			dirDetails: dirData,
		}),
	};

	request(options, function (error, response) {
		if (error) throw new Error(error);
        // console.log(`${dirPath} details updated successfully!`)
		console.log(response.body);
	});
}

function fetchDirDetails() {
	request("http://localhost:5000/api/", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let data = JSON.parse(body);

			for (let i = 0; i < data.length; i++) {
				extractDirDetails(data[i].dirPath);
			}
		} else {
			console.log(error);
		}
	});
}

cron.schedule("*/5 * * * *", () => {
	fetchDirDetails();
});
