import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import Create_CustomerModal from "./Create_CustomerModal";
import Edit_CustomerModal from "./Edit_CustomerModal";
import Del_CustomerModal from "./Delete_CustomerModal";

const Customer = (props) => {
  const [Customers, setcustomers] = useState([]);
  const [Customer, setCustomer] = useState();
  const [open, setopen] = useState(false);
  const [open_Edit, setopen_Edit] = useState(false);
  const [open_Del, setopen_Del] = useState(false);

  useEffect(() => {
    if (Customers) {
      GetCustomers();
    }
  }, [Customers]);

  const GetCustomers = () => {
    Axios.get("/Customers/GetCustomer")
      .then((response) => {
        setcustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (Customer) => {
    setCustomer(Customer);
    setopen_Edit(true);
  };

  const handleDelete = (Customer_edit) => {
    setCustomer(Customer_edit);
    setopen_Del(true);
  };


  return (
    <div>
      <Create_CustomerModal
        open={open}
        handelModal={(value) => setopen(value)}
      />
      <Edit_CustomerModal
        open={open_Edit}
        Customer={Customer}
        handelModal={(value) => setopen_Edit(value)}
      />
      <Del_CustomerModal
        open={open_Del}
        Customer={Customer}
        handelModal={(value) => setopen_Del(value)}
      />

      <h1>Customer Table</h1>
      <Button onClick={() => setopen(true)} primary>
        {" "}
        New Customer{" "}
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Customers.map((c, index) => {
            return (
              <Table.Row>
                <Table.Cell>{c.name}</Table.Cell>
                <Table.Cell>{c.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    style={{ backgroundColor: "olive" }}
                    positive
                    onClick={() => handleEdit(c)}
                  >
                    <Icon name="edit" />
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    style={{ backgroundColor: "red" }}
                    positive
                    onClick={() => handleDelete(c)}
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
export default Customer;
