import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

function AddCard() {
  const initialState = {
    front: "",
    back: "",
  };
  const [cardData, setCardData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  const handleChange = (event) => {
    setCardData({
      ...cardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, cardData);
    setCardData(initialState);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const deckAtId = await readDeck(deckId, abortController.signal);
      setDeck(() => deckAtId);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            <h3>Front</h3>
          </label>
          <textarea
            name="front"
            className="form-control"
            value={cardData.front}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">
            <h3>Back</h3>
          </label>
          <textarea
            name="back"
            className="form-control"
            value={cardData.back}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-2">Done</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default AddCard;
