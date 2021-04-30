import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import Create_SalesModal from "./Create_SaleModal";
import Delete_SaleModal from "./Delete_SaleModal";
import Edit_SaleModal from "./Edit_SaleModal";
import dateFormat from 'dateformat';

const Sale = (props) => {
  const [Sales, setSales] = useState([]);
  const [Sale, setSale] = useState();
  const [Open_Create, setOpen_Create] = useState(false);
  const [Open_Delete, setOpen_Delete] = useState(false);
  const [Open_Edit, setOpen_Edit] = useState(false);

  const [Customers, setCustomers] = useState([]);
  const [Products, setProducts] = useState([]);
  const [Store, setStore] = useState([]);

  useEffect(() => {
    if (Customers) {
      
      GetCustomers();
      GetProducts();
      GetStores();
      GetSales();
    }
  }, [Customers]);

  const GetSales = () => {
    Axios.get("/Sales/GetSales").then((response) => {
      setSales(response.data);      
    });
  };

  const GetCustomers = () => {
    Axios.get("/Customers/GetCustomer").then((response) => {
      setCustomers(response.data);
    });
  };
  const GetProducts = () => {
    Axios.get("/Products/GetProduct").then((response) => {
      setProducts(response.data);
    });
  };

  const GetStores = () => {
    Axios.get("/Stores/GetStore").then((response) => {
      setStore(response.data);
    });
  };

  const handleDelete = (s) => {
    setSale(s);
    setOpen_Delete(true);
  };

  const handleEdit = (s) => {
    setSale(s);
    setOpen_Edit(true);
  };

  return (
    <div>
      <Create_SalesModal
        open={Open_Create}
        handelModal={(value) => setOpen_Create(value)}
      />
      <Delete_SaleModal
        open={Open_Delete}
        handelModal={(value) => setOpen_Delete(value)}
        Sale={Sale}
      />

      <Edit_SaleModal
        open={Open_Edit}
        handelModal={(value) => setOpen_Edit(value)}
        Sale={Sale}
      />
      <h1>Sales Table</h1>
      <Button primary onClick={() => setOpen_Create(true)}>
        New Sale
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Sales.map((s) => {
            return ( 
              <Table.Row>
                {Customers.map((c) => {
                  if (c.id===s.customerId) {
                    return (<Table.Cell>{c.name} </Table.Cell>);
                  }
                })}

                {Products.map((p) => {
                  if (p.id===s.productId) {
                    return (<Table.Cell>{p.name} </Table.Cell>);
                  }
                })}

                {Store.map((st) => {
                  if (st.id===s.storeId) {
                    return (<Table.Cell>{st.name} </Table.Cell>);
                  }
                })}

                <Table.Cell>{dateFormat(s.dateSold,"mmmm dS, yyyy")}</Table.Cell>

                <Table.Cell>
                  <Button
                    style={{ backgroundColor: "olive" }}
                    positive
                    onClick={() => handleEdit(s)}
                  >
                    <Icon name="edit" />
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    style={{ backgroundColor: "red" }}
                    positive
                    onClick={() => handleDelete(s)}
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
export default Sale;
