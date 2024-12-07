import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Tab, Form, Button, Image } from 'react-bootstrap';
import './Profile.css';
import Header from '~/components/Layout/components/Header/header';


const AccountSettings = () => {
  const [key, setKey] = useState('general');

  return (
    <div className="wrapper">
        <Header />
    <Container className="account-settings-container ">
        <h1 className='account-settings-tittle'>Account Settings</h1>
      <Row>
        <Col md={3} className="account-settings-sidebar">
          <Nav variant="pills" className="flex-column" activeKey={key} onSelect={(k) => setKey(k)}>
            <Nav.Item>
              <Nav.Link eventKey="general">General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="change-password">Change Password</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9} className="account-settings-content">
          <Tab.Content>
            <Tab.Pane eventKey="general" active={key === 'general'} className="account-settings-general">
             
              <Form>
                <Form.Group className="mb-3 text-center">
                  <Image src="https://bootdey.com/img/Content/avatar/avatar1.png" roundedCircle className="account-settings-avatar-image mb-3" />
                  <Form.Control type="file" className="account-settings-avatar" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Username</Form.Label>
                  <Form.Control type="text" className="account-settings-username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Full Name</Form.Label>
                  <Form.Control type="text" className="account-settings-full-name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Email</Form.Label>
                  <Form.Control type="email" className="account-settings-email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Bio</Form.Label>
                  <Form.Control as="textarea" rows={3} className="account-settings-bio" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Birthdate</Form.Label>
                  <Form.Control type="date" className="account-settings-birthdate" />
                </Form.Group>
                <Form.Group className="mb-3">
  <Form.Label className="account-settings-form-control-label">Country</Form.Label>
  <Form.Control as="select" className="account-settings-country " defaultValue="Vietnam">
    <option value="Vietnam">Việt Nam</option>
    <option value="Canada">Canada</option>
    <option value="South Korea">Hàn Quốc</option>
    <option value="Japan">Nhật Bản</option>
    <option value="Germany">Đức</option>
    <option value="France">Pháp</option>
  </Form.Control>
</Form.Group>

                <Button variant="primary" type="submit" className="account-settings-save-button">Save Changes</Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="change-password" active={key === 'change-password'} className="account-settings-change-password">
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Current Password</Form.Label>
                  <Form.Control type="password" className="account-settings-current-password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">New Password</Form.Label>
                  <Form.Control type="password" className="account-settings-new-password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="account-settings-form-control-label">Confirm New Password</Form.Label>
                  <Form.Control type="password" className="account-settings-confirm-password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="account-settings-change-password-button">Change Password</Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AccountSettings;
