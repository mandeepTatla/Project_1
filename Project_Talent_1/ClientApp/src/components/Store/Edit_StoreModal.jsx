import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Edit_StoreModal = (props) => {
  const { open, handleModal, Store } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();

  useEffect(() => {
    if(Store){
      setname(Store.name);
      setaddress(Store.address);
    }
  }, [Store])

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

  const EditStore = (id)=>{
    if(name!=null && address != null){

      Axios.put('/Stores/PutStore/'+Store.id,
      {
        id: id,
        name: name,
        address: address
        
      })
      .then((response) => {
        handleModal(false);
      })
      .catch((error) => {
        console.log(` Failed to Update Error:`+ error );
      });
    }else {
      
    }
  }
  if(Store){
    return (
      <Modal open={open}>
        <Modal.Header>Update Store</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Please enter name here"
                onChange={(event) => handleChange(event, "name")}
                value={name}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Please enter Address here"
                onChange={(event) => handleChange(event, "address")}
                value={address}
  
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
          <Button color="green" onClick={()=>EditStore(Store.id)}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else{
    return(
      <div></div>
    )
  }
};

export default Edit_StoreModal;
