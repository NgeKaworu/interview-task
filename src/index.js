import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
