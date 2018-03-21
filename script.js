import React from 'react';
import ReactDOM from 'react-dom';
// import {numberParse} from 'dimension_parser'


var change_top;
var change_left;

const pictures = [
                          './photos/beach.jpeg',
                          './photos/coffee-cups.jpeg',
                          './photos/conf.jpeg',
                          './photos/cupboard.jpeg',
                          './photos/dirty_shoes.jpeg',
                          './photos/horizon.jpeg',
                          './photos/lions.jpeg',
                          './photos/mushroom.jpeg',
                          './photos/sea.jpeg'
                        ];

const menus = ["HOME",
               "MODEL",
               "ACTOR",
               "DANCER",
               "DESIGNER",
               "PHOTOGRAPHER",
               "CONNECT"
                                  ]



    class Title extends React.Component {
      render() {
        return (
            <React.Fragment>
                <h1>Vipe x Feetz</h1>
                <Profession profession = {this.props.sideface}/>
            </React.Fragment>
        );
      }
    }

    class Profession extends React.Component {
        render() {
           return (
               <h2>{this.props.profession}</h2>
               );
        }
    }



    class Carousel extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
                      display:false,
                      left:"0px",
                      divs:[]

                        };

        this.changeRight = this.changeRight.bind(this)

      }

            changeRight(event) {
                // {(numberParse(left) + browser_window.outerWidth * index).toString() + "px"}
                {console.log(this.state.divs)}

                this.setState({
                  left:"1000px"
                })
                
                this.setState({
                  divs:pictures.map((img,index) =>


                    <Carousel_Item
                       top = {"0px"}
                       left = {this.state.left}
                       key = {img}
                       pic = {img}
                       screens ={index == 0 ? "active" : index == 1 ? "next" : index == pictures.length ? "prev": 2} />
                  )
                })


            }

            componentDidMount(){
              this.setState({
                divs:pictures.map((img,index) =>


                  <Carousel_Item
                     top = {"0px"}
                     left = {this.state.left}
                     key = {img}
                     pic = {img}
                     screens ={index == 0 ? "active" : index == 1 ? "next" : index == pictures.length ? "prev": 2} />
                )

              })
            }


            render(){

              const top ="0px";
              const active = 0;
              const prev = -1;
              const next = 1;
              let present = null;






              return(

                    <React.Fragment>
                      {this.state.divs}
                      <LeftArrow />,
                      <RightArrow click = {this.changeRight}  />

                    </React.Fragment>
                )
            }


    }




    class Carousel_Item extends React.Component {
          constructor(props) {
            super(props);
            this.state = {

                          left:this.props.left

                            };

            this.receiveRight = this.receiveRight.bind(this);


          }


        receiveRight(){

        }



        render() {


           return (


                    <img  src = {this.props.pic} style = {{
                        height: '90%',
                        width:browser_window.outerWidth,
                        border:'2px solid black',
                        position:'absolute',
                        top:this.props.top,
                        left:this.state.left
                      }}/>


               );

             }
  }


    class Navigation extends React.Component {
      render() {
         const links = this.props.links;
         const nav_menu  = (
           <ul>
           {links.map((link) =>
             <li key={link}>
               {link}
             </li>
           )}
           </ul>
         );

         return (
                <div style = {{
                  backgroundColor:"blue" ,
                  height:"200px",
                  width:"200px",
                  position:"absolute",
                  top:"65%",
                  left:"30%"
                }}>
                {nav_menu}
                </div>
             );

           }
    }

    class LeftArrow extends React.Component {
      render (){
        return (
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font"}}>
              <span className = {"glyphicon glyphicon-chevron-left"} aria-hidden={"true"} style =  {{
                  top:"50%",
                  color:"red"

              }}></span>
            </a>
        );
      }
    }

    class RightArrow extends React.Component {
      render (){
        return (
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font"}}  onClick = {this.props.click}>
              <span className = {"glyphicon glyphicon-chevron-right"} aria-hidden={"true"} style = {{
                  left:"93%",
                  top:"53%",
                  color:"red"
              }}></span>
            </a>
        );
      }
    }




ReactDOM.render(
  <Title sideface = "Overall"/>,
  document.getElementsByClassName('title')[0]
);

ReactDOM.render(
  <Carousel />,
  document.getElementsByClassName('carousel')[0]
);

ReactDOM.render(
  <Navigation links ={ menus}  />,
  document.getElementsByClassName('navigation')[0]
);

// ReactDOM.render(
//   <LeftArrow />,
//   document.getElementsByClassName('LeftArrow')[0]
// );

// ReactDOM.render(
//   <RightArrow />,
//   document.getElementsByClassName('RightArrow')[0]
// );
