import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateNewDeck() {
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deck = await createDeck(formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">
              <span class="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            placeholder="Name your deck"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            style={{ resize: "none" }}
            rows="5"
            className="form-control"
            value={formData.description}
            placeholder="Describe your deck"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <Link to="/">
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

export default CreateNewDeck;
