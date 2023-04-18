import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import BasicList from "./pages/BasicList";
import Navigation, { navLinks } from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={navLinks[0].pathname} exact component={Homepage} />
        <Route path={navLinks[1].pathname} component={BasicList} />
      </Switch>
    </>
  );
}

export default App;
