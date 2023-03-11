import {useState} from "react";
import { GlobalStyle } from "./GlobalStyles";
import { Layout, MainTitle, Title } from "./Layout/Layout";
import ContactList from './ContactList'
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import useLocalStorage from "hooks/useLocalStorage";

const KEY = 'contacts';

const App = () => {

  const [contacts, setContacts] = useLocalStorage(KEY,[]);
  const [filter, setFilter] = useState("");

  // without useLocalStorage hook
  // const [contacts, setContacts] =useState(()=>{
  //   return JSON.parse(window.localStorage.getItem(KEY)) ?? []
  // });
  // const [filter, setFilter] =useState("");

  // useEffect(()=>{
  //   window.localStorage.setItem(KEY,JSON.stringify(contacts));
  // },[contacts]);
  
  const addContact = newContact=>{
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => [...prevState.filter(contact => contact.id !== contactId)]);
  };

  const filterContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();

    if(filter){
      return contacts.filter(contact => contact.name.toLowerCase().includes(lowerCaseFilter))
    } else {
      return contacts;
    }
  }
    
    return (
        <Layout>
          <MainTitle>Phonebook</MainTitle>
          <ContactForm  onSubmit={addContact} contacts={contacts}/>
      
          <Title>Contacts</Title>
          <Filter onChange={e => setFilter(e.target.value)} value={filter}/>
           <ContactList contacts ={filterContacts()} deleteContact={deleteContact}>
           </ContactList>
        <GlobalStyle/>
        </Layout>
    );
  };

export default App; 

