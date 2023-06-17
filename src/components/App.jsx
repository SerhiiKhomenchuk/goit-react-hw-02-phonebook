import { nanoid } from 'nanoid';
import React, { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    // contacts: [],
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contactObj = { name, number, id: nanoid() };
    const isNameMatched = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameMatched) {
      alert(`${name} is already in contacts `);
    } else {
      return this.setState(prevState => ({
        contacts: [contactObj, ...prevState.contacts],
      }));
    }
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
