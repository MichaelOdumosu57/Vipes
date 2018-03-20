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


      }


            render(){

              const top ="0px";
              const left= "0px";

              // pictures.map((img,index) =>
              //
              //   left = (numberParse(left) + browser_window.outerWidth * index).toString() + "px"
              // );




              return(


                    pictures.map((img,index) =>
                      <Carousel_Item top = {top} left = {(numberParse(left) + browser_window.outerWidth * index).toString() + "px"} key = {img} pic = {img}/>
                    )
                )
            }


    }

    class Carousel_Item extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
                          display:false,

                            };

          }






        render() {


           return (


                    <img  src = {this.props.pic} style = {{
                        height: '90%',
                        width:'100%',
                        border:'2px solid black',
                        position:'absolute',
                        top:this.props.top,
                        left:this.props.left
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
                  top:"50%"

              }}></span>
            </a>
        );
      }
    }

    class RightArrow extends React.Component {
      render (){
        return (
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font"}}>
              <span className = {"glyphicon glyphicon-chevron-right"} aria-hidden={"true"} style = {{
                  left:"93%",
                  top:"53%"
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

ReactDOM.render(
  <LeftArrow />,
  document.getElementsByClassName('LeftArrow')[0]
);

ReactDOM.render(
  <RightArrow />,
  document.getElementsByClassName('RightArrow')[0]
);
