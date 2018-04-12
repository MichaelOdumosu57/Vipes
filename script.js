import React from 'react';
import ReactDOM from 'react-dom';
// import {numberParse} from 'dimension_parser'
//  we left of using the display in Carousel Items to decide which display should come first



var change_top;
var change_left;
var global_function;


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
      console.log(a,b,c,pictures.length)
      // work on sending replace to browser_window.outerWidth
      // interesting control function shouuld not have started it like this but you know react is stubborn and it likes this type of conditionall
      // my logic was for making this carousel work, if one conditional made a difference focus on changing the conditional
      // test your code for each conditional you add
      // if everything made the function return false then apply an || statement
      // this is only consecutive carousel, else please write another function :)
      // console.log(a ==b ? 0 : a < b  && ( c == a && b != pictures.length -1  ||   b ==  pictures.length -1 &&  c==  pictures.length -2 )  || a == pictures.length -1 && c == 8 || (b ==  pictures.length -1 && c ==  pictures.length -1 && c!= b ) ?   browser_window.outerWidth.toString() + "px" : 0)
      // console.log(a == b)
      // console.log(a < b)
      // console.log( c == a && b != pictures.length -1  ,   b ==  pictures.length -1 &&  c==  pictures.length -2  )
      console.log(a ==b ? -1 : a < b  && ( c == a && b != pictures.length -1  ||   b ==  pictures.length -1 &&  c==  pictures.length -2 )  || a == pictures.length -1 && c == pictures.length -1 && b != pictures.length -2   ?  1: (a == 0 && b == pictures.length -1 && c != 0   ) ? 2 : a > b && a != c && c != 0 && a!= 1  || (a == pictures.length -1 && b == pictures.length -2 && c !=  pictures.length -1 ) ? 3 : 0)
      return a ==b ? 0: a < b  && ( c == a && b != pictures.length -1  ||   b ==  pictures.length -1 &&  c==  pictures.length -2 )  || a == pictures.length -1 && c == pictures.length -1 && b != pictures.length -2   ?   browser_window.outerWidth.toString() + "px" : (a == 0 && b == pictures.length -1 && c != 0   ) ? browser_window.outerWidth.toString() + "px" : a > b && a != c && (c != 0 || a == 1)  || (a == pictures.length -1 && b == pictures.length -2 && c !=  pictures.length -1 )  ? browser_window.outerWidth.toString() + "px" : 0

    }

    function reset_left (a,b,item){
      console.log(item,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", item ==  "glyphicon-chevron-left" )

      item = item ==  "glyphicon-chevron-left" ?  0 : (a < b && b != pictures.length - 1 || a == pictures.length - 2 && b !=  pictures.length - 3)  || b == 0 && a != 1  ? -browser_window.outerWidth: 0
      console.log((a < b && b != pictures.length - 1 || a == pictures.length - 2)  || b == 0 ? -browser_window.outerWidth: 0)
      return item
    }


    class Carousel extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
                      left:-browser_window.outerWidth,
                      divs:[],
                      modal_divs:[],
                      pictures: pictures,
                      display:  0,
                      question: [0,0],
                      modalMount: false,
                      initMount:0,
                      flag:0,
                      item: null


                        };


        this.item_change = this.item_change.bind(this)
        this.display_update = this.display_update.bind(this)
        this.set_position = this.set_position.bind(this)
        this.replace_modal = this.replace_modal.bind(this)
        this.stop_the_bug = this.stop_the_bug.bind(this)
        this.animate = this.animate.bind(this)


      }

            replace_modal (){

              this.state.initMount == 0 ?  this.setState ({modalMount:true,initMount:1}) : this.setState ({modalMount:false,initMount:1})



            }


            display_update(event){
              console.log(event.target.classList[1])
              if(event.target.classList[1] == "glyphicon-chevron-right"){
                  console.log("executeds")
                  this.setState({
                    display:this.state.display + 1,
                    left: 0
                  })
              }
              else{
                this.setState({
                  display:this.state.display - 1
                })

              }
            }

            animate(){

              ReactDOM.render(
                null ,
                document.getElementsByClassName('modal-coupler')[0]
              );

            }


            stop_the_bug(item){

              var x = 2;

              while(this.state.modalMount != true || x != 0){
                  console.log(this.state.modalMount,x,this.state.item)
                  // if(this.state.initMount == 0){


                      ReactDOM.render(
                        this.state.modalMount ? (<Modal_Coupler

                                       move = {this.state.modal_divs[this.state.question[0]]}
                                       replace = {this.state.modal_divs[this.state.question[1]]}
                                       intention ={reset_left(this.state.question[0],this.state.question[1],this.state.item)}
                                       transition ="left 2s"
                                       question = {this.state.question}
                                       flag = {this.state.flag}
                                       sliding = {() => this.sliders}
                                       init_position_set = {this.set_position}/>  ):   null,
                        document.getElementsByClassName('modal-coupler')[0]
                      );
                      this.setState({
                        flag:1
                      })



                  //     ReactDOM.render(
                  //       <Modal_Coupler
                  //                      move = {this.state.modal_divs[this.state.question[0]]}
                  //                      replace = {this.state.modal_divs[this.state.question[1]]}
                  //                      intention ={this.reset_left(this.state.question[0],this.state.question[1])}
                  //                      transition ="left 2s"/>
                  //                      ,
                  //       document.getElementsByClassName('modal-coupler')[0]
                  //     );
                  // }

                  // else{
                  //   ReactDOM.render(
                  //     this.state.modalMount ? (<Modal_Coupler
                  //                    move = {this.state.modal_divs[this.state.question[0]]}
                  //                    replace = {this.state.modal_divs[this.state.question[1]]}
                  //                    intention ={this.reset_left(this.state.question[0],this.state.question[1])}
                  //                    transition ="left 2s"/> ):   null,
                  //     document.getElementsByClassName('modal-coupler')[0]
                  //   );
                  //
                  // }
                  this.setState({
                    modalMount:true,
                    initMount:1
                  })
                  x -= 1
                  if(x == 0 ){
                    this.setState({
                      flag:0
                    })
                  }
              }


            }

            item_change(move,replace,dir){
                console.log("preparing component coupling")
                console.log("Components Requested")
                console.log(this.state.item)
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
                       screens ={index }
                       init_position_set = {this.set_position}/>


                  )
                })

                console.log("where it should start",reset_left(this.state.question[0],this.state.question[1]))

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

                  // this.state.initMount == 0 ? setTimeout(this.stop_the_bug,50)  :  setTimeout(this.stop_the_bug,50)
                    setTimeout(this.stop_the_bug,50,this.state.item)
                // it can exist in the carouselif React renders it


             }

            set_position(item){
              // helps wait_by_click by receiving position info from child, sends its self as a props to update the state hence update child prop

              this.setState({item : item})
            }

             // wait_for_click(event){
             //   // this function is for the modal coupler because the only way to set the init state of a child is from a prop of the parent
             //   //  since react does not know which arrow the user will press to make the inital position dynamic the function must begin in the parent and
             //   // value returned as a prop to the child bind this function to the modal_coupler child
             //   this.setState({
             //     flag:1,
             //     click_info: event.target.attributes["0"].value
             //   })
             //
             // }
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
                     screens ={index }
                     init_position_set = {this.set_position}/>


                )

              })
              ReactDOM.render(
                <Modal_Coupler flag = {0}
                               intention = {reset_left(this.state.question[0],this.state.question[1],this.state.item)}
                               transition = "left 2s"
                               move = {this.state.divs[0]}

                               />,
                document.getElementsByClassName('modal-coupler')[0]
              );

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

    function sliding_items(){
      // this function works on the sliding functionality for the modal, simply the left css attribute gets changed
      this.setState({
        left:0
      })

    }

    class Modal_Coupler extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
                      // left:reset_left(this.props.question[0],this.props.question[1]),
                      left: this.props.intention,
                      slider:this.props.transition,
                      flag:this.props.flag,
                      click_info: null
                     }

        this.sliding_items = this.sliding_items.bind(this)
        this.just_to_set = this.just_to_set.bind(this)
        this.wait_for_click = this.wait_for_click.bind(this)


      }




      componentDidMount(){

        document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.wait_for_click)
        document.getElementsByClassName("carousel-control")[0].addEventListener("click", this.wait_for_click)
          console.log(this.props.transition,this.props.intention)

      }

      // componentWillReceiveProps(){
      //   document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.sliding_items)
      // }
      componentWillUnmount(){
          document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.wait_for_click)
          document.getElementsByClassName("carousel-control")[0].removeEventListener("click", this.wait_for_click)
      }

      wait_for_click(event){

        this.setState({
          flag:1,
          click_info: event.target.classList[1]
        })

      }

      just_to_set(){
        console.log("move!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        // clearTimeout()
        // console.log(this)

        setTimeout(this.sliding_items,100)
      }
      sliding_items(){
        if(document.getElementsByClassName("difference")[0] != null){
          console.log(document.getElementsByClassName("difference")[0])

            this.setState({
              left:  this.state.left == 0 ? -browser_window.outerWidth : 0,
              flag:0
            })
            console.log(this.state.left)
            clearTimeout(this.sliding_items)
        }

      }




      render(){
        // console.log(this.props.move.props)

              console.log("this is this.state.flag",this.state.flag)
              if(this.state.flag == 1 ){
                  this.just_to_set()
              }
        return(
          <div style = {{
                        left:this.state.left,
                        position:"absolute",
                        height:"100%",
                        width:browser_window.outerWidth * 2,
                        top:-100,
                        transition:this.state.slider,
                        zIndex:4

                      }} className = {"difference"}>
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

          handchangeRight(event){

            // console.log(this.props.pic)


              this.setState({
                display:this.state.display == this.props.total - 1 ? 0 : this.state.display + 1,
                dir:"right"


              })



              if((this.state.screens > this.props.total - 1 ? 0 : this.state.screens  ) == this.state.display ){
                this.props.init_position_set(event.target.classList[1])
                // prev item might have to use a coupler to keep two pages on top

                console.log(this.state.screens,  this.state.display, "so i  move right ?")





                console.log("see me",this.state.screens == 0 ? this.props.total -1: this.state.screens -1 ,this.state.screens,this.state.dir )
                this.props.coupler(this.state.screens == 0 ? this.props.total -1: this.state.screens -1 ,this.state.screens,this.state.dir )

              }


          }


          handchangeLeft(event){
             // console.log(this.props.pic)

                      this.setState({
                        display:this.state.display == 0 ? this.props.total - 1 : this.state.display - 1,
                        dir:"left"


                      })


                      if((this.state.screens  < 0 ? this.props.total - 1 : this.state.screens  ) == this.state.display ){
                        // prev item might have to use a coupler to keep two pages on top
                        if(this.state.screens == this.props.total - 1){
                          // this is also how the coupler starts
                          // try to mount the inital img component item to avoid that snap replace
                            ReactDOM.render(
                              null,
                              document.getElementsByClassName('modal-coupler')[0]
                            );
                            ReactDOM.render(
                              <Modal_Coupler flag = {1}
                                             intention = {0}
                                             transition = "left 2s"

                                             />,
                              document.getElementsByClassName('modal-coupler')[0]
                            );
                        }
                        this.props.init_position_set(event.target.classList[1])
                        console.log(this.state.screens,  this.state.display, "so i  move left ?")





                        console.log("see me left",this.state.screens == this.props.total -1 ? 0: this.state.screens  +1 ,this.state.screens,this.state.dir )
                        this.props.coupler(this.state.screens == this.props.total -1 ? 0: this.state.screens  +1,this.state.screens,this.state.dir )

                      }




                      // console.log(this.state.display, this.state.zIndex,"current page")
                    }















          changeLeft(){
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
                  zIndex:100

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
            <a className = {" carousel-control"} style ={{fontFamily: "bootstrap_font" }} onClick = {this.props.unmount}>
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

function set_x(){
  return 0

}
function event_x(){
  document.getElementsByClassName('carousel-control')[0].addEventListener("click",set_x)

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
//
// ReactDOM.render(
//   <RightArrow />,
//   document.getElementsByClassName('RightArrow')[0]
// );
