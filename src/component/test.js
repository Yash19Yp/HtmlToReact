import React from "react";
import axios from "axios";

const carsoption = [
  { label: "Volvo", value: "volvo" },
  { label: "Saab", value: "saab" },
  { label: "Opel", value: "opel" },
];
const namesoptionApi = "Enter Your API here";

function form() {
  const [state, setState] = React.useState({
    fname: "",
    namesoption: [],
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const namescallApi = () => {
    axios
      .get(namesoptionApi)
      .then((res) => {
        const data = res?.data;
        this.setState({ namesoption: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    namescallApi();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={state.fname}
        name="fname"
      />
      <br />
      <label for="lname">Last name:</label>
      <br />
      <select
        type="select-one"
        onChange={handleChange}
        value={cars}
        name="cars"
      >
        {carsoption.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <select
        type="select-one"
        onChange={handleChange}
        value={names}
        name="cars"
      >
        {namesoption.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </form>
  );
}
export default form;
