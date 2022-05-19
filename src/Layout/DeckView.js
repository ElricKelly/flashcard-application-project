import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import CardListCreator from "./CardListCreator";

function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();

  const deleteDeckHandler = async (event) => {
    const confirm = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirm) {
      const ac = new AbortController();
      const deckId = deck.id;
      await deleteDeck(deckId, ac.signal);
      history.push("/");
    }
  };

  const deleteCardHandler = async (event) => {
    const confirm = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirm) {
      const ac = new AbortController();
      const cardId = event.target.parentNode.parentNode.parentNode.id;
      await deleteCard(cardId, ac.signal);
      window.location.reload();
    }
  };

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

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mb-4">
        <div className="row">
          <h2>{deck.name}</h2>
        </div>
        <div className="row">
          <p>{deck.description}</p>
        </div>

        <div className="row d-flex justify-content-between">
          <div>
            <Link to={`/decks/${deckId}/edit`}>
              <button className="btn btn-secondary mr-2">
                <i class="bi bi-wrench-adjustable"> </i>
                Edit
              </button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
              <button className="btn btn-primary mx-2">
                <i class="bi bi-book"> </i>
                Study
              </button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary mx-2">
                <i class="bi bi-suit-heart-fill"> </i>
                Add Cards
              </button>
            </Link>
          </div>
          <button className="btn btn-danger" onClick={deleteDeckHandler}>
            <i class="bi bi-trash3-fill"> </i>
            Delete
          </button>
        </div>
      </div>

      <h2>Cards</h2>
      <div className="mb-4">
        <CardListCreator deck={deck} deleteCardHandler={deleteCardHandler} />
      </div>
    </div>
  );
}

export default DeckView;
