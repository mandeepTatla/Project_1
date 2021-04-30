import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Nav_Menu = (props) => {
  let history = useHistory();
  const [activeItem, setactiveItem] = useState();

  useEffect(() => {
    if (activeItem != null) {
      console.log(activeItem);
    }
    return () => {};
  }, [activeItem]);

  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
    history.push(`/${name}`);
  };

  return (
    <Menu className="Navbar" inverted>
      <Menu.Item
        name=""
        active={activeItem === "Home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="Customer"
        active={activeItem === "Customer"}
        onClick={handleItemClick}
      >
        Customers
      </Menu.Item>
     
      <Menu.Item
        name="Product"
        active={activeItem === "Product"}
        onClick={handleItemClick}
      >
        Products
      </Menu.Item>

      <Menu.Item
        name="Sale"
        active={activeItem === "Sale"}
        onClick={handleItemClick}
      >
        Sales
      </Menu.Item>

      <Menu.Item
        name="Store"
        active={activeItem === "Store"}
        onClick={handleItemClick}
      >
        Stores
      </Menu.Item>
    
    </Menu>
  );
};
export default Nav_Menu;
