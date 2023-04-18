import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navigation, { navLinks } from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path={navLinks[0].pathname} exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
