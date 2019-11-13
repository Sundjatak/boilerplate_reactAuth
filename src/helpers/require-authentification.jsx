import React  from 'react';
import { connect } from "react-redux";

export default function(Component){
  class RequireAuthentification extends Component  {

    UNSAFE_componentWillMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/");
        }
    }

    UNSAFE_componentWillUpdate(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/");
        }
    }
    render () {
        return this.props.isLoggedIn && <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      isLoggedIn : state.authentification.isLoggedIn
    };
  };

  return connect(mapStateToProps)(RequireAuthentification);
}
