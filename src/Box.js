import React from 'react';
import image from './remove.png';
import PubSub from 'pubsub-js';

class Box extends React.Component{
    constructor(props){
        super(props);
        this.removeItem=this.removeItem.bind(this);
    }
     removeItem(index){
         PubSub.publish("item-remove",{index:index,title:this.props.title});
     }
  
    render(){
      let  boxStyle=    {width: "200px" ,minHeight: "300px",margin:"10px",padding:"3px",
        backgroundColor:"lightgreen", float: "left"};
        return(
       <div className="box" style={boxStyle}>
         <h1>{this.props.title} </h1>
         <hr/>
         <ul>
        {this.props.things.map((x,index)=><li key={x}>{x}
        <img src={image} style={{height:"20px", width:"20px"}} 
        onClick={()=>{this.removeItem(index)}}></img>
        </li>)}
       
         </ul>
       </div>
        );
    }
}

Box.defaultProps={title: "notitle", things:[]};

export default Box;












