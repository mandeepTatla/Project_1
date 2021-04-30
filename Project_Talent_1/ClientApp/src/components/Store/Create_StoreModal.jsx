import Axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Create_StoreModal = (props) => {
  const { open, handleModal } = props;
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

  const CreateStore = () => {
    if(name !=null && address !=null){

      Axios.post("/Stores/PostStore", {
        Name: name,
        Address: address,
      })
      .then((response) => {
        handleModal(false);
      })
      .catch((error) => {
        console.log("Fail to add new Store. Error:" + error);
      });
    }else{
      
    }
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Enter Store name here"
              onChange={(event) => handleChange(event, "name")}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Enter Store Address here"
              onChange={(event) => handleChange(event, "address")}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            return handleModal(false);
          }}
        >
          Cancel
        </Button>
        <Button color="green" onClick={CreateStore}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Create_StoreModal;
