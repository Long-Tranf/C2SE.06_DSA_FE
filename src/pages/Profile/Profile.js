<<<<<<< HEAD
import Header from '~/components/Layout/components/Header/header';
import Footer from '~/components/Layout/components/Footer/footer';
import './Profile.css';
=======
>>>>>>> 681dbe6438b5f56965659863d63e4389d3fb35f6
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Tab, Form, Button, Image } from 'react-bootstrap';
import './Profile.css';
import Header from '~/components/Layout/components/Header/header';

<<<<<<< HEAD
function Profile() {
    const [activeTab, setActiveTab] = useState('#account-general');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        <div className="wrapper">
            <Header />
            <div class="container light-style flex-grow-1 container-p-y mt-200">
                <h4 class="font-weight-bold py-3 mb-4">Account settings</h4>
                <div class="card overflow-hidden">
                    <div class="row no-gutters row-bordered row-border-light">
                        <div class="col-md-3 pt-0">
                            <div class="list-group list-group-flush account-settings-links">
                                <a
                                    className={`list-group-item list-group-item-action ${
                                        activeTab === '#account-general'
                                            ? 'active'
                                            : ''
                                    }`}
                                    data-toggle="list"
                                    href="#account-general"
                                    onClick={() =>
                                        handleTabChange('#account-general')
                                    }
                                >
                                    General
                                </a>
                                <a
                                    className={`list-group-item list-group-item-action ${
                                        activeTab === '#account-change-password'
                                            ? 'active'
                                            : ''
                                    }`}
                                    data-toggle="list"
                                    href="#account-change-password"
                                    onClick={() =>
                                        handleTabChange(
                                            '#account-change-password',
                                        )
                                    }
                                >
                                    Change password
                                </a>
                                <a
                                    className={`list-group-item list-group-item-action ${
                                        activeTab === '#account-info'
                                            ? 'active'
                                            : ''
                                    }`}
                                    data-toggle="list"
                                    href="#account-info"
                                    onClick={() =>
                                        handleTabChange('#account-info')
                                    }
                                >
                                    Info
                                </a>
                                <a
                                    className={`list-group-item list-group-item-action ${
                                        activeTab === '#account-notifications'
                                            ? 'active'
                                            : ''
                                    }`}
                                    data-toggle="list"
                                    href="#account-notifications"
                                    onClick={() =>
                                        handleTabChange(
                                            '#account-notifications',
                                        )
                                    }
                                >
                                    Notifications
                                </a>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="tab-content">
                                <div
                                    class={`tab-pane fade ${
                                        activeTab === '#account-general'
                                            ? 'show active'
                                            : ''
                                    }`}
                                    id="#account-general"
                                >
                                    <div class="card-body media align-items-center">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            alt
                                            class="d-block ui-w-80"
                                        ></img>
                                        <div class="media-body ml-4">
                                            <label class="btn btn-outline-primary">
                                                Upload new photo
                                                <input
                                                    type="file"
                                                    class="account-settings-fileinput"
                                                ></input>
                                            </label>{' '}
                                            &nbsp;
                                            <button
                                                type="button"
                                                class="btn btn-default md-btn-flat"
                                            >
                                                Reset
                                            </button>
                                            <div class="text-light small mt-1">
                                                Allowed JPG, GIF or PNG. Max
                                                size of 800K
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="border-light m-0"></hr>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="form-label">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control mb-1"
                                                value=""
                                            ></input>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value=""
                                            ></input>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                E-mail
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control mb-1"
                                                value=""
                                            ></input>
                                            <div class="alert alert-warning mt-3">
                                                Your email is not confirmed.
                                                Please check your inbox.
                                                <br></br>
                                                <a href="javascript:void(0)">
                                                    Resend confirmation
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class={`tab-pane fade ${
                                        activeTab === '#account-change-password'
                                            ? 'show active'
                                            : ''
                                    }`}
                                    id="account-change-password"
                                >
                                    <div class="card-body pb-2">
                                        <div class="form-group">
                                            <label class="form-label">
                                                Current password
                                            </label>
                                            <input
                                                type="password"
                                                class="form-control"
                                            ></input>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                New password
                                            </label>
                                            <input
                                                type="password"
                                                class="form-control"
                                            ></input>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                Repeat new password
                                            </label>
                                            <input
                                                type="password"
                                                class="form-control"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class={`tab-pane fade ${
                                        activeTab === '#account-info'
                                            ? 'show active'
                                            : ''
                                    }`}
                                    id="account-info"
                                >
                                    <div class="card-body pb-2">
                                        <div class="form-group">
                                            <label class="form-label">
                                                Bio
                                            </label>
                                            <textarea
                                                class="form-control"
                                                rows="5"
                                            >
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Mauris nunc arcu, dignissim sit
                                                amet sollicitudin iaculis,
                                                vehicula id urna. Sed luctus
                                                urna nunc. Donec fermentum,
                                                magna sit amet rutrum pretium,
                                                turpis dolor molestie diam, ut
                                                lacinia diam risus eleifend
                                                sapien. Curabitur ac nibh nulla.
                                                Maecenas nec augue placerat,
                                                viverra tellus non, pulvinar
                                                risus.
                                            </textarea>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                Birthday
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value="Jan 1, 2001"
                                            ></input>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">
                                                Country
                                            </label>
                                            <select class="custom-select">
                                                <option>USA</option>
                                                <option selected>Canada</option>
                                                <option>UK</option>
                                                <option>Germany</option>
                                                <option>France</option>
                                                <option selected>
                                                    Vietnam
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr class="border-light m-0"></hr>
                                    <div class="card-body pb-2">
                                        <h6 class="mb-4">Contacts</h6>
                                        <div class="form-group">
                                            <label class="form-label">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value="(+84)"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class={`tab-pane fade ${
                                        activeTab === '#account-notifications'
                                            ? 'show active'
                                            : ''
                                    }`}
                                    id="account-notifications"
                                >
                                    <div class="card-body pb-2">
                                        <h6 class="mb-4">Activity</h6>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                    checked
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    Email me when someone
                                                    comments on my article
                                                </span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                    checked
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    Email me when someone
                                                    answers on my forum thread
                                                </span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    Email me when someone
                                                    follows me
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr class="border-light m-0"></hr>
                                    <div class="card-body pb-2">
                                        <h6 class="mb-4">Application</h6>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                    checked
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    News and announcements
                                                </span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    Weekly product updates
                                                </span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label class="switcher">
                                                <input
                                                    type="checkbox"
                                                    class="switcher-input"
                                                    checked
                                                ></input>
                                                <span class="switcher-indicator">
                                                    <span class="switcher-yes"></span>
                                                    <span class="switcher-no"></span>
                                                </span>
                                                <span class="switcher-label">
                                                    Weekly blog digest
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-right mt-3">
                    <button type="button" class="btn btn-primary">
                        Save changes
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-default">
                        Cancel
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Profile;
=======

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
>>>>>>> 681dbe6438b5f56965659863d63e4389d3fb35f6
