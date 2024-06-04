
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
    <Routes>
      <Route path="/" element={<LocationList />} />
      <Route path="/hotels" element={<AppLayout />}>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<SingleHotel />} />
      </Route>
      <Route path="/bookmarks" element={<BookmarkLayout />}>
        <Route index element={<div>Bookmark List</div>} />
        <Route path="add" element={<div>Bookmark Form add</div>} />
      </Route>
    </Routes>
    </HotelsProvider>
  )
}

export default App;

