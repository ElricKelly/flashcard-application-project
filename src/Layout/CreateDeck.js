import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [decks, setDecks] = useState([]);

  // makes an API call to get the current list of decks when the page initially loads 
  useEffect(() => {
    const abortController = new AbortController();
    async function returnDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    }
    returnDecks();
    return () => abortController.abort();
  }, []);

  const lastElement = decks[decks.length - 1];

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ac = new AbortController();
    createDeck(formData, ac.signal);
    history.push(`/decks/${lastElement.id + 1}`);
    window.location.reload();
  };

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>

      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            id="deckDescription"
            placeholder="Brief description of the deck"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary mr-2">
            <i class="bi bi-x-circle-fill"> </i>
            Cancel
          </button>
        </Link>
        <button className="btn btn-primary">
          <i class="bi bi-stars"> </i>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
