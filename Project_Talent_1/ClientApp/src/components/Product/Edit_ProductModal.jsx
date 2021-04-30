import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const Edit_ProductModal = (props) => {
  const { open, handelModal, Product } = props;
  const [name, setname] = useState();
  const [price, setprice] = useState();

  useEffect(() => {
    if (Product) {
      console.log("Edit Cutomer Modal Page: " + Product);
      setname(Product.name);
      setprice(Product.price);
    }
  }, [Product]);

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

  const EditProduct = (id) => {

    if(name != null && price !=null){

      Axios.put('/Products/PutProduct/'+Product.id,
      {
        id: id,
        name: name,
        price: price,
      })
      .then((response) => {
        console.log(`Customer ${response.data.name} updated succesfully`);
        handelModal(false);
      })
      .catch((error) => {
        console.log(` Failed to Update Error:` + error);
      });
    }else{

    }
  };
  if (Product) {
    return (
      <Modal open={open}>
        <Modal.Header>Update Product</Modal.Header>
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
              <label>Price</label>
              <input
                placeholder="Please enter Price here"
                onChange={(event) => handleChange(event, "price")}
                value={price}
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
          <Button color="green" onClick={() => EditProduct(Product.id)}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default Edit_ProductModal;
