import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index";
import CardForm from "./CardForm"

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);
  const { deckId, cardId } = useParams();
  const [changed, setChanged] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (changed) {
      const updatedCard = {
        front: cardFront,
        back: cardBack,
        deckId: Number(deckId),
        id: Number(cardId),
      };
      updateCard(updatedCard);
      setChanged((boolean) => (boolean = false));
    }
    history.push(`/decks/${deckId}`);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => setDeck(await readDeck(deckId));
    const loadCard = async () => setCard(await readCard(cardId));
    loadDeck();
    loadCard();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const [cardFront, setCardFront] = useState(card.front);
  const [cardBack, setCardBack] = useState(card.back);

  const handleFrontChange = (event) => {
    setCardFront(event.target.value);
    setChanged((boolean) => (boolean = true));
  };
  const handleBackChange = (event) => {
    setCardBack(event.target.value);
    setChanged((boolean) => (boolean = true));
  };

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
          <li className="breadcrumb-item text-primary">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {card.id}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        onSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
      />
    </>
  );
}

export default EditCard;
