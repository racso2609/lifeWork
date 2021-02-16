import React, {Component} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';


import Navigation from "./Navbar"
import Raison from "./Raison"
import {fetchRaisons, postRaison, deleteRaisons, deleteRaison} from "../redux/ActionCreate"
import Detail from './Details';
import Home from './Home';
import RenderAlert from "./Alert"
import Footer from './Footer';
import Loading from './loading';


const mapDispatchToProps = (dispatch) => ({
  fetchRaisons: () => {dispatch(fetchRaisons())},
  postRaison: (title, img, raison) => {dispatch(postRaison(title, img, raison))},
  deleteRaisons: () => {dispatch(deleteRaisons())},
  deleteRaison: (id) => {dispatch(deleteRaison(id))}
});

const mapStateToProps = state => {
  return {
    raisons: state.raisons
  }
}


class Main extends Component {


  componentDidMount() {

    this.props.fetchRaisons();


  }

  render() {

    const RenderRaison = () => {
      return (
        <Raison
          raisons={this.props.raisons}
          postRaison={this.props.postRaison}
          deleteRaisons={this.props.deleteRaisons}
        />
      );
    };

    const RenderDetails = ({match}) => {

      const reasonWithId = this.props.raisons.raisons.filter((raison) => raison._id === match.params.reasonId)[0];
      if (reasonWithId) {
        return (
          <Detail
            raison={reasonWithId}
            deleteRaison={this.props.deleteRaison}
          />
        );
      } else {
        return (
          <div className="mb-5">

            <Loading />
          </div>
        )
      }

    }
    const HomePage = () => {
      return (
        <Home raisons={this.props.raisons} />
      );
    }
    return (
      <div>
        <Navigation />
        <RenderAlert adding={this.props.raisons.errMess} />

        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/razones" component={RenderRaison} />
          <Route path="/razones/:reasonId" component={RenderDetails} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
