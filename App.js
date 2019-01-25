import React, { Component } from 'react';
import {Root} from "./components/Root"
import {Done} from "./components/done"
import {Active} from "./components/active"
import {All} from "./components/All"
import { createSwitchNavigator, createAppContainer } from "react-navigation"

export default class App extends Component {
  render() {
    return (
    <Nna/>
    )
  }
}
// class Root extends React.Component{
//   render(){
//     return(
//       <Text>Rohit</Text>
//     )
//   }
// }
const Nn = createSwitchNavigator({
  Home:  Root ,
  Done:Done,
  Active:Active,
  All:All
 
});

const Nna = createAppContainer(Nn)