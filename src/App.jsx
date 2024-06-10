
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
import BookmarkProvider from "./components/context/BookmarkProvider";
import BookmarkList from "./components/BookmarkList";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";

function App() {
  return (
    <HotelsProvider>
      <BookmarkProvider>
      <Toaster />
      <Header />
    <Routes>
      <Route path="/" element={<LocationList />} />
      <Route path="/hotels" element={<AppLayout />}>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<SingleHotel />} />
      </Route>
      <Route path="/bookmarks" element={<BookmarkLayout />}>
        <Route index element={<BookmarkList />} />
        <Route path="add" element={<AddNewBookmark />} />
        <Route path=":id" element={<SingleBookmark />} />
      </Route>

    </Routes>
      </BookmarkProvider>
    </HotelsProvider>
  )
}

export default App;

