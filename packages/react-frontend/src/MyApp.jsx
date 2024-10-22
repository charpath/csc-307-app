// src/MyApp.jsx
import React, { useState , useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function deleteUser(person) {
    const promise = fetch("http://localhost:8000/users/" + person["_id"], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  function removeOneCharacter(row, index) {
    deleteUser(row)
    .then((res) => {if (res.status == 204) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      })
      setCharacters(updated);}})
    .catch((error) => {
      console.log(error);
    });
    /*
    */
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  function updateList(person) {
  postUser(person)
    .then((res) => {if (res.status == 201) return res.json()})
    .then((json) => {console.log(json); setCharacters([...characters, json])})
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
      
    </div>
  );
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

export default MyApp