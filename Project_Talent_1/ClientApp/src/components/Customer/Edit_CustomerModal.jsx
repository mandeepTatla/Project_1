import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Edit_CustomerModal = (props) => {
  const { open, handelModal, Customer } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();

  useEffect(() => {
    if(Customer){
      console.log("Edit Cutomer Modal Page: " + Customer);
      setname(Customer.name);
      setaddress(Customer.address);
    }
  }, [Customer])

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

  const EditCustomer = (id)=>{

    if (name != null && address != null){

      Axios.put('/Customers/PutCustomer/'+Customer.id,
      {
        id: id,
        name: name,
        address: address
        
      })
      .then((response) => {
        console.log(`Customer ${response.data.name} updated succesfully`);
        handelModal(false);
      })
      .catch((error) => {
      });
    }else {
      
    }
  }
  if(Customer){
    return (
      <Modal open={open}>
        <Modal.Header>Update Customer</Modal.Header>
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
              return handelModal(false);
            }}
          >
            Cancel
          </Button>
          <Button color="green" onClick={()=>EditCustomer(Customer.id)}>
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

export default Edit_CustomerModal;
