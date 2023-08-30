import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../MainContent.css";
import background from "../images/noData.png";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const TestList = ({ tests, onEdit, onDelete, setShowCreateTestType }) => {
  const handleClick = (item) => {
    setShowCreateTestType(true);
    onEdit(item);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "black", maxHeight: "90vh", overflow: "auto" }}
    >
      <Table aria-label="Test List">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Test Name</TableCell>
            <TableCell sx={{ color: "white" }}>Test Type</TableCell>
            <TableCell sx={{ color: "white" }}>Tester Email</TableCell>
            <TableCell sx={{ color: "white" }}>Tester Mobile</TableCell>
            <TableCell sx={{ color: "white" }}>Alternative No.</TableCell>
            <TableCell sx={{ color: "white" }}>Creation Date</TableCell>
            <TableCell sx={{ color: "white" }}>Last Updation Date</TableCell>
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests?.map((test, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor:
                  test.testType.test_type === "PHP"
                    ? "yellowgreen"
                    : test.testType.test_type === "Node Js"
                    ? "yellow"
                    : "orange",
              }}
            >
              <TableCell>{test.testName}</TableCell>
              <TableCell>{test.testType?.test_type}</TableCell>
              <TableCell>{test.testerEmail}</TableCell>
              <TableCell>{test.testerMobile}</TableCell>
              <TableCell>{test.alternativeNo}</TableCell>
              <TableCell>{test.creationDate}</TableCell>
              <TableCell>{test.lastUpdationDate}</TableCell>
              <TableCell sx={{ display: "flex" }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleClick(test)}
                />

                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(test)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tests?.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={background}
            alt="bg"
            width={"50%"}
            className="background-image"
          />
          <div className="content">
            <p className="no-data-message">No Data Found Please add data !</p>

            <p>
              <Link to="/" className="link">
                Go Back to Home!
              </Link>
            </p>
          </div>
        </div>
      )}
    </TableContainer>
  );
};

export default TestList;
