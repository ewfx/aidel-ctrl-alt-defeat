import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Grid,
  Input,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom theme with primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#4A90E2", // Nice blue color
    },
    secondary: {
      main: "#F5A623", // Warm orange color
    },
    background: {
      default: "#F3F7FA",
    },
  },
});

const LandingPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (file) {
      // navigate("/results"); // Redirect to results page
      // call api to upload file
      const formData = new FormData();
      formData.append("file", file);
      fetch("http://localhost:3000/risk-analysis/calculate-risk", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => navigate("/results", { state: { data } }))
        .catch((error) => console.error(error));
    } else {
      alert("Please upload a file before submitting.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)"
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            maxWidth: 500,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#ffffffcc"
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">
            Upload Your File
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Supported formats: .pdf, .csv, .txt
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: 2
            }}
          >
            <Input
              type="file"
              onChange={handleFileChange}
              sx={{ display: "none" }}
              id="upload-file"
            />
            <label htmlFor="upload-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ textTransform: "none", width: "100%" }}
              >
                {file ? file.name : "Choose a File"}
              </Button>
            </label>
          </Paper>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              fullWidth
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Submit
            </Button>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
