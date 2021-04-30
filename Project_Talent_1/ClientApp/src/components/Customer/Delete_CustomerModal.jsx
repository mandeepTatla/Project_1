import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";


const Delete_CustomerModal = (props) => {
  const { open, handelModal, Customer } = props;


  const DeleteCustomer = (Id, index) => {
    Axios.delete("/Customers/DeleteCustomer/ " + Id)
      .then((response) => {
        console.log(`Customer ${response.data.name} deleted succesfully`);
        handelModal(false);
      })
      .catch((error) => {
        alert(`Customer Already exist in the Sales Database. Please clear the associated sales before trying again.`);
      });
  };

  if (Customer) {
    return (
      <Modal open={open}>
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Are you Sure?</label>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => {
              return handelModal(false);
            }}
          >
            Cancel
          </Button>
          <Button color="red" onClick={() => DeleteCustomer(Customer.id)}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default Delete_CustomerModal;
