import "./App.css";
import Map from "./Components/Map";
import Form from "./Components/Form";
import { Routes, Route } from "react-router-dom";

const App = () => (
  <Routes>
    <Route path={"/map"} element={<Map />} />
    <Route path={"/"} element={<Form />} />
  </Routes>
);

export default App;
