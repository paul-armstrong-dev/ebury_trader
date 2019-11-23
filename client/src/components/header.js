import React from 'react';

import {Col, Container, Nav, Navbar, Row} from 'reactstrap';

const Header = () => (
    <header>
        <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white"
                style={{height: 60}}>

            <Container>
                <Row noGutters className="position-relative w-100 align-items-center">

                    <Col className="d-none d-lg-flex justify-content-start">
                        <Nav className="mrx-auto" navbar>
                            <h1>Trader app</h1>
                        </Nav>
                    </Col>


                </Row>
            </Container>

        </Navbar>
    </header>
);

export default Header;