import React, { useEffect, useState } from "react";
import { Container, Navbar, Button, Modal } from "react-bootstrap";
import TestForm from "./components/TestForm";
import TestList from "./components/TestList";
import { toast } from "react-toastify";
function TableView() {
  const [tests, setTests] = useState([]);
  const [testTypes, setTestTypes] = useState({
    type_id: "",
    test_type: ["PHP", "Node Js", "React Js"],
  });
  const [showCreateTestType, setShowCreateTestType] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // set data in state from localStorage on initialization
  useEffect(() => {
    const storedTests = JSON.parse(localStorage.getItem("tests") || "[]");
    setTests(storedTests);
  }, []);

  const handleTestDelete = (testToDelete) => {
    const updatedTests = tests.filter((test) => test !== testToDelete);
    setTests(updatedTests);
    localStorage.setItem("tests", JSON.stringify(updatedTests));
    toast.success("Data Deleted successfully!", {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleTestEdit = (test) => {
    setSelectedTest(test);
  };

  const handleCreateTable = () => {
    setSelectedTest(null);
    setShowCreateTestType(true);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Button
          variant="primary"
          onClick={handleCreateTable}
          style={{ marginLeft: "100px" }}
        >
          Create Test Type
        </Button>
      </Navbar>
      <Container>
        <TestList
          tests={tests}
          onEdit={handleTestEdit}
          onDelete={handleTestDelete}
          setShowCreateTestType={setShowCreateTestType}
        />
      </Container>
      <Modal
        show={showCreateTestType}
        onHide={() => setShowCreateTestType(false)}
      >
        <TestForm
          testTypes={testTypes}
          tests={tests}
          setTests={setTests}
          selectedTest={selectedTest}
          setShowCreateTestType={setShowCreateTestType}
        />
      </Modal>
    </div>
  );
}

export default TableView;
