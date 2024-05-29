
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
    <Routes>
      <Route path="/" element={<LocationList />} />
      <Route path="/hotels" element={<AppLayout />}>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<div> SINGLE HOTELS</div>} />
      </Route>
    </Routes>
    </HotelsProvider>
  )
}

export default App;

