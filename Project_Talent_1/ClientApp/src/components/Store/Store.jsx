import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import Create_StoreModal from "./Create_StoreModal";
import Edit_StoreModal from "./Edit_StoreModal";
import Delete_StoreModal from "./Delete_StoreModal";

const Store = (props) => {
  const [Stores, setStores] = useState([]);
  const [Store, setStore] = useState();
  const [Open_create, setOpen_create] = useState(false);
  const [Open_Edit, setOpen_Edit] = useState(false);
  const [Open_Del, setOpen_Del] = useState(false);

  useEffect(() => {
    if (Stores) {
      GetStores();
    }
  }, [Stores]);

  const GetStores = () => {
    Axios.get("/Stores/GetStore")
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (Store) => {
    setStore(Store);
    setOpen_Edit(true);
  };
  const handleDelete = (Store) => {
    setStore(Store);
    setOpen_Del(true);
  };

  return (
    <div>
      <Create_StoreModal
        open={Open_create}
        handleModal={(value) => setOpen_create(value)}
      />
      <Edit_StoreModal
        open={Open_Edit}
        Store={Store}
        handleModal={(value) => setOpen_Edit(value)}
      />
      <Delete_StoreModal
        open={Open_Del}
        Store={Store}
        handleModal={(value) => setOpen_Del(value)}
      />

      <h1>Store Table</h1>
      <Button primary onClick={() => setOpen_create(true)}>
        New Store
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>NAME</Table.HeaderCell>
            <Table.HeaderCell>ADDRESS</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Stores.map((s, index) => {
            return (
              <Table.Row>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.address}</Table.Cell>
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
export default Store;
