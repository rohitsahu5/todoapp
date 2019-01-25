import React from "react";
import { db } from "../firebase";
import { Blob } from "./Blob"
import { View ,Text,ScrollView,TextInput} from "react-native"
import blobStyle from "./styles-blob"
import headerStyle from "./Styles-header"

export class All extends React.Component {
  constructor() {
    super();
    this.state = {
      alll: [],
      add: false,

    }
  
  
  }
  static navigationOptions = {
    title: 'All',
  };
  Addnewtask=()=> {
    var newtitle = this.state.title
    var newdisc = this.state.disc
    db.collection("tasks").get().then(data => {
      var no = data.docs.length
      db.collection("tasks").doc((no + 1).toString()).set({
        title: newtitle,
        disc: newdisc,
        status: "active"
      }).then(s => {
        this.renderAll()
        this.setState({
          add: false
        })
      })
    })
  }
  renderAll = () => {
    var Allrender = []
    var i = 1;
    db.collection("tasks").get().then(data => {
      data.docs.forEach(task => {
        Allrender.push(<Blob key={i} no={i++} action={this.renderAll.bind(this)} title={task.data().title} disc={task.data().disc} status={task.data().status} />)
      })
      this.setState({ alll: Allrender })
    })

  }
  changeTitle=(e)=>{
    this.setState({title:e})
  }
  changeDisc=(e)=>{
    this.setState({disc:e})
    
  }
addInner=()=>{
  
  var addInner = <View ></View>
  if (this.state.add == false) {
    addInner = (<Text style={styles.blobInnerButton} onPress ={() => {
      this.setState({
        add: true
      })
    }}>
      ADD A NEW TODO</Text>)
  }
  else {
    
    addInner = (<View >
      <TextInput onChangeText={this.changeTitle} style={styles.blobText} placeholder="Type Todo title"></TextInput>
      <TextInput multiline onChangeText={this.changeDisc} numberOfLines={2}  style={styles.blobTextArea} placeholder="Describe your Todo..."></TextInput>
      <View style={styles.blobBottom}>
        <Text style={{...styles.one,...{borderRightWidth:1}}} onPress={a => {
          this.setState({
            add: false
          })
        }}> CANCEL</Text>
        <Text style={styles.one} onPress={() => this.Addnewtask()}>SAVE</Text>
      </View>
    </View>)
    
  }
  return addInner
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        
        <View style={styles.header} >
      <Text onTouchStart= {() => { navigate("All") }} style={{ ...styles.tabs, ...styles.selected }}>ALL</Text>
      <Text onTouchStart= {() => { navigate("Done") }} style={styles.tabs} >DONE</Text>
      <Text onTouchStart= {() => { navigate("Active") }} style={styles.tabs}  >ACTIVE</Text>
    </View>
    <ScrollView>

        {this.state.alll}

        <View style={styles.blobActionDown}>
          {this.addInner()}
          <View style={styles.blobEdit}></View>
        </View>
        </ScrollView>

      </View>
    );
  }
componentDidMount(){
  this.setState({ alll: [] })
  this.renderAll()
}
}
const styles = { ...blobStyle, ...headerStyle }
