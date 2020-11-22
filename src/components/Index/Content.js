import React from "react";
import FontAwesome from 'react-fontawesome';
 const Content = ()=> (
  <div>

  <section className="features">
    <div className="container">
      <div className="section-heading text-center">
        <h2>What can you do with event manager?</h2>
        <h3> It's so simple ! </h3>
        <hr />
      </div>
      <div className="row">
        <div className="col-lg-4 my-auto">
                <div className="screen">
                  <img src={require("../images/calendarWithPen.jpg")} className="img-fluid" alt="pen with calendar" />
                </div>
                <div className="button">
          </div>
        </div>
        <div className="col-lg-8 my-auto">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                <FontAwesome className="mb-3" name="check-square" size="4x"/>
                  <h3>Make it</h3>
                  <p className="text-muted">Simply prepare your card with images according to event.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                <FontAwesome className="mb-3" name="address-card" size="4x"/>
                  <h3>Add it</h3>
                  <p className="text-muted"> Add a well-wishing message in an email text. </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                  <FontAwesome className="mb-3" name="save" size="4x"/>
                  <h3>Save it</h3>
                  <p className="text-muted">Save your event messages with your selected images with specific date and time.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                <FontAwesome className="mb-3" name="send" size="4x"/>
                  <h3>Send it</h3>
                  <p className="text-muted">Saved events will be delivered automatically at scheduled time via E-mail. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="cta">
        <div className="cta-content">
          <div className="container">
            <h2>Stop forgetting.<br />Start managing.</h2>
            <a href="/register" className="btn btn-outline btn-xl js-scroll-trigger">Let's Get Started!</a>
          </div>
        </div>
        <div className="overlay" />
      </section>
        </div> 
);
 export default Content; 