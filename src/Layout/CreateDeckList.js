import React from "react";
import { Link } from "react-router-dom";

function CreateDeckList({ decks, deleteHandler}) {
  return decks.map((deck, index) => {
    return (
      <div
        id={deck.id}
        key={index}
        className="row card"
        style={{ width: "44rem" }}
      >
        <div className="card-body">
          <div className="row">
            <h5 className="col-10 card-title">{deck.name}</h5>
            <h6 className="col-2 card-subtitle text-muted mt-1">
              {`${deck.cards.length} cards`}
            </h6>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="row justify-content-between mt-4">
            <div>
              <Link to={`/decks/${deck.id}`}>
                <button className="btn btn-primary mx-3">
                  <i class="bi bi-camera"> </i>
                  View
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-secondary mx-3">
                  <i class="bi bi-book"> </i>
                  Study
                </button>
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger mx-3"
                onClick={deleteHandler}
              >
                <i class="bi bi-heartbreak"> </i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default CreateDeckList;
