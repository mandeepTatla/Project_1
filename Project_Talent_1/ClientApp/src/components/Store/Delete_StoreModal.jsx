import Axios from "axios";
import React  from 'react';
import { Button, Form, Modal } from "semantic-ui-react";

const Delete_StoreModal = (props) => {
  const { open, handleModal, Store } = props;

 const DeleteStore = (Id, index) => {
    Axios.delete("/Stores/DeleteStore/ " + Id)
      .then((response) => {
        handleModal(false);
      })
      .catch((error) => {
        alert("Store Already exists in the Sales Database. Please clear the associated sales before trying again.");

      });
  };

  if(Store){

    return (
      <Modal open={open}>
      <Modal.Header>Delete Store</Modal.Header>
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
        return handleModal(false);
      }}
      >
      Cancel
      </Button>
      <Button color="red" onClick={()=>DeleteStore(Store.id)}>
      Delete
      </Button>
      </Modal.Actions>
      </Modal>
      );
    }else{
      return (
        <div></div>
      )
    }
    
};

export default Delete_StoreModal;
