import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index";

function EditCard() {
  const initialState = {
    front: "",
    back: "",
  };
  const [cardData, setCardData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const handleChange = (event) => {
    setCardData({
      ...cardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(cardData);
    history.push(`/decks/${deckId}`);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const deckAtId = await readDeck(deckId, abortController.signal);
      const cardAtId = await readCard(cardId);
      setDeck(() => deckAtId);
      setCard(() => cardAtId);
      setCardData({
        id: cardId,
        front: cardAtId.front,
        back: cardAtId.back,
        deckId: Number(deckId),
      });
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

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
            <button className="btn btn-secondary mr-2">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCard;
