import React from 'react';
import ReactDOM from 'react-dom';
// import {numberParse} from 'dimension_parser'
//  we left of using the display in Carousel Items to decide which display should come first



var change_top;
var change_left;

const modal_coupler =  document.getElementById('modal-coupler');

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
                      left:"0px",
                      divs:[],
                      pictures: pictures,
                      display:  0

                        };


        this.item_change = this.item_change.bind(this)


      }

            item_change(move,replace){
                console.log("preparing component coupling")
                ReactDOM.render(
                  <Modal_Coupler />,
                  document.getElementsByClassName('modal-coupler')[0]
                );

                // it can exist in the carousel if React renders it


             }







            componentDidMount(){
              this.setState({
                divs:this.state.pictures.map((img,index) =>


                  <Carousel_Item
                     top = {"0px"}
                     left = {this.state.left}
                     key = {img}
                     pic = {img}
                     total = {this.state.pictures.length}
                     did_change = {this.state.display}
                     coupler = {this.item_change}
                     screens ={index } />

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

              console.log(this.state.divs)
              const top ="0px";
              const active = 0;
              const prev = -1;
              const next = 1;
              let present = null;






              return(

                    <React.Fragment>
                      {this.state.divs}
                      <LeftArrow animationObject = {this.state.divs}   />,
                      <RightArrow  animationObject = {this.state.divs} />
                      <div id ="index" className = "modal-coupler"></div>
                    </React.Fragment>
                )
            }


    }

// a DOM node must be present for the coupler to render in
    function sheets(screens,current){
        // this function helps the DOM find which sheet is supposed to be on top, then React changes zIndex state listening to event listeners accordingly
        console.log(screens,current)
        if(screens == current){
          return 3
        }
        else {
          return 0
        }
    }

    function slide_or_hide(div){
      // this function determines whether a carousel item should slide or hide in transition
      return div
    }


    class Modal_Coupler extends React.Component {
      constructor(props) {
        super(props);
      }

      componentDidMount(){

      }

      componentWillUnmount(){

      }

      render(){

        return(
          <h1> I will be coupling here </h1>
        );
      }

    }



    class Carousel_Item extends React.Component {
          constructor(props) {
            super(props);
            this.state = {

                          left:this.props.left,
                          screens : this.props.screens,
                          transition:"left 2s",

                          display: this.props.did_change

                            };


            this.handchangeRight = this.handchangeRight.bind(this)
            this.handchangeLeft = this.handchangeLeft.bind(this)



          }

          handchangeRight(){

            console.log(this.props.pic)
              this.setState({
                display:this.state.display == this.props.total - 1 ? 0 : this.state.display + 1

              })

              if((this.state.screens + 1 > this.props.total - 1 ? 0 : this.state.screens + 1 ) == this.state.display ){
                // prev item might have to use a coupler to keep two pages on top
                console.log(this.state.screens, sheets(this.state.screens,this.state.display ), "so i  move left right?")
                this.props.coupler(this.state.screens,this.state.screens+1)
                this.setState({
                  left:browser_window.outerWidth
                })
              }




              // console.log(this.state.display, this.state.zIndex,"current page")


          }


          handchangeLeft(){
            // console.log(this.props.pic)

              this.setState({
                display:this.state.display == 0 ? this.props.total - 1 : this.state.display - 1


              })

              if((this.state.screens - 1 < 0 ? this.props.total - 1 : this.state.screens - 1 ) == this.state.display ){
                console.log(this.state.screens, sheets(this.state.screens,this.state.display ), "so i  move left right?")
                this.setState({
                  left:"-1000px"
                })
              }


              // console.log(this.state.display, this.state.zIndex,"current page")


          }


          componentDidMount() {
             // When the component is mounted, add your DOM listener to the "nv" elem.
             // (The "nv" elem is assigned in the render function.)
             document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.handchangeRight)
             document.getElementsByClassName("carousel-control")[0].addEventListener("click", this.handchangeLeft)
           }

           componentWillUnmount() {
              // When the component is mounted, add your DOM listener to the "nv" elem.
              // (The "nv" elem is assigned in the render function.)
              document.getElementsByClassName("carousel-control")[0].removeEventListener("click", this.handchangeLeft)
              document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.handchangeRight)
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
                        MozTransition:slide_or_hide(this.state.transition),
                        WebkitTransition:slide_or_hide(this.state.transition),
                        transition:slide_or_hide(this.state.transition),
                        zIndex:sheets(this.state.screens,this.state.display )

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
                  left:"30%",
                  zIndex:5

                }}>
                {nav_menu}
                </div>
             );

           }
    }

    class LeftArrow extends React.Component {
      constructor(props) {
        super(props);


        this.changeLeft = this.changeLeft.bind(this);

      }

      changeLeft(){

        console.log(this.props.animationObject)


      }
      render (){
        return (
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font" }} onClick = {this.changeLeft}>
              <span className = {"glyphicon glyphicon-chevron-left"} aria-hidden={"true"} style =  {{
                  top:"50%",
                  color:"red",
                  zIndex:5
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
            <a className = {" carousel-control"} style ={{
              fontFamily: "bootstrap_font"}}  onClick = {this.changeRight}>
              <span className = {"glyphicon glyphicon-chevron-right"} aria-hidden={"true"} style = {{
                  left:"93%",
                  top:"53%",
                  color:"red",
                  zIndex:5
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
