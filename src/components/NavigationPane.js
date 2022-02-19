import {Component} from "react";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";

class NavigationPane extends Component{
    render(){
        return (

            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="/logo.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/trade">Trade</Nav.Link>
                            <Nav.Link href="/earn">Earn</Nav.Link>
                            <Nav.Link href="/nft">NFT</Nav.Link>
                            <Nav.Link href="/lending">Lending</Nav.Link>
                            <NavDropdown title="Win" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/lottery">Lottery</NavDropdown.Item>
                                <NavDropdown.Item href="/betting">Betting</NavDropdown.Item>
                                <NavDropdown.Item href="/challenge">Trading Challenge</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: 0x00000
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
export default NavigationPane;