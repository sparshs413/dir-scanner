import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

export default function AnimatedModal(props) {
	const [open, setOpen] = React.useState(true);
	const [dirInfo, setDirInfo] = React.useState("");

	const handleClose = () => {
		setOpen(false);
		props.func();
	};

	const handleChange = (e) => {
		setDirInfo(e.target.value);
	};

	const handleSubmit = (e) => {
		props.handleDirSubmit(dirInfo);
		handleClose();
	};

	return (
		<div>
			<Dialog open={open} fullWidth={true} maxWidth="sm" onClose={handleClose}>
				<Container maxWidth="lg">
					<Grid container spacing={4} style={{ marginTop: "10px" }}>
						<Grid item xs={12}>
							<Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
								Add a directory for scan here
							</Typography>
							<TextField
								autoFocus
								margin="dense"
								name="dirInfo"
								label={props.label}
								type="text"
								fullWidth
								variant="outlined"
								color={"secondary"}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								sx={{ mb: 2, mt: -2 }}
								variant="contained"
								color={"secondary"}
								fullWidth
								onClick={handleSubmit}
							>
								{props.buttonName}
							</Button>
						</Grid>
					</Grid>
				</Container>
			</Dialog>
		</div>
	);
}
