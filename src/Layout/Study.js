import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [flip, setFlip] = useState(true);
  const [next, setNext] = useState(false);
  const [cardId, setCardId] = useState(1);
  const history = useHistory();

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

  const flipHandler = (event) => {
    setFlip(!flip);
    setNext(true);
  };
  let cardText = "";
  if (deck.cards.length > 0) {
    cardText = flip
      ? deck.cards[cardId - 1].front
      : deck.cards[cardId - 1].back;
  }

  const nextHandler = (event) => {
    if (cardId === deck.cards.length) {
      if (
        window.confirm("Restart cards? Click 'cancel' return to the home page.")
      ) {
        setCardId(1);
        setFlip(true);
        setNext(false);
      } else {
        history.push("/");
      }
    } else {
      setCardId((cardId) => cardId + 1);
      setFlip(true);
      setNext(false);
    }
  };

  if (deck.cards.length > 2) {
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
                Study
              </li>
            </ol>
          </nav>
        </div>

        <div>
          <h1>Study: {deck.name}</h1>
        </div>

        <div className="card" style={{ width: "44rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              Card {cardId} of {deck.cards ? deck.cards.length : 0}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {flip ? "Front" : "Back"}
            </h6>
            <p className="card-text">{cardText}</p>
            <button className="btn btn-secondary mr-3" onClick={flipHandler}>
              <i class="bi bi-reply-fill"> </i>
              Flip!
            </button>
            {next && (
              <button className="btn btn-primary " onClick={nextHandler}>
                <i class="bi bi-skip-forward-fill"> </i>
                Next!
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
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
                Study
              </li>
            </ol>
          </nav>
        </div>

        <div>
          <h1>Study: {deck.name}</h1>
        </div>

        <div className="card" style={{ width: "44rem" }}>
          <div className="card-body">
            <h5 className="card-title">Not enough cards</h5>
            <p className="card-text">
              Are you really trying to study this deck right now? Unbelievable.
              I absolutely CANNOT believe you tried to study a deck with fewer
              than 3 cards. You NEED to have at least 3 cards!! There are{" "}
              {deck.cards.length} cards in this deck!
            </p>
            <Link to="/">
              <button className="btn btn-primary">
                <i class="bi bi-suit-heart-fill"> </i>
                Add Cards
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
