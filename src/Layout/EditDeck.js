import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState(null);
  const history = useHistory();

  // sets state of deck to be the desired deck whenever the deckId changes
  useEffect(() => {
    const abortController = new AbortController();
    async function displayDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setFormData(response);
      } catch (error) {
        console.log(error);
      }
    }
    displayDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ac = new AbortController();
    updateDeck(formData, ac.signal);
    history.push(`/decks/${deck.id}`);
  };

  if (!formData) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>

      <h1>Edit Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            name="name"
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
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary mr-2">
            <i class="bi bi-x-circle-fill"> </i>Cancel
          </button>
        </Link>
        <button className="btn btn-primary">
          <i class="bi bi-stars"> </i>Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
