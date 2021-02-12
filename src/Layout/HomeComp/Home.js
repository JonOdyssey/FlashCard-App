import React, { useEffect, useState } from "react";
import DeckListRender from "./DeckListRender";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api/index";
import { PropTypes } from "prop-types";

function Home({ deckList, updateListRenderAfterDelete }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadDecks = async () => {
      const deck = await listDecks(abortController.signal);
      setDecks(() => deck);
    };
    loadDecks();
    return () => abortController.abort();
  }, [deckList]);

  return (
    <div>
      <Link to="/decks/new">
        <button className="btn btn-secondary btn-lg mb-3">
          <span class="oi oi-plus" /> Create Deck
        </button>
      </Link>
      {decks.map(({ id, name, description, cards }) => (
        <DeckListRender
          key={id}
          id={id}
          description={description}
          cards={cards}
          name={name}
          updateListRenderAfterDelete={updateListRenderAfterDelete}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  deckList: PropTypes.number,
  updateListRenderAfterDelete: PropTypes.func,
};

export default Home;
