import { nanoid } from 'nanoid';
import React, { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const isNameMatched = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameMatched) {
      alert(`${name} is already in contacts `);
      return;
    }

    const contactObj = { name, number, id: nanoid() };
    return this.setState(prevState => ({
      contacts: [contactObj, ...prevState.contacts],
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  dedeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  cleanFilter = () => {
    this.setState({ filter: '' });
  };

  render() {
    const { filter } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <>
        <div className="d-flex flex-column mb-3 p-5 container-sm">
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter
            value={filter}
            onChange={this.changeFilter}
            cleanFilter={this.cleanFilter}
          />
          <ContactList
            filter={filter}
            onChange={this.changeFilter}
            visibleContact={visibleContact}
            deleteContact={this.dedeleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
