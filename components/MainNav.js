import { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom, userAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const [expanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    setUser(null);
    router.push("/login");
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchField = event.target.search.value;
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        fixed="top"
        expand="lg"
        expanded={expanded}
        className="navbar-dark"
      >
        <Container>
          <Navbar.Brand href="/">Jungkyu Mok</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                active={router.pathname === "/"}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              {user && (
                <Nav.Link
                  href="/search"
                  active={router.pathname === "/search"}
                  onClick={() => setExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              )}
            </Nav>
            {user ? (
              <>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="search"
                  />
                  <Button type="submit" variant="outline-light">
                    Search
                  </Button>
                </Form>
                <Nav>
                  <NavDropdown
                    title={user?.username || "User Name"}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      href="/favourites"
                      onClick={() => setExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/history"
                      onClick={() => setExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <Nav>
                <Nav.Link
                  href="/register"
                  active={router.pathname === "/register"}
                  onClick={() => setExpanded(false)}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  active={router.pathname === "/login"}
                  onClick={() => setExpanded(false)}
                >
                  Log in
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
