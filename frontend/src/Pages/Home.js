import React from "react";
import Modals from "../Components/Modal";
import { styled } from "@mui/material/styles";
import Loader from "../Components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Grid,
	CssBaseline,
	Container,
	Typography,
	Button,
	tableCellClasses,
	IconButton,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			dataPresent: false,
			loading: true,
			data: [],
		};
	}

	componentDidMount = () => {
		fetch("http://localhost:5000/api/")
			.then((response) => response.json())
			.then((data) => {
				let dataPresents = false;
				if (data.length > 0) {
					dataPresents = true;
				}
				this.setState({ data: data, dataPresent: dataPresents, loading: false });
			});
	};

	handleModalOpen = () => {
		this.setState({
			modalOpen: !this.state.modalOpen,
		});
	};

	handleDirectoryAdd = (value) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			dirPath: value,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:5000/api/addDir", requestOptions)
			.then((response) => response.text())
			.then((result) => {
				alert(`${value} directory added successfully.`);
				window.location.reload();
			})
			.catch((error) => {
				alert("Error in adding directory!");
				console.log("error", error);
			});
	};

	handleDirDelete = (index) => {
		console.log(index);
		let value = window.confirm(
			`Are you sure you want to delete ${this.state.data[index].dirPath} directory?`
		);

		if (value) {
			var requestOptions = {
				method: "GET",
				redirect: "follow",
			};

			fetch(
				`http://localhost:5000/api/deleteDir?dirPath=${this.state.data[index].dirPath}`,
				requestOptions
			)
				.then((response) => response.text())
				.then((result) => {
					alert(`${this.state.data[index].dirPath} directory deleted.`);
					window.location.reload();
				})
				.catch((error) => {
					alert("Error in deleting directory!");
					console.log("error", error);
				});
		} else {
			alert(`${this.state.data[index].dirPath} directory not deleted.`);
		}
	};

	handleDate = (date) => {
		let d = new Date(date);
		return d.toLocaleString();
	};

	render() {
		return (
			<>
				<CssBaseline />
				<Container maxWidth="lg">
					<Grid container spacing={4} style={{ marginTop: "10px" }}>
						<Grid item xs={8}>
							<Typography
								variant="h4"
								style={{ fontWeight: "bold", marginBottom: "-2px" }}
								gutterBottom
							>
								Directory Scans
							</Typography>
						</Grid>

						<Grid item xs={4}>
							<Button
								variant="contained"
								color={"secondary"}
								fullWidth
								onClick={this.handleModalOpen}
							>
								Add a new Directory for Scan
							</Button>
						</Grid>
					</Grid>

					{this.state.loading ? <Loader /> : null}

					{!this.state.loading ? (
						<>
							{this.state.dataPresent ? (
								<>
									<TableContainer sx={{ mt: 5 }} component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<StyledTableCell>
														<Typography
															variant="h6"
															style={{
																fontWeight: "bold",
															}}
														>
															Directory
														</Typography>
													</StyledTableCell>
													<StyledTableCell align="right">
														<Typography
															variant="h6"
															style={{
																fontWeight: "bold",
															}}
														>
															Added On
														</Typography>
													</StyledTableCell>
													<StyledTableCell align="right">
														<Typography
															variant="h6"
															style={{
																fontWeight: "bold",
															}}
														>
															Delete
														</Typography>
													</StyledTableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{this.state.data.map((data, index) => (
													<StyledTableRow
														key={index}
														sx={{
															"&:last-child td, &:last-child th": {
																border: 0,
															},
														}}
													>
														<StyledTableCell
															component="th"
															scope="row"
															style={{
																fontWeight: "bold",
															}}
														>
															{data.dirPath}
														</StyledTableCell>
														<StyledTableCell
															align="right"
															style={{
																fontWeight: "bold",
															}}
														>
															{this.handleDate(data.createdAt)}
														</StyledTableCell>
														<StyledTableCell align="right">
															<IconButton
																sx={{
																	"&:hover": {
																		backgroundColor:
																			"transparent",
																	},
																}}
																onClick={() =>
																	this.handleDirDelete(index)
																}
															>
																<DeleteIcon />
															</IconButton>
														</StyledTableCell>
													</StyledTableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</>
							) : (
								<Typography
									variant="h6"
									sx={{ mt: 20 }}
									style={{
										fontWeight: "bold",
										display: "flex",
										justifyContent: "center",
									}}
									gutterBottom
								>
									No directory scan info is there.
								</Typography>
							)}
						</>
					) : null}
				</Container>

				{this.state.modalOpen ? (
					<Modals
						buttonName="Add Directory for Scan"
						label="Directory Absolute Path"
						func={this.handleModalOpen}
						handleDirSubmit={this.handleDirectoryAdd}
					/>
				) : null}
			</>
		);
	}
}

export default Home;
