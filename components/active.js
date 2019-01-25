import React from "react";
import { db } from "../firebase";
import styles from "./Styles-header"
import {Text,View,ScrollView} from "react-native"
import { Blob } from "./Blob"


export class Active extends React.Component {
  constructor() {
    super();
    this.state = {
      alll: [],
    }
    this.titleref = React.createRef()
    this.discref = React.createRef()
    
  }
  static navigationOptions = {
    title: 'Active ',
  };
  renderAll = () => {
    var Allrender = []
    var i = 1;
    db.collection("tasks").get().then(data => {
      console.log("start")
      data.docs.forEach(task => {
        
        if (task.data().status == "active") {
          console.log("aaa")
          Allrender.push(<Blob key={i} no={i} action={this.renderAll.bind(this)} title={task.data().title} disc={task.data().disc} status={task.data().status} />)
        }
        i++
      })
      this.setState({ alll: Allrender })
    })

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.header} >
          <Text onTouchStart= {() => { navigate("All") }}  style={styles.tabs}>ALL</Text>
          <Text onTouchStart= {() => { navigate("Done") }} style={styles.tabs} >DONE</Text>
          <Text onTouchStart= {() => { navigate("Active") }} style={{ ...styles.tabs, ...styles.selected }} >ACTIVE</Text>
        </View>
        <ScrollView>
        {this.state.alll}
        </ScrollView>
      </View>
    );
  }
  componentDidMount(){
    this.setState({ alll: [] })
    this.renderAll()
  }
}