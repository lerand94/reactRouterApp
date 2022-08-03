import { Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Redirect from "react-router-dom/es/Redirect";

function App() {
  return (
    <div>
      <div>
        <MainHeader />
        <main>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/welcome" />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/products/:productId">
              <ProductDetail />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
