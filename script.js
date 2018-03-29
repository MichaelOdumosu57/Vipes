import React from 'react';
import ReactDOM from 'react-dom';
// import {numberParse} from 'dimension_parser'
//  we left of using the display in Carousel Items to decide which display should come first



var change_top;
var change_left;

// const modal_coupler =  document.getElementById('modal-coupler');

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


    function positioning(a,b,c){
      // console.log(a,b,c)
      return a ==b ? 0 : a < b  && ( c == a ) ?  browser_window.outerWidth.toString() + "px" : 0

    }


    class Carousel extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
                      left:"0px",
                      divs:[],
                      modal_divs:[],
                      pictures: pictures,
                      display:  0,
                      question: [0,0],
                      modalMount: false



                        };


        this.item_change = this.item_change.bind(this)
        this.display_update = this.display_update.bind(this)
        this.reset_left = this.reset_left.bind(this)
        this.replace_modal = this.replace_modal.bind(this)
        this.stop_the_bug = this.stop_the_bug.bind(this)


      }

            replace_modal (){
              this.setState({
                modalMount:true
              })
            }
            reset_left (a,b){
              return a < b ? -browser_window.outerWidth: 0
            }

            display_update(event){
              console.log(event.target.classList[1])
              if(event.target.classList[1] == "glyphicon-chevron-right"){
                  console.log("executeds")
                  this.setState({
                    display:this.state.display + 1
                  })
              }
              else{
                this.setState({
                  display:this.state.display - 1
                })

              }
            }



            stop_the_bug(){
              var x = 2;
              while(this.state.modalMount != true || x != 0){
                  console.log(this.state.modalMount,x)
                  ReactDOM.render(
                    this.state.modalMount ? (<Modal_Coupler
                                   move = {this.state.modal_divs[this.state.question[0]]}
                                   replace = {this.state.modal_divs[this.state.question[1]]}
                                   intention ={this.reset_left(this.state.question[0] , this.state.question[1] )}
                                   transition ="left 5s"/>) : null ,
                    document.getElementsByClassName('modal-coupler')[0]
                  );

                  this.setState({
                    modalMount:true
                  })
                  x -= 1
              }
            }

            item_change(move,replace,dir){
                console.log("preparing component coupling")
                console.log("Components Requested")
                // console.log(browser_window.outerWidth)
                console.log(move,replace)


                this.setState({
                  question:[move,replace]

                })

                this.setState({
                  modal_divs:this.state.pictures.map((img,index) =>


                    <Carousel_Item
                       top = {"100px"}
                       left = {positioning(this.state.question[0],this.state.question[1],index)}
                       key = {img}
                       pic = {img}
                       total = {this.state.pictures.length}
                       did_change = {this.state.display}
                       coupler = {this.item_change}
                       screens ={index }/>


                  )
                })

                console.log("where it should start",this.state.question[0] <this.state.question[1] ? -browser_window.outerWidth: 0)

                  // var x = 2;
                  // while(this.setState.modalMount != true || x != 0){
                  //     console.log(this.setState.modalMount)
                  //     ReactDOM.render(
                  //       this.state.modalMount ? (<Modal_Coupler
                  //                      move = {this.state.modal_divs[move]}
                  //                      replace = {this.state.modal_divs[replace]}
                  //                      intention ={this.reset_left(this.state.question[0] , this.state.question[1] )}
                  //                      transition ={dir != "" ? "left 5s" : null}/>) : null,
                  //       document.getElementsByClassName('modal-coupler')[0]
                  //     );
                  //
                  //     this.setState({
                  //       modalMount:true
                  //     })
                  //     x -= 1
                  // }

                  setTimeout(this.stop_the_bug,50)
                // it can exist in the carouselif React renders it


             }

            componentDidMount(){
              document.getElementsByClassName("carousel-control")[0].addEventListener("click", this.display_update)
              document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.display_update)
              this.setState({
                divs:this.state.pictures.map((img,index) =>


                  <Carousel_Item
                     top = {"0px"}
                     left = {positioning(this.state.question[0],this.state.question[1])}
                     key = {img}
                     pic = {img}
                     total = {this.state.pictures.length}
                     did_change = {this.state.display}
                     coupler = {this.item_change}
                     screens ={index }/>


                )

              })

            }

            componentWillUnmount(){
              document.getElementsByClassName("carousel-control")[0].removeEventListener("click", this.display_update)
              document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.display_update)
            }

            render(){

              return(

                    <React.Fragment>
                      {this.state.divs}
                      <LeftArrow  unmount = {this.replace_modal}  />
                      <RightArrow  unmount = {this.replace_modal}  />
                      <div id ="index" className = "modal-coupler"></div>
                    </React.Fragment>
                )
            }


    }

