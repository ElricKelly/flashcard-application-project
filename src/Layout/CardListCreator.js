import React from "react";
import { useParams, Link } from "react-router-dom";

function CardListCreator({ deck, deleteCardHandler }) {
  const { deckId } = useParams();

  return deck.cards.map((card) => {
    return (
      <div
        key={card.id}
        id={card.id}
        className="card"
        style={{ width: "18 rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{card.front}</h5>
          <h5 className="card-title mb-2 text-secondary">{card.back}</h5>
          <div className="d-flex justify-content-between">
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button className="btn btn-secondary">
                <i class="bi bi-wrench-adjustable"> </i>
                Edit
              </button>
            </Link>
            <button className="btn btn-danger" onClick={deleteCardHandler}>
              <i class="bi bi-trash3-fill"> </i>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default CardListCreator;
