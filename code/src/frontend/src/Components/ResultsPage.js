import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";


const sampleData = [
  { id: 1, name: "John Doe", age: 28, description: "Short description." },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    description:
      "This is a very long description that needs to be truncated. Click the info icon to view more details.",
  },
];

const ResultsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const location = useLocation()
  const data = location.state.data.detailedAnalyses

  const handleOpen = (desc) => {
    setSelectedDescription(desc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
        Results
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.transactionId}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  {row.description.length > 30 ? (
                    <>
                      {row.description.substring(0, 30)}...
                      <IconButton color="primary" onClick={() => handleOpen(row.description)}>
                        <InfoIcon />
                      </IconButton>
                    </>
                  ) : (
                    row.description
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for full description */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Full Description</DialogTitle>
        <DialogContent>
          <Typography>{selectedDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResultsPage;
