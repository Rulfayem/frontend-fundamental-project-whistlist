import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./website_pages/ErrorPage";
import Home from "./website_pages/HomePage";
import AddTodo from "./website_pages/AddWishlistedGame";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/WishlistedContext";
import EditTodo from "./website_pages/EditWishlistedGamesDescription";

function Layout() {
  return (
    <>
      <Navbar bg="light" varient="light">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            <Route path="*" element={<Error page />} />
            <Route path="todo/:id" element={<EditTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}