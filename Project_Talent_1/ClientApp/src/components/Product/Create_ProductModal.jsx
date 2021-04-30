import Axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Create_ProductModal = (props) => {
  const { open, handelModal } = props;
  const [name, setname] = useState();
  const [price, setprice] = useState();

  const handleChange = (e, field) => {
    switch (field) {
      case "name":
        console.log(e.target.value);
        setname(e.target.value);
        break;
      case "price":
        console.log(e.target.value);
        setprice(e.target.value);
        break;

      default:
        break;
    }
  };

  const CreateProduct = () => {
    if(name!=null && price !=null){

      Axios.post("/Products/PostProduct", {
        Name: name,
        Price: price,
      })
      .then((response) => {
        handelModal(false);
      })
      .catch((error) => {
        console.log("Fail to add new Product. Error:" + error);
      });
    }else{
      
    }
    };

  return (
    <Modal open={open}>
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Enter name here"
              onChange={(event) => handleChange(event, "name")}
            />
          </Form.Field>
          <Form.Field>
            <label>PRICE</label>
            <input
              placeholder="Enter Address here"
              onChange={(event) => handleChange(event, "price")}
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
        <Button color="green" onClick={CreateProduct}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Create_ProductModal;
