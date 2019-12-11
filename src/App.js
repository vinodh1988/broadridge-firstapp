import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Box from './Box';
import PubSub from 'pubsub-js';
import People from './People';


class App extends React.Component{

  constructor(){
      super();
      this.state={apptitle:" React Demonstration APP ",
         titles:["Fruits","Vegetables","Stationary"],
         items:[["Apple","Mango","Orange"],
                ["Onion","Potato"],
                ["Pen","Paper","Eraser"]]};

        this.addItem=this.addItem.bind(this);
  }

  addItem(){
      let item=ReactDOM.findDOMNode(this.refs.item).value;
      let type=ReactDOM.findDOMNode(this.refs.type).value;

      this.state.items[type].push(item);
      let items={items:this.state.items};
      this.setState(items);

  }

  
  render(){
    let code=this.state.titles.map((data,index)=><Box title={data} key={index} 
    things={this.state.items[index]}></Box>);

  let options=this.state.titles.map(
    (data,index)=><option value={index} key={data}>{data}</option>)

    return(
      <div>
         <h1>{this.state.apptitle}</h1>
         <People/>
         <div className="form">
           Add an Item <input type="text" ref="item"/>
           <select ref="type">
               {options}
           </select>
           <button  onClick={this.addItem}>Add item</button>
         </div>
         {code}
      </div>
    );
  }

  
  componentDidMount(){
  /*  setInterval(()=>{
      let titles=["Component App","React Component App","React SPA","SPA Demo",
      "React Information App"];
      let newState={};
      newState.apptitle=titles[Math.floor(Math.random()*5)];
      this.setState(newState)
    },3000);*/
    
    PubSub.subscribe("item-remove",(msg,data)=>{
        console.log(data);
        for(let x in this.state.titles){
           if(data.title===this.state.titles[x])
           {
              let things=this.state.items;
              things[x].splice(data.index,1);
              this.setState({items:things});
              break;
           }
        }
    })

    
}


}


export default App;
