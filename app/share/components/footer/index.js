import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './footer.scss';
import LocaleToggle from '../../../containers/LocaleToggle';

export const Footer = () => (
  <div className="footer">
    <Container>
      <Row>
        <Col>
          <p>© 2020 React-Jupyter. All rights reserved.</p>
        </Col>
        <Col className="footer__locale-toggle-button">
          <LocaleToggle />
        </Col>
      </Row>
    </Container>
  </div>
);
