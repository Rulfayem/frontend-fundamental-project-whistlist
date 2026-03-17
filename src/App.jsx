import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes, Link } from "react-router-dom";
import ErrorPage from "./website_pages/ErrorPage";
import HomePage from "./website_pages/HomePage";
import useLocalStorage from "use-local-storage";
import { WishlistedContext } from "./contexts/WishlistedContext";
import EditGameDesc from "./website_pages/EditWishlistedGamesDescription";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddWishlistedGameManually from "./website_pages/AddWishlistedGameManually";
import AddWishlistedGameFromSteam from "./website_pages/AddWishlistedGameFromSteam"
import "./App.css"

function SiteLayout() {
  return (
    <>
      <Navbar className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Wishlist
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/add-game-from-steam" className="add-link">
              Add Game
            </Nav.Link>
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