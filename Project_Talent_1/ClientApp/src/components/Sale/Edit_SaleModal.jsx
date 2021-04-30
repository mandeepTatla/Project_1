import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Message } from "semantic-ui-react";
import Select from "react-select";

const Edit_SaleModal = (props) => {
  const { open, handelModal, Sale } = props;

  const [currentDate, setNewDate] = useState(null);

  const [Customer_Id, setCustomer_Id] = useState();
  const [Customer_name, setCustomer_name] = useState();
  const [Customers, setCustomers] = useState([]);
  const [Cust_Selection, setCust_Selection] = useState([]);

  const [Products, setProducts] = useState([]);
  const [Product_selection, setProduct_selection] = useState([]);
  const [Product_name, setProduct_name] = useState();
  const [Product_Id, setProduct_Id] = useState();

  const [Store, setStore] = useState([]);
  const [Store_selection, setStore_selection] = useState([]);
  const [Store_name, setStore_name] = useState();
  const [Store_Id, setStore_Id] = useState();

  useEffect(() => {
    if (Sale != null && Customers != null) {
      setNewDate(Sale.dateSold);
      setCustomer_Id(Sale.customerId);
      setProduct_Id(Sale.productId);
      setStore_Id(Sale.storeId);
      GetCustomers();
      GetProducts();
      GetStores();
    }
  }, [Sale],[Customers]);

  const GetCustomers = () => {
    Axios.get("/Customers/GetCustomer").then((response) => {
      setCustomers(response.data);
      const options = Customers.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setCust_Selection(options);
    });
  };

  const GetProducts = () => {
    Axios.get("/Products/GetProduct").then((response) => {
      setProducts(response.data);

      const Product_options = Products.map((d) => ({
        value: d.id,
        label: d.name,
      }));

      setProduct_selection(Product_options);
    });
  };

  const GetStores = () => {
    Axios.get("/Stores/GetStore").then((response) => {
      setStore(response.data);

      const Store_options = Store.map((d) => ({
        value: d.id,
        label: d.name,
      }));

      setStore_selection(Store_options);
    });
  };

  const handleChange = (e, Field) => {
    switch (Field) {
      case "Date":
        setNewDate(e.data);

        break;

      case "Customer":
        setCustomer_name(e.label);
        setCustomer_Id(e.value);

        break;

      case "Product":
        setProduct_name(e.label);
        setProduct_Id(e.value);
        break;

      case "Store":
        setStore_name(e.label);
        setStore_Id(e.value);

        break;

      default:
        break;
    }
  };
  const EditSale = (id) => {
    if (Customer_Id != null && Product_Id != null && Store_Id != null) {
      Axios.put("/Sales/PutSales/" + Sale.id, {
        id: id,
        customerId: Customer_Id,
        productId: Product_Id,
        storeId: Store_Id,
        dateSold: currentDate,
      })
        .then((response) => {
          handelModal(false);
        })
        .catch((error) => {
          console.log(` Failed to Update Error:` + error);
        });
    } else {
    }
  };

  if (Sale) {
    return (
      <Modal open={open}>
        <Modal.Header>Update Sale</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Date</label>
              <input
                placeholder=""
                type="date"
                onChange={(event) => {
                  return handleChange(event, "Date");
                }}
              />
            </Form.Field>

            <Form.Field>
            {Customers.map((c) => {
              if (c.id === Customer_Id) {
                return(
                  <Form.Field>
                  <label>Customer</label>
                  <Select
                    placeholder={c.name}
                    options={Cust_Selection}
                    onChange={(event) => {
                      return handleChange(event, "Customer");
                    }}
                  />
                  </Form.Field>
                );
              }
            })}
            </Form.Field>
            <Form.Field>
            {Products.map((p) => {
              if (p.id === Product_Id) {
                return(
                  <Form.Field>
                  <label>Product</label>
                  <Select
                    placeholder={p.name}
                    options={Product_selection}
                    onChange={(event) => {
                      return handleChange(event, "Product");
                    }}
                  />
                  </Form.Field>
                );
              }
            })}
            </Form.Field>
                
           
            <Form.Field>
            {Store.map((st) => {
              if (st.id === Store_Id) {
                return(
                  <Form.Field>
                  
                  <label>Store</label>
                  <Select
                  placeholder={st.name}
                  options={Store_selection}
                  onChange={(event) => {
                    return handleChange(event, "Store");
                  }}
                  /> 
                  </Form.Field>
                  
                  );
                }
            })}
               
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
          <Button color="green" onClick={() => EditSale(Sale.id)}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default Edit_SaleModal;
