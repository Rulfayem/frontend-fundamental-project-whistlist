import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./website_pages/ErrorPage";
import HomePage from "./website_pages/HomePage";
import useLocalStorage from "use-local-storage";
import { WishlistedContext } from "./contexts/WishlistedContext";
import EditGameDesc from "./website_pages/EditWishlistedGamesDescription";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddWishlistedGameManually from "./website_pages/AddWishlistedGameManually";
import AddWishlistedGameFromSteam from "./website_pages/AddWishlistedGameFromSteam"

function SiteLayout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Wishlisted Games</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add-game-from-steam">Add Game</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [wishedGame, setWishedGame] = useLocalStorage("wishlisted game", []);
  return (
    <WishlistedContext.Provider value={{ wishedGame, setWishedGame }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="add-game-manually" element={<AddWishlistedGameManually />} />
            <Route path="add-game-from-steam" element={<AddWishlistedGameFromSteam />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="game/:id" element={<EditGameDesc />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishlistedContext.Provider>
  );
}