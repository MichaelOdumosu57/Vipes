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


        // this.handchangeRight = this.handchangeRight.bind(this)
        this.carouselControl = document.getElementsByTagName("img")

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

                     // <img  src = {img} style = {{
                     //     height: '90%',
                     //     width:browser_window.outerWidth,
                     //     border:'2px solid black',
                     //     position:'absolute',
                     //     top:"0px",
                     //     left:this.state.left
                     //   }}/>
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
                      <RightArrow click = {this.changeRight}  animationObject = {this.state.divs} />

                    </React.Fragment>
                )
            }


    }






    class Carousel_Item extends React.Component {
          constructor(props) {
            super(props);
            this.state = {

                          left:this.props.left,
                          screens : this.props.screens,
                          transition:"left 2s"

                            };


            this.handchangeRight = this.handchangeRight.bind(this)
            this.setChangeRight = this.setChangeRight.bind(this)



          }

          setChangeRight (){
            var x = 0;

              while(x != 1000){
                this.setState({
                  left:x.toString() + "px"
                })
                x += 1;
              }

              if(x == 1000){
                clearInterval(null)
              }


          }

          handchangeRight(){
            console.log("did n't i execute")

            // setInterval(this.setChangeRight,1)
            this.setState({
              left:"1000px"
            })
          }


          componentDidMount() {
             // When the component is mounted, add your DOM listener to the "nv" elem.
             // (The "nv" elem is assigned in the render function.)
             document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.handchangeRight)
           }

        render() {



           return (


                    <img  src = {this.props.pic} style = {{
                        height: '90%',
                        width:browser_window.outerWidth,
                        border:'2px solid black',
                        position:'absolute',
                        top:this.props.top,
                        left:this.state.left,
                        MozTransition:this.state.transition,
                        WebkitTransition:this.state.transition,
                        transition:this.state.transition
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
      constructor(props) {
        super(props);


        this.changeRight = this.changeRight.bind(this);

      }

      changeRight(){
        console.log("check my props then")
        console.log(this.props.animationObject)
      }

      render (){
        return (
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font"}}  onClick = {this.changeRight}>
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
