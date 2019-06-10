import React, { Component, createContext } from "react";

import { AppProvider, Card, ResourceList } from "@shopify/polaris";
import "@shopify/polaris/styles.css";

import ToggableDate from "../imports/ui/components/ToggableDate";

const Context = createContext({});

export const Provider = Context.Provider;
const Consumer = Context.Consumer;

class App extends Component {
  state = {
    loading: true,
    dates: []
  };

  componentDidMount() {
    fetch(Meteor.settings.public.api.BASE_URL + "/dates")
      .then(response => response.json())
      .then(data => this.setState({ dates: data }));
    this.toggleLoading();
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  onDelete = id => console.log("delete id " + id);

  render() {
    const { loading, dates } = this.state;
    if (loading) return <h1>Loading</h1>;
    return (
      <Provider value={{ dates }}>
        <AppProvider>
          <Card>
            <Consumer>
              {context => {
                const { dates } = context;
                return (
                  <ResourceList
                    resourceName={{ singular: "customer", plural: "customers" }}
                    items={dates}
                    renderItem={item => {
                      return (
                        <ResourceList.Item
                          id={item.id}
                          accessibilityLabel={`View details for ${item.id}`}
                        >
                          <ToggableDate item={item} />
                        </ResourceList.Item>
                      );
                    }}
                  />
                );
              }}
            </Consumer>
          </Card>
        </AppProvider>
      </Provider>
    );
  }
}

export default App;
