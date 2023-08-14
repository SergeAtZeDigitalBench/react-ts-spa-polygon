import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import RenderPropsPage from "./pages/RenderPropsPage";
import HocPage from "./pages/HocPage";
import CustomHookPage from "./pages/CustomHookPage";
import Navigation from "./components/Navigation";
import { navLinks } from "./constants";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path={navLinks[0].pathname} exact component={Homepage} />
        <Route path={navLinks[1].pathname} component={HocPage} />
        <Route path={navLinks[2].pathname} component={RenderPropsPage} />
        <Route path={navLinks[3].pathname} component={CustomHookPage} />
      </Switch>
    </div>
  );
}

export default App;
