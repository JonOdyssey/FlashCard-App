import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./HomeComp/Home";
import Study from "./StudyComp/Study";
import CreateNewDeck from "./DeckComp/CreateNewDeck";
import EditDeck from "./DeckComp/EditDeck";
import Deck from "./DeckComp/Deck";
import EditCard from "./CardComp/EditCard";
import AddCard from "./CardComp/AddCard";
 
function Layout() {
  const [deckList, setDeckList] = useState(0);
  const updateListRenderAfterDelete = (value) => {
    setDeckList(() => deckList + value);
  }

  return ( 
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact={true}> 
            <Home deckList={deckList} updateListRenderAfterDelete={updateListRenderAfterDelete}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateNewDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <Deck updateListRenderAfterDelete={updateListRenderAfterDelete} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
