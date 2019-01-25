import React from "react";
import { View,TextInput,Text } from "react-native"
import { db } from "../firebase";
import styles from "./styles-blob"
export class Blob extends React.Component {
    constructor(props) {
        super()
        this.state = {
            title:props.title,
            disc:props.disc,
            data: {
                title: props.title,
                disc: props.disc,
                status: props.status,
                no: props.no,
            },
            edit: false
        }
      
    }
    getfreshcopy() {
        db.collection("tasks").doc((this.state.data.no + 0).toString()).get().then(doc => {
            this.setState({
                data: {
                    title: doc.data().title,
                    disc: doc.data().disc,
                    status: doc.data().status
                },

            })
        })
    }
    changeTitle=(e)=>{
        this.setState({title:e})
      }
      changeDisc=(e)=>{
        this.setState({disc:e})
        
      }
    Marktaskdone() {
        db.collection("tasks").doc((this.state.data.no + 0).toString()).set({
            status: "done"
        }, { merge: true }).then(a => {
            this.getfreshcopy()
            this.setState({
                edit: false
            })
        })
    }
    Savetask() {
       var newdisc=this.state.title
       var newtitle= this.state.disc
        db.collection("tasks").doc((this.state.data.no + 0).toString()).set(
            { disc: newdisc, title: newtitle }, { merge: true }
        ).then(a => {
            this.getfreshcopy()
            this.setState({
                edit: false
            })
        })

    }

    render() {
        var innerBlob
        if (this.state.edit === true) {
            innerBlob = (<View >
                <TextInput type="text" style={styles.blobText} placeholder="Type Todo title" value={this.state.data.title}></TextInput>
                <TextInput multiline type="text" numberOfLines={2} style={styles.blobTextArea} value={this.state.data.disc} placeholder="Describe your Todo..."></TextInput>
                <View style={styles.blobBottom}>
                    <Text style={{...styles.one,...{borderRightWidth:1}}} onPress={A => {
                        this.setState({
                            edit: false
                        })
                    }}> CANCEL</Text>
                    
                    <Text style={styles.one} onPress={() => this.Savetask()}>SAVE</Text>
                </View>
            </View>)
        }
        else {
            var actions = <View></View>;
            if (this.state.data.status === "active") {
                actions = <View style={{flexDirection:"row"}}><Text style={{  borderRadius: '4px', marginLeft: '8px' }} style={styles.blobAction}  onPress={() => this.Marktaskdone()} >Mark As done</Text>
                    <Text style={styles.blobAction} onPress={A => {
                        this.setState({
                            edit: true
                        })
                    }} >edit</Text></View>;
            }

            innerBlob = (<View>
                <View style={styles.blobHead}>
                    <Text style={styles.blobTitle}> {this.state.data.title} </Text>
                    {actions}
                </View>


                <Text style={styles.blobDisc}>{this.state.data.disc}
                </Text>
                <Text style={styles.blobStatus}> STATUS : {this.state.data.status.toUpperCase()}</Text></View>)

        }
        var blobstyle ;
        if (this.state.data.status === "active")
        blobstyle={...styles.blob,...styles.blobActive}
        else
        blobstyle={...styles.blob,...styles.blobDone}
        return (
            <View style={blobstyle}>
                <View style="blob-inner">
                   
                   {innerBlob}
                        </View></View>
        );
    }
}