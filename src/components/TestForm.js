import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { isEmail, isMobilePhone } from "validator";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const TestForm = ({
  testTypes,
  selectedTest,
  tests,
  setTests,
  setShowCreateTestType,
}) => {
  const [testName, setTestName] = useState(
    selectedTest ? selectedTest.testName : ""
  );
  const [type, setType] = useState(
    selectedTest
      ? selectedTest.testType.test_type
      : { type_id: "", test_type: [] }
  );
  const [testerEmail, setTesterEmail] = useState(
    selectedTest ? selectedTest.testerEmail : ""
  );
  const [testerMobile, setTesterMobile] = useState(
    selectedTest ? selectedTest.testerMobile : ""
  );
  const [alternativeNo, setAlternativeNo] = useState(
    selectedTest ? selectedTest.alternativeNo : ""
  );
  const [creationDate, setCreationDate] = useState("");
  const [lastUpdationDate, setLastUpdationDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tests", JSON.stringify(tests));
  }, [tests]);
  const handleTestSubmit = () => {
    // Validation checks
    if (!testName || !type || !testerEmail || !testerMobile) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isEmail(testerEmail)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (!isMobilePhone(testerMobile, "en-IN")) {
      setErrorMessage("Invalid mobile number format.");
      return;
    }

    if (testerMobile === alternativeNo) {
      setErrorMessage("Alternative number cannot be same as Tester Mobile No.");
      return;
    }
    //  unique ID
    const newTestId = uuidv4();

    const testType = {
      test_id: newTestId,
      test_type: type,
    };

    const newTest = {
      testName,
      testType,
      testerEmail,
      testerMobile,
      alternativeNo,
      creationDate: new Date().toISOString(),
      lastUpdationDate: new Date().toISOString(),
    };
    const existingTestIndex = tests.findIndex(
      (test) => test.testId === selectedTest?.testId
    );

    if (existingTestIndex !== -1) {
      // Replace the existing test entry with the new one
      const updateTest = {
        testName,
        testType,
        testerEmail,
        testerMobile,
        alternativeNo,
        creationDate: selectedTest?.creationDate,
        lastUpdationDate: new Date().toISOString(),
      };
      const updatedTests = [...tests];
      updatedTests[existingTestIndex] = {
        ...selectedTest,
        ...updateTest,
      };
      setTests(updatedTests);
      toast.success("Data updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Add the new test entry to the tests array
      setTests([
        ...tests,
        {
          testId: newTestId,
          ...newTest,
        },
      ]);
      toast.success("Data Added successfully!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    localStorage.setItem("tests", JSON.stringify(tests));

    // Clear form fields
    setTestName("");
    setType("");
    setTesterEmail("");
    setTesterMobile("");
    setAlternativeNo("");
    setCreationDate("");
    setLastUpdationDate("");
    setErrorMessage("");
    setShowCreateTestType(false);
  };

  return (
    <Container
      style={{
        padding: "25px",
      }}
    >
      <Form>
        <Form.Group controlId="testName">
          <Form.Label>Test Name</Form.Label>
          <Form.Control
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="testType">
          <Form.Label>Test Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Test Type</option>
            {testTypes.test_type.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="testerEmail">
          <Form.Label>Tester Email</Form.Label>
          <Form.Control
            type="email"
            value={testerEmail}
            onChange={(e) => setTesterEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="testerMobile">
          <Form.Label>Tester Mobile No.</Form.Label>
          <Form.Control
            type="tel"
            value={testerMobile}
            onChange={(e) => setTesterMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="alternativeNo">
          <Form.Label>Alternative No.</Form.Label>
          <Form.Control
            type="tel"
            value={alternativeNo}
            onChange={(e) => setAlternativeNo(e.target.value)}
          />
        </Form.Group>
        {/* Hidden Fields */}
        <input type="hidden" value={creationDate} />
        <input type="hidden" value={lastUpdationDate} />

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          variant="primary"
          onClick={handleTestSubmit}
          style={{
            marginTop: "20px",
          }}
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default TestForm;
