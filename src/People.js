import React from 'react';


class People extends React.Component{
    constructor(props){
        super(props);
        this.state={people:[]}
    }
    render(){
     let code=   this.state.people.map(x=>{
            return(
                <tr key={x.sno}>
                          <td>{x.sno}</td>
                          <td>{x.name}</td>
                          <td>{x.city}</td>
                </tr>
            )
        })
        return(
          <div>
              <table>
                  <thead>
                      <tr>
                     <th>Sno</th>
                     <th>name</th>
                     <th>city</th>
                     </tr>
                  </thead>
                  <tbody>
                      {code}
                  </tbody>
              </table>
          </div>
        );
    }
    readPeople(){
        fetch("http://ec2-3-16-166-243.us-east-2.compute.amazonaws.com:8896/api/people").then(
            (response)=>{
                 response.json().then(
                     (data)=> {
                        let people= {people:data}
                        console.log(people);
                        this.setState(people);
                     }
                 )
            
            },
            (error)=>console.log(error)
        )
    }

    componentDidMount(){
         this.readPeople();
    }
}

export default People;