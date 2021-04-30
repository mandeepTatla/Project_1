import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import Create_ProductModal from "./Create_ProductModal";
import Edit_ProductModal from "./Edit_ProductModal";
import Delete_ProductModal from "./Delete_ProductModal";

const Product = (props) => {
  const [Products, setProducts] = useState([]);
  const [Product, setProduct] = useState();
  const [open_create, setopen_create] = useState(false);
  const [open_Edit, setopen_Edit] = useState(false);
  const [open_Del, setopen_Del] = useState(false);

  useEffect(() => {
    if (Products) {
      GetProducts();
    }
  }, [Products]);

  const GetProducts = () => {
    Axios.get("/Products/GetProduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (Product) => {
    setProduct(Product);
    setopen_Edit(true);
  };

  const handleDelete =(Product)=>{
      setProduct(Product);
      setopen_Del(true);

  }

  return (
    <div>
      <Edit_ProductModal
        open={open_Edit}
        Product={Product}
        handelModal={(value) => setopen_Edit(value)}
      />

      <Create_ProductModal
        open={open_create}
        handelModal={(value) => setopen_create(value)}
      />
      <Delete_ProductModal
        open={open_Del}
        Product={Product}
        handelModal={(value) => setopen_Del(value)}
      />

      <h1>Product Table</h1>
      <Button primary onClick={() => setopen_create(true)}>
        New Product
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>NAME</Table.HeaderCell>
            <Table.HeaderCell>PRICE</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Products.map((p, index) => {
            return (
              <Table.Row>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.price}</Table.Cell>
                <Table.Cell>
                  <Button
                    style={{ backgroundColor: "olive" }}
                    positive
                    onClick={() => handleEdit(p)}
                  >
                    <Icon name="edit" />
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button style={{ backgroundColor: "red" }} 
                  positive
                  onClick={()=>handleDelete(p)}
                  >
                    <Icon name="delete" />
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default Product;
