import Axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal,Message } from "semantic-ui-react";

const Create_CustomerModal = (props) => {
  const { open, handelModal } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();

  const handleChange = (e, field) => {
    switch (field) {
      case "name":
        console.log(e.target.value);
        setname(e.target.value);
        break;
      case "address":
        console.log(e.target.value);
        setaddress(e.target.value);
        break;

      default:
        break;
    }
  };

  const CreateCustomer = () => {

    if(name != null && address != null){

      Axios.post("/Customers/PostCustomer", {
        Name: name,
        Address: address,
      })
      .then((response) => {
        handelModal(false);
      })
      .catch((error) => {
        console.log("Fail to add new Customer. Error:" + error);
      });
    } else {
    }
  };
  

  return (
    <Modal open={open}>
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Enter name here"
              onChange={(event) => handleChange(event, "name")}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Enter Address here"
              onChange={(event) => handleChange(event, "address")}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            return handelModal(false);
          }}
        >
          Cancel
        </Button>
        <Button color="green" onClick={CreateCustomer}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Create_CustomerModal;
