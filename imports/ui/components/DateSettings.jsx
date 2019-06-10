import React, { Component, Fragment } from "react";

import { Button, Card, DatePicker, DisplayText, Modal } from "@shopify/polaris";

class DateForm extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    this.state = {
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth(),
      selected: new Date(date),
      showModal: false,
      loading: false,
      action: ""
    };
  }

  handleChange = value => this.setState({ selected: value });

  handleMonthChange = (month, year) => this.setState({ month, year });

  toggleModal = action => {
    this.setState({ showModal: !this.state.showModal, action });
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  updateDate = () => {
    const { id } = this.props.date;
    const { toggleLoading, toggleModal } = this;
    this.toggleLoading();
    fetch(Meteor.settings.public.api.BASE_URL + `/date/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      toggleLoading();
      toggleModal();
    });
  };

  removeDate = () => {
    const { date } = this.props;
    const { toggleLoading, toggleModal } = this;
    this.toggleLoading();
    fetch(Meteor.settings.public.api.BASE_URL + `/date/${date.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      toggleLoading();
      toggleModal();
    });
  };

  render() {
    const { date, toggleForm } = this.props;
    const { year, month, selected, showModal, loading, action } = this.state;
    return (
      <Fragment>
        <div className="container justify-space-between align-items-center">
          <DisplayText size="medium">{date}</DisplayText>
          <div>
            <Button
              destructive
              onClick={event => {
                this.toggleModal("remove");
              }}
            >
              Remove Date
            </Button>
            <Button
              onClick={event => {
                this.toggleModal("edit");
              }}
            >
              Change Date
            </Button>
            <Button onClick={toggleForm}>Cancel</Button>
          </div>
        </div>
        <Modal
          open={showModal}
          title={action == "edit" ? "Edit Date" : "Confirmation"}
          onClose={this.toggleModal}
          primaryAction={{
            content: loading
              ? "Loading..."
              : action == "remove"
              ? "Delete"
              : "Save",
            onAction: action == "edit" ? this.updateDate : this.removeDate,
            disabled: loading
          }}
        >
          <Modal.Section>
            {action == "remove" ? (
              <DisplayText size="medium">Are you sure?</DisplayText>
            ) : (
              <Card>
                <DatePicker
                  month={month}
                  year={year}
                  onChange={this.handleChange}
                  onMonthChange={this.handleMonthChange}
                  selected={selected}
                  weekStartsOn={1}
                />
              </Card>
            )}
          </Modal.Section>
        </Modal>
      </Fragment>
    );
  }
}

export default DateForm;
