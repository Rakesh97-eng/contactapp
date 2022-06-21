import { Link } from "react-router-dom"
import ContactCard from "./contactcard"
import { useRef } from "react";

const Contact = (props) => {
  const inputEl = useRef("")
  const call = (id) => {
    props.getContactId(id)
  }

  const getsearch = () =>{
    props.searchkey(inputEl.current.value);

  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={call}
        key={contact.id}
      />
    );
  });

  return (

    <>
      <h3 className="headcolor" >Contact List  
      <Link to = "/add">
        <button>
          AddContact
        </button>
        </Link>
        </h3>
        <input ref={inputEl} type="text"  placeholder = "Search contact" value={props.term} onChange={getsearch} />
      <div>


        {/* {props.contacts.map((contact) => {
          return (<div className="item">
            <div className="content" style={{ display: "flex" }}>
              <div> <div>{contact.name}</div>
                <div> {contact.email}</div></div>
              <div onClick={() => call(contact.id)}>
                <i className="trash alternate outline icon" ></i>
              </div>
            </div>
          </div>)
        })} */}
        <div className="ui celled list">{renderContactList.length >0?renderContactList:"no contacts"}</div>
       


      </div>

    </>
  )
}

export default Contact;


