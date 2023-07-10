import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import IframeDemo from "./pages/IframeDemo";
import IframeChild from "./pages/IframeChild";
import Navigation, { navLinks } from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path={navLinks[0].pathname} exact component={Homepage} />
        <Route path={navLinks[1].pathname} exact component={IframeDemo} />
        <Route path={navLinks[2].pathname} exact component={IframeChild} />
      </Switch>
    </div>
  );
}

export default App;
