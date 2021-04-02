import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from "./components/main";
import Header from "./components/header";
import Profile from "./components/profile";
import Registration from "./components/registration";
import NewRecipe from "./components/newRecipe";
import SingleRecipe from "./components/singleRecipe";
import Category from "./components/category";
import About from "./components/about";
import Footer from "./components/footer";
import NotFoundPage from "./components/404";
import './utility/css/App.css';

class App extends Component {
  state = { user_info: '' }

  componentWillMount() {
    var logged = localStorage.getItem('token');
    this.setState({ user_info: logged });
    console.log(this.state.user_info)
  }

  render() {
    var info = this.state.user_info;
    var user = JSON.parse(info);
    // console.log(user)

    return (
      <div className="App">

        <header id="header">
          <Header user={user} />
        </header>

        <main id="main">
          <Switch >
            <Route path="/" exact render={() => <Main user={user} />} />
            <Route path="/registration" component={Registration} />
            <Route path="/profile" render={() => <Profile user={user} />} />
            <Route path="/newRecipe" render={() => <NewRecipe user={user} />} />
            <Route path="/singleRecipe" component={SingleRecipe} />
            <Route path="/category" component={Category} />
            <Route path="/about" component={About} />
            <Route path="/404" component={NotFoundPage} />
          </Switch>
        </main>

        <footer id="footer">
          <Footer />
        </footer>

      </div>
    );
  }
}

export default App;
