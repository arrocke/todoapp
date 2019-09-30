import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./contexts/auth";
import client from "./graphql/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
