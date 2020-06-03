import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Home />
    </div>
  );
}

export default App;
