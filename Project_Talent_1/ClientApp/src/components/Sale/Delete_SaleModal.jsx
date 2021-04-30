import Axios from "axios";
import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Delete_SaleModal = (props) => {
  const { open, handelModal, Sale } = props;

  const DeleteSale = (Id, index) => {
    Axios.delete("/Sales/DeleteSales/ " + Id)
      .then((response) => {
        handelModal(false);
      })
      .catch((error) => {
           console.log(` Failed to delete `);
      });
  };

  if (Sale) {
    return (
      <Modal open={open}>
        <Modal.Header>Delete Sale</Modal.Header>
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
          <Button color="red" onClick={() => DeleteSale(Sale.id)}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default Delete_SaleModal;
