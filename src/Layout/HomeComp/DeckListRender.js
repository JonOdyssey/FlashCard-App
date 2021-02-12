import React from "react";
import { PropTypes } from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";

function DeckListRender({
  id,
  name,
  description,
  cards,
  updateListRenderAfterDelete,
}) {
  const history = useHistory();

  const handleDelete = async () => {
    const deleteThis = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (deleteThis) {
      await deleteDeck(id);
      updateListRenderAfterDelete(1);
      history.push("/");
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div>
          <h3 className="card-title">{name}</h3>
          <p>{cards.length} cards</p>
        </div>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`/decks/${id}`}>
              <button className="btn btn-secondary m-1">
                <span class="oi oi-eye" /> View
              </button>
            </Link>
            <Link to={`/decks/${id}/study`}>
              <button className="btn btn-primary">
                <span class="oi oi-book" /> Study
              </button>
            </Link>
          </div>
          <button className="btn btn-danger" onClick={handleDelete}>
            <span class="oi oi-trash" />
          </button>
        </div>
      </div>
    </div>
  );
}

DeckListRender.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  cards: PropTypes.array,
  updateListRenderAfterDelete: PropTypes.func,
};

export default DeckListRender;
