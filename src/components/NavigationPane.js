import {Component} from "react";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";

class NavigationPane extends Component{
    render(){
        return (

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        Angat Pinas
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/vote">Vote</Nav.Link>
                            <Nav.Link href="/know">Know</Nav.Link>
                            <Nav.Link href="/mission">Mission</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title="Signed in as: 0x00000" id="nav-dropdown">

                            <NavDropdown.Item href="/purchase">Buy Voting Token</NavDropdown.Item>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
export default NavigationPane;