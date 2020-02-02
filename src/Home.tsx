import React from 'react';
import {
  Redirect
} from "react-router-dom";

interface IHomeProps {
  loaded?: boolean;
  user?: any;
}

interface IHomeStates {

}

export default class Home extends React.Component<IHomeProps, IHomeStates> {
  constructor() {
    super({});
  }

  loadingText = () => {
    return (<h1>Loading...</h1>);
  }

  redirectToGoals = () => {
    return (
      <Redirect
        to={{
          pathname: "/goals"
        }}
      />
    );
  }

  redirectToLogin = () => {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }

  render() {
    // if (!this.props.loaded) {
    //   return this.loadingText();
    // } else
    if (this.props.user && this.props.user.displayName) {
      return this.redirectToGoals();
    } else {
      return this.redirectToLogin();
    }
  }
}

// export default function Home(props) {

//   console.log("home");
//   console.log(props);

//     return (
//         <div>
//         {!props.loaded ?
//             (<h1>Loading...</h1>) :
//           props.user ? (
//             <Redirect
//             to={{
//               pathname: "/goals"
//             }}
//           />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login"
//             }}
//           />

//         )
//         }
//           </div>
//     )
// }