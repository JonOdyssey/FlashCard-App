import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [deck, setDeck] = useState("");
  const { deckId, cardId } = useParams();

  const history = useHistory();

  const handleFrontChange = (event) => setCardFront(event.target.value);
  const handleBackChange = (event) => setCardBack(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      front: cardFront,
      back: cardBack,
      deckId: Number(deckId),
      id: Number(cardId),
    };
    createCard(deckId, newCard);

    const loadDeck = async () => setDeck(await readDeck(deckId));
    loadDeck();
    history.push(`/decks/${deckId}`);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      setDeck(await readDeck(deckId, abortController.signal));
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId, history]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">
              <span class="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item text-primary">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        onSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
      />
    </>
  );
}

export default AddCard;
