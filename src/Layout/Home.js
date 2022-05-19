import React, { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import CreateDeckList from "./CreateDeckList";
import { Link } from "react-router-dom";
import CreateDeck from "./CreateDeck";

const createHandler = (event) => {
  <CreateDeck />;
};

function Home() {
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

  const deleteHandler = async (event) => {
    const confirm = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirm) {
      const ac = new AbortController();
      const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
      await deleteDeck(id, ac.signal);
      window.location.reload();
    }
  };

  return (
    <div>
      <Link to="/decks/new">
        <button className="row btn btn-secondary my-3" onClick={createHandler}>
          <i class="bi bi-suit-heart-fill"> </i>
          Create Deck
        </button>
      </Link>
      <CreateDeckList decks={decks} deleteHandler={deleteHandler} />
    </div>
  );
}

export default Home;
