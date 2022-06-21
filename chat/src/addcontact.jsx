import React from "react";

class AddContact extends React.Component {
  state = { name: "", email: "" }
  add = (e) => {
    e.preventDefault();
    if (this.state.name == "" || this.state.email == "") {
      alert("Enter both the fiels")
      return;
    }
    this.props.addContactHandler(this.state);
    console.log(this.props);
      this.setState({name:"",email:""});
        window.location.href = "/contact"
  }
  render() {
    return (
      <>
        <h1>AddContact</h1>
        <form className="ui form" >
          <div className="field">
            <label> Name :  </label>
            <input type="text"
              placeholder="enter your name "
              name="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            ></input></div>
          <div>
            <label> Email :  </label>
            <input type="Email" placeholder="enter your Mail " name="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            ></input>
          </div>
          <button className="ui button blue" onClick={this.add} >Add</button>
        </form>
      </>
    )
  }
}
export default AddContact;


