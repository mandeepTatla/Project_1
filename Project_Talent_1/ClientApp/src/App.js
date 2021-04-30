import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./components/Home/Home";
import Customer from "./components/Customer/Customer";
import Product from "./components/Product/Product";
import Store from "./components/Store/Store";
import Sale from "./components/Sale/Sale";

import "semantic-ui-css/semantic.min.css";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/Customer" component={Customer} />
        <Route path="/Product" component={Product} />
        <Route path="/Store" component={Store} />
        <Route path="/Sale" component={Sale} />
      </Layout>
    );
  }
}
