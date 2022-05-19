import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  // sets state of deck to be the desired deck whenever the deckId changes
  useEffect(() => {
    const abortController = new AbortController();
    async function displayDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
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
    createCard(deckId, formData, ac.signal);
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>

      <h2>{deck.name}: Add Card</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            name="front"
            placeholder="Front Side of Card"
            onChange={handleChange}
            value={formData.front}
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            type="text"
            className="form-control"
            id="back"
            placeholder="Back Side of Card"
            name="back"
            onChange={handleChange}
            value={formData.deckDescription}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary mr-2">
            <i class="bi bi-x-circle-fill"> </i>
            Cancel
          </button>
        </Link>
        <button className="btn btn-primary">
          <i class="bi bi-stars"> </i>
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