// a DOM node must be present for the coupler to render in
    function sheets(screens,current,dir){
        // this function helps the DOM find which sheet is supposed to be on top, then React changes zIndex state listening to event listeners accordingly
        // console.log("sheets",screens,current,dir)

        if(screens  == current -1 &&  dir == "right" ){
          console.log("hit")
          return 2
        }
        else if(screens == current){
          console.log("hit")
          return 2
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
        this.state = {
                      left:this.props.intention,
                      slider:this.props.transition
                     }

        this.sliding_items = this.sliding_items.bind(this)
      }



      componentDidMount(){
          document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.sliding_items)
          console.log(this.props.transition,this.props.intention)
      }

      componentWillUnmount(){
          document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.sliding_items)
          this.setState({
            left:-browser_window.outerWidth
          })
      }



      sliding_items(){
        // this function works on the sliding functionality for the modal, simply the left css attribute gets changed
        this.setState({
          left:0
        })

      }


      render(){
        // console.log(this.props.move.props)

        return(
          <div style = {{
                        left:this.state.left,
                        position:"absolute",
                        height:"100%",
                        width:browser_window.outerWidth * 2,
                        top:0,
                        transition:this.state.slider,
                        zIndex:4

                        }}>
            {this.props.move}
            {this.props.replace}
          </div>
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
                          dir:"null",
                          display: this.props.did_change

                            };


            this.handchangeRight = this.handchangeRight.bind(this)
            this.handchangeLeft = this.handchangeLeft.bind(this)



          }

          handchangeRight(){

            // console.log(this.props.pic)


              this.setState({
                display:this.state.display == this.props.total - 1 ? 0 : this.state.display + 1,
                dir:"right"


              })



              if((this.state.screens > this.props.total - 1 ? 0 : this.state.screens  ) == this.state.display ){
                // prev item might have to use a coupler to keep two pages on top

                console.log(this.state.screens,  this.state.display, "so i  move right ?")





                console.log("see me",this.state.screens == 0 ? this.props.total -1: this.state.screens -1 ,this.state.screens,this.state.dir )
                this.props.coupler(this.state.screens == 0 ? this.props.total -1: this.state.screens -1 ,this.state.screens,this.state.dir )

              }




              // console.log(this.state.display, this.state.zIndex,"current page")


          }


















          handchangeLeft(){
            // console.log(this.props.pic)

              this.setState({
                display:this.state.display == 0 ? this.props.total - 1 : this.state.display - 1


              })

              if((this.state.screens - 1 < 0 ? this.props.total - 1 : this.state.screens - 1 ) == this.state.display ){
                console.log(this.state.screens,  "so i  move left right?")

              }


              // console.log(this.state.display, this.state.zIndex,"current page")


          }


          componentDidMount() {
             // When the component is mounted, add your DOM listener to the "nv" elem.
             // (The "nv" elem is assigned in the render function.)
             document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.handchangeRight)
             document.getElementsByClassName("carousel-control")[0].addEventListener("click", this.handchangeLeft)
                // it can exist in the carouselif React renders it
           }

           componentWillUnmount() {
              // When the component is mounted, add your DOM listener to the "nv" elem.
              // (The "nv" elem is assigned in the render function.)
              document.getElementsByClassName("carousel-control")[0].removeEventListener("click", this.handchangeLeft)
              document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.handchangeRight)
            }

        render() {



           return (

                  // <div>
                    <img  src = {this.props.pic} style = {{
                        height: '90%',
                        width:browser_window.outerWidth,
                        border:'2px solid black',
                        position:'absolute',
                        top:this.props.top,
                        left:this.state.left,
                        // MozTransition:slide_or_hide(this.state.transition),
                        // WebkitTransition:slide_or_hide(this.state.transition),
                        // transition:slide_or_hide(this.state.transition),
                        zIndex:sheets(this.state.screens,this.state.display,this.state.dir)

                      }}/>
                      // <img  src = {this.props.data.pic} style = {{
                      //     height: this.props.data.height,
                      //     width:this.props.data.width,
                      //     border:'2px solid black',
                      //     position:'absolute',
                      //     top:this.props.data.top,
                      //     left:this.props.data.left,
                      //     zIndex:sheets(this.props.data.screens,this.props.data.display )
                      //
                      //   }}/>
                    // </div>





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
          // ReactDOM.unmountComponentAtNode(document.getElementsByClassName('modal-coupler')[0]);
      }

      render (){
        return (
            <a className = {" carousel-control"} style ={{
              fontFamily: "bootstrap_font"}}  onClick = {this.props.unmount}>
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

ReactDOM.render(
  <Modal_Coupler intention = {-browser_window.outerWidth}
                 transition = "left 2s"/>,
  document.getElementsByClassName('modal-coupler')[0]
);


// ReactDOM.render(
//   <LeftArrow />,
//   document.getElementsByClassName('LeftArrow')[0]
// );

// ReactDOM.render(
//   <RightArrow />,
//   document.getElementsByClassName('RightArrow')[0]
// );
