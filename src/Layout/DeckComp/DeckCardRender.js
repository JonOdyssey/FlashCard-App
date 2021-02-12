import React from "react";
import { deleteCard } from "../../utils/api/index";
import { Link, useRouteMatch } from "react-router-dom";
import { PropTypes } from "prop-types";

function DeckCardRender({ front, back, id, updateCardCount }) {
  const { url } = useRouteMatch();
  const handleDelete = async () => {
    const deleteScreen = window.confirm(
      "Delete this card? \n \n You will not be able to recover it."
    );
    if (deleteScreen) {
      await deleteCard(id);
      updateCardCount(-1);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div>
            <p className="card-text">{front}</p>
            <p className="card-text">{back}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`${url}/cards/${id}/edit`}>
              <button className="btn btn-secondary">
                <span class="oi oi-pencil" /> Edit
              </button>
            </Link>
            <button className="btn btn-danger ml-2" onClick={handleDelete}>
              <span class="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

DeckCardRender.propTypes = {
  id: PropTypes.number,
  front: PropTypes.string,
  back: PropTypes.string,
  updateCardCount: PropTypes.func,
};

export default DeckCardRender;
