import React, { Component } from 'react';

import { Container, Ul } from './App.styled';

import Title from './Title/Title';
import Form from './Form/Form';
import Contact from './Contact/Contact';
import Filter from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  addNewContact = (id, name, number) => {
    const isContactExist = this.state.contacts.some(contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    if (!isContactExist) {
      this.setState(prevState => {
        const newContactsObject = [{ id, name, number }, ...prevState.contacts];
        return { contacts: newContactsObject };
      });
    }
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  onActiveFilter = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      const filteredContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return {
        contacts: filteredContacts,
      };
    });
  };

  render() {
    return (
      <Container>
        <Title text="Phonebook"></Title>
        <Form onSubmit={this.addNewContact}>\</Form>
        <Title text="Contacts"></Title>
        <Filter text={this.state.filter} onChange={this.onFilterChange} />
        <Ul>
          <Contact
            contacts={
              this.state.filter === ''
                ? this.state.contacts
                : this.onActiveFilter()
            }
            deleteContact={this.deleteContact}
          />
        </Ul>
      </Container>
    );
  }
}
