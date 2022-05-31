import React from "react";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/oku-hero-logo-dark.svg";
import Presentation from "./Presentation";
import {HashLink} from "react-router-hash-link";


export default () => {


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg_dark">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to={Routes.Presentation.path} className="me-lg-3 d-flex align-items-center">
            <Image src={ReactHero} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="custom_navbar-collapse">
            <Nav className="navbar-nav-hover align-items-lg-center">
              <Nav.Link as={Link} to={Routes.Docs.path}>Докумнтация</Nav.Link>
              <Nav.Link as={Link} to={Routes.Support.path}>Поддержа</Nav.Link>
              <Nav.Link as={Link} to={Routes.Contacts.path}>Контакты</Nav.Link>
            </Nav>
            <Nav>
              <Button as={Link} to={Routes.Signin.path} variant="outline-light" className="ms-3">Войти</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
