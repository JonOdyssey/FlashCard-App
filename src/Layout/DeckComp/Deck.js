import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import DeckCardRender from "./DeckCardRender";
import { PropTypes } from "prop-types";

function Deck({ updateListRenderAfterDelete }) {
  const [deck, setDeck] = useState({});
  const [cardCountPerDeck, setCardCountPerDeck] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    const deleteScreen = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (deleteScreen) {
      await deleteDeck(deck.id);
      updateListRenderAfterDelete(1);
      history.push("/");
    }
  };

  const updateCardCount = (count) => {
    setCardCountPerDeck(() => cardCountPerDeck + count);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const deckAtId = await readDeck(deckId, abortController.signal);
      setDeck(() => deckAtId);
    };
    loadDeck();
    return () => abortController.abort();
  }, [cardCountPerDeck, deckId]);

  if (deck.id) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-primary">
              <Link to="/">
                <span class="oi oi-home" />
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`/decks/${deck.id}/edit`}>
              <button className="btn btn-secondary">
                <span class="oi oi-pencil" /> Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary mx-2">
                <span class="oi oi-book" /> Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button className="btn btn-secondary">
                <span class="oi oi-plus" /> Add Cards
              </button>
            </Link>
          </div>
          <button className="btn btn-danger" onClick={handleDelete}>
            <span class="oi oi-trash" />
          </button>
        </div>
        <h2>Cards</h2>
        <div>
          {deck.cards.map((card) => (
            <DeckCardRender
              key={card.id}
              id={card.id}
              front={card.front}
              back={card.back}
              updateCardCount={updateCardCount}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <p> Loading ... </p>;
  }
}

Deck.propTypes = {
  updateListRenderAfterDelete: PropTypes.func,
};

export default Deck;
