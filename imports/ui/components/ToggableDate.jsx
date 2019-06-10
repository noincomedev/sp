import React, { Component, Fragment } from "react";

import Settings from "./DateSettings";
import Date from "./DateItem";

class ToggableDateForm extends Component {
  state = {
    showForm: false
  };

  toggleForm = () => this.setState({ showForm: !this.state.showForm });

  render() {
    const { showForm } = this.state;
    const { item } = this.props;
    return (
      <Fragment>
        {showForm ? (
          <Settings toggleForm={this.toggleForm} {...item} />
        ) : (
          <Date handleToggle={this.toggleForm} {...item} />
        )}
      </Fragment>
    );
  }
}

export default ToggableDateForm;
