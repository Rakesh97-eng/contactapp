import { v4 as uuid } from 'uuid';
import Header from "./header";
import AddContact from "./addcontact";
import Contact from "./contactlist";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import api from "./api/contact"
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchvalue, setserachvalue] = useState("");
  const [searchresults, setSearchresults] = useState([]);

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(), ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
    alert("contacct will been deleted")
  };

  const get = async () => {
    const response = await api.get("/contacts")
    return response.data;

  }
  const searchhandler = (result) => {
    setserachvalue(result);
    if (searchvalue != "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchvalue.toLowerCase());
      })
      setSearchresults(newContactList)
    }

    else setSearchresults(contacts)
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const retriveContacts = async () => {
      const getcontact = await get();
      if (getcontact) setContacts(getcontact)
    }
    retriveContacts();
  }, []);

  useEffect(() => {
    console.log("conta", contacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));

  }, [contacts]);

  return (
    <div className="headcolor">
      <Header />
      <BrowserRouter>
        <Routes>

          <Route path='/add' element={< AddContact addContactHandler={addContactHandler} />} />
          <Route path='/Contact'
            element={
              <Contact
                contacts={searchvalue.length<1? contacts: searchresults}
                getContactId={removeContactHandler}
                term={searchvalue}
                searchkey={searchhandler}
              />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
