import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard } from "../../utils/api/index";

function CardForm({ onSubmit, handleFrontChange, handleBackChange }) {
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({});

  useEffect(() => {
    if (cardId) {
      const loadCard = async () => setCard(await readCard(cardId));
      loadCard();
    }
  }, [cardId, deckId]);

  return (
    <>
      <form className="row" onSubmit={onSubmit}>
        <div className="form-group w-100">
          <label className="font-weight-bold" htmlFor="deck-description">
            Front
          </label>
          <textarea
            type="text"
            required={true}
            className="form-control"
            onChange={handleFrontChange}
            defaultValue={card.front ? card.front : ""}
            placeholder={"Front side of card"}
          />
        </div>
        <div className="form-group w-100">
          <label className="font-weight-bold" htmlFor="deck-description">
            Back
          </label>
          <textarea
            type="text"
            required={true}
            className="form-control"
            onChange={handleBackChange}
            defaultValue={card.back ? card.back : ""}
            placeholder={"Back side of card"}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary mr-2">Done</button>
        </Link>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default CardForm;
