import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import CartDetail from '../cart/CartDetail';
import NotFound from '../common/NotFound';
import Navi from '../navi/Navi';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';
import Dashboard from './Dashboard';

function App() {
    return (
        <Container>
            <Navi />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/product" component={Dashboard} />
                <Route
                    path="/saveproduct"
                    exact
                    component={AddOrUpdateProduct}
                />
                <Route
                    path="/saveproduct/:productId"
                    exact
                    component={AddOrUpdateProduct}
                />
                <Route path="/cart" component={CartDetail} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    );
}

export default App;
