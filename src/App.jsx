
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <LocationList />
    </>
  )
}

export default App;

