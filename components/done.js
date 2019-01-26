import React from "react";
import { db } from "../firebase";
import { View, ScrollView ,Text} from "react-native"
import styles from "./Styles-header"
import { Blob } from "./Blob"


export class Done extends React.Component {
  constructor() {
    super();
    this.state = {
      alll: [],
    }
    
  }
  renderAll = () => {
    this.setState({alll:(<Text style={{alignSelf:"center",margin:65}}>Loading Please Wait..</Text>)})
    var Allrender = []
    var i = 1;
    db.collection("tasks").get().then(data => {

      data.docs.forEach(task => {
        console.log("s")
        if (task.data().status == "done") {
          Allrender.push(<Blob key={i} no={i} action={this.renderAll.bind(this)} title={task.data().title} disc={task.data().disc} status={task.data().status} />)
        }
        i++
      })
      this.setState({ alll: Allrender })
    })

  }
  static navigationOptions = {
    title: 'Done',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View >
        <View style={styles.header} >
          <Text onTouchStart= {() => { navigate("All") }}  style={styles.tabs}>ALL</Text>
          <Text onTouchStart= {() => { navigate("Done") }}  style={{ ...styles.tabs, ...styles.selected }}>DONE</Text>
          <Text onTouchStart= {() => { navigate("Active") }}  style={styles.tabs}>ACTIVE</Text>
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