import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import Select from "react-select";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";


const Create_SaleModal = (props) => {
  const { open, handelModal } = props;
  const [Customers, setCustomers] = useState([]);
  const [Cust_Selection, setCust_Selection] = useState([]);
  const [Customer_name, setCustomer_name] = useState();
  const [Customer_Id, setCustomer_Id] = useState();

  const [Products, setProducts] = useState([]);
  const [Product_selection, setProduct_selection] = useState([]);
  const [Product_name, setProduct_name] = useState();
  const [Product_Id, setProduct_Id] = useState();

  const [Store, setStore] = useState([]);
  const [Store_selection, setStore_selection] = useState([]);
  const [Store_name, setStore_name] = useState();
  const [Store_Id, setStore_Id] = useState();

  const [currentDate, setNewDate] = useState(null);

  useEffect(() => {
    if (Customers) {
      GetCustomers();
      GetProducts();
      GetStores();
    }
  }, [Customers]);

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

  const handleDateChange = (event, data) => {
    setNewDate(data.value);

  };
  const handleChange = (e, Field) => {
    switch (Field) {
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

  const CreateSale = () => {
    if (Customer_Id !=null && Product_Id !=null && Store_Id !=null){

    Axios.post("/Sales/PostSales", {
      customerId: Customer_Id,
      productId: Product_Id,
      storeId: Store_Id,
      dateSold: currentDate,
    })
      .then((response) => {
        handelModal(false);
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
    }else {
      console.log('All fields must be filled');
    }  };

  return (
    <div>
      <Modal open={open}>
        <Modal.Header>Create Sales</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Date</label>
              <SemanticDatepicker onChange={handleDateChange} />
            </Form.Field>

            <Form.Field>
              <label>Customer</label>
              <Select
                options={Cust_Selection}
                onChange={(event) => {
                  return handleChange(event, "Customer");
                }}
              />
            </Form.Field>

            <Form.Field>
              <label>Product</label>
              <Select
                options={Product_selection}
                onChange={(event) => {
                  return handleChange(event, "Product");
                }}
              />
            </Form.Field>

            <Form.Field>
              <label>Store</label>
              <Select
                options={Store_selection}
                onChange={(event) => {
                  return handleChange(event, "Store");
                }}
              />
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
          <Button color="green" onClick={CreateSale}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Create_SaleModal;
