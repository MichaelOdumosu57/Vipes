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
                      modalMount: false,
                      initMount:0


                        };


        this.item_change = this.item_change.bind(this)
        this.display_update = this.display_update.bind(this)
        this.reset_left = this.reset_left.bind(this)
        this.replace_modal = this.replace_modal.bind(this)
        this.stop_the_bug = this.stop_the_bug.bind(this)
        this.animate = this.animate.bind(this)


      }

            replace_modal (){

              this.state.initMount == 0 ?  this.setState ({modalMount:true,initMount:1}) : this.setState ({modalMount:false,initMount:1})



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

            animate(){

              ReactDOM.render(
                null ,
                document.getElementsByClassName('modal-coupler')[0]
              );

            }


            stop_the_bug(){

              var x = 2;

              while(this.state.modalMount != true || x != 0){
                  console.log(this.state.modalMount,x)
                  // if(this.state.initMount == 0){

                      ReactDOM.render(
                        this.state.modalMount ? (<Modal_Coupler
                                       ref = {(div) => {this.state.intention = 0;}}
                                       move = {this.state.modal_divs[this.state.question[0]]}
                                       replace = {this.state.modal_divs[this.state.question[1]]}
                                       intention ={this.reset_left(this.state.question[0],this.state.question[1])}
                                       transition ="left 2s"/>  ):   null,
                        document.getElementsByClassName('modal-coupler')[0]
                      );



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

                  this.state.initMount == 0 ? setTimeout(this.stop_the_bug,50)  :  setTimeout(this.stop_the_bug,5000)
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
                      left:this.props.intention,
                      slider:this.props.transition
                     }

        this.sliding_items = this.sliding_items.bind(this)
      }



      componentDidMount(){
          document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.sliding_items)
          console.log(this.props.transition,this.props.intention)
      }

      // componentWillReceiveProps(){
      //   document.getElementsByClassName("carousel-control")[1].addEventListener("click", this.sliding_items)
      // }
      componentWillUnmount(){
          document.getElementsByClassName("carousel-control")[1].removeEventListener("click", this.sliding_items)
      }

      sliding_items(){
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
































--------------
{
  "name": "react_js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "it": "webpack-dev-server --hot --mode development",
    "dev": "webpack --mode development",
    "prodct": "webpack --mode production",
    "flow": "flow",
    "build": "tsc "
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MichaelOdumosu57/React.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/MichaelOdumosu57/React/issues"
  },
  "homepage": "https://github.com/MichaelOdumosu57/React#readme",
  "devDependencies": {
    "@types/react": "^16.0.40",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-flow": "^6.23.0",
    "babel-preset-react": "^6.24.1",
    "file-loader": "^1.1.11",
    "flow-bin": "^0.66.0",
    "typescript": "^2.7.2",
    "url-loader": "^1.0.1",
    "webpack": "^4.0.0",
    "webpack-cli": "^2.0.10",
    "webpack-dev-server": "^3.0.0"
  },
  "dependencies": {
    "babel-preset-env": "^1.6.1",
    "prop-types": "^15.6.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-transition-group": "^2.3.0"
  }
}

------------------------








{
  "name": "react_js",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@sindresorhus/is": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/@sindresorhus/is/-/is-0.7.0.tgz",
      "integrity": "sha512-ONhaKPIufzzrlNbqtWFFd+jlnemX6lJAgq9ZeiZtS7I1PIf/la7CW4m83rTXRnVnsMbW2k56pGYu7AUFJD9Pow==",
      "dev": true
    },
    "@types/react": {
      "version": "16.0.40",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-16.0.40.tgz",
      "integrity": "sha512-OZi2OPNI1DGwnC3Fgbr1CcYfOD6V0pbv+aehXdvuFE+L+sipWjividsasuqFW/G0CZrZ81Ao+9IzjvkRDWCE9Q==",
      "dev": true
    },
    "accepts": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.4.tgz",
      "integrity": "sha1-hiRnWMfdbSGmR0/whKR0DsBesh8=",
      "dev": true,
      "requires": {
        "mime-types": "2.1.18",
        "negotiator": "0.6.1"
      }
    },
    "acorn": {
      "version": "5.4.1",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.4.1.tgz",
      "integrity": "sha512-XLmq3H/BVvW6/GbxKryGxWORz1ebilSsUDlyC27bXhWGWAZWkGwS6FLHjOlwFXNFoWFQEO/Df4u0YYd0K3BQgQ==",
      "dev": true
    },
    "acorn-dynamic-import": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/acorn-dynamic-import/-/acorn-dynamic-import-3.0.0.tgz",
      "integrity": "sha512-zVWV8Z8lislJoOKKqdNMOB+s6+XV5WERty8MnKBeFgwA+19XJjJHs2RP5dzM57FftIs+jQnRToLiWazKr6sSWg==",
      "dev": true,
      "requires": {
        "acorn": "5.4.1"
      }
    },
    "ajv": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.1.1.tgz",
      "integrity": "sha1-l41Zf7wrfQ5aXD3esUmmgvKr+g4=",
      "dev": true,
      "requires": {
        "fast-deep-equal": "1.0.0",
        "fast-json-stable-stringify": "2.0.0",
        "json-schema-traverse": "0.3.1"
      }
    },
    "ajv-keywords": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.1.0.tgz",
      "integrity": "sha1-rCsnk5xUPpXSwG5/f1wnvkqlQ74=",
      "dev": true
    },
    "ansi-escapes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.0.0.tgz",
      "integrity": "sha512-O/klc27mWNUigtv0F8NJWbLF00OcegQalkqKURWdosW08YZKi4m6CnSUSvIZG1otNJbTWhN01Hhz389DW7mvDQ==",
      "dev": true
    },
    "ansi-html": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ansi-html/-/ansi-html-0.0.7.tgz",
      "integrity": "sha1-gTWEAhliqenm/QOflA0S9WynhZ4=",
      "dev": true
    },
    "ansi-regex": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
      "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8="
    },
    "ansi-styles": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.0.tgz",
      "integrity": "sha512-NnSOmMEYtVR2JVMIGTzynRkkaxtiq1xnFBcdQD/DnNCYPoEPsVJhM98BDyaoNOQIi7p4okdi3E27eN7GQbsUug==",
      "dev": true,
      "requires": {
        "color-convert": "1.9.1"
      }
    },
    "any-observable": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/any-observable/-/any-observable-0.2.0.tgz",
      "integrity": "sha1-xnhwBYADV5AJCD9UrAq6+1wz0kI=",
      "dev": true
    },
    "anymatch": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-1.3.2.tgz",
      "integrity": "sha512-0XNayC8lTHQ2OI8aljNCN3sSx6hsr/1+rlcDAotXJR7C1oZZHCNsfpbKwMjRA3Uqb5tF1Rae2oloTr4xpq+WjA==",
      "dev": true,
      "requires": {
        "micromatch": "2.3.11",
        "normalize-path": "2.1.1"
      },
      "dependencies": {
        "arr-diff": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
          "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
          "dev": true,
          "requires": {
            "arr-flatten": "1.1.0"
          }
        },
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "braces": {
          "version": "1.8.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
          "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
          "dev": true,
          "requires": {
            "expand-range": "1.8.2",
            "preserve": "0.2.0",
            "repeat-element": "1.1.2"
          }
        },
        "expand-brackets": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
          "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
          "dev": true,
          "requires": {
            "is-posix-bracket": "0.1.1"
          }
        },
        "extglob": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
          "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
          "dev": true,
          "requires": {
            "is-extglob": "1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        },
        "micromatch": {
          "version": "2.3.11",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
          "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
          "dev": true,
          "requires": {
            "arr-diff": "2.0.0",
            "array-unique": "0.2.1",
            "braces": "1.8.5",
            "expand-brackets": "0.1.5",
            "extglob": "0.3.2",
            "filename-regex": "2.0.1",
            "is-extglob": "1.0.0",
            "is-glob": "2.0.1",
            "kind-of": "3.2.2",
            "normalize-path": "2.1.1",
            "object.omit": "2.0.1",
            "parse-glob": "3.0.4",
            "regex-cache": "0.4.4"
          }
        }
      }
    },
    "aproba": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
      "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
      "dev": true
    },
    "argv": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/argv/-/argv-0.0.2.tgz",
      "integrity": "sha1-7L0W+JSbFXGDcRsb2jNPN4QBhas=",
      "dev": true
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
      "dev": true
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg==",
      "dev": true
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ=",
      "dev": true
    },
    "array-differ": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-differ/-/array-differ-1.0.0.tgz",
      "integrity": "sha1-7/UuN1gknTO+QCuLuOVkuytdQDE=",
      "dev": true
    },
    "array-find-index": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-find-index/-/array-find-index-1.0.2.tgz",
      "integrity": "sha1-3wEKoSh+Fku9pvlyOwqWoexBh6E=",
      "dev": true
    },
    "array-flatten": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.1.tgz",
      "integrity": "sha1-Qmu52oQJDBg42BLIFQryCoMx4pY=",
      "dev": true
    },
    "array-includes": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.0.3.tgz",
      "integrity": "sha1-GEtI9i2S10UrsxsyMWXH+L0CJm0=",
      "dev": true,
      "requires": {
        "define-properties": "1.1.2",
        "es-abstract": "1.10.0"
      }
    },
    "array-union": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
      "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
      "dev": true,
      "requires": {
        "array-uniq": "1.0.3"
      }
    },
    "array-uniq": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
      "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY=",
      "dev": true
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
      "dev": true
    },
    "arrify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
      "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0=",
      "dev": true
    },
    "asap": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",
      "integrity": "sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY="
    },
    "asn1": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.3.tgz",
      "integrity": "sha1-2sh4dxPJlmhJ/IGAd36+nB3fO4Y=",
      "dev": true
    },
    "asn1.js": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
      "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "inherits": "2.0.3",
        "minimalistic-assert": "1.0.0"
      }
    },
    "assert": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.4.1.tgz",
      "integrity": "sha1-mZEtWRg2tab1s0XA8H7vwI/GXZE=",
      "dev": true,
      "requires": {
        "util": "0.10.3"
      }
    },
    "assert-plus": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-0.2.0.tgz",
      "integrity": "sha1-104bh+ev/A24qttwIfP+SBAasjQ=",
      "dev": true
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c=",
      "dev": true
    },
    "ast-types": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.10.1.tgz",
      "integrity": "sha512-UY7+9DPzlJ9VM8eY0b2TUZcZvF+1pO0hzMtAyjBYKhOmnvRlqYNYnWdtsMj0V16CGaMlpL0G1jnLbLo4AyotuQ==",
      "dev": true
    },
    "async": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.0.tgz",
      "integrity": "sha512-xAfGg1/NTLBBKlHFmnd7PlmUW9KhVQIUuSrYem9xzFUZy13ScvtyGGejaae9iAVRiRq9+Cx7DPFaAAhCpyxyPw==",
      "dev": true,
      "requires": {
        "lodash": "4.17.5"
      }
    },
    "async-each": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.1.tgz",
      "integrity": "sha1-GdOGodntxufByF04iu28xW0zYC0=",
      "dev": true
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k=",
      "dev": true
    },
    "atob": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.0.3.tgz",
      "integrity": "sha1-GcenYEc3dEaPILLS0DNyrX1Mv10=",
      "dev": true
    },
    "aws-sign2": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.6.0.tgz",
      "integrity": "sha1-FDQt0428yU0OW4fXY81jYSwOeU8=",
      "dev": true
    },
    "aws4": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.6.0.tgz",
      "integrity": "sha1-g+9cqGCysy5KDe7e6MdxudtXRx4=",
      "dev": true
    },
    "babel-code-frame": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-code-frame/-/babel-code-frame-6.26.0.tgz",
      "integrity": "sha1-Y/1D99weO7fONZR9uP42mj9Yx0s=",
      "requires": {
        "chalk": "1.1.3",
        "esutils": "2.0.2",
        "js-tokens": "3.0.2"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4="
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc="
        }
      }
    },
    "babel-core": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-core/-/babel-core-6.26.0.tgz",
      "integrity": "sha1-rzL3izGm/O8RnIew/Y2XU/A6C7g=",
      "dev": true,
      "requires": {
        "babel-code-frame": "6.26.0",
        "babel-generator": "6.26.1",
        "babel-helpers": "6.24.1",
        "babel-messages": "6.23.0",
        "babel-register": "6.26.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0",
        "babylon": "6.18.0",
        "convert-source-map": "1.5.1",
        "debug": "2.6.9",
        "json5": "0.5.1",
        "lodash": "4.17.5",
        "minimatch": "3.0.4",
        "path-is-absolute": "1.0.1",
        "private": "0.1.8",
        "slash": "1.0.0",
        "source-map": "0.5.7"
      }
    },
    "babel-generator": {
      "version": "6.26.1",
      "resolved": "https://registry.npmjs.org/babel-generator/-/babel-generator-6.26.1.tgz",
      "integrity": "sha512-HyfwY6ApZj7BYTcJURpM5tznulaBvyio7/0d4zFOeMPUmfxkCjHocCuoLa2SAGzBI8AREcH3eP3758F672DppA==",
      "dev": true,
      "requires": {
        "babel-messages": "6.23.0",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "detect-indent": "4.0.0",
        "jsesc": "1.3.0",
        "lodash": "4.17.5",
        "source-map": "0.5.7",
        "trim-right": "1.0.1"
      }
    },
    "babel-helper-bindify-decorators": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-bindify-decorators/-/babel-helper-bindify-decorators-6.24.1.tgz",
      "integrity": "sha1-FMGeXxQte0fxmlJDHlKxzLxAozA=",
      "dev": true,
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-builder-binary-assignment-operator-visitor": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-builder-binary-assignment-operator-visitor/-/babel-helper-builder-binary-assignment-operator-visitor-6.24.1.tgz",
      "integrity": "sha1-zORReto1b0IgvK6KAsKzRvmlZmQ=",
      "requires": {
        "babel-helper-explode-assignable-expression": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-builder-react-jsx": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-builder-react-jsx/-/babel-helper-builder-react-jsx-6.26.0.tgz",
      "integrity": "sha1-Of+DE7dci2Xc7/HzHTg+D/KkCKA=",
      "dev": true,
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "esutils": "2.0.2"
      }
    },
    "babel-helper-call-delegate": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-call-delegate/-/babel-helper-call-delegate-6.24.1.tgz",
      "integrity": "sha1-7Oaqzdx25Bw0YfiL/Fdb0Nqi340=",
      "requires": {
        "babel-helper-hoist-variables": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-define-map": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-define-map/-/babel-helper-define-map-6.26.0.tgz",
      "integrity": "sha1-pfVtq0GiX5fstJjH66ypgZ+Vvl8=",
      "requires": {
        "babel-helper-function-name": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "lodash": "4.17.5"
      }
    },
    "babel-helper-explode-assignable-expression": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-explode-assignable-expression/-/babel-helper-explode-assignable-expression-6.24.1.tgz",
      "integrity": "sha1-8luCz33BBDPFX3BZLVdGQArCLKo=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-explode-class": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-explode-class/-/babel-helper-explode-class-6.24.1.tgz",
      "integrity": "sha1-fcKjkQ3uAHBW4eMdZAztPVTqqes=",
      "dev": true,
      "requires": {
        "babel-helper-bindify-decorators": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-function-name": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-function-name/-/babel-helper-function-name-6.24.1.tgz",
      "integrity": "sha1-00dbjAPtmCQqJbSDUasYOZ01gKk=",
      "requires": {
        "babel-helper-get-function-arity": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-get-function-arity": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-get-function-arity/-/babel-helper-get-function-arity-6.24.1.tgz",
      "integrity": "sha1-j3eCqpNAfEHTqlCQj4mwMbG2hT0=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-hoist-variables": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-hoist-variables/-/babel-helper-hoist-variables-6.24.1.tgz",
      "integrity": "sha1-HssnaJydJVE+rbyZFKc/VAi+enY=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-optimise-call-expression": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-optimise-call-expression/-/babel-helper-optimise-call-expression-6.24.1.tgz",
      "integrity": "sha1-96E0J7qfc/j0+pk8VKl4gtEkQlc=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-regex": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-regex/-/babel-helper-regex-6.26.0.tgz",
      "integrity": "sha1-MlxZ+QL4LyS3T6zu0DY5VPZJXnI=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "lodash": "4.17.5"
      }
    },
    "babel-helper-remap-async-to-generator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-remap-async-to-generator/-/babel-helper-remap-async-to-generator-6.24.1.tgz",
      "integrity": "sha1-XsWBgnrXI/7N04HxySg5BnbkVRs=",
      "requires": {
        "babel-helper-function-name": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helper-replace-supers": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-replace-supers/-/babel-helper-replace-supers-6.24.1.tgz",
      "integrity": "sha1-v22/5Dk40XNpohPKiov3S2qQqxo=",
      "requires": {
        "babel-helper-optimise-call-expression": "6.24.1",
        "babel-messages": "6.23.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-helpers": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helpers/-/babel-helpers-6.24.1.tgz",
      "integrity": "sha1-NHHenK7DiOXIUOWX5Yom3fN2ArI=",
      "dev": true,
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-loader": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-7.1.2.tgz",
      "integrity": "sha512-jRwlFbINAeyDStqK6Dd5YuY0k5YuzQUvlz2ZamuXrXmxav3pNqe9vfJ402+2G+OmlJSXxCOpB6Uz0INM7RQe2A==",
      "dev": true,
      "requires": {
        "find-cache-dir": "1.0.0",
        "loader-utils": "1.1.0",
        "mkdirp": "0.5.1"
      }
    },
    "babel-messages": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-messages/-/babel-messages-6.23.0.tgz",
      "integrity": "sha1-8830cDhYA1sqKVHG7F7fbGLyYw4=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-check-es2015-constants": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-check-es2015-constants/-/babel-plugin-check-es2015-constants-6.22.0.tgz",
      "integrity": "sha1-NRV7EBQm/S/9PaP3XH0ekYNbv4o=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-syntax-async-functions": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-async-functions/-/babel-plugin-syntax-async-functions-6.13.0.tgz",
      "integrity": "sha1-ytnK0RkbWtY0vzCuCHI5HgZHvpU="
    },
    "babel-plugin-syntax-async-generators": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-async-generators/-/babel-plugin-syntax-async-generators-6.13.0.tgz",
      "integrity": "sha1-a8lj67FuzLrmuStZbrfzXDQqi5o=",
      "dev": true
    },
    "babel-plugin-syntax-class-constructor-call": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-class-constructor-call/-/babel-plugin-syntax-class-constructor-call-6.18.0.tgz",
      "integrity": "sha1-nLnTn+Q8hgC+yBRkVt3L1OGnZBY=",
      "dev": true
    },
    "babel-plugin-syntax-class-properties": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-class-properties/-/babel-plugin-syntax-class-properties-6.13.0.tgz",
      "integrity": "sha1-1+sjt5oxf4VDlixQW4J8fWysJ94=",
      "dev": true
    },
    "babel-plugin-syntax-decorators": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-decorators/-/babel-plugin-syntax-decorators-6.13.0.tgz",
      "integrity": "sha1-MSVjtNvePMgGzuPkFszurd0RrAs=",
      "dev": true
    },
    "babel-plugin-syntax-dynamic-import": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-dynamic-import/-/babel-plugin-syntax-dynamic-import-6.18.0.tgz",
      "integrity": "sha1-jWomIpyDdFqZgqRBBRVyyqF5sdo=",
      "dev": true
    },
    "babel-plugin-syntax-exponentiation-operator": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-exponentiation-operator/-/babel-plugin-syntax-exponentiation-operator-6.13.0.tgz",
      "integrity": "sha1-nufoM3KQ2pUoggGmpX9BcDF4MN4="
    },
    "babel-plugin-syntax-export-extensions": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-export-extensions/-/babel-plugin-syntax-export-extensions-6.13.0.tgz",
      "integrity": "sha1-cKFITw+QiaToStRLrDU8lbmxJyE=",
      "dev": true
    },
    "babel-plugin-syntax-flow": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-flow/-/babel-plugin-syntax-flow-6.18.0.tgz",
      "integrity": "sha1-TDqyCiryaqIM0lmVw5jE63AxDI0=",
      "dev": true
    },
    "babel-plugin-syntax-jsx": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-jsx/-/babel-plugin-syntax-jsx-6.18.0.tgz",
      "integrity": "sha1-CvMqmm4Tyno/1QaeYtew9Y0NiUY=",
      "dev": true
    },
    "babel-plugin-syntax-object-rest-spread": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-object-rest-spread/-/babel-plugin-syntax-object-rest-spread-6.13.0.tgz",
      "integrity": "sha1-/WU28rzhODb/o6VFjEkDpZe7O/U=",
      "dev": true
    },
    "babel-plugin-syntax-trailing-function-commas": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-trailing-function-commas/-/babel-plugin-syntax-trailing-function-commas-6.22.0.tgz",
      "integrity": "sha1-ugNgk3+NBuQBgKQ/4NVhb/9TLPM="
    },
    "babel-plugin-transform-async-generator-functions": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-async-generator-functions/-/babel-plugin-transform-async-generator-functions-6.24.1.tgz",
      "integrity": "sha1-8FiQAUX9PpkHpt3yjaWfIVJYpds=",
      "dev": true,
      "requires": {
        "babel-helper-remap-async-to-generator": "6.24.1",
        "babel-plugin-syntax-async-generators": "6.13.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-async-to-generator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-async-to-generator/-/babel-plugin-transform-async-to-generator-6.24.1.tgz",
      "integrity": "sha1-ZTbjeK/2yx1VF6wOQOs+n8jQh2E=",
      "requires": {
        "babel-helper-remap-async-to-generator": "6.24.1",
        "babel-plugin-syntax-async-functions": "6.13.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-class-constructor-call": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-class-constructor-call/-/babel-plugin-transform-class-constructor-call-6.24.1.tgz",
      "integrity": "sha1-gNwoVQWsBn3LjWxl4vbxGrd2Xvk=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-class-constructor-call": "6.18.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-class-properties": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-class-properties/-/babel-plugin-transform-class-properties-6.24.1.tgz",
      "integrity": "sha1-anl2PqYdM9NvN7YRqp3vgagbRqw=",
      "dev": true,
      "requires": {
        "babel-helper-function-name": "6.24.1",
        "babel-plugin-syntax-class-properties": "6.13.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-decorators": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-decorators/-/babel-plugin-transform-decorators-6.24.1.tgz",
      "integrity": "sha1-eIAT2PjGtSIr33s0Q5Df13Vp4k0=",
      "dev": true,
      "requires": {
        "babel-helper-explode-class": "6.24.1",
        "babel-plugin-syntax-decorators": "6.13.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-arrow-functions": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-arrow-functions/-/babel-plugin-transform-es2015-arrow-functions-6.22.0.tgz",
      "integrity": "sha1-RSaSy3EdX3ncf4XkQM5BufJE0iE=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-block-scoped-functions": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-block-scoped-functions/-/babel-plugin-transform-es2015-block-scoped-functions-6.22.0.tgz",
      "integrity": "sha1-u8UbSflk1wy42OC5ToICRs46YUE=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-block-scoping": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-block-scoping/-/babel-plugin-transform-es2015-block-scoping-6.26.0.tgz",
      "integrity": "sha1-1w9SmcEwjQXBL0Y4E7CgnnOxiV8=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0",
        "lodash": "4.17.5"
      }
    },
    "babel-plugin-transform-es2015-classes": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-classes/-/babel-plugin-transform-es2015-classes-6.24.1.tgz",
      "integrity": "sha1-WkxYpQyclGHlZLSyo7+ryXolhNs=",
      "requires": {
        "babel-helper-define-map": "6.26.0",
        "babel-helper-function-name": "6.24.1",
        "babel-helper-optimise-call-expression": "6.24.1",
        "babel-helper-replace-supers": "6.24.1",
        "babel-messages": "6.23.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-computed-properties": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-computed-properties/-/babel-plugin-transform-es2015-computed-properties-6.24.1.tgz",
      "integrity": "sha1-b+Ko0WiV1WNPTNmZttNICjCBWbM=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-destructuring": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-destructuring/-/babel-plugin-transform-es2015-destructuring-6.23.0.tgz",
      "integrity": "sha1-mXux8auWf2gtKwh2/jWNYOdlxW0=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-duplicate-keys": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-duplicate-keys/-/babel-plugin-transform-es2015-duplicate-keys-6.24.1.tgz",
      "integrity": "sha1-c+s9MQypaePvnskcU3QabxV2Qj4=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-for-of": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-for-of/-/babel-plugin-transform-es2015-for-of-6.23.0.tgz",
      "integrity": "sha1-9HyVsrYT3x0+zC/bdXNiPHUkhpE=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-function-name": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-function-name/-/babel-plugin-transform-es2015-function-name-6.24.1.tgz",
      "integrity": "sha1-g0yJhTvDaxrw86TF26qU/Y6sqos=",
      "requires": {
        "babel-helper-function-name": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-literals": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-literals/-/babel-plugin-transform-es2015-literals-6.22.0.tgz",
      "integrity": "sha1-T1SgLWzWbPkVKAAZox0xklN3yi4=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-modules-amd": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-amd/-/babel-plugin-transform-es2015-modules-amd-6.24.1.tgz",
      "integrity": "sha1-Oz5UAXI5hC1tGcMBHEvS8AoA0VQ=",
      "requires": {
        "babel-plugin-transform-es2015-modules-commonjs": "6.26.0",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-modules-commonjs": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-commonjs/-/babel-plugin-transform-es2015-modules-commonjs-6.26.0.tgz",
      "integrity": "sha1-DYOUApt9xqvhqX7xgeAHWN0uXYo=",
      "requires": {
        "babel-plugin-transform-strict-mode": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-modules-systemjs": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-systemjs/-/babel-plugin-transform-es2015-modules-systemjs-6.24.1.tgz",
      "integrity": "sha1-/4mhQrkRmpBhlfXxBuzzBdlAfSM=",
      "requires": {
        "babel-helper-hoist-variables": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-modules-umd": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-umd/-/babel-plugin-transform-es2015-modules-umd-6.24.1.tgz",
      "integrity": "sha1-rJl+YoXNGO1hdq22B9YCNErThGg=",
      "requires": {
        "babel-plugin-transform-es2015-modules-amd": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-object-super": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-object-super/-/babel-plugin-transform-es2015-object-super-6.24.1.tgz",
      "integrity": "sha1-JM72muIcuDp/hgPa0CH1cusnj40=",
      "requires": {
        "babel-helper-replace-supers": "6.24.1",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-parameters": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-parameters/-/babel-plugin-transform-es2015-parameters-6.24.1.tgz",
      "integrity": "sha1-V6w1GrScrxSpfNE7CfZv3wpiXys=",
      "requires": {
        "babel-helper-call-delegate": "6.24.1",
        "babel-helper-get-function-arity": "6.24.1",
        "babel-runtime": "6.26.0",
        "babel-template": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-shorthand-properties": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-shorthand-properties/-/babel-plugin-transform-es2015-shorthand-properties-6.24.1.tgz",
      "integrity": "sha1-JPh11nIch2YbvZmkYi5R8U3jiqA=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-spread": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-spread/-/babel-plugin-transform-es2015-spread-6.22.0.tgz",
      "integrity": "sha1-1taKmfia7cRTbIGlQujdnxdG+NE=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-sticky-regex": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-sticky-regex/-/babel-plugin-transform-es2015-sticky-regex-6.24.1.tgz",
      "integrity": "sha1-AMHNsaynERLN8M9hJsLta0V8zbw=",
      "requires": {
        "babel-helper-regex": "6.26.0",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-template-literals": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-template-literals/-/babel-plugin-transform-es2015-template-literals-6.22.0.tgz",
      "integrity": "sha1-qEs0UPfp+PH2g51taH2oS7EjbY0=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-typeof-symbol": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-typeof-symbol/-/babel-plugin-transform-es2015-typeof-symbol-6.23.0.tgz",
      "integrity": "sha1-3sCfHN3/lLUqxz1QXITfWdzOs3I=",
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-es2015-unicode-regex": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-unicode-regex/-/babel-plugin-transform-es2015-unicode-regex-6.24.1.tgz",
      "integrity": "sha1-04sS9C6nMj9yk4fxinxa4frrNek=",
      "requires": {
        "babel-helper-regex": "6.26.0",
        "babel-runtime": "6.26.0",
        "regexpu-core": "2.0.0"
      }
    },
    "babel-plugin-transform-exponentiation-operator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-exponentiation-operator/-/babel-plugin-transform-exponentiation-operator-6.24.1.tgz",
      "integrity": "sha1-KrDJx/MJj6SJB3cruBP+QejeOg4=",
      "requires": {
        "babel-helper-builder-binary-assignment-operator-visitor": "6.24.1",
        "babel-plugin-syntax-exponentiation-operator": "6.13.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-export-extensions": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-export-extensions/-/babel-plugin-transform-export-extensions-6.22.0.tgz",
      "integrity": "sha1-U3OLR+deghhYnuqUbLvTkQm75lM=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-export-extensions": "6.13.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-flow-strip-types": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-flow-strip-types/-/babel-plugin-transform-flow-strip-types-6.22.0.tgz",
      "integrity": "sha1-hMtnKTXUNxT9wyvOhFaNh0Qc988=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-flow": "6.18.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-object-rest-spread": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-object-rest-spread/-/babel-plugin-transform-object-rest-spread-6.26.0.tgz",
      "integrity": "sha1-DzZpLVD+9rfi1LOsFHgTepY7ewY=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-object-rest-spread": "6.13.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-react-display-name": {
      "version": "6.25.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-display-name/-/babel-plugin-transform-react-display-name-6.25.0.tgz",
      "integrity": "sha1-Z+K/Hx6ck6sI25Z5LgU5K/LMKNE=",
      "dev": true,
      "requires": {
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-react-jsx": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx/-/babel-plugin-transform-react-jsx-6.24.1.tgz",
      "integrity": "sha1-hAoCjn30YN/DotKfDA2R9jduZqM=",
      "dev": true,
      "requires": {
        "babel-helper-builder-react-jsx": "6.26.0",
        "babel-plugin-syntax-jsx": "6.18.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-react-jsx-self": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx-self/-/babel-plugin-transform-react-jsx-self-6.22.0.tgz",
      "integrity": "sha1-322AqdomEqEh5t3XVYvL7PBuY24=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "6.18.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-react-jsx-source": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx-source/-/babel-plugin-transform-react-jsx-source-6.22.0.tgz",
      "integrity": "sha1-ZqwSFT9c0tF7PBkmj0vwGX9E7NY=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "6.18.0",
        "babel-runtime": "6.26.0"
      }
    },
    "babel-plugin-transform-regenerator": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-regenerator/-/babel-plugin-transform-regenerator-6.26.0.tgz",
      "integrity": "sha1-4HA2lvveJ/Cj78rPi03KL3s6jy8=",
      "requires": {
        "regenerator-transform": "0.10.1"
      }
    },
    "babel-plugin-transform-strict-mode": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-strict-mode/-/babel-plugin-transform-strict-mode-6.24.1.tgz",
      "integrity": "sha1-1fr3qleKZbvlkc9e2uBKDGcCB1g=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0"
      }
    },
    "babel-preset-env": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/babel-preset-env/-/babel-preset-env-1.6.1.tgz",
      "integrity": "sha512-W6VIyA6Ch9ePMI7VptNn2wBM6dbG0eSz25HEiL40nQXCsXGTGZSTZu1Iap+cj3Q0S5a7T9+529l/5Bkvd+afNA==",
      "requires": {
        "babel-plugin-check-es2015-constants": "6.22.0",
        "babel-plugin-syntax-trailing-function-commas": "6.22.0",
        "babel-plugin-transform-async-to-generator": "6.24.1",
        "babel-plugin-transform-es2015-arrow-functions": "6.22.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "6.22.0",
        "babel-plugin-transform-es2015-block-scoping": "6.26.0",
        "babel-plugin-transform-es2015-classes": "6.24.1",
        "babel-plugin-transform-es2015-computed-properties": "6.24.1",
        "babel-plugin-transform-es2015-destructuring": "6.23.0",
        "babel-plugin-transform-es2015-duplicate-keys": "6.24.1",
        "babel-plugin-transform-es2015-for-of": "6.23.0",
        "babel-plugin-transform-es2015-function-name": "6.24.1",
        "babel-plugin-transform-es2015-literals": "6.22.0",
        "babel-plugin-transform-es2015-modules-amd": "6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "6.26.0",
        "babel-plugin-transform-es2015-modules-systemjs": "6.24.1",
        "babel-plugin-transform-es2015-modules-umd": "6.24.1",
        "babel-plugin-transform-es2015-object-super": "6.24.1",
        "babel-plugin-transform-es2015-parameters": "6.24.1",
        "babel-plugin-transform-es2015-shorthand-properties": "6.24.1",
        "babel-plugin-transform-es2015-spread": "6.22.0",
        "babel-plugin-transform-es2015-sticky-regex": "6.24.1",
        "babel-plugin-transform-es2015-template-literals": "6.22.0",
        "babel-plugin-transform-es2015-typeof-symbol": "6.23.0",
        "babel-plugin-transform-es2015-unicode-regex": "6.24.1",
        "babel-plugin-transform-exponentiation-operator": "6.24.1",
        "babel-plugin-transform-regenerator": "6.26.0",
        "browserslist": "2.11.3",
        "invariant": "2.2.3",
        "semver": "5.5.0"
      }
    },
    "babel-preset-es2015": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-es2015/-/babel-preset-es2015-6.24.1.tgz",
      "integrity": "sha1-1EBQ1rwsn+6nAqrzjXJ6AhBTiTk=",
      "dev": true,
      "requires": {
        "babel-plugin-check-es2015-constants": "6.22.0",
        "babel-plugin-transform-es2015-arrow-functions": "6.22.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "6.22.0",
        "babel-plugin-transform-es2015-block-scoping": "6.26.0",
        "babel-plugin-transform-es2015-classes": "6.24.1",
        "babel-plugin-transform-es2015-computed-properties": "6.24.1",
        "babel-plugin-transform-es2015-destructuring": "6.23.0",
        "babel-plugin-transform-es2015-duplicate-keys": "6.24.1",
        "babel-plugin-transform-es2015-for-of": "6.23.0",
        "babel-plugin-transform-es2015-function-name": "6.24.1",
        "babel-plugin-transform-es2015-literals": "6.22.0",
        "babel-plugin-transform-es2015-modules-amd": "6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "6.26.0",
        "babel-plugin-transform-es2015-modules-systemjs": "6.24.1",
        "babel-plugin-transform-es2015-modules-umd": "6.24.1",
        "babel-plugin-transform-es2015-object-super": "6.24.1",
        "babel-plugin-transform-es2015-parameters": "6.24.1",
        "babel-plugin-transform-es2015-shorthand-properties": "6.24.1",
        "babel-plugin-transform-es2015-spread": "6.22.0",
        "babel-plugin-transform-es2015-sticky-regex": "6.24.1",
        "babel-plugin-transform-es2015-template-literals": "6.22.0",
        "babel-plugin-transform-es2015-typeof-symbol": "6.23.0",
        "babel-plugin-transform-es2015-unicode-regex": "6.24.1",
        "babel-plugin-transform-regenerator": "6.26.0"
      }
    },
    "babel-preset-flow": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-preset-flow/-/babel-preset-flow-6.23.0.tgz",
      "integrity": "sha1-5xIYiHCFrpoktb5Baa/7WZgWxJ0=",
      "dev": true,
      "requires": {
        "babel-plugin-transform-flow-strip-types": "6.22.0"
      }
    },
    "babel-preset-react": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-react/-/babel-preset-react-6.24.1.tgz",
      "integrity": "sha1-umnfrqRfw+xjm2pOzqbhdwLJE4A=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "6.18.0",
        "babel-plugin-transform-react-display-name": "6.25.0",
        "babel-plugin-transform-react-jsx": "6.24.1",
        "babel-plugin-transform-react-jsx-self": "6.22.0",
        "babel-plugin-transform-react-jsx-source": "6.22.0",
        "babel-preset-flow": "6.23.0"
      }
    },
    "babel-preset-stage-1": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-stage-1/-/babel-preset-stage-1-6.24.1.tgz",
      "integrity": "sha1-dpLNfc1oSZB+auSgqFWJz7niv7A=",
      "dev": true,
      "requires": {
        "babel-plugin-transform-class-constructor-call": "6.24.1",
        "babel-plugin-transform-export-extensions": "6.22.0",
        "babel-preset-stage-2": "6.24.1"
      }
    },
    "babel-preset-stage-2": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-stage-2/-/babel-preset-stage-2-6.24.1.tgz",
      "integrity": "sha1-2eKWD7PXEYfw5k7sYrwHdnIZvcE=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-dynamic-import": "6.18.0",
        "babel-plugin-transform-class-properties": "6.24.1",
        "babel-plugin-transform-decorators": "6.24.1",
        "babel-preset-stage-3": "6.24.1"
      }
    },
    "babel-preset-stage-3": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-stage-3/-/babel-preset-stage-3-6.24.1.tgz",
      "integrity": "sha1-g2raCp56f6N8sTj7kyb4eTSkg5U=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-trailing-function-commas": "6.22.0",
        "babel-plugin-transform-async-generator-functions": "6.24.1",
        "babel-plugin-transform-async-to-generator": "6.24.1",
        "babel-plugin-transform-exponentiation-operator": "6.24.1",
        "babel-plugin-transform-object-rest-spread": "6.26.0"
      }
    },
    "babel-register": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-register/-/babel-register-6.26.0.tgz",
      "integrity": "sha1-btAhFz4vy0htestFxgCahW9kcHE=",
      "dev": true,
      "requires": {
        "babel-core": "6.26.0",
        "babel-runtime": "6.26.0",
        "core-js": "2.5.3",
        "home-or-tmp": "2.0.0",
        "lodash": "4.17.5",
        "mkdirp": "0.5.1",
        "source-map-support": "0.4.18"
      },
      "dependencies": {
        "core-js": {
          "version": "2.5.3",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.5.3.tgz",
          "integrity": "sha1-isw4NFgk8W2DZbfJtCWRaOjtYD4=",
          "dev": true
        }
      }
    },
    "babel-runtime": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
      "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
      "requires": {
        "core-js": "2.5.3",
        "regenerator-runtime": "0.11.1"
      },
      "dependencies": {
        "core-js": {
          "version": "2.5.3",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.5.3.tgz",
          "integrity": "sha1-isw4NFgk8W2DZbfJtCWRaOjtYD4="
        }
      }
    },
    "babel-template": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-template/-/babel-template-6.26.0.tgz",
      "integrity": "sha1-3gPi0WOWsGn0bdn/+FIfsaDjXgI=",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-traverse": "6.26.0",
        "babel-types": "6.26.0",
        "babylon": "6.18.0",
        "lodash": "4.17.5"
      }
    },
    "babel-traverse": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-traverse/-/babel-traverse-6.26.0.tgz",
      "integrity": "sha1-RqnL1+3MYsjlwGTi0tjQ9ANXZu4=",
      "requires": {
        "babel-code-frame": "6.26.0",
        "babel-messages": "6.23.0",
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "babylon": "6.18.0",
        "debug": "2.6.9",
        "globals": "9.18.0",
        "invariant": "2.2.3",
        "lodash": "4.17.5"
      }
    },
    "babel-types": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-types/-/babel-types-6.26.0.tgz",
      "integrity": "sha1-o7Bz+Uq0nrb6Vc1lInozQ4BjJJc=",
      "requires": {
        "babel-runtime": "6.26.0",
        "esutils": "2.0.2",
        "lodash": "4.17.5",
        "to-fast-properties": "1.0.3"
      }
    },
    "babylon": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babylon/-/babylon-6.18.0.tgz",
      "integrity": "sha512-q/UEjfGJ2Cm3oKV71DJz9d25TPnq5rhBVL2Q4fA5wcC3jcrdn7+SssEybFIxwAvvP+YCsCYNKughoF33GxgycQ=="
    },
    "balanced-match": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
      "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c=",
      "dev": true
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "dev": true,
      "requires": {
        "cache-base": "1.0.1",
        "class-utils": "0.3.6",
        "component-emitter": "1.2.1",
        "define-property": "1.0.0",
        "isobject": "3.0.1",
        "mixin-deep": "1.3.1",
        "pascalcase": "0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "1.0.2"
          }
        }
      }
    },
    "base64-js": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.2.3.tgz",
      "integrity": "sha512-MsAhsUW1GxCdgYSO6tAfZrNapmUKk7mWx/k5mFY/A1gBtkaCaNapTg+FExCw1r9yeaZhqx/xPg43xgTFH6KL5w==",
      "dev": true
    },
    "batch": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
      "integrity": "sha1-3DQxT05nkxgJP8dgJyUl+UvyXBY=",
      "dev": true
    },
    "bcrypt-pbkdf": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.1.tgz",
      "integrity": "sha1-Y7xdy2EzG5K8Bf1SiVPDNGKgb40=",
      "dev": true,
      "optional": true,
      "requires": {
        "tweetnacl": "0.14.5"
      }
    },
    "big.js": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-3.2.0.tgz",
      "integrity": "sha512-+hN/Zh2D08Mx65pZ/4g5bsmNiZUuChDiQfTUQ7qJr4/kuopCr88xZsAXv6mBoZEsUI4OuGHlX59qE94K2mMW8Q==",
      "dev": true
    },
    "binary-extensions": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.11.0.tgz",
      "integrity": "sha1-RqoXUftqL5PuXmibsQh9SxTGwgU=",
      "dev": true
    },
    "binaryextensions": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/binaryextensions/-/binaryextensions-2.1.1.tgz",
      "integrity": "sha512-XBaoWE9RW8pPdPQNibZsW2zh8TW6gcarXp1FZPwT8Uop8ScSNldJEWf2k9l3HeTqdrEwsOsFcq74RiJECW34yA==",
      "dev": true
    },
    "bluebird": {
      "version": "3.5.1",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.5.1.tgz",
      "integrity": "sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA==",
      "dev": true
    },
    "bn.js": {
      "version": "4.11.8",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
      "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA==",
      "dev": true
    },
    "body-parser": {
      "version": "1.18.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.18.2.tgz",
      "integrity": "sha1-h2eKGdhLR9hZuDGZvVm84iKxBFQ=",
      "dev": true,
      "requires": {
        "bytes": "3.0.0",
        "content-type": "1.0.4",
        "debug": "2.6.9",
        "depd": "1.1.2",
        "http-errors": "1.6.2",
        "iconv-lite": "0.4.19",
        "on-finished": "2.3.0",
        "qs": "6.5.1",
        "raw-body": "2.3.2",
        "type-is": "1.6.16"
      }
    },
    "bonjour": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/bonjour/-/bonjour-3.5.0.tgz",
      "integrity": "sha1-jokKGD2O6aI5OzhExpGkK897yfU=",
      "dev": true,
      "requires": {
        "array-flatten": "2.1.1",
        "deep-equal": "1.0.1",
        "dns-equal": "1.0.0",
        "dns-txt": "2.0.2",
        "multicast-dns": "6.2.3",
        "multicast-dns-service-types": "1.1.0"
      }
    },
    "boom": {
      "version": "2.10.1",
      "resolved": "https://registry.npmjs.org/boom/-/boom-2.10.1.tgz",
      "integrity": "sha1-OciRjO/1eZ+D+UkqhI9iWt0Mdm8=",
      "dev": true,
      "requires": {
        "hoek": "2.16.3"
      }
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "dev": true,
      "requires": {
        "balanced-match": "1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.1.tgz",
      "integrity": "sha512-SO5lYHA3vO6gz66erVvedSCkp7AKWdv6VcQ2N4ysXfPxdAlxAMMAdwegGGcv1Bqwm7naF1hNdk5d6AAIEHV2nQ==",
      "dev": true,
      "requires": {
        "arr-flatten": "1.1.0",
        "array-unique": "0.3.2",
        "define-property": "1.0.0",
        "extend-shallow": "2.0.1",
        "fill-range": "4.0.0",
        "isobject": "3.0.1",
        "kind-of": "6.0.2",
        "repeat-element": "1.1.2",
        "snapdragon": "0.8.1",
        "snapdragon-node": "2.1.1",
        "split-string": "3.1.0",
        "to-regex": "3.0.2"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "1.0.2"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        }
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8=",
      "dev": true
    },
    "browserify-aes": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.1.1.tgz",
      "integrity": "sha512-UGnTYAnB2a3YuYKIRy1/4FB2HdM866E0qC46JXvVTYKlBlZlnvfpSfY6OKfXZAkv70eJ2a1SqzpAo5CRhZGDFg==",
      "dev": true,
      "requires": {
        "buffer-xor": "1.0.3",
        "cipher-base": "1.0.4",
        "create-hash": "1.1.3",
        "evp_bytestokey": "1.0.3",
        "inherits": "2.0.3",
        "safe-buffer": "5.1.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.0.tgz",
      "integrity": "sha1-mYgkSHS/XtTijalWZtzWasj8Njo=",
      "dev": true,
      "requires": {
        "browserify-aes": "1.1.1",
        "browserify-des": "1.0.0",
        "evp_bytestokey": "1.0.3"
      }
    },
    "browserify-des": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.0.tgz",
      "integrity": "sha1-2qJ3cXRwki7S/hhZQRihdUOXId0=",
      "dev": true,
      "requires": {
        "cipher-base": "1.0.4",
        "des.js": "1.0.0",
        "inherits": "2.0.3"
      }
    },
    "browserify-rsa": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
      "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "randombytes": "2.0.6"
      }
    },
    "browserify-sign": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
      "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "browserify-rsa": "4.0.1",
        "create-hash": "1.1.3",
        "create-hmac": "1.1.6",
        "elliptic": "6.4.0",
        "inherits": "2.0.3",
        "parse-asn1": "5.1.0"
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "dev": true,
      "requires": {
        "pako": "1.0.6"
      }
    },
    "browserslist": {
      "version": "2.11.3",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-2.11.3.tgz",
      "integrity": "sha512-yWu5cXT7Av6mVwzWc8lMsJMHWn4xyjSuGYi4IozbVTLUOEYPSagUB8kiMDUHA1fS3zjr8nkxkn9jdvug4BBRmA==",
      "requires": {
        "caniuse-lite": "1.0.30000810",
        "electron-to-chromium": "1.3.34"
      }
    },
    "buffer": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.1.tgz",
      "integrity": "sha1-bRu2AbB6TvztlwlBMgkwJ8lbwpg=",
      "dev": true,
      "requires": {
        "base64-js": "1.2.3",
        "ieee754": "1.1.8",
        "isarray": "1.0.0"
      }
    },
    "buffer-indexof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-indexof/-/buffer-indexof-1.1.1.tgz",
      "integrity": "sha512-4/rOEg86jivtPTeOUUT61jJO1Ya1TrR/OkqCSZDyq84WJh3LuuiphBYJN+fm5xufIk4XAFcEwte/8WzC8If/1g==",
      "dev": true
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk=",
      "dev": true
    },
    "builtin-modules": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-1.1.1.tgz",
      "integrity": "sha1-Jw8HbFpywC9bZaR9+Uxf46J4iS8=",
      "dev": true
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug=",
      "dev": true
    },
    "bytes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.0.0.tgz",
      "integrity": "sha1-0ygVQE1olpn4Wk6k+odV3ROpYEg=",
      "dev": true
    },
    "cacache": {
      "version": "10.0.4",
      "resolved": "https://registry.npmjs.org/cacache/-/cacache-10.0.4.tgz",
      "integrity": "sha512-Dph0MzuH+rTQzGPNT9fAnrPmMmjKfST6trxJeK7NQuHRaVw24VzPRWTmg9MpcwOVQZO0E1FBICUlFeNaKPIfHA==",
      "dev": true,
      "requires": {
        "bluebird": "3.5.1",
        "chownr": "1.0.1",
        "glob": "7.1.2",
        "graceful-fs": "4.1.11",
        "lru-cache": "4.1.1",
        "mississippi": "2.0.0",
        "mkdirp": "0.5.1",
        "move-concurrently": "1.0.1",
        "promise-inflight": "1.0.1",
        "rimraf": "2.6.2",
        "ssri": "5.2.4",
        "unique-filename": "1.1.0",
        "y18n": "4.0.0"
      }
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "dev": true,
      "requires": {
        "collection-visit": "1.0.0",
        "component-emitter": "1.2.1",
        "get-value": "2.0.6",
        "has-value": "1.0.0",
        "isobject": "3.0.1",
        "set-value": "2.0.0",
        "to-object-path": "0.3.0",
        "union-value": "1.0.0",
        "unset-value": "1.0.0"
      }
    },
    "cacheable-request": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/cacheable-request/-/cacheable-request-2.1.4.tgz",
      "integrity": "sha1-DYCIAbY0KtM8kd+dC0TcCbkeXD0=",
      "dev": true,
      "requires": {
        "clone-response": "1.0.2",
        "get-stream": "3.0.0",
        "http-cache-semantics": "3.8.1",
        "keyv": "3.0.0",
        "lowercase-keys": "1.0.0",
        "normalize-url": "2.0.1",
        "responselike": "1.0.2"
      }
    },
    "camelcase": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-2.1.1.tgz",
      "integrity": "sha1-fB0W1nmhu+WcoCys7PsBHiAfWh8=",
      "dev": true
    },
    "camelcase-keys": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/camelcase-keys/-/camelcase-keys-2.1.0.tgz",
      "integrity": "sha1-MIvur/3ygRkFHvodkyITyRuPkuc=",
      "dev": true,
      "requires": {
        "camelcase": "2.1.1",
        "map-obj": "1.0.1"
      }
    },
    "caniuse-lite": {
      "version": "1.0.30000810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30000810.tgz",
      "integrity": "sha512-/0Q00Oie9C72P8zQHtFvzmkrMC3oOFUnMWjCy5F2+BE8lzICm91hQPhh0+XIsAFPKOe2Dh3pKgbRmU3EKxfldA=="
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw=",
      "dev": true
    },
    "chain-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/chain-function/-/chain-function-1.0.0.tgz",
      "integrity": "sha1-DUqzfn4Y6tC9xHuSB2QRjOWHM9w="
    },
    "chalk": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.3.1.tgz",
      "integrity": "sha512-QUU4ofkDoMIVO7hcx1iPTISs88wsO8jA92RQIm4JAwZvFGGAV2hSAA1NX7oVj2Ej2Q6NDTcRDjPTFrMCRZoJ6g==",
      "dev": true,
      "requires": {
        "ansi-styles": "3.2.0",
        "escape-string-regexp": "1.0.5",
        "supports-color": "5.2.0"
      }
    },
    "chardet": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.4.2.tgz",
      "integrity": "sha1-tUc7M9yXxCTl2Y3IfVXU2KKci/I=",
      "dev": true
    },
    "chokidar": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-1.7.0.tgz",
      "integrity": "sha1-eY5ol3gVHIB2tLNg5e3SjNortGg=",
      "dev": true,
      "requires": {
        "anymatch": "1.3.2",
        "async-each": "1.0.1",
        "fsevents": "1.1.3",
        "glob-parent": "2.0.0",
        "inherits": "2.0.3",
        "is-binary-path": "1.0.1",
        "is-glob": "2.0.1",
        "path-is-absolute": "1.0.1",
        "readdirp": "2.1.0"
      }
    },
    "chownr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.0.1.tgz",
      "integrity": "sha1-4qdQQqlVGQi+vSW4Uj1fl2nXkYE=",
      "dev": true
    },
    "chrome-trace-event": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-0.1.2.tgz",
      "integrity": "sha1-kPNohdU0WlBiEzLwcXtZWIPV2YI=",
      "dev": true
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "safe-buffer": "5.1.1"
      }
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "dev": true,
      "requires": {
        "arr-union": "3.1.0",
        "define-property": "0.2.5",
        "isobject": "3.0.1",
        "static-extend": "0.1.2"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "cli-cursor": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-2.1.0.tgz",
      "integrity": "sha1-s12sN2R5+sw+lHR9QdDQ9SOP/LU=",
      "dev": true,
      "requires": {
        "restore-cursor": "2.0.0"
      }
    },
    "cli-spinners": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-0.1.2.tgz",
      "integrity": "sha1-u3ZNiOGF+54eaiofGXcjGPYF4xw=",
      "dev": true
    },
    "cli-table": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/cli-table/-/cli-table-0.3.1.tgz",
      "integrity": "sha1-9TsFJmqLGguTSz0IIebi3FkUriM=",
      "dev": true,
      "requires": {
        "colors": "1.0.3"
      },
      "dependencies": {
        "colors": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/colors/-/colors-1.0.3.tgz",
          "integrity": "sha1-BDP0TYCWgP3rYO0mDxsMJi6CpAs=",
          "dev": true
        }
      }
    },
    "cli-truncate": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/cli-truncate/-/cli-truncate-0.2.1.tgz",
      "integrity": "sha1-nxXPuwcFAFNpIWxiasfQWrkN1XQ=",
      "dev": true,
      "requires": {
        "slice-ansi": "0.0.4",
        "string-width": "1.0.2"
      },
      "dependencies": {
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "1.1.0",
            "is-fullwidth-code-point": "1.0.0",
            "strip-ansi": "3.0.1"
          }
        }
      }
    },
    "cli-width": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-2.2.0.tgz",
      "integrity": "sha1-/xnt6Kml5XkyQUewwR8PvLq+1jk=",
      "dev": true
    },
    "cliui": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-3.2.0.tgz",
      "integrity": "sha1-EgYBU3qRbSmUD5NNo7SNWFo5IT0=",
      "dev": true,
      "requires": {
        "string-width": "1.0.2",
        "strip-ansi": "3.0.1",
        "wrap-ansi": "2.1.0"
      },
      "dependencies": {
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "1.1.0",
            "is-fullwidth-code-point": "1.0.0",
            "strip-ansi": "3.0.1"
          }
        }
      }
    },
    "clone": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/clone/-/clone-1.0.3.tgz",
      "integrity": "sha1-KY1+IjFmD0DAA8LtMUDezz9TCF8=",
      "dev": true
    },
    "clone-buffer": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/clone-buffer/-/clone-buffer-1.0.0.tgz",
      "integrity": "sha1-4+JbIHrE5wGvch4staFnksrD3Fg=",
      "dev": true
    },
    "clone-response": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/clone-response/-/clone-response-1.0.2.tgz",
      "integrity": "sha1-0dyXOSAxTfZ/vrlCI7TuNQI56Ws=",
      "dev": true,
      "requires": {
        "mimic-response": "1.0.0"
      }
    },
    "clone-stats": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/clone-stats/-/clone-stats-0.0.1.tgz",
      "integrity": "sha1-uI+UqCzzi4eR1YBG6kAprYjKmdE=",
      "dev": true
    },
    "cloneable-readable": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/cloneable-readable/-/cloneable-readable-1.0.0.tgz",
      "integrity": "sha1-pikNQT8hemEjL5XkWP84QYz7ARc=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "process-nextick-args": "1.0.7",
        "through2": "2.0.3"
      },
      "dependencies": {
        "process-nextick-args": {
          "version": "1.0.7",
          "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-1.0.7.tgz",
          "integrity": "sha1-FQ4gt1ZZCtP5EJPyWk8q2L/zC6M=",
          "dev": true
        }
      }
    },
    "co": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
      "integrity": "sha1-bqa989hTrlTMuOR7+gvz+QMfsYQ=",
      "dev": true
    },
    "code-point-at": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
      "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c=",
      "dev": true
    },
    "codecov": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/codecov/-/codecov-3.0.0.tgz",
      "integrity": "sha1-wnO4xPEpRXI+jcnSWAPYk0Pl8o4=",
      "dev": true,
      "requires": {
        "argv": "0.0.2",
        "request": "2.81.0",
        "urlgrey": "0.4.4"
      }
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "dev": true,
      "requires": {
        "map-visit": "1.0.0",
        "object-visit": "1.0.1"
      }
    },
    "color-convert": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.1.tgz",
      "integrity": "sha512-mjGanIiwQJskCC18rPR6OmrZ6fm2Lc7PeGFYwCmy5J34wC6F1PzdGL6xeMfmgicfYcNLGuVFA3WzXtIDCQSZxQ==",
      "dev": true,
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU=",
      "dev": true
    },
    "colors": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/colors/-/colors-1.1.2.tgz",
      "integrity": "sha1-FopHAXVran9RoSzgyXv6KMCE7WM=",
      "dev": true
    },
    "combined-stream": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.6.tgz",
      "integrity": "sha1-cj599ugBrFYTETp+RFqbactjKBg=",
      "dev": true,
      "requires": {
        "delayed-stream": "1.0.0"
      }
    },
    "commander": {
      "version": "2.13.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.13.0.tgz",
      "integrity": "sha512-MVuS359B+YzaWqjCL/c+22gfryv+mCBPHAv3zyVI2GN8EY6IRP8VwtasXn8jyyhvvq84R4ImN1OKRtcbIasjYA==",
      "dev": true
    },
    "commondir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
      "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs=",
      "dev": true
    },
    "component-emitter": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.2.1.tgz",
      "integrity": "sha1-E3kY1teCg/ffemt8WmPhQOaUJeY=",
      "dev": true
    },
    "compressible": {
      "version": "2.0.13",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.13.tgz",
      "integrity": "sha1-DRAgq5JLL9tNYnmHXH1tq6a6p6k=",
      "dev": true,
      "requires": {
        "mime-db": "1.33.0"
      }
    },
    "compression": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/compression/-/compression-1.7.2.tgz",
      "integrity": "sha1-qv+81qr4VLROuygDU9WtFlH1mmk=",
      "dev": true,
      "requires": {
        "accepts": "1.3.4",
        "bytes": "3.0.0",
        "compressible": "2.0.13",
        "debug": "2.6.9",
        "on-headers": "1.0.1",
        "safe-buffer": "5.1.1",
        "vary": "1.1.2"
      }
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s=",
      "dev": true
    },
    "concat-stream": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.0.tgz",
      "integrity": "sha1-CqxmL9Ur54lk1VMvaUeE5wEQrPc=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "readable-stream": "2.3.4",
        "typedarray": "0.0.6"
      }
    },
    "connect-history-api-fallback": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-1.5.0.tgz",
      "integrity": "sha1-sGhzk0vF40T+9hGhlqb6rgruAVo=",
      "dev": true
    },
    "console-browserify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.1.0.tgz",
      "integrity": "sha1-8CQcRXMKn8YyOyBtvzjtx0HQuxA=",
      "dev": true,
      "requires": {
        "date-now": "0.1.4"
      }
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U=",
      "dev": true
    },
    "content-disposition": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.2.tgz",
      "integrity": "sha1-DPaLud318r55YcOoUXjLhdunjLQ=",
      "dev": true
    },
    "content-type": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
      "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA==",
      "dev": true
    },
    "convert-source-map": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.5.1.tgz",
      "integrity": "sha1-uCeAl7m8IpNl3lxiz1/K7YtVmeU=",
      "dev": true
    },
    "cookie": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.3.1.tgz",
      "integrity": "sha1-5+Ch+e9DtMi6klxcWpboBtFoc7s=",
      "dev": true
    },
    "cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw=",
      "dev": true
    },
    "copy-concurrently": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
      "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
      "dev": true,
      "requires": {
        "aproba": "1.2.0",
        "fs-write-stream-atomic": "1.0.10",
        "iferr": "0.1.5",
        "mkdirp": "0.5.1",
        "rimraf": "2.6.2",
        "run-queue": "1.0.3"
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=",
      "dev": true
    },
    "core-js": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-1.2.7.tgz",
      "integrity": "sha1-ZSKUwUZR2yj6k70tX/KYOk8IxjY="
    },
    "core-util-is": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
      "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac=",
      "dev": true
    },
    "create-ecdh": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.0.tgz",
      "integrity": "sha1-iIxyNZbN92EvZJgjPuvXo1MBc30=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "elliptic": "6.4.0"
      }
    },
    "create-hash": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.1.3.tgz",
      "integrity": "sha1-YGBCrIuSYnUPSDyt2rD1gZFy2P0=",
      "dev": true,
      "requires": {
        "cipher-base": "1.0.4",
        "inherits": "2.0.3",
        "ripemd160": "2.0.1",
        "sha.js": "2.4.10"
      }
    },
    "create-hmac": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.6.tgz",
      "integrity": "sha1-rLniIaThe9sHbpBlfEK5PjcmzwY=",
      "dev": true,
      "requires": {
        "cipher-base": "1.0.4",
        "create-hash": "1.1.3",
        "inherits": "2.0.3",
        "ripemd160": "2.0.1",
        "safe-buffer": "5.1.1",
        "sha.js": "2.4.10"
      }
    },
    "cross-spawn": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-5.1.0.tgz",
      "integrity": "sha1-6L0O/uWPz/b4+UUQoKVUu/ojVEk=",
      "dev": true,
      "requires": {
        "lru-cache": "4.1.1",
        "shebang-command": "1.2.0",
        "which": "1.3.0"
      }
    },
    "cryptiles": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/cryptiles/-/cryptiles-2.0.5.tgz",
      "integrity": "sha1-O9/s3GCBR8HGcgL6KR59ylnqo7g=",
      "dev": true,
      "requires": {
        "boom": "2.10.1"
      }
    },
    "crypto-browserify": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
      "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
      "dev": true,
      "requires": {
        "browserify-cipher": "1.0.0",
        "browserify-sign": "4.0.4",
        "create-ecdh": "4.0.0",
        "create-hash": "1.1.3",
        "create-hmac": "1.1.6",
        "diffie-hellman": "5.0.2",
        "inherits": "2.0.3",
        "pbkdf2": "3.0.14",
        "public-encrypt": "4.0.0",
        "randombytes": "2.0.6",
        "randomfill": "1.0.4"
      }
    },
    "currently-unhandled": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/currently-unhandled/-/currently-unhandled-0.4.1.tgz",
      "integrity": "sha1-mI3zP+qxke95mmE2nddsF635V+o=",
      "dev": true,
      "requires": {
        "array-find-index": "1.0.2"
      }
    },
    "cyclist": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-0.2.2.tgz",
      "integrity": "sha1-GzN5LhHpFKL9bW7WRHRkRE5fpkA=",
      "dev": true
    },
    "dargs": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/dargs/-/dargs-5.1.0.tgz",
      "integrity": "sha1-7H6lDHhWTNNsnV7Bj2Yyn63ieCk=",
      "dev": true
    },
    "dashdash": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
      "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
      "dev": true,
      "requires": {
        "assert-plus": "1.0.0"
      },
      "dependencies": {
        "assert-plus": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
          "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
          "dev": true
        }
      }
    },
    "date-fns": {
      "version": "1.29.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-1.29.0.tgz",
      "integrity": "sha512-lbTXWZ6M20cWH8N9S6afb0SBm6tMk+uUg6z3MqHPKE9atmsY3kJkTm8vKe93izJ2B2+q5MV990sM2CHgtAZaOw==",
      "dev": true
    },
    "date-now": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/date-now/-/date-now-0.1.4.tgz",
      "integrity": "sha1-6vQ5/U1ISK105cx9vvIAZyueNFs=",
      "dev": true
    },
    "dateformat": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/dateformat/-/dateformat-2.2.0.tgz",
      "integrity": "sha1-QGXiATz5+5Ft39gu+1Bq1MZ2kGI=",
      "dev": true
    },
    "debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "requires": {
        "ms": "2.0.0"
      }
    },
    "decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA=",
      "dev": true
    },
    "decode-uri-component": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU=",
      "dev": true
    },
    "decompress-response": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-3.3.0.tgz",
      "integrity": "sha1-gKTdMjdIOEv6JICDYirt7Jgq3/M=",
      "dev": true,
      "requires": {
        "mimic-response": "1.0.0"
      }
    },
    "deep-equal": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-1.0.1.tgz",
      "integrity": "sha1-9dJgKStmDghO/0zbyfCK0yR0SLU=",
      "dev": true
    },
    "deep-extend": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.4.2.tgz",
      "integrity": "sha1-SLaZwn4zS/ifEIkr5DL25MfTSn8=",
      "dev": true
    },
    "define-properties": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.2.tgz",
      "integrity": "sha1-g6c/L+pWmJj7c3GTyPhzyvbUXJQ=",
      "dev": true,
      "requires": {
        "foreach": "2.0.5",
        "object-keys": "1.0.11"
      }
    },
    "define-property": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
      "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
      "dev": true,
      "requires": {
        "is-descriptor": "1.0.2",
        "isobject": "3.0.1"
      }
    },
    "del": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/del/-/del-3.0.0.tgz",
      "integrity": "sha1-U+z2mf/LyzljdpGrE7rxYIGXZuU=",
      "dev": true,
      "requires": {
        "globby": "6.1.0",
        "is-path-cwd": "1.0.0",
        "is-path-in-cwd": "1.0.0",
        "p-map": "1.2.0",
        "pify": "3.0.0",
        "rimraf": "2.6.2"
      }
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk=",
      "dev": true
    },
    "depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak=",
      "dev": true
    },
    "des.js": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.0.tgz",
      "integrity": "sha1-wHTS4qpqipoH29YfmhXCzYPsjsw=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "minimalistic-assert": "1.0.0"
      }
    },
    "destroy": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
      "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA=",
      "dev": true
    },
    "detect-conflict": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/detect-conflict/-/detect-conflict-1.0.1.tgz",
      "integrity": "sha1-CIZXpmqWHAUBnbfEIwiDsca0F24=",
      "dev": true
    },
    "detect-indent": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/detect-indent/-/detect-indent-4.0.0.tgz",
      "integrity": "sha1-920GQ1LN9Docts5hnE7jqUdd4gg=",
      "dev": true,
      "requires": {
        "repeating": "2.0.1"
      }
    },
    "detect-node": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.0.3.tgz",
      "integrity": "sha1-ogM8CcyOFY03dI+951B4Mr1s4Sc=",
      "dev": true
    },
    "diff": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/diff/-/diff-3.4.0.tgz",
      "integrity": "sha512-QpVuMTEoJMF7cKzi6bvWhRulU1fZqZnvyVQgNhPaxxuTYwyjn/j1v9falseQ/uXWwPnO56RBfwtg4h/EQXmucA==",
      "dev": true
    },
    "diffie-hellman": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.2.tgz",
      "integrity": "sha1-tYNXOScM/ias9jIJn97SoH8gnl4=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "miller-rabin": "4.0.1",
        "randombytes": "2.0.6"
      }
    },
    "dns-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/dns-equal/-/dns-equal-1.0.0.tgz",
      "integrity": "sha1-s55/HabrCnW6nBcySzR1PEfgZU0=",
      "dev": true
    },
    "dns-packet": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-1.3.1.tgz",
      "integrity": "sha512-0UxfQkMhYAUaZI+xrNZOz/as5KgDU0M/fQ9b6SpkyLbk3GEswDi6PADJVaYJradtRVsRIlF1zLyOodbcTCDzUg==",
      "dev": true,
      "requires": {
        "ip": "1.1.5",
        "safe-buffer": "5.1.1"
      }
    },
    "dns-txt": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/dns-txt/-/dns-txt-2.0.2.tgz",
      "integrity": "sha1-uR2Ab10nGI5Ks+fRB9iBocxGQrY=",
      "dev": true,
      "requires": {
        "buffer-indexof": "1.1.1"
      }
    },
    "dom-helpers": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-3.3.1.tgz",
      "integrity": "sha512-2Sm+JaYn74OiTM2wHvxJOo3roiq/h25Yi69Fqk269cNUwIXsCvATB6CRSFC9Am/20G2b28hGv/+7NiWydIrPvg=="
    },
    "dom-walk": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/dom-walk/-/dom-walk-0.1.1.tgz",
      "integrity": "sha1-ZyIm3HTI95mtNTB9+TaroRrNYBg=",
      "dev": true
    },
    "domain-browser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
      "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA==",
      "dev": true
    },
    "duplexer3": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/duplexer3/-/duplexer3-0.1.4.tgz",
      "integrity": "sha1-7gHdHKwO08vH/b6jfcCo8c4ALOI=",
      "dev": true
    },
    "duplexify": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.5.3.tgz",
      "integrity": "sha512-g8ID9OroF9hKt2POf8YLayy+9594PzmM3scI00/uBXocX3TWNgoB67hjzkFe9ITAbQOne/lLdBxHXvYUM4ZgGA==",
      "dev": true,
      "requires": {
        "end-of-stream": "1.4.1",
        "inherits": "2.0.3",
        "readable-stream": "2.3.4",
        "stream-shift": "1.0.0"
      }
    },
    "ecc-jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.1.tgz",
      "integrity": "sha1-D8c6ntXw1Tw4GTOYUj735UN3dQU=",
      "dev": true,
      "optional": true,
      "requires": {
        "jsbn": "0.1.1"
      }
    },
    "editions": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/editions/-/editions-1.3.4.tgz",
      "integrity": "sha512-gzao+mxnYDzIysXKMQi/+M1mjy/rjestjg6OPoYTtI+3Izp23oiGZitsl9lPDPiTGXbcSIk1iJWhliSaglxnUg==",
      "dev": true
    },
    "ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0=",
      "dev": true
    },
    "ejs": {
      "version": "2.5.7",
      "resolved": "https://registry.npmjs.org/ejs/-/ejs-2.5.7.tgz",
      "integrity": "sha1-zIcsFoiArjxxiXYv1f/ACJbJUYo=",
      "dev": true
    },
    "electron-to-chromium": {
      "version": "1.3.34",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.3.34.tgz",
      "integrity": "sha1-2TSY9AORuwwWpgPYJBuZUUBBV+0="
    },
    "elegant-spinner": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/elegant-spinner/-/elegant-spinner-1.0.1.tgz",
      "integrity": "sha1-2wQ1IcldfjA/2PNFvtwzSc+wcp4=",
      "dev": true
    },
    "elliptic": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",
      "integrity": "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "brorand": "1.1.0",
        "hash.js": "1.1.3",
        "hmac-drbg": "1.0.1",
        "inherits": "2.0.3",
        "minimalistic-assert": "1.0.0",
        "minimalistic-crypto-utils": "1.0.1"
      }
    },
    "emojis-list": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-2.1.0.tgz",
      "integrity": "sha1-TapNnbAPmBmIDHn6RXrlsJof04k=",
      "dev": true
    },
    "encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k=",
      "dev": true
    },
    "encoding": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.12.tgz",
      "integrity": "sha1-U4tm8+5izRq1HsMjgp0flIDHS+s=",
      "requires": {
        "iconv-lite": "0.4.19"
      }
    },
    "end-of-stream": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.1.tgz",
      "integrity": "sha512-1MkrZNvWTKCaigbn+W15elq2BB/L22nqrSY5DKlo3X6+vclJm8Bb5djXJBmEX6fS3+zCh/F4VBK5Z2KxJt4s2Q==",
      "dev": true,
      "requires": {
        "once": "1.4.0"
      }
    },
    "enhanced-resolve": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.0.0.tgz",
      "integrity": "sha512-jox/62b2GofV1qTUQTMPEJSDIGycS43evqYzD/KVtEb9OCoki9cnacUPxCrZa7JfPzZSYOCZhu9O9luaMxAX8g==",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "memory-fs": "0.4.1",
        "tapable": "1.0.0"
      }
    },
    "errno": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
      "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
      "dev": true,
      "requires": {
        "prr": "1.0.1"
      }
    },
    "error": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/error/-/error-7.0.2.tgz",
      "integrity": "sha1-pfdf/02ZJhJt2sDqXcOOaJFTywI=",
      "dev": true,
      "requires": {
        "string-template": "0.2.1",
        "xtend": "4.0.1"
      }
    },
    "error-ex": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.1.tgz",
      "integrity": "sha1-+FWobOYa3E6GIcPNoh56dhLDqNw=",
      "dev": true,
      "requires": {
        "is-arrayish": "0.2.1"
      }
    },
    "es-abstract": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.10.0.tgz",
      "integrity": "sha512-/uh/DhdqIOSkAWifU+8nG78vlQxdLckUdI/sPgy0VhuXi2qJ7T8czBmqIYtLQVpCIFYafChnsRsB5pyb1JdmCQ==",
      "dev": true,
      "requires": {
        "es-to-primitive": "1.1.1",
        "function-bind": "1.1.1",
        "has": "1.0.1",
        "is-callable": "1.1.3",
        "is-regex": "1.0.4"
      }
    },
    "es-to-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.1.1.tgz",
      "integrity": "sha1-RTVSSKiJeQNLZ5Lhm7gfK3l13Q0=",
      "dev": true,
      "requires": {
        "is-callable": "1.1.3",
        "is-date-object": "1.0.1",
        "is-symbol": "1.0.1"
      }
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg=",
      "dev": true
    },
    "escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
    },
    "eslint-scope": {
      "version": "3.7.1",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-3.7.1.tgz",
      "integrity": "sha1-PWPD7f2gLgbgGkUq2IyqzHzctug=",
      "dev": true,
      "requires": {
        "esrecurse": "4.2.0",
        "estraverse": "4.2.0"
      }
    },
    "esprima": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.0.tgz",
      "integrity": "sha512-oftTcaMu/EGrEIu904mWteKIv8vMuOgGYo7EhVJJN00R/EED9DCua/xxHRdYnKtcECzVg7xOWhflvJMnqcFZjw==",
      "dev": true
    },
    "esrecurse": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.2.0.tgz",
      "integrity": "sha1-+pVo2Y04I/mkHZHpAtyrnqblsWM=",
      "dev": true,
      "requires": {
        "estraverse": "4.2.0",
        "object-assign": "4.1.1"
      }
    },
    "estraverse": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz",
      "integrity": "sha1-De4/7TH81GlhjOc0IJn8GvoL2xM=",
      "dev": true
    },
    "esutils": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.2.tgz",
      "integrity": "sha1-Cr9PHKpbyx96nYrMbepPqqBLrJs="
    },
    "etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc=",
      "dev": true
    },
    "eventemitter3": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-1.2.0.tgz",
      "integrity": "sha1-HIaZHYFq0eUEdQ5zh0Ik7PO+xQg=",
      "dev": true
    },
    "events": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/events/-/events-1.1.1.tgz",
      "integrity": "sha1-nr23Y1rQmccNzEwqH1AEKI6L2SQ=",
      "dev": true
    },
    "eventsource": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-0.1.6.tgz",
      "integrity": "sha1-Cs7ehJ7X3RzMMsgRuxG5RNTykjI=",
      "dev": true,
      "requires": {
        "original": "1.0.0"
      }
    },
    "evp_bytestokey": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
      "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
      "dev": true,
      "requires": {
        "md5.js": "1.3.4",
        "safe-buffer": "5.1.1"
      }
    },
    "execa": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/execa/-/execa-0.7.0.tgz",
      "integrity": "sha1-lEvs00zEHuMqY6n68nrVpl/Fl3c=",
      "dev": true,
      "requires": {
        "cross-spawn": "5.1.0",
        "get-stream": "3.0.0",
        "is-stream": "1.1.0",
        "npm-run-path": "2.0.2",
        "p-finally": "1.0.0",
        "signal-exit": "3.0.2",
        "strip-eof": "1.0.0"
      }
    },
    "exit-hook": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/exit-hook/-/exit-hook-1.1.1.tgz",
      "integrity": "sha1-8FyiM7SMBdVP/wd2XfhQfpXAL/g=",
      "dev": true
    },
    "expand-brackets": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "define-property": "0.2.5",
        "extend-shallow": "2.0.1",
        "posix-character-classes": "0.1.1",
        "regex-not": "1.0.2",
        "snapdragon": "0.8.1",
        "to-regex": "3.0.2"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "expand-range": {
      "version": "1.8.2",
      "resolved": "https://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz",
      "integrity": "sha1-opnv/TNf4nIeuujiV+x5ZE/IUzc=",
      "dev": true,
      "requires": {
        "fill-range": "2.2.3"
      },
      "dependencies": {
        "fill-range": {
          "version": "2.2.3",
          "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-2.2.3.tgz",
          "integrity": "sha1-ULd9/X5Gm8dJJHCWNpn+eoSFpyM=",
          "dev": true,
          "requires": {
            "is-number": "2.1.0",
            "isobject": "2.1.0",
            "randomatic": "1.1.7",
            "repeat-element": "1.1.2",
            "repeat-string": "1.6.1"
          }
        },
        "is-number": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-2.1.0.tgz",
          "integrity": "sha1-Afy7s5NGOlSPL0ZszhbezknbkI8=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          }
        },
        "isobject": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
          "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
          "dev": true,
          "requires": {
            "isarray": "1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "expand-tilde": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/expand-tilde/-/expand-tilde-2.0.2.tgz",
      "integrity": "sha1-l+gBqgUt8CRU3kawK/YhZCzchQI=",
      "dev": true,
      "requires": {
        "homedir-polyfill": "1.0.1"
      }
    },
    "express": {
      "version": "4.16.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.16.2.tgz",
      "integrity": "sha1-41xt/i1kt9ygpc1PIXgb4ymeB2w=",
      "dev": true,
      "requires": {
        "accepts": "1.3.4",
        "array-flatten": "1.1.1",
        "body-parser": "1.18.2",
        "content-disposition": "0.5.2",
        "content-type": "1.0.4",
        "cookie": "0.3.1",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "1.1.2",
        "encodeurl": "1.0.2",
        "escape-html": "1.0.3",
        "etag": "1.8.1",
        "finalhandler": "1.1.0",
        "fresh": "0.5.2",
        "merge-descriptors": "1.0.1",
        "methods": "1.1.2",
        "on-finished": "2.3.0",
        "parseurl": "1.3.2",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "2.0.3",
        "qs": "6.5.1",
        "range-parser": "1.2.0",
        "safe-buffer": "5.1.1",
        "send": "0.16.1",
        "serve-static": "1.13.1",
        "setprototypeof": "1.1.0",
        "statuses": "1.3.1",
        "type-is": "1.6.16",
        "utils-merge": "1.0.1",
        "vary": "1.1.2"
      },
      "dependencies": {
        "array-flatten": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
          "integrity": "sha1-ml9pkFGx5wczKPKgCJaLZOopVdI=",
          "dev": true
        }
      }
    },
    "extend": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.1.tgz",
      "integrity": "sha1-p1Xqe8Gt/MWjHOfnYtuq3F5jZEQ=",
      "dev": true
    },
    "extend-shallow": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
      "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
      "dev": true,
      "requires": {
        "assign-symbols": "1.0.0",
        "is-extendable": "1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "dev": true,
          "requires": {
            "is-plain-object": "2.0.4"
          }
        }
      }
    },
    "external-editor": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-2.1.0.tgz",
      "integrity": "sha512-E44iT5QVOUJBKij4IIV3uvxuNlbKS38Tw1HiupxEIHPv9qtC2PrDYohbXV5U+1jnfIXttny8gUhj+oZvflFlzA==",
      "dev": true,
      "requires": {
        "chardet": "0.4.2",
        "iconv-lite": "0.4.19",
        "tmp": "0.0.33"
      }
    },
    "extglob": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
      "dev": true,
      "requires": {
        "array-unique": "0.3.2",
        "define-property": "1.0.0",
        "expand-brackets": "2.1.4",
        "extend-shallow": "2.0.1",
        "fragment-cache": "0.2.1",
        "regex-not": "1.0.2",
        "snapdragon": "0.8.1",
        "to-regex": "3.0.2"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "1.0.2"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        }
      }
    },
    "extsprintf": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
      "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU=",
      "dev": true
    },
    "fast-deep-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-1.0.0.tgz",
      "integrity": "sha1-liVqO8l1WV6zbYLpkp0GDYk0Of8=",
      "dev": true
    },
    "fast-json-stable-stringify": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.0.0.tgz",
      "integrity": "sha1-1RQsDK7msRifh9OnYREGT4bIu/I=",
      "dev": true
    },
    "faye-websocket": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.10.0.tgz",
      "integrity": "sha1-TkkvjQTftviQA1B/btvy1QHnxvQ=",
      "dev": true,
      "requires": {
        "websocket-driver": "0.7.0"
      }
    },
    "fbjs": {
      "version": "0.8.16",
      "resolved": "https://registry.npmjs.org/fbjs/-/fbjs-0.8.16.tgz",
      "integrity": "sha1-XmdDL1UNxBtXK/VYR7ispk5TN9s=",
      "requires": {
        "core-js": "1.2.7",
        "isomorphic-fetch": "2.2.1",
        "loose-envify": "1.3.1",
        "object-assign": "4.1.1",
        "promise": "7.3.1",
        "setimmediate": "1.0.5",
        "ua-parser-js": "0.7.17"
      }
    },
    "figures": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/figures/-/figures-2.0.0.tgz",
      "integrity": "sha1-OrGi0qYsi/tDGgyUy3l6L84nyWI=",
      "dev": true,
      "requires": {
        "escape-string-regexp": "1.0.5"
      }
    },
    "file-loader": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/file-loader/-/file-loader-1.1.11.tgz",
      "integrity": "sha512-TGR4HU7HUsGg6GCOPJnFk06RhWgEWFLAGWiT6rcD+GRC2keU3s9RGJ+b3Z6/U73jwwNb2gKLJ7YCrp+jvU4ALg==",
      "dev": true,
      "requires": {
        "loader-utils": "1.1.0",
        "schema-utils": "0.4.5"
      }
    },
    "filename-regex": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/filename-regex/-/filename-regex-2.0.1.tgz",
      "integrity": "sha1-wcS5vuPglyXdsQa3XB4wH+LxiyY=",
      "dev": true
    },
    "fill-range": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
      "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
      "dev": true,
      "requires": {
        "extend-shallow": "2.0.1",
        "is-number": "3.0.0",
        "repeat-string": "1.6.1",
        "to-regex-range": "2.1.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        }
      }
    },
    "finalhandler": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.0.tgz",
      "integrity": "sha1-zgtoVbRYU+eRsvzGgARtiCU91/U=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "encodeurl": "1.0.2",
        "escape-html": "1.0.3",
        "on-finished": "2.3.0",
        "parseurl": "1.3.2",
        "statuses": "1.3.1",
        "unpipe": "1.0.0"
      }
    },
    "find-cache-dir": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-1.0.0.tgz",
      "integrity": "sha1-kojj6ePMN0hxfTnq3hfPcfww7m8=",
      "dev": true,
      "requires": {
        "commondir": "1.0.1",
        "make-dir": "1.2.0",
        "pkg-dir": "2.0.0"
      }
    },
    "find-up": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
      "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
      "dev": true,
      "requires": {
        "locate-path": "2.0.0"
      }
    },
    "first-chunk-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/first-chunk-stream/-/first-chunk-stream-2.0.0.tgz",
      "integrity": "sha1-G97NuOCDwGZLkZRVgVd6Q6nzHXA=",
      "dev": true,
      "requires": {
        "readable-stream": "2.3.4"
      }
    },
    "flow-bin": {
      "version": "0.66.0",
      "resolved": "https://registry.npmjs.org/flow-bin/-/flow-bin-0.66.0.tgz",
      "integrity": "sha1-qW3ecBXcM0P9VSp7SWPAK+cFyiY=",
      "dev": true
    },
    "flow-parser": {
      "version": "0.66.0",
      "resolved": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.66.0.tgz",
      "integrity": "sha1-vlg/77ARkqpRZEFdMaYkGzVxiYM=",
      "dev": true
    },
    "flush-write-stream": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.0.2.tgz",
      "integrity": "sha1-yBuQ2HRnZvGmCaRoCZRsRd2K5Bc=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "readable-stream": "2.3.4"
      }
    },
    "for-in": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
      "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA=",
      "dev": true
    },
    "for-own": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
      "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
      "dev": true,
      "requires": {
        "for-in": "1.0.2"
      }
    },
    "foreach": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/foreach/-/foreach-2.0.5.tgz",
      "integrity": "sha1-C+4AUBiusmDQo6865ljdATbsG5k=",
      "dev": true
    },
    "forever-agent": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
      "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE=",
      "dev": true
    },
    "form-data": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.1.4.tgz",
      "integrity": "sha1-M8GDrPGTJ27KqYFDpp6Uv+4XUNE=",
      "dev": true,
      "requires": {
        "asynckit": "0.4.0",
        "combined-stream": "1.0.6",
        "mime-types": "2.1.18"
      }
    },
    "forwarded": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.1.2.tgz",
      "integrity": "sha1-mMI9qxF1ZXuMBXPozszZGw/xjIQ=",
      "dev": true
    },
    "fragment-cache": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
      "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
      "dev": true,
      "requires": {
        "map-cache": "0.2.2"
      }
    },
    "fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac=",
      "dev": true
    },
    "from2": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
      "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "readable-stream": "2.3.4"
      }
    },
    "fs-write-stream-atomic": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
      "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "iferr": "0.1.5",
        "imurmurhash": "0.1.4",
        "readable-stream": "2.3.4"
      }
    },
    "fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8=",
      "dev": true
    },
    "fsevents": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.1.3.tgz",
      "integrity": "sha512-WIr7iDkdmdbxu/Gh6eKEZJL6KPE74/5MEsf2whTOFNxbIoIixogroLdKYqB6FDav4Wavh/lZdzzd3b2KxIXC5Q==",
      "dev": true,
      "optional": true,
      "requires": {
        "nan": "2.9.2",
        "node-pre-gyp": "0.6.39"
      },
      "dependencies": {
        "abbrev": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "ajv": {
          "version": "4.11.8",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "co": "4.6.0",
            "json-stable-stringify": "1.0.1"
          }
        },
        "ansi-regex": {
          "version": "2.1.1",
          "bundled": true,
          "dev": true
        },
        "aproba": {
          "version": "1.1.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "are-we-there-yet": {
          "version": "1.1.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "delegates": "1.0.0",
            "readable-stream": "2.2.9"
          }
        },
        "asn1": {
          "version": "0.2.3",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "assert-plus": {
          "version": "0.2.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "asynckit": {
          "version": "0.4.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "aws-sign2": {
          "version": "0.6.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "aws4": {
          "version": "1.6.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "balanced-match": {
          "version": "0.4.2",
          "bundled": true,
          "dev": true
        },
        "bcrypt-pbkdf": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "tweetnacl": "0.14.5"
          }
        },
        "block-stream": {
          "version": "0.0.9",
          "bundled": true,
          "dev": true,
          "requires": {
            "inherits": "2.0.3"
          }
        },
        "boom": {
          "version": "2.10.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "hoek": "2.16.3"
          }
        },
        "brace-expansion": {
          "version": "1.1.7",
          "bundled": true,
          "dev": true,
          "requires": {
            "balanced-match": "0.4.2",
            "concat-map": "0.0.1"
          }
        },
        "buffer-shims": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true
        },
        "caseless": {
          "version": "0.12.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "co": {
          "version": "4.6.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "code-point-at": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true
        },
        "combined-stream": {
          "version": "1.0.5",
          "bundled": true,
          "dev": true,
          "requires": {
            "delayed-stream": "1.0.0"
          }
        },
        "concat-map": {
          "version": "0.0.1",
          "bundled": true,
          "dev": true
        },
        "console-control-strings": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true
        },
        "core-util-is": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true
        },
        "cryptiles": {
          "version": "2.0.5",
          "bundled": true,
          "dev": true,
          "requires": {
            "boom": "2.10.1"
          }
        },
        "dashdash": {
          "version": "1.14.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "assert-plus": "1.0.0"
          },
          "dependencies": {
            "assert-plus": {
              "version": "1.0.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "debug": {
          "version": "2.6.8",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "deep-extend": {
          "version": "0.4.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "delayed-stream": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true
        },
        "delegates": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "detect-libc": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "ecc-jsbn": {
          "version": "0.1.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "jsbn": "0.1.1"
          }
        },
        "extend": {
          "version": "3.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "extsprintf": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true
        },
        "forever-agent": {
          "version": "0.6.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "form-data": {
          "version": "2.1.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "asynckit": "0.4.0",
            "combined-stream": "1.0.5",
            "mime-types": "2.1.15"
          }
        },
        "fs.realpath": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true
        },
        "fstream": {
          "version": "1.0.11",
          "bundled": true,
          "dev": true,
          "requires": {
            "graceful-fs": "4.1.11",
            "inherits": "2.0.3",
            "mkdirp": "0.5.1",
            "rimraf": "2.6.1"
          }
        },
        "fstream-ignore": {
          "version": "1.0.5",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "fstream": "1.0.11",
            "inherits": "2.0.3",
            "minimatch": "3.0.4"
          }
        },
        "gauge": {
          "version": "2.7.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "aproba": "1.1.1",
            "console-control-strings": "1.1.0",
            "has-unicode": "2.0.1",
            "object-assign": "4.1.1",
            "signal-exit": "3.0.2",
            "string-width": "1.0.2",
            "strip-ansi": "3.0.1",
            "wide-align": "1.1.2"
          }
        },
        "getpass": {
          "version": "0.1.7",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "assert-plus": "1.0.0"
          },
          "dependencies": {
            "assert-plus": {
              "version": "1.0.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "glob": {
          "version": "7.1.2",
          "bundled": true,
          "dev": true,
          "requires": {
            "fs.realpath": "1.0.0",
            "inflight": "1.0.6",
            "inherits": "2.0.3",
            "minimatch": "3.0.4",
            "once": "1.4.0",
            "path-is-absolute": "1.0.1"
          }
        },
        "graceful-fs": {
          "version": "4.1.11",
          "bundled": true,
          "dev": true
        },
        "har-schema": {
          "version": "1.0.5",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "har-validator": {
          "version": "4.2.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "ajv": "4.11.8",
            "har-schema": "1.0.5"
          }
        },
        "has-unicode": {
          "version": "2.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "hawk": {
          "version": "3.1.3",
          "bundled": true,
          "dev": true,
          "requires": {
            "boom": "2.10.1",
            "cryptiles": "2.0.5",
            "hoek": "2.16.3",
            "sntp": "1.0.9"
          }
        },
        "hoek": {
          "version": "2.16.3",
          "bundled": true,
          "dev": true
        },
        "http-signature": {
          "version": "1.1.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "assert-plus": "0.2.0",
            "jsprim": "1.4.0",
            "sshpk": "1.13.0"
          }
        },
        "inflight": {
          "version": "1.0.6",
          "bundled": true,
          "dev": true,
          "requires": {
            "once": "1.4.0",
            "wrappy": "1.0.2"
          }
        },
        "inherits": {
          "version": "2.0.3",
          "bundled": true,
          "dev": true
        },
        "ini": {
          "version": "1.3.4",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "requires": {
            "number-is-nan": "1.0.1"
          }
        },
        "is-typedarray": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "isarray": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true
        },
        "isstream": {
          "version": "0.1.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "jodid25519": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "jsbn": "0.1.1"
          }
        },
        "jsbn": {
          "version": "0.1.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "json-schema": {
          "version": "0.2.3",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "json-stable-stringify": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "jsonify": "0.0.0"
          }
        },
        "json-stringify-safe": {
          "version": "5.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "jsonify": {
          "version": "0.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "jsprim": {
          "version": "1.4.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "assert-plus": "1.0.0",
            "extsprintf": "1.0.2",
            "json-schema": "0.2.3",
            "verror": "1.3.6"
          },
          "dependencies": {
            "assert-plus": {
              "version": "1.0.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "mime-db": {
          "version": "1.27.0",
          "bundled": true,
          "dev": true
        },
        "mime-types": {
          "version": "2.1.15",
          "bundled": true,
          "dev": true,
          "requires": {
            "mime-db": "1.27.0"
          }
        },
        "minimatch": {
          "version": "3.0.4",
          "bundled": true,
          "dev": true,
          "requires": {
            "brace-expansion": "1.1.7"
          }
        },
        "minimist": {
          "version": "0.0.8",
          "bundled": true,
          "dev": true
        },
        "mkdirp": {
          "version": "0.5.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "minimist": "0.0.8"
          }
        },
        "ms": {
          "version": "2.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "node-pre-gyp": {
          "version": "0.6.39",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "detect-libc": "1.0.2",
            "hawk": "3.1.3",
            "mkdirp": "0.5.1",
            "nopt": "4.0.1",
            "npmlog": "4.1.0",
            "rc": "1.2.1",
            "request": "2.81.0",
            "rimraf": "2.6.1",
            "semver": "5.3.0",
            "tar": "2.2.1",
            "tar-pack": "3.4.0"
          }
        },
        "nopt": {
          "version": "4.0.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "abbrev": "1.1.0",
            "osenv": "0.1.4"
          }
        },
        "npmlog": {
          "version": "4.1.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "are-we-there-yet": "1.1.4",
            "console-control-strings": "1.1.0",
            "gauge": "2.7.4",
            "set-blocking": "2.0.0"
          }
        },
        "number-is-nan": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true
        },
        "oauth-sign": {
          "version": "0.8.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "object-assign": {
          "version": "4.1.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "once": {
          "version": "1.4.0",
          "bundled": true,
          "dev": true,
          "requires": {
            "wrappy": "1.0.2"
          }
        },
        "os-homedir": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "os-tmpdir": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "osenv": {
          "version": "0.1.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "os-homedir": "1.0.2",
            "os-tmpdir": "1.0.2"
          }
        },
        "path-is-absolute": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true
        },
        "performance-now": {
          "version": "0.2.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "process-nextick-args": {
          "version": "1.0.7",
          "bundled": true,
          "dev": true
        },
        "punycode": {
          "version": "1.4.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "qs": {
          "version": "6.4.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "rc": {
          "version": "1.2.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "deep-extend": "0.4.2",
            "ini": "1.3.4",
            "minimist": "1.2.0",
            "strip-json-comments": "2.0.1"
          },
          "dependencies": {
            "minimist": {
              "version": "1.2.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "readable-stream": {
          "version": "2.2.9",
          "bundled": true,
          "dev": true,
          "requires": {
            "buffer-shims": "1.0.0",
            "core-util-is": "1.0.2",
            "inherits": "2.0.3",
            "isarray": "1.0.0",
            "process-nextick-args": "1.0.7",
            "string_decoder": "1.0.1",
            "util-deprecate": "1.0.2"
          }
        },
        "request": {
          "version": "2.81.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "aws-sign2": "0.6.0",
            "aws4": "1.6.0",
            "caseless": "0.12.0",
            "combined-stream": "1.0.5",
            "extend": "3.0.1",
            "forever-agent": "0.6.1",
            "form-data": "2.1.4",
            "har-validator": "4.2.1",
            "hawk": "3.1.3",
            "http-signature": "1.1.1",
            "is-typedarray": "1.0.0",
            "isstream": "0.1.2",
            "json-stringify-safe": "5.0.1",
            "mime-types": "2.1.15",
            "oauth-sign": "0.8.2",
            "performance-now": "0.2.0",
            "qs": "6.4.0",
            "safe-buffer": "5.0.1",
            "stringstream": "0.0.5",
            "tough-cookie": "2.3.2",
            "tunnel-agent": "0.6.0",
            "uuid": "3.0.1"
          }
        },
        "rimraf": {
          "version": "2.6.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "glob": "7.1.2"
          }
        },
        "safe-buffer": {
          "version": "5.0.1",
          "bundled": true,
          "dev": true
        },
        "semver": {
          "version": "5.3.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "set-blocking": {
          "version": "2.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "signal-exit": {
          "version": "3.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "sntp": {
          "version": "1.0.9",
          "bundled": true,
          "dev": true,
          "requires": {
            "hoek": "2.16.3"
          }
        },
        "sshpk": {
          "version": "1.13.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "asn1": "0.2.3",
            "assert-plus": "1.0.0",
            "bcrypt-pbkdf": "1.0.1",
            "dashdash": "1.14.1",
            "ecc-jsbn": "0.1.1",
            "getpass": "0.1.7",
            "jodid25519": "1.0.2",
            "jsbn": "0.1.1",
            "tweetnacl": "0.14.5"
          },
          "dependencies": {
            "assert-plus": {
              "version": "1.0.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "string-width": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "requires": {
            "code-point-at": "1.1.0",
            "is-fullwidth-code-point": "1.0.0",
            "strip-ansi": "3.0.1"
          }
        },
        "string_decoder": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "safe-buffer": "5.0.1"
          }
        },
        "stringstream": {
          "version": "0.0.5",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "strip-ansi": {
          "version": "3.0.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "ansi-regex": "2.1.1"
          }
        },
        "strip-json-comments": {
          "version": "2.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "tar": {
          "version": "2.2.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "block-stream": "0.0.9",
            "fstream": "1.0.11",
            "inherits": "2.0.3"
          }
        },
        "tar-pack": {
          "version": "3.4.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "debug": "2.6.8",
            "fstream": "1.0.11",
            "fstream-ignore": "1.0.5",
            "once": "1.4.0",
            "readable-stream": "2.2.9",
            "rimraf": "2.6.1",
            "tar": "2.2.1",
            "uid-number": "0.0.6"
          }
        },
        "tough-cookie": {
          "version": "2.3.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "punycode": "1.4.1"
          }
        },
        "tunnel-agent": {
          "version": "0.6.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "safe-buffer": "5.0.1"
          }
        },
        "tweetnacl": {
          "version": "0.14.5",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "uid-number": {
          "version": "0.0.6",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "util-deprecate": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true
        },
        "uuid": {
          "version": "3.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "verror": {
          "version": "1.3.6",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "extsprintf": "1.0.2"
          }
        },
        "wide-align": {
          "version": "1.1.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "string-width": "1.0.2"
          }
        },
        "wrappy": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true
        }
      }
    },
    "function-bind": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
      "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A==",
      "dev": true
    },
    "get-caller-file": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-1.0.2.tgz",
      "integrity": "sha1-9wLmMSfn4jHBYKgMFVSstw1QR+U=",
      "dev": true
    },
    "get-stdin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/get-stdin/-/get-stdin-4.0.1.tgz",
      "integrity": "sha1-uWjGsKBDhDJJAui/Gl3zJXmkUP4=",
      "dev": true
    },
    "get-stream": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-3.0.0.tgz",
      "integrity": "sha1-jpQ9E1jcN1VQVOy+LtsFqhdO3hQ=",
      "dev": true
    },
    "get-value": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg=",
      "dev": true
    },
    "getpass": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
      "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
      "dev": true,
      "requires": {
        "assert-plus": "1.0.0"
      },
      "dependencies": {
        "assert-plus": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
          "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
          "dev": true
        }
      }
    },
    "gh-got": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/gh-got/-/gh-got-6.0.0.tgz",
      "integrity": "sha512-F/mS+fsWQMo1zfgG9MD8KWvTWPPzzhuVwY++fhQ5Ggd+0P+CAMHtzMZhNxG+TqGfHDChJKsbh6otfMGqO2AKBw==",
      "dev": true,
      "requires": {
        "got": "7.1.0",
        "is-plain-obj": "1.1.0"
      },
      "dependencies": {
        "got": {
          "version": "7.1.0",
          "resolved": "https://registry.npmjs.org/got/-/got-7.1.0.tgz",
          "integrity": "sha512-Y5WMo7xKKq1muPsxD+KmrR8DH5auG7fBdDVueZwETwV6VytKyU9OX/ddpq2/1hp1vIPvVb4T81dKQz3BivkNLw==",
          "dev": true,
          "requires": {
            "decompress-response": "3.3.0",
            "duplexer3": "0.1.4",
            "get-stream": "3.0.0",
            "is-plain-obj": "1.1.0",
            "is-retry-allowed": "1.1.0",
            "is-stream": "1.1.0",
            "isurl": "1.0.0",
            "lowercase-keys": "1.0.0",
            "p-cancelable": "0.3.0",
            "p-timeout": "1.2.1",
            "safe-buffer": "5.1.1",
            "timed-out": "4.0.1",
            "url-parse-lax": "1.0.0",
            "url-to-options": "1.0.1"
          }
        },
        "p-timeout": {
          "version": "1.2.1",
          "resolved": "https://registry.npmjs.org/p-timeout/-/p-timeout-1.2.1.tgz",
          "integrity": "sha1-XrOzU7f86Z8QGhA4iAuwVOu+o4Y=",
          "dev": true,
          "requires": {
            "p-finally": "1.0.0"
          }
        },
        "prepend-http": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/prepend-http/-/prepend-http-1.0.4.tgz",
          "integrity": "sha1-1PRWKwzjaW5BrFLQ4ALlemNdxtw=",
          "dev": true
        },
        "url-parse-lax": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/url-parse-lax/-/url-parse-lax-1.0.0.tgz",
          "integrity": "sha1-evjzA2Rem9eaJy56FKxovAYJ2nM=",
          "dev": true,
          "requires": {
            "prepend-http": "1.0.4"
          }
        }
      }
    },
    "github-username": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/github-username/-/github-username-4.1.0.tgz",
      "integrity": "sha1-y+KABBiDIG2kISrp5LXxacML9Bc=",
      "dev": true,
      "requires": {
        "gh-got": "6.0.0"
      }
    },
    "glob": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.2.tgz",
      "integrity": "sha512-MJTUg1kjuLeQCJ+ccE4Vpa6kKVXkPYJ2mOCQyUuKLcLQsdrMCpBPUi8qVE6+YuaJkozeA9NusTAw3hLr8Xe5EQ==",
      "dev": true,
      "requires": {
        "fs.realpath": "1.0.0",
        "inflight": "1.0.6",
        "inherits": "2.0.3",
        "minimatch": "3.0.4",
        "once": "1.4.0",
        "path-is-absolute": "1.0.1"
      }
    },
    "glob-all": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/glob-all/-/glob-all-3.1.0.tgz",
      "integrity": "sha1-iRPd+17hrHgSZWJBsD1SF8ZLAqs=",
      "dev": true,
      "requires": {
        "glob": "7.1.2",
        "yargs": "1.2.6"
      },
      "dependencies": {
        "minimist": {
          "version": "0.1.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.1.0.tgz",
          "integrity": "sha1-md9lelJXTCHJBXSX33QnkLK0wN4=",
          "dev": true
        },
        "yargs": {
          "version": "1.2.6",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-1.2.6.tgz",
          "integrity": "sha1-nHtKgv1dWVsr8Xq23MQxNUMv40s=",
          "dev": true,
          "requires": {
            "minimist": "0.1.0"
          }
        }
      }
    },
    "glob-base": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/glob-base/-/glob-base-0.3.0.tgz",
      "integrity": "sha1-27Fk9iIbHAscz4Kuoyi0l98Oo8Q=",
      "dev": true,
      "requires": {
        "glob-parent": "2.0.0",
        "is-glob": "2.0.1"
      }
    },
    "glob-parent": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
      "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
      "dev": true,
      "requires": {
        "is-glob": "2.0.1"
      }
    },
    "global": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/global/-/global-4.3.2.tgz",
      "integrity": "sha1-52mJJopsdMOJCLEwWxD8DjlOnQ8=",
      "dev": true,
      "requires": {
        "min-document": "2.19.0",
        "process": "0.5.2"
      },
      "dependencies": {
        "process": {
          "version": "0.5.2",
          "resolved": "https://registry.npmjs.org/process/-/process-0.5.2.tgz",
          "integrity": "sha1-FjjYqONML0QKkduVq5rrZ3/Bhc8=",
          "dev": true
        }
      }
    },
    "global-modules": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/global-modules/-/global-modules-1.0.0.tgz",
      "integrity": "sha512-sKzpEkf11GpOFuw0Zzjzmt4B4UZwjOcG757PPvrfhxcLFbq0wpsgpOqxpxtxFiCG4DtG93M6XRVbF2oGdev7bg==",
      "dev": true,
      "requires": {
        "global-prefix": "1.0.2",
        "is-windows": "1.0.2",
        "resolve-dir": "1.0.1"
      }
    },
    "global-prefix": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-1.0.2.tgz",
      "integrity": "sha1-2/dDxsFJklk8ZVVoy2btMsASLr4=",
      "dev": true,
      "requires": {
        "expand-tilde": "2.0.2",
        "homedir-polyfill": "1.0.1",
        "ini": "1.3.5",
        "is-windows": "1.0.2",
        "which": "1.3.0"
      }
    },
    "globals": {
      "version": "9.18.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-9.18.0.tgz",
      "integrity": "sha512-S0nG3CLEQiY/ILxqtztTWH/3iRRdyBLw6KMDxnKMchrtbj2OFmehVh0WUCfW3DUrIgx/qFrJPICrq4Z4sTR9UQ=="
    },
    "globby": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
      "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
      "dev": true,
      "requires": {
        "array-union": "1.0.2",
        "glob": "7.1.2",
        "object-assign": "4.1.1",
        "pify": "2.3.0",
        "pinkie-promise": "2.0.1"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "got": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/got/-/got-8.2.0.tgz",
      "integrity": "sha512-giadqJpXIwjY+ZsuWys8p2yjZGhOHiU4hiJHjS/oeCxw1u8vANQz3zPlrxW2Zw/siCXsSMI3hvzWGcnFyujyAg==",
      "dev": true,
      "requires": {
        "@sindresorhus/is": "0.7.0",
        "cacheable-request": "2.1.4",
        "decompress-response": "3.3.0",
        "duplexer3": "0.1.4",
        "get-stream": "3.0.0",
        "into-stream": "3.1.0",
        "is-retry-allowed": "1.1.0",
        "isurl": "1.0.0",
        "lowercase-keys": "1.0.0",
        "mimic-response": "1.0.0",
        "p-cancelable": "0.3.0",
        "p-timeout": "2.0.1",
        "pify": "3.0.0",
        "safe-buffer": "5.1.1",
        "timed-out": "4.0.1",
        "url-parse-lax": "3.0.0",
        "url-to-options": "1.0.1"
      }
    },
    "graceful-fs": {
      "version": "4.1.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.1.11.tgz",
      "integrity": "sha1-Dovf5NHduIVNZOBOp8AOKgJuVlg=",
      "dev": true
    },
    "grouped-queue": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/grouped-queue/-/grouped-queue-0.3.3.tgz",
      "integrity": "sha1-wWfSpTGcWg4JZO9qJbfC34mWyFw=",
      "dev": true,
      "requires": {
        "lodash": "4.17.5"
      }
    },
    "handle-thing": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/handle-thing/-/handle-thing-1.2.5.tgz",
      "integrity": "sha1-/Xqtcmvxpf0W38KbL3pmAdJxOcQ=",
      "dev": true
    },
    "har-schema": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-1.0.5.tgz",
      "integrity": "sha1-0mMTX0MwfALGAq/I/pWXDAFRNp4=",
      "dev": true
    },
    "har-validator": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-4.2.1.tgz",
      "integrity": "sha1-M0gdDxu/9gDdID11gSpqX7oALio=",
      "dev": true,
      "requires": {
        "ajv": "4.11.8",
        "har-schema": "1.0.5"
      },
      "dependencies": {
        "ajv": {
          "version": "4.11.8",
          "resolved": "https://registry.npmjs.org/ajv/-/ajv-4.11.8.tgz",
          "integrity": "sha1-gv+wKynmYq5TvcIK8VlHcGc5xTY=",
          "dev": true,
          "requires": {
            "co": "4.6.0",
            "json-stable-stringify": "1.0.1"
          }
        }
      }
    },
    "has": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/has/-/has-1.0.1.tgz",
      "integrity": "sha1-hGFzP1OLCDfJNh45qauelwTcLyg=",
      "dev": true,
      "requires": {
        "function-bind": "1.1.1"
      }
    },
    "has-ansi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
      "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
      "requires": {
        "ansi-regex": "2.1.1"
      }
    },
    "has-color": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/has-color/-/has-color-0.1.7.tgz",
      "integrity": "sha1-ZxRKUmDDT8PMpnfQQdr1L+e3iy8=",
      "dev": true
    },
    "has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0=",
      "dev": true
    },
    "has-symbol-support-x": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/has-symbol-support-x/-/has-symbol-support-x-1.4.2.tgz",
      "integrity": "sha512-3ToOva++HaW+eCpgqZrCfN51IPB+7bJNVT6CUATzueB5Heb8o6Nam0V3HG5dlDvZU1Gn5QLcbahiKw/XVk5JJw==",
      "dev": true
    },
    "has-to-string-tag-x": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/has-to-string-tag-x/-/has-to-string-tag-x-1.4.1.tgz",
      "integrity": "sha512-vdbKfmw+3LoOYVr+mtxHaX5a96+0f3DljYd8JOqvOLsf5mw2Otda2qCDT9qRqLAhrjyQ0h7ual5nOiASpsGNFw==",
      "dev": true,
      "requires": {
        "has-symbol-support-x": "1.4.2"
      }
    },
    "has-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
      "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
      "dev": true,
      "requires": {
        "get-value": "2.0.6",
        "has-values": "1.0.0",
        "isobject": "3.0.1"
      }
    },
    "has-values": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
      "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
      "dev": true,
      "requires": {
        "is-number": "3.0.0",
        "kind-of": "4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "hash-base": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-2.0.2.tgz",
      "integrity": "sha1-ZuodhW206KVHDK32/OI65SRO8uE=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3"
      }
    },
    "hash.js": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.3.tgz",
      "integrity": "sha512-/UETyP0W22QILqS+6HowevwhEFJ3MBJnwTf75Qob9Wz9t0DPuisL8kW8YZMK62dHAKE1c1p+gY1TtOLY+USEHA==",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "minimalistic-assert": "1.0.0"
      }
    },
    "hawk": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/hawk/-/hawk-3.1.3.tgz",
      "integrity": "sha1-B4REvXwWQLD+VA0sm3PVlnjo4cQ=",
      "dev": true,
      "requires": {
        "boom": "2.10.1",
        "cryptiles": "2.0.5",
        "hoek": "2.16.3",
        "sntp": "1.0.9"
      }
    },
    "hmac-drbg": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
      "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
      "dev": true,
      "requires": {
        "hash.js": "1.1.3",
        "minimalistic-assert": "1.0.0",
        "minimalistic-crypto-utils": "1.0.1"
      }
    },
    "hoek": {
      "version": "2.16.3",
      "resolved": "https://registry.npmjs.org/hoek/-/hoek-2.16.3.tgz",
      "integrity": "sha1-ILt0A9POo5jpHcRxCo/xuCdKJe0=",
      "dev": true
    },
    "home-or-tmp": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/home-or-tmp/-/home-or-tmp-2.0.0.tgz",
      "integrity": "sha1-42w/LSyufXRqhX440Y1fMqeILbg=",
      "dev": true,
      "requires": {
        "os-homedir": "1.0.2",
        "os-tmpdir": "1.0.2"
      }
    },
    "homedir-polyfill": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/homedir-polyfill/-/homedir-polyfill-1.0.1.tgz",
      "integrity": "sha1-TCu8inWJmP7r9e1oWA921GdotLw=",
      "dev": true,
      "requires": {
        "parse-passwd": "1.0.0"
      }
    },
    "hosted-git-info": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.5.0.tgz",
      "integrity": "sha512-pNgbURSuab90KbTqvRPsseaTxOJCZBD0a7t+haSN33piP9cCM4l0CqdzAif2hUqm716UovKB2ROmiabGAKVXyg==",
      "dev": true
    },
    "hpack.js": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
      "integrity": "sha1-h3dMCUnlE/QuhFdbPEVoH63ioLI=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "obuf": "1.1.1",
        "readable-stream": "2.3.4",
        "wbuf": "1.7.2"
      }
    },
    "html-entities": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/html-entities/-/html-entities-1.2.1.tgz",
      "integrity": "sha1-DfKTUfByEWNRXfueVUPl9u7VFi8=",
      "dev": true
    },
    "http-cache-semantics": {
      "version": "3.8.1",
      "resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-3.8.1.tgz",
      "integrity": "sha512-5ai2iksyV8ZXmnZhHH4rWPoxxistEexSi5936zIQ1bnNTW5VnA85B6P/VpXiRM017IgRvb2kKo1a//y+0wSp3w==",
      "dev": true
    },
    "http-deceiver": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
      "integrity": "sha1-+nFolEq5pRnTN8sL7HKE3D5yPYc=",
      "dev": true
    },
    "http-errors": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.6.2.tgz",
      "integrity": "sha1-CgAsyFcHGSp+eUbO7cERVfYOxzY=",
      "dev": true,
      "requires": {
        "depd": "1.1.1",
        "inherits": "2.0.3",
        "setprototypeof": "1.0.3",
        "statuses": "1.3.1"
      },
      "dependencies": {
        "depd": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.1.tgz",
          "integrity": "sha1-V4O04cRZ8G+lyif5kfPQbnoxA1k=",
          "dev": true
        },
        "setprototypeof": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.0.3.tgz",
          "integrity": "sha1-ZlZ+NwQ+608E2RvWWMDL77VbjgQ=",
          "dev": true
        }
      }
    },
    "http-parser-js": {
      "version": "0.4.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.4.10.tgz",
      "integrity": "sha1-ksnBN0w1CF912zWexWzCV8u5P6Q=",
      "dev": true
    },
    "http-proxy": {
      "version": "1.16.2",
      "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.16.2.tgz",
      "integrity": "sha1-Bt/ykpUr9k2+hHH6nfcwZtTzd0I=",
      "dev": true,
      "requires": {
        "eventemitter3": "1.2.0",
        "requires-port": "1.0.0"
      }
    },
    "http-proxy-middleware": {
      "version": "0.17.4",
      "resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-0.17.4.tgz",
      "integrity": "sha1-ZC6ISIUdZvCdTxJJEoRtuutBuDM=",
      "dev": true,
      "requires": {
        "http-proxy": "1.16.2",
        "is-glob": "3.1.0",
        "lodash": "4.17.5",
        "micromatch": "2.3.11"
      },
      "dependencies": {
        "arr-diff": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
          "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
          "dev": true,
          "requires": {
            "arr-flatten": "1.1.0"
          }
        },
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "braces": {
          "version": "1.8.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
          "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
          "dev": true,
          "requires": {
            "expand-range": "1.8.2",
            "preserve": "0.2.0",
            "repeat-element": "1.1.2"
          }
        },
        "expand-brackets": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
          "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
          "dev": true,
          "requires": {
            "is-posix-bracket": "0.1.1"
          }
        },
        "extglob": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
          "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
          "dev": true,
          "requires": {
            "is-extglob": "1.0.0"
          },
          "dependencies": {
            "is-extglob": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
              "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
              "dev": true
            }
          }
        },
        "is-extglob": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
          "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
          "dev": true
        },
        "is-glob": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
          "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
          "dev": true,
          "requires": {
            "is-extglob": "2.1.1"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        },
        "micromatch": {
          "version": "2.3.11",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
          "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
          "dev": true,
          "requires": {
            "arr-diff": "2.0.0",
            "array-unique": "0.2.1",
            "braces": "1.8.5",
            "expand-brackets": "0.1.5",
            "extglob": "0.3.2",
            "filename-regex": "2.0.1",
            "is-extglob": "1.0.0",
            "is-glob": "2.0.1",
            "kind-of": "3.2.2",
            "normalize-path": "2.1.1",
            "object.omit": "2.0.1",
            "parse-glob": "3.0.4",
            "regex-cache": "0.4.4"
          },
          "dependencies": {
            "is-extglob": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
              "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
              "dev": true
            },
            "is-glob": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
              "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
              "dev": true,
              "requires": {
                "is-extglob": "1.0.0"
              }
            }
          }
        }
      }
    },
    "http-signature": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.1.1.tgz",
      "integrity": "sha1-33LiZwZs0Kxn+3at+OE0qPvPkb8=",
      "dev": true,
      "requires": {
        "assert-plus": "0.2.0",
        "jsprim": "1.4.1",
        "sshpk": "1.13.1"
      }
    },
    "https-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
      "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM=",
      "dev": true
    },
    "iconv-lite": {
      "version": "0.4.19",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.19.tgz",
      "integrity": "sha512-oTZqweIP51xaGPI4uPa56/Pri/480R+mo7SeU+YETByQNhDG55ycFyNLIgta9vXhILrxXDmF7ZGhqZIcuN0gJQ=="
    },
    "ieee754": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.8.tgz",
      "integrity": "sha1-vjPUCsEO8ZJnAfbwii2G+/0a0+Q=",
      "dev": true
    },
    "iferr": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
      "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE=",
      "dev": true
    },
    "import-local": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/import-local/-/import-local-1.0.0.tgz",
      "integrity": "sha512-vAaZHieK9qjGo58agRBg+bhHX3hoTZU/Oa3GESWLz7t1U62fk63aHuDJJEteXoDeTCcPmUT+z38gkHPZkkmpmQ==",
      "dev": true,
      "requires": {
        "pkg-dir": "2.0.0",
        "resolve-cwd": "2.0.0"
      }
    },
    "imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o=",
      "dev": true
    },
    "indent-string": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-2.1.0.tgz",
      "integrity": "sha1-ji1INIdCEhtKghi3oTfppSBJ3IA=",
      "dev": true,
      "requires": {
        "repeating": "2.0.1"
      }
    },
    "indexof": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/indexof/-/indexof-0.0.1.tgz",
      "integrity": "sha1-gtwzbSMrkGIXnQWrMpOmYFn9Q10=",
      "dev": true
    },
    "inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
      "dev": true,
      "requires": {
        "once": "1.4.0",
        "wrappy": "1.0.2"
      }
    },
    "inherits": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
      "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4=",
      "dev": true
    },
    "ini": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.5.tgz",
      "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw==",
      "dev": true
    },
    "inquirer": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-5.1.0.tgz",
      "integrity": "sha512-kn7N70US1MSZHZHSGJLiZ7iCwwncc7b0gc68YtlX29OjI3Mp0tSVV+snVXpZ1G+ONS3Ac9zd1m6hve2ibLDYfA==",
      "dev": true,
      "requires": {
        "ansi-escapes": "3.0.0",
        "chalk": "2.3.1",
        "cli-cursor": "2.1.0",
        "cli-width": "2.2.0",
        "external-editor": "2.1.0",
        "figures": "2.0.0",
        "lodash": "4.17.5",
        "mute-stream": "0.0.7",
        "run-async": "2.3.0",
        "rxjs": "5.5.6",
        "string-width": "2.1.1",
        "strip-ansi": "4.0.0",
        "through": "2.3.8"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "3.0.0"
          }
        }
      }
    },
    "internal-ip": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/internal-ip/-/internal-ip-1.2.0.tgz",
      "integrity": "sha1-rp+/k7mEh4eF1QqN4bNWlWBYz1w=",
      "dev": true,
      "requires": {
        "meow": "3.7.0"
      }
    },
    "interpret": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/interpret/-/interpret-1.1.0.tgz",
      "integrity": "sha1-ftGxQQxqDg94z5XTuEQMY/eLhhQ=",
      "dev": true
    },
    "into-stream": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/into-stream/-/into-stream-3.1.0.tgz",
      "integrity": "sha1-lvsKk2wSur1v8XUqF9BWFqvQlMY=",
      "dev": true,
      "requires": {
        "from2": "2.3.0",
        "p-is-promise": "1.1.0"
      }
    },
    "invariant": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.3.tgz",
      "integrity": "sha512-7Z5PPegwDTyjbaeCnV0efcyS6vdKAU51kpEmS7QFib3P4822l8ICYyMn7qvJnc+WzLoDsuI9gPMKbJ8pCu8XtA==",
      "requires": {
        "loose-envify": "1.3.1"
      }
    },
    "invert-kv": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-1.0.0.tgz",
      "integrity": "sha1-EEqOSqym09jNFXqO+L+rLXo//bY=",
      "dev": true
    },
    "ip": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/ip/-/ip-1.1.5.tgz",
      "integrity": "sha1-vd7XARQpCCjAoDnnLvJfWq7ENUo=",
      "dev": true
    },
    "ipaddr.js": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.6.0.tgz",
      "integrity": "sha1-4/o1e3c9phnybpXwSdBVxyeW+Gs=",
      "dev": true
    },
    "is-accessor-descriptor": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
      "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
      "dev": true,
      "requires": {
        "kind-of": "6.0.2"
      }
    },
    "is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0=",
      "dev": true
    },
    "is-binary-path": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
      "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
      "dev": true,
      "requires": {
        "binary-extensions": "1.11.0"
      }
    },
    "is-buffer": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
      "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w==",
      "dev": true
    },
    "is-builtin-module": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-builtin-module/-/is-builtin-module-1.0.0.tgz",
      "integrity": "sha1-VAVy0096wxGfj3bDDLwbHgN6/74=",
      "dev": true,
      "requires": {
        "builtin-modules": "1.1.1"
      }
    },
    "is-callable": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.1.3.tgz",
      "integrity": "sha1-hut1OSgF3cM69xySoO7fdO52BLI=",
      "dev": true
    },
    "is-data-descriptor": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
      "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
      "dev": true,
      "requires": {
        "kind-of": "6.0.2"
      }
    },
    "is-date-object": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.1.tgz",
      "integrity": "sha1-mqIOtq7rv/d/vTPnTKAbM1gdOhY=",
      "dev": true
    },
    "is-descriptor": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
      "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
      "dev": true,
      "requires": {
        "is-accessor-descriptor": "1.0.0",
        "is-data-descriptor": "1.0.0",
        "kind-of": "6.0.2"
      }
    },
    "is-dotfile": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/is-dotfile/-/is-dotfile-1.0.3.tgz",
      "integrity": "sha1-pqLzL/0t+wT1yiXs0Pa4PPeYoeE=",
      "dev": true
    },
    "is-equal-shallow": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz",
      "integrity": "sha1-IjgJj8Ih3gvPpdnqxMRdY4qhxTQ=",
      "dev": true,
      "requires": {
        "is-primitive": "2.0.0"
      }
    },
    "is-extendable": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
      "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
      "dev": true
    },
    "is-extglob": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
      "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
      "dev": true
    },
    "is-finite": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-finite/-/is-finite-1.0.2.tgz",
      "integrity": "sha1-zGZ3aVYCvlUO8R6LSqYwU0K20Ko=",
      "dev": true,
      "requires": {
        "number-is-nan": "1.0.1"
      }
    },
    "is-fullwidth-code-point": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
      "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
      "dev": true,
      "requires": {
        "number-is-nan": "1.0.1"
      }
    },
    "is-glob": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
      "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
      "dev": true,
      "requires": {
        "is-extglob": "1.0.0"
      }
    },
    "is-number": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
      "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
      "dev": true,
      "requires": {
        "kind-of": "3.2.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "is-object": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-object/-/is-object-1.0.1.tgz",
      "integrity": "sha1-iVJojF7C/9awPsyF52ngKQMINHA=",
      "dev": true
    },
    "is-observable": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/is-observable/-/is-observable-0.2.0.tgz",
      "integrity": "sha1-s2ExHYPG5dcmyr9eJQsCNxBvWuI=",
      "dev": true,
      "requires": {
        "symbol-observable": "0.2.4"
      },
      "dependencies": {
        "symbol-observable": {
          "version": "0.2.4",
          "resolved": "https://registry.npmjs.org/symbol-observable/-/symbol-observable-0.2.4.tgz",
          "integrity": "sha1-lag9smGG1q9+ehjb2XYKL4bQj0A=",
          "dev": true
        }
      }
    },
    "is-odd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-odd/-/is-odd-2.0.0.tgz",
      "integrity": "sha512-OTiixgpZAT1M4NHgS5IguFp/Vz2VI3U7Goh4/HA1adtwyLtSBrxYlcSYkhpAE07s4fKEcjrFxyvtQBND4vFQyQ==",
      "dev": true,
      "requires": {
        "is-number": "4.0.0"
      },
      "dependencies": {
        "is-number": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
          "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
          "dev": true
        }
      }
    },
    "is-path-cwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-1.0.0.tgz",
      "integrity": "sha1-0iXsIxMuie3Tj9p2dHLmLmXxEG0=",
      "dev": true
    },
    "is-path-in-cwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-1.0.0.tgz",
      "integrity": "sha1-ZHdYK4IU1gI0YJRWcAO+ip6sBNw=",
      "dev": true,
      "requires": {
        "is-path-inside": "1.0.1"
      }
    },
    "is-path-inside": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-1.0.1.tgz",
      "integrity": "sha1-jvW33lBDej/cprToZe96pVy0gDY=",
      "dev": true,
      "requires": {
        "path-is-inside": "1.0.2"
      }
    },
    "is-plain-obj": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-1.1.0.tgz",
      "integrity": "sha1-caUMhCnfync8kqOQpKA7OfzVHT4=",
      "dev": true
    },
    "is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "dev": true,
      "requires": {
        "isobject": "3.0.1"
      }
    },
    "is-posix-bracket": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz",
      "integrity": "sha1-MzTceXdDaOkvAW5vvAqI9c1ua8Q=",
      "dev": true
    },
    "is-primitive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-primitive/-/is-primitive-2.0.0.tgz",
      "integrity": "sha1-IHurkWOEmcB7Kt8kCkGochADRXU=",
      "dev": true
    },
    "is-promise": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-2.1.0.tgz",
      "integrity": "sha1-eaKp7OfwlugPNtKy87wWwf9L8/o=",
      "dev": true
    },
    "is-regex": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.0.4.tgz",
      "integrity": "sha1-VRdIm1RwkbCTDglWVM7SXul+lJE=",
      "dev": true,
      "requires": {
        "has": "1.0.1"
      }
    },
    "is-retry-allowed": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-retry-allowed/-/is-retry-allowed-1.1.0.tgz",
      "integrity": "sha1-EaBgVotnM5REAz0BJaYaINVk+zQ=",
      "dev": true
    },
    "is-scoped": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-scoped/-/is-scoped-1.0.0.tgz",
      "integrity": "sha1-RJypgpnnEwOCViieyytUDcQ3yzA=",
      "dev": true,
      "requires": {
        "scoped-regex": "1.0.0"
      }
    },
    "is-stream": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-1.1.0.tgz",
      "integrity": "sha1-EtSj3U5o4Lec6428hBc66A2RykQ="
    },
    "is-symbol": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.1.tgz",
      "integrity": "sha1-PMWfAAJRlLarLjjbrmaJJWtmBXI=",
      "dev": true
    },
    "is-typedarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
      "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo=",
      "dev": true
    },
    "is-utf8": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-utf8/-/is-utf8-0.2.1.tgz",
      "integrity": "sha1-Sw2hRCEE0bM2NA6AeX6GXPOffXI=",
      "dev": true
    },
    "is-windows": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
      "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA==",
      "dev": true
    },
    "is-wsl": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
      "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0=",
      "dev": true
    },
    "isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE=",
      "dev": true
    },
    "isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA=",
      "dev": true
    },
    "isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
      "dev": true
    },
    "isomorphic-fetch": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/isomorphic-fetch/-/isomorphic-fetch-2.2.1.tgz",
      "integrity": "sha1-YRrhrPFPXoH3KVB0coGf6XM1WKk=",
      "requires": {
        "node-fetch": "1.7.3",
        "whatwg-fetch": "2.0.3"
      }
    },
    "isstream": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
      "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo=",
      "dev": true
    },
    "istextorbinary": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/istextorbinary/-/istextorbinary-2.2.1.tgz",
      "integrity": "sha512-TS+hoFl8Z5FAFMK38nhBkdLt44CclNRgDHWeMgsV8ko3nDlr/9UI2Sf839sW7enijf8oKsZYXRvM8g0it9Zmcw==",
      "dev": true,
      "requires": {
        "binaryextensions": "2.1.1",
        "editions": "1.3.4",
        "textextensions": "2.2.0"
      }
    },
    "isurl": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isurl/-/isurl-1.0.0.tgz",
      "integrity": "sha512-1P/yWsxPlDtn7QeRD+ULKQPaIaN6yF368GZ2vDfv0AL0NwpStafjWCDDdn0k8wgFMWpVAqG7oJhxHnlud42i9w==",
      "dev": true,
      "requires": {
        "has-to-string-tag-x": "1.4.1",
        "is-object": "1.0.1"
      }
    },
    "js-tokens": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-3.0.2.tgz",
      "integrity": "sha1-mGbfOVECEw449/mWvOtlRDIJwls="
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM=",
      "dev": true,
      "optional": true
    },
    "jscodeshift": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/jscodeshift/-/jscodeshift-0.4.1.tgz",
      "integrity": "sha512-iOX6If+hsw0q99V3n31t4f5VlD1TQZddH08xbT65ZqA7T4Vkx68emrDZMUOLVvCEAJ6NpAk7DECe3fjC/t52AQ==",
      "dev": true,
      "requires": {
        "async": "1.5.2",
        "babel-plugin-transform-flow-strip-types": "6.22.0",
        "babel-preset-es2015": "6.24.1",
        "babel-preset-stage-1": "6.24.1",
        "babel-register": "6.26.0",
        "babylon": "6.18.0",
        "colors": "1.1.2",
        "flow-parser": "0.66.0",
        "lodash": "4.17.5",
        "micromatch": "2.3.11",
        "node-dir": "0.1.8",
        "nomnom": "1.8.1",
        "recast": "0.12.9",
        "temp": "0.8.3",
        "write-file-atomic": "1.3.4"
      },
      "dependencies": {
        "arr-diff": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
          "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
          "dev": true,
          "requires": {
            "arr-flatten": "1.1.0"
          }
        },
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "async": {
          "version": "1.5.2",
          "resolved": "https://registry.npmjs.org/async/-/async-1.5.2.tgz",
          "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo=",
          "dev": true
        },
        "braces": {
          "version": "1.8.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
          "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
          "dev": true,
          "requires": {
            "expand-range": "1.8.2",
            "preserve": "0.2.0",
            "repeat-element": "1.1.2"
          }
        },
        "core-js": {
          "version": "2.5.3",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.5.3.tgz",
          "integrity": "sha1-isw4NFgk8W2DZbfJtCWRaOjtYD4=",
          "dev": true
        },
        "expand-brackets": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
          "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
          "dev": true,
          "requires": {
            "is-posix-bracket": "0.1.1"
          }
        },
        "extglob": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
          "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
          "dev": true,
          "requires": {
            "is-extglob": "1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        },
        "micromatch": {
          "version": "2.3.11",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
          "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
          "dev": true,
          "requires": {
            "arr-diff": "2.0.0",
            "array-unique": "0.2.1",
            "braces": "1.8.5",
            "expand-brackets": "0.1.5",
            "extglob": "0.3.2",
            "filename-regex": "2.0.1",
            "is-extglob": "1.0.0",
            "is-glob": "2.0.1",
            "kind-of": "3.2.2",
            "normalize-path": "2.1.1",
            "object.omit": "2.0.1",
            "parse-glob": "3.0.4",
            "regex-cache": "0.4.4"
          }
        },
        "recast": {
          "version": "0.12.9",
          "resolved": "https://registry.npmjs.org/recast/-/recast-0.12.9.tgz",
          "integrity": "sha512-y7ANxCWmMW8xLOaiopiRDlyjQ9ajKRENBH+2wjntIbk3A6ZR1+BLQttkmSHMY7Arl+AAZFwJ10grg2T6f1WI8A==",
          "dev": true,
          "requires": {
            "ast-types": "0.10.1",
            "core-js": "2.5.3",
            "esprima": "4.0.0",
            "private": "0.1.8",
            "source-map": "0.6.1"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "jsesc": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-1.3.0.tgz",
      "integrity": "sha1-RsP+yMGJKxKwgz25vHYiF226s0s=",
      "dev": true
    },
    "json-buffer": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.0.tgz",
      "integrity": "sha1-Wx85evx11ne96Lz8Dkfh+aPZqJg=",
      "dev": true
    },
    "json-schema": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
      "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM=",
      "dev": true
    },
    "json-schema-traverse": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.3.1.tgz",
      "integrity": "sha1-NJptRMU6Ud6JtAgFxdXlm0F9M0A=",
      "dev": true
    },
    "json-stable-stringify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify/-/json-stable-stringify-1.0.1.tgz",
      "integrity": "sha1-mnWdOcXy/1A/1TAGRu1EX4jE+a8=",
      "dev": true,
      "requires": {
        "jsonify": "0.0.0"
      }
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus=",
      "dev": true
    },
    "json3": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/json3/-/json3-3.3.2.tgz",
      "integrity": "sha1-PAQ0dD35Pi9cQq7nsZvLSDV19OE=",
      "dev": true
    },
    "json5": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/json5/-/json5-0.5.1.tgz",
      "integrity": "sha1-Hq3nrMASA0rYTiOWdn6tn6VJWCE=",
      "dev": true
    },
    "jsonify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/jsonify/-/jsonify-0.0.0.tgz",
      "integrity": "sha1-LHS27kHZPKUbe1qu6PUDYx0lKnM=",
      "dev": true
    },
    "jsprim": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
      "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
      "dev": true,
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.2.3",
        "verror": "1.10.0"
      },
      "dependencies": {
        "assert-plus": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
          "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
          "dev": true
        }
      }
    },
    "keyv": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-3.0.0.tgz",
      "integrity": "sha512-eguHnq22OE3uVoSYG0LVWNP+4ppamWr9+zWBe1bsNcovIMy6huUJFPgy4mGwCd/rnl3vOLGW1MTlu4c57CT1xA==",
      "dev": true,
      "requires": {
        "json-buffer": "3.0.0"
      }
    },
    "killable": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/killable/-/killable-1.0.0.tgz",
      "integrity": "sha1-2ouEvUfeU5WHj5XWTQLyRJ/gXms=",
      "dev": true
    },
    "kind-of": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
      "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA==",
      "dev": true
    },
    "lazy-cache": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/lazy-cache/-/lazy-cache-2.0.2.tgz",
      "integrity": "sha1-uRkKT5EzVGlIQIWfio9whNiCImQ=",
      "dev": true,
      "requires": {
        "set-getter": "0.1.0"
      }
    },
    "lcid": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/lcid/-/lcid-1.0.0.tgz",
      "integrity": "sha1-MIrMr6C8SDo4Z7S28rlQYlHRuDU=",
      "dev": true,
      "requires": {
        "invert-kv": "1.0.0"
      }
    },
    "listr": {
      "version": "0.13.0",
      "resolved": "https://registry.npmjs.org/listr/-/listr-0.13.0.tgz",
      "integrity": "sha1-ILsLowuuZg7oTMBQPfS+PVYjiH0=",
      "dev": true,
      "requires": {
        "chalk": "1.1.3",
        "cli-truncate": "0.2.1",
        "figures": "1.7.0",
        "indent-string": "2.1.0",
        "is-observable": "0.2.0",
        "is-promise": "2.1.0",
        "is-stream": "1.1.0",
        "listr-silent-renderer": "1.1.1",
        "listr-update-renderer": "0.4.0",
        "listr-verbose-renderer": "0.4.1",
        "log-symbols": "1.0.2",
        "log-update": "1.0.2",
        "ora": "0.2.3",
        "p-map": "1.2.0",
        "rxjs": "5.5.6",
        "stream-to-observable": "0.2.0",
        "strip-ansi": "3.0.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "figures": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/figures/-/figures-1.7.0.tgz",
          "integrity": "sha1-y+Hjr/zxzUS4DK3+0o3Hk6lwHS4=",
          "dev": true,
          "requires": {
            "escape-string-regexp": "1.0.5",
            "object-assign": "4.1.1"
          }
        },
        "log-symbols": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-1.0.2.tgz",
          "integrity": "sha1-N2/3tY6jCGoPCfrMdGF+ylAeGhg=",
          "dev": true,
          "requires": {
            "chalk": "1.1.3"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "listr-silent-renderer": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/listr-silent-renderer/-/listr-silent-renderer-1.1.1.tgz",
      "integrity": "sha1-kktaN1cVN3C/Go4/v3S4u/P5JC4=",
      "dev": true
    },
    "listr-update-renderer": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/listr-update-renderer/-/listr-update-renderer-0.4.0.tgz",
      "integrity": "sha1-NE2YDaLKLosUW6MFkI8yrj9MyKc=",
      "dev": true,
      "requires": {
        "chalk": "1.1.3",
        "cli-truncate": "0.2.1",
        "elegant-spinner": "1.0.1",
        "figures": "1.7.0",
        "indent-string": "3.2.0",
        "log-symbols": "1.0.2",
        "log-update": "1.0.2",
        "strip-ansi": "3.0.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "figures": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/figures/-/figures-1.7.0.tgz",
          "integrity": "sha1-y+Hjr/zxzUS4DK3+0o3Hk6lwHS4=",
          "dev": true,
          "requires": {
            "escape-string-regexp": "1.0.5",
            "object-assign": "4.1.1"
          }
        },
        "indent-string": {
          "version": "3.2.0",
          "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-3.2.0.tgz",
          "integrity": "sha1-Sl/W0nzDMvN+VBmlBNu4NxBckok=",
          "dev": true
        },
        "log-symbols": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-1.0.2.tgz",
          "integrity": "sha1-N2/3tY6jCGoPCfrMdGF+ylAeGhg=",
          "dev": true,
          "requires": {
            "chalk": "1.1.3"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "listr-verbose-renderer": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/listr-verbose-renderer/-/listr-verbose-renderer-0.4.1.tgz",
      "integrity": "sha1-ggb0z21S3cWCfl/RSYng6WWTOjU=",
      "dev": true,
      "requires": {
        "chalk": "1.1.3",
        "cli-cursor": "1.0.2",
        "date-fns": "1.29.0",
        "figures": "1.7.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "cli-cursor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-1.0.2.tgz",
          "integrity": "sha1-ZNo/fValRBLll5S9Ytw1KV6PKYc=",
          "dev": true,
          "requires": {
            "restore-cursor": "1.0.1"
          }
        },
        "figures": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/figures/-/figures-1.7.0.tgz",
          "integrity": "sha1-y+Hjr/zxzUS4DK3+0o3Hk6lwHS4=",
          "dev": true,
          "requires": {
            "escape-string-regexp": "1.0.5",
            "object-assign": "4.1.1"
          }
        },
        "onetime": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-1.1.0.tgz",
          "integrity": "sha1-ofeDj4MUxRbwXs78vEzP4EtO14k=",
          "dev": true
        },
        "restore-cursor": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-1.0.1.tgz",
          "integrity": "sha1-NGYfRohjJ/7SmRR5FSJS35LapUE=",
          "dev": true,
          "requires": {
            "exit-hook": "1.1.1",
            "onetime": "1.1.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "load-json-file": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz",
      "integrity": "sha1-lWkFcI1YtLq0wiYbBPWfMcmTdMA=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "parse-json": "2.2.0",
        "pify": "2.3.0",
        "pinkie-promise": "2.0.1",
        "strip-bom": "2.0.0"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "loader-runner": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.3.0.tgz",
      "integrity": "sha1-9IKuqC1UPgeSFwDVpG7yb9rGuKI=",
      "dev": true
    },
    "loader-utils": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.1.0.tgz",
      "integrity": "sha1-yYrvSIvM7aL/teLeZG1qdUQp9c0=",
      "dev": true,
      "requires": {
        "big.js": "3.2.0",
        "emojis-list": "2.1.0",
        "json5": "0.5.1"
      }
    },
    "locate-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
      "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
      "dev": true,
      "requires": {
        "p-locate": "2.0.0",
        "path-exists": "3.0.0"
      }
    },
    "lodash": {
      "version": "4.17.5",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.5.tgz",
      "integrity": "sha512-svL3uiZf1RwhH+cWrfZn3A4+U58wbP0tGVTLQPbjplZxZ8ROD9VLuNgsRniTlLe7OlSqR79RUehXgpBW/s0IQw=="
    },
    "lodash.endswith": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/lodash.endswith/-/lodash.endswith-4.2.1.tgz",
      "integrity": "sha1-/tWawXOO0+I27dcGTsRWRIs3vAk=",
      "dev": true
    },
    "lodash.isfunction": {
      "version": "3.0.9",
      "resolved": "https://registry.npmjs.org/lodash.isfunction/-/lodash.isfunction-3.0.9.tgz",
      "integrity": "sha512-AirXNj15uRIMMPihnkInB4i3NHeb4iBtNg9WRWuK2o31S+ePwwNmDPaTL3o7dTJ+VXNZim7rFs4rxN4YU1oUJw==",
      "dev": true
    },
    "lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha1-1SfftUVuynzJu5XV2ur4i6VKVFE=",
      "dev": true
    },
    "lodash.startswith": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/lodash.startswith/-/lodash.startswith-4.2.1.tgz",
      "integrity": "sha1-xZjErc4YiiflMUVzHNxsDnF3YAw=",
      "dev": true
    },
    "log-symbols": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-2.2.0.tgz",
      "integrity": "sha512-VeIAFslyIerEJLXHziedo2basKbMKtTw3vfn5IzG0XTjhAVEJyNHnL2p7vc+wBDSdQuUpNw3M2u6xb9QsAY5Eg==",
      "dev": true,
      "requires": {
        "chalk": "2.3.1"
      }
    },
    "log-update": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/log-update/-/log-update-1.0.2.tgz",
      "integrity": "sha1-GZKfZMQJPS0ucHWh2tivWcKWuNE=",
      "dev": true,
      "requires": {
        "ansi-escapes": "1.4.0",
        "cli-cursor": "1.0.2"
      },
      "dependencies": {
        "ansi-escapes": {
          "version": "1.4.0",
          "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-1.4.0.tgz",
          "integrity": "sha1-06ioOzGapneTZisT52HHkRQiMG4=",
          "dev": true
        },
        "cli-cursor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-1.0.2.tgz",
          "integrity": "sha1-ZNo/fValRBLll5S9Ytw1KV6PKYc=",
          "dev": true,
          "requires": {
            "restore-cursor": "1.0.1"
          }
        },
        "onetime": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-1.1.0.tgz",
          "integrity": "sha1-ofeDj4MUxRbwXs78vEzP4EtO14k=",
          "dev": true
        },
        "restore-cursor": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-1.0.1.tgz",
          "integrity": "sha1-NGYfRohjJ/7SmRR5FSJS35LapUE=",
          "dev": true,
          "requires": {
            "exit-hook": "1.1.1",
            "onetime": "1.1.0"
          }
        }
      }
    },
    "loglevel": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.6.1.tgz",
      "integrity": "sha1-4PyVEztu8nbNyIh82vJKpvFW+Po=",
      "dev": true
    },
    "loglevelnext": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/loglevelnext/-/loglevelnext-1.0.3.tgz",
      "integrity": "sha512-OCxd/b78TijTB4b6zVqLbMrxhebyvdZKwqpL0VHUZ0pYhavXaPD4l6Xrr4n5xqTYWiqtb0i7ikSoJY/myQ/Org==",
      "dev": true
    },
    "loose-envify": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.3.1.tgz",
      "integrity": "sha1-0aitM/qc4OcT1l/dCsi3SNR4yEg=",
      "requires": {
        "js-tokens": "3.0.2"
      }
    },
    "loud-rejection": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/loud-rejection/-/loud-rejection-1.6.0.tgz",
      "integrity": "sha1-W0b4AUft7leIcPCG0Eghz5mOVR8=",
      "dev": true,
      "requires": {
        "currently-unhandled": "0.4.1",
        "signal-exit": "3.0.2"
      }
    },
    "lowercase-keys": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/lowercase-keys/-/lowercase-keys-1.0.0.tgz",
      "integrity": "sha1-TjNms55/VFfjXxMkvfb4jQv8cwY=",
      "dev": true
    },
    "lru-cache": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-4.1.1.tgz",
      "integrity": "sha512-q4spe4KTfsAS1SUHLO0wz8Qiyf1+vMIAgpRYioFYDMNqKfHQbg+AVDH3i4fvpl71/P1L0dBl+fQi+P37UYf0ew==",
      "dev": true,
      "requires": {
        "pseudomap": "1.0.2",
        "yallist": "2.1.2"
      }
    },
    "make-dir": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.2.0.tgz",
      "integrity": "sha512-aNUAa4UMg/UougV25bbrU4ZaaKNjJ/3/xnvg/twpmKROPdKZPZ9wGgI0opdZzO8q/zUFawoUuixuOv33eZ61Iw==",
      "dev": true,
      "requires": {
        "pify": "3.0.0"
      }
    },
    "map-cache": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
      "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8=",
      "dev": true
    },
    "map-obj": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/map-obj/-/map-obj-1.0.1.tgz",
      "integrity": "sha1-2TPOuSBdgr3PSIb2dCvcK03qFG0=",
      "dev": true
    },
    "map-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
      "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
      "dev": true,
      "requires": {
        "object-visit": "1.0.1"
      }
    },
    "md5.js": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.4.tgz",
      "integrity": "sha1-6b296UogpawYsENA/Fdk1bCdkB0=",
      "dev": true,
      "requires": {
        "hash-base": "3.0.4",
        "inherits": "2.0.3"
      },
      "dependencies": {
        "hash-base": {
          "version": "3.0.4",
          "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
          "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
          "dev": true,
          "requires": {
            "inherits": "2.0.3",
            "safe-buffer": "5.1.1"
          }
        }
      }
    },
    "media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha1-hxDXrwqmJvj/+hzgAWhUUmMlV0g=",
      "dev": true
    },
    "mem": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/mem/-/mem-1.1.0.tgz",
      "integrity": "sha1-Xt1StIXKHZAP5kiVUFOZoN+kX3Y=",
      "dev": true,
      "requires": {
        "mimic-fn": "1.2.0"
      }
    },
    "mem-fs": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/mem-fs/-/mem-fs-1.1.3.tgz",
      "integrity": "sha1-uK6NLj/Lb10/kWXBLUVRoGXZicw=",
      "dev": true,
      "requires": {
        "through2": "2.0.3",
        "vinyl": "1.2.0",
        "vinyl-file": "2.0.0"
      }
    },
    "mem-fs-editor": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mem-fs-editor/-/mem-fs-editor-3.0.2.tgz",
      "integrity": "sha1-3Qpuryu4prN3QAZ6pUnrUwEFr58=",
      "dev": true,
      "requires": {
        "commondir": "1.0.1",
        "deep-extend": "0.4.2",
        "ejs": "2.5.7",
        "glob": "7.1.2",
        "globby": "6.1.0",
        "mkdirp": "0.5.1",
        "multimatch": "2.1.0",
        "rimraf": "2.6.2",
        "through2": "2.0.3",
        "vinyl": "2.1.0"
      },
      "dependencies": {
        "clone": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/clone/-/clone-2.1.1.tgz",
          "integrity": "sha1-0hfR6WERjjrJpLi7oyhVU79kfNs=",
          "dev": true
        },
        "clone-stats": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/clone-stats/-/clone-stats-1.0.0.tgz",
          "integrity": "sha1-s3gt/4u1R04Yuba/D9/ngvh3doA=",
          "dev": true
        },
        "replace-ext": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/replace-ext/-/replace-ext-1.0.0.tgz",
          "integrity": "sha1-3mMSg3P8v3w8z6TeWkgMRaZ5WOs=",
          "dev": true
        },
        "vinyl": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/vinyl/-/vinyl-2.1.0.tgz",
          "integrity": "sha1-Ah+cLPlR1rk5lDyJ617lrdT9kkw=",
          "dev": true,
          "requires": {
            "clone": "2.1.1",
            "clone-buffer": "1.0.0",
            "clone-stats": "1.0.0",
            "cloneable-readable": "1.0.0",
            "remove-trailing-separator": "1.1.0",
            "replace-ext": "1.0.0"
          }
        }
      }
    },
    "memory-fs": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
      "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
      "dev": true,
      "requires": {
        "errno": "0.1.7",
        "readable-stream": "2.3.4"
      }
    },
    "meow": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/meow/-/meow-3.7.0.tgz",
      "integrity": "sha1-cstmi0JSKCkKu/qFaJJYcwioAfs=",
      "dev": true,
      "requires": {
        "camelcase-keys": "2.1.0",
        "decamelize": "1.2.0",
        "loud-rejection": "1.6.0",
        "map-obj": "1.0.1",
        "minimist": "1.2.0",
        "normalize-package-data": "2.4.0",
        "object-assign": "4.1.1",
        "read-pkg-up": "1.0.1",
        "redent": "1.0.0",
        "trim-newlines": "1.0.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "merge-descriptors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
      "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E=",
      "dev": true
    },
    "methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha1-VSmk1nZUE07cxSZmVoNbD4Ua/O4=",
      "dev": true
    },
    "micromatch": {
      "version": "3.1.9",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.9.tgz",
      "integrity": "sha512-SlIz6sv5UPaAVVFRKodKjCg48EbNoIhgetzfK/Cy0v5U52Z6zB136M8tp0UC9jM53LYbmIRihJszvvqpKkfm9g==",
      "dev": true,
      "requires": {
        "arr-diff": "4.0.0",
        "array-unique": "0.3.2",
        "braces": "2.3.1",
        "define-property": "2.0.2",
        "extend-shallow": "3.0.2",
        "extglob": "2.0.4",
        "fragment-cache": "0.2.1",
        "kind-of": "6.0.2",
        "nanomatch": "1.2.9",
        "object.pick": "1.3.0",
        "regex-not": "1.0.2",
        "snapdragon": "0.8.1",
        "to-regex": "3.0.2"
      }
    },
    "miller-rabin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
      "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "brorand": "1.1.0"
      }
    },
    "mime": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.4.1.tgz",
      "integrity": "sha512-KI1+qOZu5DcW6wayYHSzR/tXKCDC5Om4s1z2QJjDULzLcmf3DvzS7oluY4HCTrc+9FiKmWUgeNLg7W3uIQvxtQ==",
      "dev": true
    },
    "mime-db": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.33.0.tgz",
      "integrity": "sha512-BHJ/EKruNIqJf/QahvxwQZXKygOQ256myeN/Ew+THcAa5q+PjyTTMMeNQC4DZw5AwfvelsUrA6B67NKMqXDbzQ==",
      "dev": true
    },
    "mime-types": {
      "version": "2.1.18",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.18.tgz",
      "integrity": "sha512-lc/aahn+t4/SWV/qcmumYjymLsWfN3ELhpmVuUFjgsORruuZPVSwAQryq+HHGvO/SI2KVX26bx+En+zhM8g8hQ==",
      "dev": true,
      "requires": {
        "mime-db": "1.33.0"
      }
    },
    "mimic-fn": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-1.2.0.tgz",
      "integrity": "sha512-jf84uxzwiuiIVKiOLpfYk7N46TSy8ubTonmneY9vrpHNAnp0QBt2BxWV9dO3/j+BoVAb+a5G6YDPW3M5HOdMWQ==",
      "dev": true
    },
    "mimic-response": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-1.0.0.tgz",
      "integrity": "sha1-3z02Uqc/3ta5sLJBRub9BSNTRY4=",
      "dev": true
    },
    "min-document": {
      "version": "2.19.0",
      "resolved": "https://registry.npmjs.org/min-document/-/min-document-2.19.0.tgz",
      "integrity": "sha1-e9KC4/WELtKVu3SM3Z8f+iyCRoU=",
      "dev": true,
      "requires": {
        "dom-walk": "0.1.1"
      }
    },
    "minimalistic-assert": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.0.tgz",
      "integrity": "sha1-cCvi3aazf0g2vLP121ZkG2Sh09M=",
      "dev": true
    },
    "minimalistic-crypto-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
      "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo=",
      "dev": true
    },
    "minimatch": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
      "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
      "dev": true,
      "requires": {
        "brace-expansion": "1.1.11"
      }
    },
    "minimist": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz",
      "integrity": "sha1-hX/Kv8M5fSYluCKCYuhqp6ARsF0=",
      "dev": true
    },
    "mississippi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-2.0.0.tgz",
      "integrity": "sha512-zHo8v+otD1J10j/tC+VNoGK9keCuByhKovAvdn74dmxJl9+mWHnx6EMsDN4lgRoMI/eYo2nchAxniIbUPb5onw==",
      "dev": true,
      "requires": {
        "concat-stream": "1.6.0",
        "duplexify": "3.5.3",
        "end-of-stream": "1.4.1",
        "flush-write-stream": "1.0.2",
        "from2": "2.3.0",
        "parallel-transform": "1.1.0",
        "pump": "2.0.1",
        "pumpify": "1.4.0",
        "stream-each": "1.2.2",
        "through2": "2.0.3"
      }
    },
    "mixin-deep": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.1.tgz",
      "integrity": "sha512-8ZItLHeEgaqEvd5lYBXfm4EZSFCX29Jb9K+lAHhDKzReKBQKj3R+7NOF6tjqYi9t4oI8VUfaWITJQm86wnXGNQ==",
      "dev": true,
      "requires": {
        "for-in": "1.0.2",
        "is-extendable": "1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "dev": true,
          "requires": {
            "is-plain-object": "2.0.4"
          }
        }
      }
    },
    "mkdirp": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz",
      "integrity": "sha1-MAV0OOrGz3+MR2fzhkjWaX11yQM=",
      "dev": true,
      "requires": {
        "minimist": "0.0.8"
      }
    },
    "move-concurrently": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
      "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
      "dev": true,
      "requires": {
        "aproba": "1.2.0",
        "copy-concurrently": "1.0.5",
        "fs-write-stream-atomic": "1.0.10",
        "mkdirp": "0.5.1",
        "rimraf": "2.6.2",
        "run-queue": "1.0.3"
      }
    },
    "ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
    },
    "multicast-dns": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-6.2.3.tgz",
      "integrity": "sha512-ji6J5enbMyGRHIAkAOu3WdV8nggqviKCEKtXcOqfphZZtQrmHKycfynJ2V7eVPUA4NhJ6V7Wf4TmGbTwKE9B6g==",
      "dev": true,
      "requires": {
        "dns-packet": "1.3.1",
        "thunky": "1.0.2"
      }
    },
    "multicast-dns-service-types": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/multicast-dns-service-types/-/multicast-dns-service-types-1.1.0.tgz",
      "integrity": "sha1-iZ8R2WhuXgXLkbNdXw5jt3PPyQE=",
      "dev": true
    },
    "multimatch": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/multimatch/-/multimatch-2.1.0.tgz",
      "integrity": "sha1-nHkGoi+0wCkZ4vX3UWG0zb1LKis=",
      "dev": true,
      "requires": {
        "array-differ": "1.0.0",
        "array-union": "1.0.2",
        "arrify": "1.0.1",
        "minimatch": "3.0.4"
      }
    },
    "mute-stream": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.7.tgz",
      "integrity": "sha1-MHXOk7whuPq0PhvE2n6BFe0ee6s=",
      "dev": true
    },
    "nan": {
      "version": "2.9.2",
      "resolved": "https://registry.npmjs.org/nan/-/nan-2.9.2.tgz",
      "integrity": "sha512-ltW65co7f3PQWBDbqVvaU1WtFJUsNW7sWWm4HINhbMQIyVyzIeyZ8toX5TC5eeooE6piZoaEh4cZkueSKG3KYw==",
      "dev": true,
      "optional": true
    },
    "nanomatch": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.9.tgz",
      "integrity": "sha512-n8R9bS8yQ6eSXaV6jHUpKzD8gLsin02w1HSFiegwrs9E098Ylhw5jdyKPaYqvHknHaSCKTPp7C8dGCQ0q9koXA==",
      "dev": true,
      "requires": {
        "arr-diff": "4.0.0",
        "array-unique": "0.3.2",
        "define-property": "2.0.2",
        "extend-shallow": "3.0.2",
        "fragment-cache": "0.2.1",
        "is-odd": "2.0.0",
        "is-windows": "1.0.2",
        "kind-of": "6.0.2",
        "object.pick": "1.3.0",
        "regex-not": "1.0.2",
        "snapdragon": "0.8.1",
        "to-regex": "3.0.2"
      }
    },
    "negotiator": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.1.tgz",
      "integrity": "sha1-KzJxhOiZIQEXeyhWP7XnECrNDKk=",
      "dev": true
    },
    "neo-async": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.5.0.tgz",
      "integrity": "sha512-nJmSswG4As/MkRq7QZFuH/sf/yuv8ODdMZrY4Bedjp77a5MK4A6s7YbBB64c9u79EBUOfXUXBvArmvzTD0X+6g==",
      "dev": true
    },
    "nice-try": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.4.tgz",
      "integrity": "sha512-2NpiFHqC87y/zFke0fC0spBXL3bBsoh/p5H1EFhshxjCR5+0g2d6BiXbUFz9v1sAcxsk2htp2eQnNIci2dIYcA==",
      "dev": true
    },
    "node-dir": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/node-dir/-/node-dir-0.1.8.tgz",
      "integrity": "sha1-VfuN62mQcHB/tn+RpGDwRIKUx30=",
      "dev": true
    },
    "node-fetch": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-1.7.3.tgz",
      "integrity": "sha512-NhZ4CsKx7cYm2vSrBAr2PvFOe6sWDf0UYLRqA6svUYg7+/TSfVAu49jYC4BvQ4Sms9SZgdqGBgroqfDhJdTyKQ==",
      "requires": {
        "encoding": "0.1.12",
        "is-stream": "1.1.0"
      }
    },
    "node-forge": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.7.1.tgz",
      "integrity": "sha1-naYR6giYL0uUIGs760zJZl8gwwA=",
      "dev": true
    },
    "node-libs-browser": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.1.0.tgz",
      "integrity": "sha512-5AzFzdoIMb89hBGMZglEegffzgRg+ZFoUmisQ8HI4j1KDdpx13J0taNp2y9xPbur6W61gepGDDotGBVQ7mfUCg==",
      "dev": true,
      "requires": {
        "assert": "1.4.1",
        "browserify-zlib": "0.2.0",
        "buffer": "4.9.1",
        "console-browserify": "1.1.0",
        "constants-browserify": "1.0.0",
        "crypto-browserify": "3.12.0",
        "domain-browser": "1.2.0",
        "events": "1.1.1",
        "https-browserify": "1.0.0",
        "os-browserify": "0.3.0",
        "path-browserify": "0.0.0",
        "process": "0.11.10",
        "punycode": "1.4.1",
        "querystring-es3": "0.2.1",
        "readable-stream": "2.3.4",
        "stream-browserify": "2.0.1",
        "stream-http": "2.8.0",
        "string_decoder": "1.0.3",
        "timers-browserify": "2.0.6",
        "tty-browserify": "0.0.0",
        "url": "0.11.0",
        "util": "0.10.3",
        "vm-browserify": "0.0.4"
      }
    },
    "nomnom": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/nomnom/-/nomnom-1.8.1.tgz",
      "integrity": "sha1-IVH3Ikcrp55Qp2/BJbuMjy5Nwqc=",
      "dev": true,
      "requires": {
        "chalk": "0.4.0",
        "underscore": "1.6.0"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-1.0.0.tgz",
          "integrity": "sha1-yxAt8cVvUSPquLZ817mAJ6AnkXg=",
          "dev": true
        },
        "chalk": {
          "version": "0.4.0",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-0.4.0.tgz",
          "integrity": "sha1-UZmj3c0MHv4jvAjBsCewYXbgxk8=",
          "dev": true,
          "requires": {
            "ansi-styles": "1.0.0",
            "has-color": "0.1.7",
            "strip-ansi": "0.1.1"
          }
        },
        "strip-ansi": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-0.1.1.tgz",
          "integrity": "sha1-OeipjQRNFQZgq+SmgIrPcLt7yZE=",
          "dev": true
        }
      }
    },
    "normalize-package-data": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.4.0.tgz",
      "integrity": "sha512-9jjUFbTPfEy3R/ad/2oNbKtW9Hgovl5O1FvFWKkKblNXoN/Oou6+9+KKohPK13Yc3/TyunyWhJp6gvRNR/PPAw==",
      "dev": true,
      "requires": {
        "hosted-git-info": "2.5.0",
        "is-builtin-module": "1.0.0",
        "semver": "5.5.0",
        "validate-npm-package-license": "3.0.1"
      }
    },
    "normalize-path": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
      "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
      "dev": true,
      "requires": {
        "remove-trailing-separator": "1.1.0"
      }
    },
    "normalize-url": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-2.0.1.tgz",
      "integrity": "sha512-D6MUW4K/VzoJ4rJ01JFKxDrtY1v9wrgzCX5f2qj/lzH1m/lW6MhUZFKerVsnyjOhOsYzI9Kqqak+10l4LvLpMw==",
      "dev": true,
      "requires": {
        "prepend-http": "2.0.0",
        "query-string": "5.1.0",
        "sort-keys": "2.0.0"
      }
    },
    "npm-run-path": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-2.0.2.tgz",
      "integrity": "sha1-NakjLfo11wZ7TLLd8jV7GHFTbF8=",
      "dev": true,
      "requires": {
        "path-key": "2.0.1"
      }
    },
    "number-is-nan": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/number-is-nan/-/number-is-nan-1.0.1.tgz",
      "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0=",
      "dev": true
    },
    "oauth-sign": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.8.2.tgz",
      "integrity": "sha1-Rqarfwrq2N6unsBWV4C31O/rnUM=",
      "dev": true
    },
    "object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
    },
    "object-copy": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
      "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
      "dev": true,
      "requires": {
        "copy-descriptor": "0.1.1",
        "define-property": "0.2.5",
        "kind-of": "3.2.2"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          },
          "dependencies": {
            "kind-of": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
              "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
              "dev": true
            }
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "object-keys": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.0.11.tgz",
      "integrity": "sha1-xUYBd4rVYPEULODgG8yotW0TQm0=",
      "dev": true
    },
    "object-visit": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
      "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
      "dev": true,
      "requires": {
        "isobject": "3.0.1"
      }
    },
    "object.omit": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/object.omit/-/object.omit-2.0.1.tgz",
      "integrity": "sha1-Gpx0SCnznbuFjHbKNXmuKlTr0fo=",
      "dev": true,
      "requires": {
        "for-own": "0.1.5",
        "is-extendable": "0.1.1"
      }
    },
    "object.pick": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
      "dev": true,
      "requires": {
        "isobject": "3.0.1"
      }
    },
    "obuf": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.1.tgz",
      "integrity": "sha1-EEEktsYCxnlogaBCVB0220OlJk4=",
      "dev": true
    },
    "on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
      "dev": true,
      "requires": {
        "ee-first": "1.1.1"
      }
    },
    "on-headers": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.0.1.tgz",
      "integrity": "sha1-ko9dD0cNSTQmUepnlLCFfBAGk/c=",
      "dev": true
    },
    "once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
      "dev": true,
      "requires": {
        "wrappy": "1.0.2"
      }
    },
    "onetime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-2.0.1.tgz",
      "integrity": "sha1-BnQoIw/WdEOyeUsiu6UotoZ5YtQ=",
      "dev": true,
      "requires": {
        "mimic-fn": "1.2.0"
      }
    },
    "opn": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/opn/-/opn-5.2.0.tgz",
      "integrity": "sha512-Jd/GpzPyHF4P2/aNOVmS3lfMSWV9J7cOhCG1s08XCEAsPkB7lp6ddiU0J7XzyQRDUh8BqJ7PchfINjR8jyofRQ==",
      "dev": true,
      "requires": {
        "is-wsl": "1.1.0"
      }
    },
    "ora": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/ora/-/ora-0.2.3.tgz",
      "integrity": "sha1-N1J9Igrc1Tw5tzVx11QVbV22V6Q=",
      "dev": true,
      "requires": {
        "chalk": "1.1.3",
        "cli-cursor": "1.0.2",
        "cli-spinners": "0.1.2",
        "object-assign": "4.1.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "cli-cursor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-1.0.2.tgz",
          "integrity": "sha1-ZNo/fValRBLll5S9Ytw1KV6PKYc=",
          "dev": true,
          "requires": {
            "restore-cursor": "1.0.1"
          }
        },
        "onetime": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-1.1.0.tgz",
          "integrity": "sha1-ofeDj4MUxRbwXs78vEzP4EtO14k=",
          "dev": true
        },
        "restore-cursor": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-1.0.1.tgz",
          "integrity": "sha1-NGYfRohjJ/7SmRR5FSJS35LapUE=",
          "dev": true,
          "requires": {
            "exit-hook": "1.1.1",
            "onetime": "1.1.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "original": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/original/-/original-1.0.0.tgz",
      "integrity": "sha1-kUf5P6FpbQS+YeAb1QuurKZWvTs=",
      "dev": true,
      "requires": {
        "url-parse": "1.0.5"
      },
      "dependencies": {
        "url-parse": {
          "version": "1.0.5",
          "resolved": "https://registry.npmjs.org/url-parse/-/url-parse-1.0.5.tgz",
          "integrity": "sha1-CFSGBCKv3P7+tsllxmLUgAFpkns=",
          "dev": true,
          "requires": {
            "querystringify": "0.0.4",
            "requires-port": "1.0.0"
          }
        }
      }
    },
    "os-browserify": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
      "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc=",
      "dev": true
    },
    "os-homedir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz",
      "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M=",
      "dev": true
    },
    "os-locale": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-2.1.0.tgz",
      "integrity": "sha512-3sslG3zJbEYcaC4YVAvDorjGxc7tv6KVATnLPZONiljsUncvihe9BQoVCEs0RZ1kmf4Hk9OBqlZfJZWI4GanKA==",
      "dev": true,
      "requires": {
        "execa": "0.7.0",
        "lcid": "1.0.0",
        "mem": "1.1.0"
      }
    },
    "os-shim": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/os-shim/-/os-shim-0.1.3.tgz",
      "integrity": "sha1-a2LDeRz3kJ6jXtRuF2WLtBfLORc=",
      "dev": true
    },
    "os-tmpdir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz",
      "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ=",
      "dev": true
    },
    "p-cancelable": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/p-cancelable/-/p-cancelable-0.3.0.tgz",
      "integrity": "sha512-RVbZPLso8+jFeq1MfNvgXtCRED2raz/dKpacfTNxsx6pLEpEomM7gah6VeHSYV3+vo0OAi4MkArtQcWWXuQoyw==",
      "dev": true
    },
    "p-each-series": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-each-series/-/p-each-series-1.0.0.tgz",
      "integrity": "sha1-kw89Et0fUOdDRFeiLNbwSsatf3E=",
      "dev": true,
      "requires": {
        "p-reduce": "1.0.0"
      }
    },
    "p-finally": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-finally/-/p-finally-1.0.0.tgz",
      "integrity": "sha1-P7z7FbiZpEEjs0ttzBi3JDNqLK4=",
      "dev": true
    },
    "p-is-promise": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/p-is-promise/-/p-is-promise-1.1.0.tgz",
      "integrity": "sha1-nJRWmJ6fZYgBewQ01WCXZ1w9oF4=",
      "dev": true
    },
    "p-lazy": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-lazy/-/p-lazy-1.0.0.tgz",
      "integrity": "sha1-7FPIAvLuOsKPFmzILQsrAt4nqDU=",
      "dev": true
    },
    "p-limit": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.2.0.tgz",
      "integrity": "sha512-Y/OtIaXtUPr4/YpMv1pCL5L5ed0rumAaAeBSj12F+bSlMdys7i8oQF/GUJmfpTS/QoaRrS/k6pma29haJpsMng==",
      "dev": true,
      "requires": {
        "p-try": "1.0.0"
      }
    },
    "p-locate": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
      "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
      "dev": true,
      "requires": {
        "p-limit": "1.2.0"
      }
    },
    "p-map": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/p-map/-/p-map-1.2.0.tgz",
      "integrity": "sha512-r6zKACMNhjPJMTl8KcFH4li//gkrXWfbD6feV8l6doRHlzljFWGJ2AP6iKaCJXyZmAUMOPtvbW7EXkbWO/pLEA==",
      "dev": true
    },
    "p-reduce": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-reduce/-/p-reduce-1.0.0.tgz",
      "integrity": "sha1-GMKw3ZNqRpClKfgjH1ig/bakffo=",
      "dev": true
    },
    "p-timeout": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/p-timeout/-/p-timeout-2.0.1.tgz",
      "integrity": "sha512-88em58dDVB/KzPEx1X0N3LwFfYZPyDc4B6eF38M1rk9VTZMbxXXgjugz8mmwpS9Ox4BDZ+t6t3QP5+/gazweIA==",
      "dev": true,
      "requires": {
        "p-finally": "1.0.0"
      }
    },
    "p-try": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
      "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
      "dev": true
    },
    "pako": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.6.tgz",
      "integrity": "sha512-lQe48YPsMJAig+yngZ87Lus+NF+3mtu7DVOBu6b/gHO1YpKwIj5AWjZ/TOS7i46HD/UixzWb1zeWDZfGZ3iYcg==",
      "dev": true
    },
    "parallel-transform": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.1.0.tgz",
      "integrity": "sha1-1BDwZbBdojCB/NEPKIVMKb2jOwY=",
      "dev": true,
      "requires": {
        "cyclist": "0.2.2",
        "inherits": "2.0.3",
        "readable-stream": "2.3.4"
      }
    },
    "parse-asn1": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.0.tgz",
      "integrity": "sha1-N8T5t+06tlx0gXtfJICTf7+XxxI=",
      "dev": true,
      "requires": {
        "asn1.js": "4.10.1",
        "browserify-aes": "1.1.1",
        "create-hash": "1.1.3",
        "evp_bytestokey": "1.0.3",
        "pbkdf2": "3.0.14"
      }
    },
    "parse-glob": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/parse-glob/-/parse-glob-3.0.4.tgz",
      "integrity": "sha1-ssN2z7EfNVE7rdFz7wu246OIORw=",
      "dev": true,
      "requires": {
        "glob-base": "0.3.0",
        "is-dotfile": "1.0.3",
        "is-extglob": "1.0.0",
        "is-glob": "2.0.1"
      }
    },
    "parse-json": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
      "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
      "dev": true,
      "requires": {
        "error-ex": "1.3.1"
      }
    },
    "parse-passwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/parse-passwd/-/parse-passwd-1.0.0.tgz",
      "integrity": "sha1-bVuTSkVpk7I9N/QKOC1vFmao5cY=",
      "dev": true
    },
    "parseurl": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.2.tgz",
      "integrity": "sha1-/CidTtiZMRlGDBViUyYs3I3mW/M=",
      "dev": true
    },
    "pascalcase": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
      "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ=",
      "dev": true
    },
    "path-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.0.tgz",
      "integrity": "sha1-oLhwcpquIUAFt9UDLsLLuw+0RRo=",
      "dev": true
    },
    "path-dirname": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
      "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA=",
      "dev": true
    },
    "path-exists": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
      "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
      "dev": true
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",
      "dev": true
    },
    "path-is-inside": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
      "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM=",
      "dev": true
    },
    "path-key": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
      "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A=",
      "dev": true
    },
    "path-parse": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.5.tgz",
      "integrity": "sha1-PBrfhx6pzWyUMbbqK9dKD/BVxME=",
      "dev": true
    },
    "path-to-regexp": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
      "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w=",
      "dev": true
    },
    "path-type": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-1.1.0.tgz",
      "integrity": "sha1-WcRPfuSR2nBNpBXaWkBwuk+P5EE=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "pify": "2.3.0",
        "pinkie-promise": "2.0.1"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "pbkdf2": {
      "version": "3.0.14",
      "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.14.tgz",
      "integrity": "sha512-gjsZW9O34fm0R7PaLHRJmLLVfSoesxztjPjE9o6R+qtVJij90ltg1joIovN9GKrRW3t1PzhDDG3UMEMFfZ+1wA==",
      "dev": true,
      "requires": {
        "create-hash": "1.1.3",
        "create-hmac": "1.1.6",
        "ripemd160": "2.0.1",
        "safe-buffer": "5.1.1",
        "sha.js": "2.4.10"
      }
    },
    "performance-now": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-0.2.0.tgz",
      "integrity": "sha1-M+8wxcd9TqIcWlOGnZG1bY8lVeU=",
      "dev": true
    },
    "pify": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
      "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY=",
      "dev": true
    },
    "pinkie": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
      "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA=",
      "dev": true
    },
    "pinkie-promise": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
      "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
      "dev": true,
      "requires": {
        "pinkie": "2.0.4"
      }
    },
    "pkg-dir": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
      "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
      "dev": true,
      "requires": {
        "find-up": "2.1.0"
      }
    },
    "portfinder": {
      "version": "1.0.13",
      "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.13.tgz",
      "integrity": "sha1-uzLs2HwnEErm7kS1o8y/Drsa7ek=",
      "dev": true,
      "requires": {
        "async": "1.5.2",
        "debug": "2.6.9",
        "mkdirp": "0.5.1"
      },
      "dependencies": {
        "async": {
          "version": "1.5.2",
          "resolved": "https://registry.npmjs.org/async/-/async-1.5.2.tgz",
          "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo=",
          "dev": true
        }
      }
    },
    "posix-character-classes": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
      "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs=",
      "dev": true
    },
    "prepend-http": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/prepend-http/-/prepend-http-2.0.0.tgz",
      "integrity": "sha1-6SQ0v6XqjBn0HN/UAddBo8gZ2Jc=",
      "dev": true
    },
    "preserve": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",
      "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks=",
      "dev": true
    },
    "prettier": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-1.11.1.tgz",
      "integrity": "sha512-T/KD65Ot0PB97xTrG8afQ46x3oiVhnfGjGESSI9NWYcG92+OUPZKkwHqGWXH2t9jK1crnQjubECW0FuOth+hxw==",
      "dev": true
    },
    "pretty-bytes": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/pretty-bytes/-/pretty-bytes-4.0.2.tgz",
      "integrity": "sha1-sr+C5zUNZcbDOqlaqlpPYyf2HNk=",
      "dev": true
    },
    "private": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/private/-/private-0.1.8.tgz",
      "integrity": "sha512-VvivMrbvd2nKkiG38qjULzlc+4Vx4wm/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/cJPet5J/u19r/mg=="
    },
    "process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI=",
      "dev": true
    },
    "process-nextick-args": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.0.tgz",
      "integrity": "sha512-MtEC1TqN0EU5nephaJ4rAtThHtC86dNN9qCuEhtshvpVBkAW5ZO7BASN9REnF9eoXGcRub+pFuKEpOHE+HbEMw==",
      "dev": true
    },
    "promise": {
      "version": "7.3.1",
      "resolved": "https://registry.npmjs.org/promise/-/promise-7.3.1.tgz",
      "integrity": "sha512-nolQXZ/4L+bP/UGlkfaIujX9BKxGwmQ9OT4mOt5yvy8iK1h3wqTEJCijzGANTCCl9nWjY41juyAn2K3Q1hLLTg==",
      "requires": {
        "asap": "2.0.6"
      }
    },
    "promise-inflight": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
      "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM=",
      "dev": true
    },
    "prop-types": {
      "version": "15.6.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.6.1.tgz",
      "integrity": "sha512-4ec7bY1Y66LymSUOH/zARVYObB23AT2h8cf6e/O6ZALB/N0sqZFEx7rq6EYPX2MkOdKORuooI/H5k9TlR4q7kQ==",
      "requires": {
        "fbjs": "0.8.16",
        "loose-envify": "1.3.1",
        "object-assign": "4.1.1"
      }
    },
    "proxy-addr": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.3.tgz",
      "integrity": "sha512-jQTChiCJteusULxjBp8+jftSQE5Obdl3k4cnmLA6WXtK6XFuWRnvVL7aCiBqaLPM8c4ph0S4tKna8XvmIwEnXQ==",
      "dev": true,
      "requires": {
        "forwarded": "0.1.2",
        "ipaddr.js": "1.6.0"
      }
    },
    "prr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
      "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY=",
      "dev": true
    },
    "pseudomap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pseudomap/-/pseudomap-1.0.2.tgz",
      "integrity": "sha1-8FKijacOYYkX7wqKw0wa5aaChrM=",
      "dev": true
    },
    "public-encrypt": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.0.tgz",
      "integrity": "sha1-OfaZ86RlYN1eusvKaTyvfGXBjMY=",
      "dev": true,
      "requires": {
        "bn.js": "4.11.8",
        "browserify-rsa": "4.0.1",
        "create-hash": "1.1.3",
        "parse-asn1": "5.1.0",
        "randombytes": "2.0.6"
      }
    },
    "pump": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
      "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
      "dev": true,
      "requires": {
        "end-of-stream": "1.4.1",
        "once": "1.4.0"
      }
    },
    "pumpify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.4.0.tgz",
      "integrity": "sha512-2kmNR9ry+Pf45opRVirpNuIFotsxUGLaYqxIwuR77AYrYRMuFCz9eryHBS52L360O+NcR383CL4QYlMKPq4zYA==",
      "dev": true,
      "requires": {
        "duplexify": "3.5.3",
        "inherits": "2.0.3",
        "pump": "2.0.1"
      }
    },
    "punycode": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
      "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4=",
      "dev": true
    },
    "qs": {
      "version": "6.5.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.1.tgz",
      "integrity": "sha512-eRzhrN1WSINYCDCbrz796z37LOe3m5tmW7RQf6oBntukAG1nmovJvhnwHHRMAfeoItc1m2Hk02WER2aQ/iqs+A==",
      "dev": true
    },
    "query-string": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/query-string/-/query-string-5.1.0.tgz",
      "integrity": "sha512-F3DkxxlY0AqD/rwe4YAwjRE2HjOkKW7TxsuteyrS/Jbwrxw887PqYBL4sWUJ9D/V1hmFns0SCD6FDyvlwo9RCQ==",
      "dev": true,
      "requires": {
        "decode-uri-component": "0.2.0",
        "object-assign": "4.1.1",
        "strict-uri-encode": "1.1.0"
      }
    },
    "querystring": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
      "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA=",
      "dev": true
    },
    "querystring-es3": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
      "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM=",
      "dev": true
    },
    "querystringify": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/querystringify/-/querystringify-0.0.4.tgz",
      "integrity": "sha1-DPf4T5Rj/wrlHExLFC2VvjdyTZw=",
      "dev": true
    },
    "randomatic": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/randomatic/-/randomatic-1.1.7.tgz",
      "integrity": "sha512-D5JUjPyJbaJDkuAazpVnSfVkLlpeO3wDlPROTMLGKG1zMFNFRgrciKo1ltz/AzNTkqE0HzDx655QOL51N06how==",
      "dev": true,
      "requires": {
        "is-number": "3.0.0",
        "kind-of": "4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "randombytes": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.0.6.tgz",
      "integrity": "sha512-CIQ5OFxf4Jou6uOKe9t1AOgqpeU5fd70A8NPdHSGeYXqXsPe6peOwI0cUl88RWZ6sP1vPMV3avd/R6cZ5/sP1A==",
      "dev": true,
      "requires": {
        "safe-buffer": "5.1.1"
      }
    },
    "randomfill": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
      "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
      "dev": true,
      "requires": {
        "randombytes": "2.0.6",
        "safe-buffer": "5.1.1"
      }
    },
    "range-parser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.0.tgz",
      "integrity": "sha1-9JvmtIeJTdxA3MlKMi9hEJLgDV4=",
      "dev": true
    },
    "raw-body": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.3.2.tgz",
      "integrity": "sha1-vNYMd9Prk83gBQKVw/N5OJvIj4k=",
      "dev": true,
      "requires": {
        "bytes": "3.0.0",
        "http-errors": "1.6.2",
        "iconv-lite": "0.4.19",
        "unpipe": "1.0.0"
      }
    },
    "react": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/react/-/react-16.2.0.tgz",
      "integrity": "sha512-ZmIomM7EE1DvPEnSFAHZn9Vs9zJl5A9H7el0EGTE6ZbW9FKe/14IYAlPbC8iH25YarEQxZL+E8VW7Mi7kfQrDQ==",
      "requires": {
        "fbjs": "0.8.16",
        "loose-envify": "1.3.1",
        "object-assign": "4.1.1",
        "prop-types": "15.6.1"
      }
    },
    "react-dom": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-16.2.0.tgz",
      "integrity": "sha512-zpGAdwHVn9K0091d+hr+R0qrjoJ84cIBFL2uU60KvWBPfZ7LPSrfqviTxGHWN0sjPZb2hxWzMexwrvJdKePvjg==",
      "requires": {
        "fbjs": "0.8.16",
        "loose-envify": "1.3.1",
        "object-assign": "4.1.1",
        "prop-types": "15.6.1"
      }
    },
    "react-transition-group": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-2.3.0.tgz",
      "integrity": "sha512-OU3/swEL8y233u5ajTn3FIcQQ/b3XWjLXB6e2LnM1OK5JATtsyfJvPTZ8c/dawHNqjUltcdHRSpgMtPe7v07pw==",
      "requires": {
        "chain-function": "1.0.0",
        "dom-helpers": "3.3.1",
        "loose-envify": "1.3.1",
        "prop-types": "15.6.1",
        "warning": "3.0.0"
      }
    },
    "read-chunk": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/read-chunk/-/read-chunk-2.1.0.tgz",
      "integrity": "sha1-agTAkoAF7Z1C4aasVgDhnLx/9lU=",
      "dev": true,
      "requires": {
        "pify": "3.0.0",
        "safe-buffer": "5.1.1"
      }
    },
    "read-pkg": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-1.1.0.tgz",
      "integrity": "sha1-9f+qXs0pyzHAR0vKfXVra7KePyg=",
      "dev": true,
      "requires": {
        "load-json-file": "1.1.0",
        "normalize-package-data": "2.4.0",
        "path-type": "1.1.0"
      }
    },
    "read-pkg-up": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-1.0.1.tgz",
      "integrity": "sha1-nWPBMnbAZZGNV/ACpX9AobZD+wI=",
      "dev": true,
      "requires": {
        "find-up": "1.1.2",
        "read-pkg": "1.1.0"
      },
      "dependencies": {
        "find-up": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-1.1.2.tgz",
          "integrity": "sha1-ay6YIrGizgpgq2TWEOzK1TyyTQ8=",
          "dev": true,
          "requires": {
            "path-exists": "2.1.0",
            "pinkie-promise": "2.0.1"
          }
        },
        "path-exists": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-2.1.0.tgz",
          "integrity": "sha1-D+tsZPD8UY2adU3V77YscCJ2H0s=",
          "dev": true,
          "requires": {
            "pinkie-promise": "2.0.1"
          }
        }
      }
    },
    "readable-stream": {
      "version": "2.3.4",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.4.tgz",
      "integrity": "sha512-vuYxeWYM+fde14+rajzqgeohAI7YoJcHE7kXDAc4Nk0EbuKnJfqtY9YtRkLo/tqkuF7MsBQRhPnPeyjYITp3ZQ==",
      "dev": true,
      "requires": {
        "core-util-is": "1.0.2",
        "inherits": "2.0.3",
        "isarray": "1.0.0",
        "process-nextick-args": "2.0.0",
        "safe-buffer": "5.1.1",
        "string_decoder": "1.0.3",
        "util-deprecate": "1.0.2"
      }
    },
    "readdirp": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.1.0.tgz",
      "integrity": "sha1-TtCtBg3zBzMAxIRANz9y0cxkLXg=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "minimatch": "3.0.4",
        "readable-stream": "2.3.4",
        "set-immediate-shim": "1.0.1"
      }
    },
    "recast": {
      "version": "0.14.4",
      "resolved": "https://registry.npmjs.org/recast/-/recast-0.14.4.tgz",
      "integrity": "sha512-b6fRXujYf8mTIyljymL3rglje1LfuGKdD44CuKs6o1B18MmZ+mEEpD5gsaxGVABZHyPvYwPLcyBTA/SvxtiyFg==",
      "dev": true,
      "requires": {
        "ast-types": "0.11.2",
        "esprima": "4.0.0",
        "private": "0.1.8",
        "source-map": "0.6.1"
      },
      "dependencies": {
        "ast-types": {
          "version": "0.11.2",
          "resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.11.2.tgz",
          "integrity": "sha512-aL+pcOQ+6dpWd0xrUe+Obo2CgdkFvsntkXEmzZKqEN4cR0PStF+1MBuc4V+YZsv4Q36luvyjG7F4lc+wH2bmag==",
          "dev": true
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "rechoir": {
      "version": "0.6.2",
      "resolved": "https://registry.npmjs.org/rechoir/-/rechoir-0.6.2.tgz",
      "integrity": "sha1-hSBLVNuoLVdC4oyWdW70OvUOM4Q=",
      "dev": true,
      "requires": {
        "resolve": "1.5.0"
      }
    },
    "redent": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/redent/-/redent-1.0.0.tgz",
      "integrity": "sha1-z5Fqsf1fHxbfsggi3W7H9zDCr94=",
      "dev": true,
      "requires": {
        "indent-string": "2.1.0",
        "strip-indent": "1.0.1"
      }
    },
    "regenerate": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.3.3.tgz",
      "integrity": "sha512-jVpo1GadrDAK59t/0jRx5VxYWQEDkkEKi6+HjE3joFVLfDOh9Xrdh0dF1eSq+BI/SwvTQ44gSscJ8N5zYL61sg=="
    },
    "regenerator-runtime": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
      "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
    },
    "regenerator-transform": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.10.1.tgz",
      "integrity": "sha512-PJepbvDbuK1xgIgnau7Y90cwaAmO/LCLMI2mPvaXq2heGMR3aWW5/BQvYrhJ8jgmQjXewXvBjzfqKcVOmhjZ6Q==",
      "requires": {
        "babel-runtime": "6.26.0",
        "babel-types": "6.26.0",
        "private": "0.1.8"
      }
    },
    "regex-cache": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/regex-cache/-/regex-cache-0.4.4.tgz",
      "integrity": "sha512-nVIZwtCjkC9YgvWkpM55B5rBhBYRZhAaJbgcFYXXsHnbZ9UZI9nnVWYZpBlCqv9ho2eZryPnWrZGsOdPwVWXWQ==",
      "dev": true,
      "requires": {
        "is-equal-shallow": "0.1.3"
      }
    },
    "regex-not": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
      "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
      "dev": true,
      "requires": {
        "extend-shallow": "3.0.2",
        "safe-regex": "1.1.0"
      }
    },
    "regexpu-core": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-2.0.0.tgz",
      "integrity": "sha1-SdA4g3uNz4v6W5pCE5k45uoq4kA=",
      "requires": {
        "regenerate": "1.3.3",
        "regjsgen": "0.2.0",
        "regjsparser": "0.1.5"
      }
    },
    "regjsgen": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.2.0.tgz",
      "integrity": "sha1-bAFq3qxVT3WCP+N6wFuS1aTtsfc="
    },
    "regjsparser": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.1.5.tgz",
      "integrity": "sha1-fuj4Tcb6eS0/0K4ijSS9lJ6tIFw=",
      "requires": {
        "jsesc": "0.5.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0="
        }
      }
    },
    "remove-trailing-separator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8=",
      "dev": true
    },
    "repeat-element": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.2.tgz",
      "integrity": "sha1-7wiaF40Ug7quTZPrmLT55OEdmQo=",
      "dev": true
    },
    "repeat-string": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
      "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc=",
      "dev": true
    },
    "repeating": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/repeating/-/repeating-2.0.1.tgz",
      "integrity": "sha1-UhTFOpJtNVJwdSf7q0FdvAjQbdo=",
      "dev": true,
      "requires": {
        "is-finite": "1.0.2"
      }
    },
    "replace-ext": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/replace-ext/-/replace-ext-0.0.1.tgz",
      "integrity": "sha1-KbvZIHinOfC8zitO5B6DeVNSKSQ=",
      "dev": true
    },
    "request": {
      "version": "2.81.0",
      "resolved": "https://registry.npmjs.org/request/-/request-2.81.0.tgz",
      "integrity": "sha1-xpKJRqDgbF+Nb4qTM0af/aRimKA=",
      "dev": true,
      "requires": {
        "aws-sign2": "0.6.0",
        "aws4": "1.6.0",
        "caseless": "0.12.0",
        "combined-stream": "1.0.6",
        "extend": "3.0.1",
        "forever-agent": "0.6.1",
        "form-data": "2.1.4",
        "har-validator": "4.2.1",
        "hawk": "3.1.3",
        "http-signature": "1.1.1",
        "is-typedarray": "1.0.0",
        "isstream": "0.1.2",
        "json-stringify-safe": "5.0.1",
        "mime-types": "2.1.18",
        "oauth-sign": "0.8.2",
        "performance-now": "0.2.0",
        "qs": "6.4.0",
        "safe-buffer": "5.1.1",
        "stringstream": "0.0.5",
        "tough-cookie": "2.3.4",
        "tunnel-agent": "0.6.0",
        "uuid": "3.2.1"
      },
      "dependencies": {
        "qs": {
          "version": "6.4.0",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.4.0.tgz",
          "integrity": "sha1-E+JtKK1rD/qpExLNO/cI7TUecjM=",
          "dev": true
        }
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I=",
      "dev": true
    },
    "require-main-filename": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-1.0.1.tgz",
      "integrity": "sha1-l/cXtp1IeE9fUmpsWqj/3aBVpNE=",
      "dev": true
    },
    "requires-port": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
      "integrity": "sha1-kl0mAdOaxIXgkc8NpcbmlNw9yv8=",
      "dev": true
    },
    "resolve": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.5.0.tgz",
      "integrity": "sha512-hgoSGrc3pjzAPHNBg+KnFcK2HwlHTs/YrAGUr6qgTVUZmXv1UEXXl0bZNBKMA9fud6lRYFdPGz0xXxycPzmmiw==",
      "dev": true,
      "requires": {
        "path-parse": "1.0.5"
      }
    },
    "resolve-cwd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-2.0.0.tgz",
      "integrity": "sha1-AKn3OHVW4nA46uIyyqNypqWbZlo=",
      "dev": true,
      "requires": {
        "resolve-from": "3.0.0"
      }
    },
    "resolve-dir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/resolve-dir/-/resolve-dir-1.0.1.tgz",
      "integrity": "sha1-eaQGRMNivoLybv/nOcm7U4IEb0M=",
      "dev": true,
      "requires": {
        "expand-tilde": "2.0.2",
        "global-modules": "1.0.0"
      }
    },
    "resolve-from": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
      "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g=",
      "dev": true
    },
    "resolve-url": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo=",
      "dev": true
    },
    "responselike": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/responselike/-/responselike-1.0.2.tgz",
      "integrity": "sha1-kYcg7ztjHFZCvgaPFa3lpG9Loec=",
      "dev": true,
      "requires": {
        "lowercase-keys": "1.0.0"
      }
    },
    "restore-cursor": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-2.0.0.tgz",
      "integrity": "sha1-n37ih/gv0ybU/RYpI9YhKe7g368=",
      "dev": true,
      "requires": {
        "onetime": "2.0.1",
        "signal-exit": "3.0.2"
      }
    },
    "ret": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg==",
      "dev": true
    },
    "rimraf": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.6.2.tgz",
      "integrity": "sha512-lreewLK/BlghmxtfH36YYVg1i8IAce4TI7oao75I1g245+6BctqTVQiBP3YUJ9C6DQOXJmkYR9X9fCLtCOJc5w==",
      "dev": true,
      "requires": {
        "glob": "7.1.2"
      }
    },
    "ripemd160": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.1.tgz",
      "integrity": "sha1-D0WEKVxTo2KK9+bXmsohzlfRxuc=",
      "dev": true,
      "requires": {
        "hash-base": "2.0.2",
        "inherits": "2.0.3"
      }
    },
    "run-async": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/run-async/-/run-async-2.3.0.tgz",
      "integrity": "sha1-A3GrSuC91yDUFm19/aZP96RFpsA=",
      "dev": true,
      "requires": {
        "is-promise": "2.1.0"
      }
    },
    "run-queue": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
      "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
      "dev": true,
      "requires": {
        "aproba": "1.2.0"
      }
    },
    "rx": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/rx/-/rx-4.1.0.tgz",
      "integrity": "sha1-pfE/957zt0D+MKqAP7CfmIBdR4I=",
      "dev": true
    },
    "rx-lite": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/rx-lite/-/rx-lite-4.0.8.tgz",
      "integrity": "sha1-Cx4Rr4vESDbwSmQH6S2kJGe3lEQ=",
      "dev": true
    },
    "rx-lite-aggregates": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/rx-lite-aggregates/-/rx-lite-aggregates-4.0.8.tgz",
      "integrity": "sha1-dTuHqJoRyVRnxKwWJsTvxOBcZ74=",
      "dev": true,
      "requires": {
        "rx-lite": "4.0.8"
      }
    },
    "rxjs": {
      "version": "5.5.6",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-5.5.6.tgz",
      "integrity": "sha512-v4Q5HDC0FHAQ7zcBX7T2IL6O5ltl1a2GX4ENjPXg6SjDY69Cmx9v4113C99a4wGF16ClPv5Z8mghuYorVkg/kg==",
      "dev": true,
      "requires": {
        "symbol-observable": "1.0.1"
      }
    },
    "safe-buffer": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.1.tgz",
      "integrity": "sha512-kKvNJn6Mm93gAczWVJg7wH+wGYWNrDHdWvpUmHyEsgCtIwwo3bqPtV4tR5tuPaUhTOo/kvhVwd8XwwOllGYkbg==",
      "dev": true
    },
    "safe-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
      "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
      "dev": true,
      "requires": {
        "ret": "0.1.15"
      }
    },
    "schema-utils": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.4.5.tgz",
      "integrity": "sha512-yYrjb9TX2k/J1Y5UNy3KYdZq10xhYcF8nMpAW6o3hy6Q8WSIEf9lJHG/ePnOBfziPM3fvQwfOwa13U/Fh8qTfA==",
      "dev": true,
      "requires": {
        "ajv": "6.1.1",
        "ajv-keywords": "3.1.0"
      }
    },
    "scoped-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/scoped-regex/-/scoped-regex-1.0.0.tgz",
      "integrity": "sha1-o0a7Gs1CB65wvXwMfKnlZra63bg=",
      "dev": true
    },
    "select-hose": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
      "integrity": "sha1-Yl2GWPhlr0Psliv8N2o3NZpJlMo=",
      "dev": true
    },
    "selfsigned": {
      "version": "1.10.2",
      "resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-1.10.2.tgz",
      "integrity": "sha1-tESVgNmZKbZbEKSDiTAaZZIIh1g=",
      "dev": true,
      "requires": {
        "node-forge": "0.7.1"
      }
    },
    "semver": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/semver/-/semver-5.5.0.tgz",
      "integrity": "sha512-4SJ3dm0WAwWy/NVeioZh5AntkdJoWKxHxcmyP622fOkgHa4z3R0TdBJICINyaSDE6uNwVc8gZr+ZinwZAH4xIA=="
    },
    "send": {
      "version": "0.16.1",
      "resolved": "https://registry.npmjs.org/send/-/send-0.16.1.tgz",
      "integrity": "sha512-ElCLJdJIKPk6ux/Hocwhk7NFHpI3pVm/IZOYWqUmoxcgeyM+MpxHHKhb8QmlJDX1pU6WrgaHBkVNm73Sv7uc2A==",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "depd": "1.1.2",
        "destroy": "1.0.4",
        "encodeurl": "1.0.2",
        "escape-html": "1.0.3",
        "etag": "1.8.1",
        "fresh": "0.5.2",
        "http-errors": "1.6.2",
        "mime": "1.4.1",
        "ms": "2.0.0",
        "on-finished": "2.3.0",
        "range-parser": "1.2.0",
        "statuses": "1.3.1"
      }
    },
    "serialize-javascript": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-1.4.0.tgz",
      "integrity": "sha1-fJWFFNtqwkQ6irwGLcn3iGp/YAU=",
      "dev": true
    },
    "serve-index": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.1.tgz",
      "integrity": "sha1-03aNabHn2C5c4FD/9bRTvqEqkjk=",
      "dev": true,
      "requires": {
        "accepts": "1.3.4",
        "batch": "0.6.1",
        "debug": "2.6.9",
        "escape-html": "1.0.3",
        "http-errors": "1.6.2",
        "mime-types": "2.1.18",
        "parseurl": "1.3.2"
      }
    },
    "serve-static": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.13.1.tgz",
      "integrity": "sha512-hSMUZrsPa/I09VYFJwa627JJkNs0NrfL1Uzuup+GqHfToR2KcsXFymXSV90hoyw3M+msjFuQly+YzIH/q0MGlQ==",
      "dev": true,
      "requires": {
        "encodeurl": "1.0.2",
        "escape-html": "1.0.3",
        "parseurl": "1.3.2",
        "send": "0.16.1"
      }
    },
    "set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
      "dev": true
    },
    "set-getter": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/set-getter/-/set-getter-0.1.0.tgz",
      "integrity": "sha1-12nBgsnVpR9AkUXy+6guXoboA3Y=",
      "dev": true,
      "requires": {
        "to-object-path": "0.3.0"
      }
    },
    "set-immediate-shim": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/set-immediate-shim/-/set-immediate-shim-1.0.1.tgz",
      "integrity": "sha1-SysbJ+uAip+NzEgaWOXlb1mfP2E=",
      "dev": true
    },
    "set-value": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.0.tgz",
      "integrity": "sha512-hw0yxk9GT/Hr5yJEYnHNKYXkIA8mVJgd9ditYZCe16ZczcaELYYcfvaXesNACk2O8O0nTiPQcQhGUQj8JLzeeg==",
      "dev": true,
      "requires": {
        "extend-shallow": "2.0.1",
        "is-extendable": "0.1.1",
        "is-plain-object": "2.0.4",
        "split-string": "3.1.0"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        }
      }
    },
    "setimmediate": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
      "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
    },
    "setprototypeof": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
      "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ==",
      "dev": true
    },
    "sha.js": {
      "version": "2.4.10",
      "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.10.tgz",
      "integrity": "sha512-vnwmrFDlOExK4Nm16J2KMWHLrp14lBrjxMxBJpu++EnsuBmpiYaM/MEs46Vxxm/4FvdP5yTwuCTO9it5FSjrqA==",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "safe-buffer": "5.1.1"
      }
    },
    "shebang-command": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
      "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
      "dev": true,
      "requires": {
        "shebang-regex": "1.0.0"
      }
    },
    "shebang-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
      "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM=",
      "dev": true
    },
    "shelljs": {
      "version": "0.7.8",
      "resolved": "https://registry.npmjs.org/shelljs/-/shelljs-0.7.8.tgz",
      "integrity": "sha1-3svPh0sNHl+3LhSxZKloMEjprLM=",
      "dev": true,
      "requires": {
        "glob": "7.1.2",
        "interpret": "1.1.0",
        "rechoir": "0.6.2"
      }
    },
    "signal-exit": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.2.tgz",
      "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0=",
      "dev": true
    },
    "slash": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
      "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU=",
      "dev": true
    },
    "slice-ansi": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-0.0.4.tgz",
      "integrity": "sha1-7b+JA/ZvfOL46v1s7tZeJkyDGzU=",
      "dev": true
    },
    "slide": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/slide/-/slide-1.1.6.tgz",
      "integrity": "sha1-VusCfWW00tzmyy4tMsTUr8nh1wc=",
      "dev": true
    },
    "snapdragon": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.1.tgz",
      "integrity": "sha1-4StUh/re0+PeoKyR6UAL91tAE3A=",
      "dev": true,
      "requires": {
        "base": "0.11.2",
        "debug": "2.6.9",
        "define-property": "0.2.5",
        "extend-shallow": "2.0.1",
        "map-cache": "0.2.2",
        "source-map": "0.5.7",
        "source-map-resolve": "0.5.1",
        "use": "2.0.2"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "snapdragon-node": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
      "dev": true,
      "requires": {
        "define-property": "1.0.0",
        "isobject": "3.0.1",
        "snapdragon-util": "3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "1.0.2"
          }
        }
      }
    },
    "snapdragon-util": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
      "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
      "dev": true,
      "requires": {
        "kind-of": "3.2.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "sntp": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/sntp/-/sntp-1.0.9.tgz",
      "integrity": "sha1-ZUEYTMkK7qbG57NeJlkIJEPGYZg=",
      "dev": true,
      "requires": {
        "hoek": "2.16.3"
      }
    },
    "sockjs": {
      "version": "0.3.19",
      "resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.19.tgz",
      "integrity": "sha512-V48klKZl8T6MzatbLlzzRNhMepEys9Y4oGFpypBFFn1gLI/QQ9HtLLyWJNbPlwGLelOVOEijUbTTJeLLI59jLw==",
      "dev": true,
      "requires": {
        "faye-websocket": "0.10.0",
        "uuid": "3.2.1"
      }
    },
    "sockjs-client": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/sockjs-client/-/sockjs-client-1.1.4.tgz",
      "integrity": "sha1-W6vjhrd15M8U51IJEUUmVAFsixI=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "eventsource": "0.1.6",
        "faye-websocket": "0.11.1",
        "inherits": "2.0.3",
        "json3": "3.3.2",
        "url-parse": "1.2.0"
      },
      "dependencies": {
        "faye-websocket": {
          "version": "0.11.1",
          "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.1.tgz",
          "integrity": "sha1-8O/hjE9W5PQK/H4Gxxn9XuYYjzg=",
          "dev": true,
          "requires": {
            "websocket-driver": "0.7.0"
          }
        }
      }
    },
    "sort-keys": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/sort-keys/-/sort-keys-2.0.0.tgz",
      "integrity": "sha1-ZYU1WEhh7JfXMNbPQYIuH1ZoQSg=",
      "dev": true,
      "requires": {
        "is-plain-obj": "1.1.0"
      }
    },
    "source-list-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.0.tgz",
      "integrity": "sha512-I2UmuJSRr/T8jisiROLU3A3ltr+swpniSmNPI4Ml3ZCX6tVnDsuZzK7F2hl5jTqbZBWCEKlj5HRQiPExXLgE8A==",
      "dev": true
    },
    "source-map": {
      "version": "0.5.7",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
      "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
      "dev": true
    },
    "source-map-resolve": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.1.tgz",
      "integrity": "sha512-0KW2wvzfxm8NCTb30z0LMNyPqWCdDGE2viwzUaucqJdkTRXtZiSY3I+2A6nVAjmdOy0I4gU8DwnVVGsk9jvP2A==",
      "dev": true,
      "requires": {
        "atob": "2.0.3",
        "decode-uri-component": "0.2.0",
        "resolve-url": "0.2.1",
        "source-map-url": "0.4.0",
        "urix": "0.1.0"
      }
    },
    "source-map-support": {
      "version": "0.4.18",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.4.18.tgz",
      "integrity": "sha512-try0/JqxPLF9nOjvSta7tVondkP5dwgyLDjVoyMDlmjugT2lRZ1OfsrYTkCd2hkDnJTKRbO/Rl3orm8vlsUzbA==",
      "dev": true,
      "requires": {
        "source-map": "0.5.7"
      }
    },
    "source-map-url": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
      "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM=",
      "dev": true
    },
    "spawn-sync": {
      "version": "1.0.15",
      "resolved": "https://registry.npmjs.org/spawn-sync/-/spawn-sync-1.0.15.tgz",
      "integrity": "sha1-sAeZVX63+wyDdsKdROih6mfldHY=",
      "dev": true,
      "requires": {
        "concat-stream": "1.6.0",
        "os-shim": "0.1.3"
      }
    },
    "spdx-correct": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-1.0.2.tgz",
      "integrity": "sha1-SzBz2TP/UfORLwOsVRlJikFQ20A=",
      "dev": true,
      "requires": {
        "spdx-license-ids": "1.2.2"
      }
    },
    "spdx-expression-parse": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-1.0.4.tgz",
      "integrity": "sha1-m98vIOH0DtRH++JzJmGR/O1RYmw=",
      "dev": true
    },
    "spdx-license-ids": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-1.2.2.tgz",
      "integrity": "sha1-yd96NCRZSt5r0RkA1ZZpbcBrrFc=",
      "dev": true
    },
    "spdy": {
      "version": "3.4.7",
      "resolved": "https://registry.npmjs.org/spdy/-/spdy-3.4.7.tgz",
      "integrity": "sha1-Qv9B7OXMD5mjpsKKq7c/XDsDrLw=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "handle-thing": "1.2.5",
        "http-deceiver": "1.2.7",
        "safe-buffer": "5.1.1",
        "select-hose": "2.0.0",
        "spdy-transport": "2.0.20"
      }
    },
    "spdy-transport": {
      "version": "2.0.20",
      "resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-2.0.20.tgz",
      "integrity": "sha1-c15yBUxIayNU/onnAiVgBKOazk0=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "detect-node": "2.0.3",
        "hpack.js": "2.1.6",
        "obuf": "1.1.1",
        "readable-stream": "2.3.4",
        "safe-buffer": "5.1.1",
        "wbuf": "1.7.2"
      }
    },
    "split-string": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
      "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
      "dev": true,
      "requires": {
        "extend-shallow": "3.0.2"
      }
    },
    "sshpk": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.13.1.tgz",
      "integrity": "sha1-US322mKHFEMW3EwY/hzx2UBzm+M=",
      "dev": true,
      "requires": {
        "asn1": "0.2.3",
        "assert-plus": "1.0.0",
        "bcrypt-pbkdf": "1.0.1",
        "dashdash": "1.14.1",
        "ecc-jsbn": "0.1.1",
        "getpass": "0.1.7",
        "jsbn": "0.1.1",
        "tweetnacl": "0.14.5"
      },
      "dependencies": {
        "assert-plus": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
          "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
          "dev": true
        }
      }
    },
    "ssri": {
      "version": "5.2.4",
      "resolved": "https://registry.npmjs.org/ssri/-/ssri-5.2.4.tgz",
      "integrity": "sha512-UnEAgMZa15973iH7cUi0AHjJn1ACDIkaMyZILoqwN6yzt+4P81I8tBc5Hl+qwi5auMplZtPQsHrPBR5vJLcQtQ==",
      "dev": true,
      "requires": {
        "safe-buffer": "5.1.1"
      }
    },
    "static-extend": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
      "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
      "dev": true,
      "requires": {
        "define-property": "0.2.5",
        "object-copy": "0.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "statuses": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.3.1.tgz",
      "integrity": "sha1-+vUbnrdKrvOzrPStX2Gr8ky3uT4=",
      "dev": true
    },
    "stream-browserify": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.1.tgz",
      "integrity": "sha1-ZiZu5fm9uZQKTkUUyvtDu3Hlyds=",
      "dev": true,
      "requires": {
        "inherits": "2.0.3",
        "readable-stream": "2.3.4"
      }
    },
    "stream-each": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.2.tgz",
      "integrity": "sha512-mc1dbFhGBxvTM3bIWmAAINbqiuAk9TATcfIQC8P+/+HJefgaiTlMn2dHvkX8qlI12KeYKSQ1Ua9RrIqrn1VPoA==",
      "dev": true,
      "requires": {
        "end-of-stream": "1.4.1",
        "stream-shift": "1.0.0"
      }
    },
    "stream-http": {
      "version": "2.8.0",
      "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.0.tgz",
      "integrity": "sha512-sZOFxI/5xw058XIRHl4dU3dZ+TTOIGJR78Dvo0oEAejIt4ou27k+3ne1zYmCV+v7UucbxIFQuOgnkTVHh8YPnw==",
      "dev": true,
      "requires": {
        "builtin-status-codes": "3.0.0",
        "inherits": "2.0.3",
        "readable-stream": "2.3.4",
        "to-arraybuffer": "1.0.1",
        "xtend": "4.0.1"
      }
    },
    "stream-shift": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.0.tgz",
      "integrity": "sha1-1cdSgl5TZ+eG944Y5EXqIjoVWVI=",
      "dev": true
    },
    "stream-to-observable": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/stream-to-observable/-/stream-to-observable-0.2.0.tgz",
      "integrity": "sha1-WdbqOT2HwsDdrBCqDVYbxrpvDhA=",
      "dev": true,
      "requires": {
        "any-observable": "0.2.0"
      }
    },
    "strict-uri-encode": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/strict-uri-encode/-/strict-uri-encode-1.1.0.tgz",
      "integrity": "sha1-J5siXfHVgrH1TmWt3UNS4Y+qBxM=",
      "dev": true
    },
    "string-template": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/string-template/-/string-template-0.2.1.tgz",
      "integrity": "sha1-QpMuWYo1LQH8IuwzZ9nYTuxsmt0=",
      "dev": true
    },
    "string-width": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
      "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
      "dev": true,
      "requires": {
        "is-fullwidth-code-point": "2.0.0",
        "strip-ansi": "4.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "3.0.0"
          }
        }
      }
    },
    "string_decoder": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.0.3.tgz",
      "integrity": "sha512-4AH6Z5fzNNBcH+6XDMfA/BTt87skxqJlO0lAh3Dker5zThcAxG6mKz+iGu308UKoPPQ8Dcqx/4JhujzltRa+hQ==",
      "dev": true,
      "requires": {
        "safe-buffer": "5.1.1"
      }
    },
    "stringstream": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stringstream/-/stringstream-0.0.5.tgz",
      "integrity": "sha1-TkhM1N5aC7vuGORjB3EKioFiGHg=",
      "dev": true
    },
    "strip-ansi": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
      "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
      "requires": {
        "ansi-regex": "2.1.1"
      }
    },
    "strip-bom": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-2.0.0.tgz",
      "integrity": "sha1-YhmoVhZSBJHzV4i9vxRHqZx+aw4=",
      "dev": true,
      "requires": {
        "is-utf8": "0.2.1"
      }
    },
    "strip-bom-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom-stream/-/strip-bom-stream-2.0.0.tgz",
      "integrity": "sha1-+H217yYT9paKpUWr/h7HKLaoKco=",
      "dev": true,
      "requires": {
        "first-chunk-stream": "2.0.0",
        "strip-bom": "2.0.0"
      }
    },
    "strip-eof": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/strip-eof/-/strip-eof-1.0.0.tgz",
      "integrity": "sha1-u0P/VZim6wXYm1n80SnJgzE2Br8=",
      "dev": true
    },
    "strip-indent": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/strip-indent/-/strip-indent-1.0.1.tgz",
      "integrity": "sha1-DHlipq3vp7vUrDZkYKY4VSrhoKI=",
      "dev": true,
      "requires": {
        "get-stdin": "4.0.1"
      }
    },
    "supports-color": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.2.0.tgz",
      "integrity": "sha512-F39vS48la4YvTZUPVeTqsjsFNrvcMwrV3RLZINsmHo+7djCvuUzSIeXOnZ5hmjef4bajL1dNccN+tg5XAliO5Q==",
      "dev": true,
      "requires": {
        "has-flag": "3.0.0"
      }
    },
    "symbol-observable": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/symbol-observable/-/symbol-observable-1.0.1.tgz",
      "integrity": "sha1-g0D8RwLDEi310iKI+IKD9RPT/dQ=",
      "dev": true
    },
    "tapable": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.0.0.tgz",
      "integrity": "sha512-dQRhbNQkRnaqauC7WqSJ21EEksgT0fYZX2lqXzGkpo8JNig9zGZTYoMGvyI2nWmXlE2VSVXVDu7wLVGu/mQEsg==",
      "dev": true
    },
    "temp": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/temp/-/temp-0.8.3.tgz",
      "integrity": "sha1-4Ma8TSa5AxJEEOT+2BEDAU38H1k=",
      "dev": true,
      "requires": {
        "os-tmpdir": "1.0.2",
        "rimraf": "2.2.8"
      },
      "dependencies": {
        "rimraf": {
          "version": "2.2.8",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.2.8.tgz",
          "integrity": "sha1-5Dm+Kq7jJzIZUnMPmaiSnk/FBYI=",
          "dev": true
        }
      }
    },
    "text-table": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
      "integrity": "sha1-f17oI66AUgfACvLfSoTsP8+lcLQ=",
      "dev": true
    },
    "textextensions": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/textextensions/-/textextensions-2.2.0.tgz",
      "integrity": "sha512-j5EMxnryTvKxwH2Cq+Pb43tsf6sdEgw6Pdwxk83mPaq0ToeFJt6WE4J3s5BqY7vmjlLgkgXvhtXUxo80FyBhCA==",
      "dev": true
    },
    "through": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU=",
      "dev": true
    },
    "through2": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.3.tgz",
      "integrity": "sha1-AARWmzfHx0ujnEPzzteNGtlBQL4=",
      "dev": true,
      "requires": {
        "readable-stream": "2.3.4",
        "xtend": "4.0.1"
      }
    },
    "thunky": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/thunky/-/thunky-1.0.2.tgz",
      "integrity": "sha1-qGLgGOP7HqLsP85dVWBc9X8kc3E=",
      "dev": true
    },
    "timed-out": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/timed-out/-/timed-out-4.0.1.tgz",
      "integrity": "sha1-8y6srFoXW+ol1/q1Zas+2HQe9W8=",
      "dev": true
    },
    "timers-browserify": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.6.tgz",
      "integrity": "sha512-HQ3nbYRAowdVd0ckGFvmJPPCOH/CHleFN/Y0YQCX1DVaB7t+KFvisuyN09fuP8Jtp1CpfSh8O8bMkHbdbPe6Pw==",
      "dev": true,
      "requires": {
        "setimmediate": "1.0.5"
      }
    },
    "tmp": {
      "version": "0.0.33",
      "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.33.tgz",
      "integrity": "sha512-jRCJlojKnZ3addtTOjdIqoRuPEKBvNXcGYqzO6zWZX8KfKEpnGY5jfggJQ3EjKuu8D4bJRr0y+cYJFmYbImXGw==",
      "dev": true,
      "requires": {
        "os-tmpdir": "1.0.2"
      }
    },
    "to-arraybuffer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
      "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M=",
      "dev": true
    },
    "to-fast-properties": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-1.0.3.tgz",
      "integrity": "sha1-uDVx+k2MJbguIxsG46MFXeTKGkc="
    },
    "to-object-path": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
      "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
      "dev": true,
      "requires": {
        "kind-of": "3.2.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "1.1.6"
          }
        }
      }
    },
    "to-regex": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
      "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
      "dev": true,
      "requires": {
        "define-property": "2.0.2",
        "extend-shallow": "3.0.2",
        "regex-not": "1.0.2",
        "safe-regex": "1.1.0"
      }
    },
    "to-regex-range": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
      "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
      "dev": true,
      "requires": {
        "is-number": "3.0.0",
        "repeat-string": "1.6.1"
      }
    },
    "tough-cookie": {
      "version": "2.3.4",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.3.4.tgz",
      "integrity": "sha512-TZ6TTfI5NtZnuyy/Kecv+CnoROnyXn2DN97LontgQpCwsX2XyLYCC0ENhYkehSOwAp8rTQKc/NUIF7BkQ5rKLA==",
      "dev": true,
      "requires": {
        "punycode": "1.4.1"
      }
    },
    "trim-newlines": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/trim-newlines/-/trim-newlines-1.0.0.tgz",
      "integrity": "sha1-WIeWa7WCpFA6QetST301ARgVphM=",
      "dev": true
    },
    "trim-right": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/trim-right/-/trim-right-1.0.1.tgz",
      "integrity": "sha1-yy4SAwZ+DI3h9hQJS5/kVwTqYAM=",
      "dev": true
    },
    "tty-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
      "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY=",
      "dev": true
    },
    "tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
      "dev": true,
      "requires": {
        "safe-buffer": "5.1.1"
      }
    },
    "tweetnacl": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
      "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q=",
      "dev": true,
      "optional": true
    },
    "type-is": {
      "version": "1.6.16",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.16.tgz",
      "integrity": "sha512-HRkVv/5qY2G6I8iab9cI7v1bOIdhm94dVjQCPFElW9W+3GeDOSHmy2EBYe4VTApuzolPcmgFTN3ftVJRKR2J9Q==",
      "dev": true,
      "requires": {
        "media-typer": "0.3.0",
        "mime-types": "2.1.18"
      }
    },
    "typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c=",
      "dev": true
    },
    "typescript": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-2.7.2.tgz",
      "integrity": "sha512-p5TCYZDAO0m4G344hD+wx/LATebLWZNkkh2asWUFqSsD2OrDNhbAHuSjobrmsUmdzjJjEeZVU9g1h3O6vpstnw==",
      "dev": true
    },
    "ua-parser-js": {
      "version": "0.7.17",
      "resolved": "https://registry.npmjs.org/ua-parser-js/-/ua-parser-js-0.7.17.tgz",
      "integrity": "sha512-uRdSdu1oA1rncCQL7sCj8vSyZkgtL7faaw9Tc9rZ3mGgraQ7+Pdx7w5mnOSF3gw9ZNG6oc+KXfkon3bKuROm0g=="
    },
    "uglify-es": {
      "version": "3.3.9",
      "resolved": "https://registry.npmjs.org/uglify-es/-/uglify-es-3.3.9.tgz",
      "integrity": "sha512-r+MU0rfv4L/0eeW3xZrd16t4NZfK8Ld4SWVglYBb7ez5uXFWHuVRs6xCTrf1yirs9a4j4Y27nn7SRfO6v67XsQ==",
      "dev": true,
      "requires": {
        "commander": "2.13.0",
        "source-map": "0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "uglifyjs-webpack-plugin": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/uglifyjs-webpack-plugin/-/uglifyjs-webpack-plugin-1.2.2.tgz",
      "integrity": "sha512-CG/NvzXfemUAm5Y4Guh5eEaJYHtkG7kKNpXEJHp9QpxsFVB5/qKvYWoMaq4sa99ccZ0hM3MK8vQV9XPZB4357A==",
      "dev": true,
      "requires": {
        "cacache": "10.0.4",
        "find-cache-dir": "1.0.0",
        "schema-utils": "0.4.5",
        "serialize-javascript": "1.4.0",
        "source-map": "0.6.1",
        "uglify-es": "3.3.9",
        "webpack-sources": "1.1.0",
        "worker-farm": "1.5.2"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "underscore": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/underscore/-/underscore-1.6.0.tgz",
      "integrity": "sha1-izixDKze9jM3uLJOT/htRa6lKag=",
      "dev": true
    },
    "union-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.0.tgz",
      "integrity": "sha1-XHHDTLW61dzr4+oM0IIHulqhrqQ=",
      "dev": true,
      "requires": {
        "arr-union": "3.1.0",
        "get-value": "2.0.6",
        "is-extendable": "0.1.1",
        "set-value": "0.4.3"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "0.1.1"
          }
        },
        "set-value": {
          "version": "0.4.3",
          "resolved": "https://registry.npmjs.org/set-value/-/set-value-0.4.3.tgz",
          "integrity": "sha1-fbCPnT0i3H945Trzw79GZuzfzPE=",
          "dev": true,
          "requires": {
            "extend-shallow": "2.0.1",
            "is-extendable": "0.1.1",
            "is-plain-object": "2.0.4",
            "to-object-path": "0.3.0"
          }
        }
      }
    },
    "unique-filename": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.0.tgz",
      "integrity": "sha1-0F8v5AMlYIcfMOk8vnNe6iAVFPM=",
      "dev": true,
      "requires": {
        "unique-slug": "2.0.0"
      }
    },
    "unique-slug": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.0.tgz",
      "integrity": "sha1-22Z258fMBimHj/GWCXx4hVrp9Ks=",
      "dev": true,
      "requires": {
        "imurmurhash": "0.1.4"
      }
    },
    "unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw=",
      "dev": true
    },
    "unset-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
      "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
      "dev": true,
      "requires": {
        "has-value": "0.3.1",
        "isobject": "3.0.1"
      },
      "dependencies": {
        "has-value": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
          "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
          "dev": true,
          "requires": {
            "get-value": "2.0.6",
            "has-values": "0.1.4",
            "isobject": "2.1.0"
          },
          "dependencies": {
            "isobject": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
              "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
              "dev": true,
              "requires": {
                "isarray": "1.0.0"
              }
            }
          }
        },
        "has-values": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
          "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E=",
          "dev": true
        }
      }
    },
    "untildify": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/untildify/-/untildify-3.0.2.tgz",
      "integrity": "sha1-fx8wIFWz/qDz6B3HjrNnZstl4/E=",
      "dev": true
    },
    "upath": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/upath/-/upath-1.0.2.tgz",
      "integrity": "sha512-fCmij7T5LnwUme3dbnVSejvOHHlARjB3ikJFwgZfz386pHmf/gueuTLRFU94FZEaeCLlbQrweiUU700gG41tUw==",
      "dev": true,
      "requires": {
        "lodash.endswith": "4.2.1",
        "lodash.isfunction": "3.0.9",
        "lodash.isstring": "4.0.1",
        "lodash.startswith": "4.2.1"
      }
    },
    "urix": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
      "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI=",
      "dev": true
    },
    "url": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
      "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
      "dev": true,
      "requires": {
        "punycode": "1.3.2",
        "querystring": "0.2.0"
      },
      "dependencies": {
        "punycode": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
          "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0=",
          "dev": true
        }
      }
    },
    "url-join": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/url-join/-/url-join-2.0.5.tgz",
      "integrity": "sha1-WvIvGMBSoACkjXuCxenC4v7tpyg=",
      "dev": true
    },
    "url-loader": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/url-loader/-/url-loader-1.0.1.tgz",
      "integrity": "sha512-rAonpHy7231fmweBKUFe0bYnlGDty77E+fm53NZdij7j/YOpyGzc7ttqG1nAXl3aRs0k41o0PC3TvGXQiw2Zvw==",
      "dev": true,
      "requires": {
        "loader-utils": "1.1.0",
        "mime": "2.2.0",
        "schema-utils": "0.4.5"
      },
      "dependencies": {
        "mime": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.2.0.tgz",
          "integrity": "sha512-0Qz9uF1ATtl8RKJG4VRfOymh7PyEor6NbrI/61lRfuRe4vx9SNATrvAeTj2EWVRKjEQGskrzWkJBBY5NbaVHIA==",
          "dev": true
        }
      }
    },
    "url-parse": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/url-parse/-/url-parse-1.2.0.tgz",
      "integrity": "sha512-DT1XbYAfmQP65M/mE6OALxmXzZ/z1+e5zk2TcSKe/KiYbNGZxgtttzC0mR/sjopbpOXcbniq7eIKmocJnUWlEw==",
      "dev": true,
      "requires": {
        "querystringify": "1.0.0",
        "requires-port": "1.0.0"
      },
      "dependencies": {
        "querystringify": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/querystringify/-/querystringify-1.0.0.tgz",
          "integrity": "sha1-YoYkIRLFtxL6ZU5SZlK/ahP/Bcs=",
          "dev": true
        }
      }
    },
    "url-parse-lax": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/url-parse-lax/-/url-parse-lax-3.0.0.tgz",
      "integrity": "sha1-FrXK/Afb42dsGxmZF3gj1lA6yww=",
      "dev": true,
      "requires": {
        "prepend-http": "2.0.0"
      }
    },
    "url-to-options": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/url-to-options/-/url-to-options-1.0.1.tgz",
      "integrity": "sha1-FQWgOiiaSMvXpDTvuu7FBV9WM6k=",
      "dev": true
    },
    "urlgrey": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/urlgrey/-/urlgrey-0.4.4.tgz",
      "integrity": "sha1-iS/pWWCAXoVRnxzUOJ8stMu3ZS8=",
      "dev": true
    },
    "use": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/use/-/use-2.0.2.tgz",
      "integrity": "sha1-riig1y+TvyJCKhii43mZMRLeyOg=",
      "dev": true,
      "requires": {
        "define-property": "0.2.5",
        "isobject": "3.0.1",
        "lazy-cache": "2.0.2"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "0.1.6"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "3.2.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "1.1.6"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "0.1.6",
            "is-data-descriptor": "0.1.4",
            "kind-of": "5.1.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "util": {
      "version": "0.10.3",
      "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
      "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
      "dev": true,
      "requires": {
        "inherits": "2.0.1"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE=",
          "dev": true
        }
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8=",
      "dev": true
    },
    "utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM=",
      "dev": true
    },
    "uuid": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.2.1.tgz",
      "integrity": "sha512-jZnMwlb9Iku/O3smGWvZhauCf6cvvpKi4BKRiliS3cxnI+Gz9j5MEpTz2UFuXiKPJocb7gnsLHwiS05ige5BEA==",
      "dev": true
    },
    "v8-compile-cache": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-1.1.2.tgz",
      "integrity": "sha512-ejdrifsIydN1XDH7EuR2hn8ZrkRKUYF7tUcBjBy/lhrCvs2K+zRlbW9UHc0IQ9RsYFZJFqJrieoIHfkCa0DBRA==",
      "dev": true
    },
    "validate-npm-package-license": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.1.tgz",
      "integrity": "sha1-KAS6vnEq0zeUWaz74kdGqywwP7w=",
      "dev": true,
      "requires": {
        "spdx-correct": "1.0.2",
        "spdx-expression-parse": "1.0.4"
      }
    },
    "vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha1-IpnwLG3tMNSllhsLn3RSShj2NPw=",
      "dev": true
    },
    "verror": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
      "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
      "dev": true,
      "requires": {
        "assert-plus": "1.0.0",
        "core-util-is": "1.0.2",
        "extsprintf": "1.3.0"
      },
      "dependencies": {
        "assert-plus": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
          "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
          "dev": true
        }
      }
    },
    "vinyl": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/vinyl/-/vinyl-1.2.0.tgz",
      "integrity": "sha1-XIgDbPVl5d8FVYv8kR+GVt8hiIQ=",
      "dev": true,
      "requires": {
        "clone": "1.0.3",
        "clone-stats": "0.0.1",
        "replace-ext": "0.0.1"
      }
    },
    "vinyl-file": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/vinyl-file/-/vinyl-file-2.0.0.tgz",
      "integrity": "sha1-p+v1/779obfRjRQPyweyI++2dRo=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "pify": "2.3.0",
        "pinkie-promise": "2.0.1",
        "strip-bom": "2.0.0",
        "strip-bom-stream": "2.0.0",
        "vinyl": "1.2.0"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "vm-browserify": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-0.0.4.tgz",
      "integrity": "sha1-XX6kW7755Kb/ZflUOOCofDV9WnM=",
      "dev": true,
      "requires": {
        "indexof": "0.0.1"
      }
    },
    "warning": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/warning/-/warning-3.0.0.tgz",
      "integrity": "sha1-MuU3fLVy3kqwR1O9+IIcAe1gW3w=",
      "requires": {
        "loose-envify": "1.3.1"
      }
    },
    "watchpack": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.4.0.tgz",
      "integrity": "sha1-ShRyvLuVK9Cpu0A2gB+VTfs5+qw=",
      "dev": true,
      "requires": {
        "async": "2.6.0",
        "chokidar": "1.7.0",
        "graceful-fs": "4.1.11"
      }
    },
    "wbuf": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.2.tgz",
      "integrity": "sha1-1pe5nx9ZUS3ydRvkJ2nBWAtYAf4=",
      "dev": true,
      "requires": {
        "minimalistic-assert": "1.0.0"
      }
    },
    "webpack": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.0.0.tgz",
      "integrity": "sha512-wnEjBERuGrbelfsBJ7QKLuGAEaLNPTGJrLgK8H0p1TPS3pUqvTU4OZKeS1OAd8xBpEkuBrFcyHpXPvi0JZVvkA==",
      "dev": true,
      "requires": {
        "acorn": "5.4.1",
        "acorn-dynamic-import": "3.0.0",
        "ajv": "6.1.1",
        "ajv-keywords": "3.1.0",
        "chrome-trace-event": "0.1.2",
        "enhanced-resolve": "4.0.0",
        "eslint-scope": "3.7.1",
        "loader-runner": "2.3.0",
        "loader-utils": "1.1.0",
        "memory-fs": "0.4.1",
        "micromatch": "3.1.9",
        "mkdirp": "0.5.1",
        "neo-async": "2.5.0",
        "node-libs-browser": "2.1.0",
        "schema-utils": "0.4.5",
        "tapable": "1.0.0",
        "uglifyjs-webpack-plugin": "1.2.2",
        "watchpack": "1.4.0",
        "webpack-sources": "1.1.0"
      }
    },
    "webpack-addons": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/webpack-addons/-/webpack-addons-1.1.5.tgz",
      "integrity": "sha512-MGO0nVniCLFAQz1qv22zM02QPjcpAoJdy7ED0i3Zy7SY1IecgXCm460ib7H/Wq7e9oL5VL6S2BxaObxwIcag0g==",
      "dev": true,
      "requires": {
        "jscodeshift": "0.4.1"
      }
    },
    "webpack-cli": {
      "version": "2.0.10",
      "resolved": "https://registry.npmjs.org/webpack-cli/-/webpack-cli-2.0.10.tgz",
      "integrity": "sha512-PQWEOoXkhjBV4svPuESghZRc80VvDoSSRPaLiInWifDlRJgoPWpiLCFXyMLQTTaug7ApLrSEW7BcuwwY6DEv5w==",
      "dev": true,
      "requires": {
        "chalk": "2.3.1",
        "codecov": "3.0.0",
        "cross-spawn": "6.0.5",
        "diff": "3.4.0",
        "enhanced-resolve": "4.0.0",
        "glob-all": "3.1.0",
        "global": "4.3.2",
        "global-modules": "1.0.0",
        "got": "8.2.0",
        "inquirer": "5.1.0",
        "interpret": "1.1.0",
        "jscodeshift": "0.4.1",
        "listr": "0.13.0",
        "loader-utils": "1.1.0",
        "lodash": "4.17.5",
        "log-symbols": "2.2.0",
        "mkdirp": "0.5.1",
        "p-each-series": "1.0.0",
        "p-lazy": "1.0.0",
        "prettier": "1.11.1",
        "recast": "0.14.4",
        "resolve-cwd": "2.0.0",
        "supports-color": "5.2.0",
        "uglifyjs-webpack-plugin": "1.2.2",
        "v8-compile-cache": "1.1.2",
        "webpack-addons": "1.1.5",
        "yargs": "9.0.1",
        "yeoman-environment": "2.0.5",
        "yeoman-generator": "github:ev1stensberg/generator#9e24fa31c85302ca1145ae34fc68b4f133251ca0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "dev": true,
          "requires": {
            "nice-try": "1.0.4",
            "path-key": "2.0.1",
            "semver": "5.5.0",
            "shebang-command": "1.2.0",
            "which": "1.3.0"
          }
        }
      }
    },
    "webpack-dev-middleware": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-2.0.6.tgz",
      "integrity": "sha512-tj5LLD9r4tDuRIDa5Mu9lnY2qBBehAITv6A9irqXhw/HQquZgTx3BCd57zYbU2gMDnncA49ufK2qVQSbaKJwOw==",
      "dev": true,
      "requires": {
        "loud-rejection": "1.6.0",
        "memory-fs": "0.4.1",
        "mime": "2.2.0",
        "path-is-absolute": "1.0.1",
        "range-parser": "1.2.0",
        "url-join": "2.0.5",
        "webpack-log": "1.1.2"
      },
      "dependencies": {
        "mime": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.2.0.tgz",
          "integrity": "sha512-0Qz9uF1ATtl8RKJG4VRfOymh7PyEor6NbrI/61lRfuRe4vx9SNATrvAeTj2EWVRKjEQGskrzWkJBBY5NbaVHIA==",
          "dev": true
        }
      }
    },
    "webpack-dev-server": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-3.0.0.tgz",
      "integrity": "sha512-oqGjPBE4XKmo2VPDrBcFaU4PzXuhEkpmt7p01tAHfDV5OHv/NGJHem0shd20/3IuTG/H70KgwGPLkZkeP9151w==",
      "dev": true,
      "requires": {
        "ansi-html": "0.0.7",
        "array-includes": "3.0.3",
        "bonjour": "3.5.0",
        "chokidar": "2.0.2",
        "compression": "1.7.2",
        "connect-history-api-fallback": "1.5.0",
        "debug": "3.1.0",
        "del": "3.0.0",
        "express": "4.16.2",
        "html-entities": "1.2.1",
        "http-proxy-middleware": "0.17.4",
        "import-local": "1.0.0",
        "internal-ip": "1.2.0",
        "ip": "1.1.5",
        "killable": "1.0.0",
        "loglevel": "1.6.1",
        "opn": "5.2.0",
        "portfinder": "1.0.13",
        "selfsigned": "1.10.2",
        "serve-index": "1.9.1",
        "sockjs": "0.3.19",
        "sockjs-client": "1.1.4",
        "spdy": "3.4.7",
        "strip-ansi": "3.0.1",
        "supports-color": "5.2.0",
        "webpack-dev-middleware": "2.0.6",
        "yargs": "9.0.1"
      },
      "dependencies": {
        "anymatch": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
          "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
          "dev": true,
          "requires": {
            "micromatch": "3.1.9",
            "normalize-path": "2.1.1"
          }
        },
        "chokidar": {
          "version": "2.0.2",
          "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.0.2.tgz",
          "integrity": "sha512-l32Hw3wqB0L2kGVmSbK/a+xXLDrUEsc84pSgMkmwygHvD7ubRsP/vxxHa5BtB6oix1XLLVCHyYMsckRXxThmZw==",
          "dev": true,
          "requires": {
            "anymatch": "2.0.0",
            "async-each": "1.0.1",
            "braces": "2.3.1",
            "fsevents": "1.1.3",
            "glob-parent": "3.1.0",
            "inherits": "2.0.3",
            "is-binary-path": "1.0.1",
            "is-glob": "4.0.0",
            "normalize-path": "2.1.1",
            "path-is-absolute": "1.0.1",
            "readdirp": "2.1.0",
            "upath": "1.0.2"
          }
        },
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "glob-parent": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
          "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
          "dev": true,
          "requires": {
            "is-glob": "3.1.0",
            "path-dirname": "1.0.2"
          },
          "dependencies": {
            "is-glob": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
              "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
              "dev": true,
              "requires": {
                "is-extglob": "2.1.1"
              }
            }
          }
        },
        "is-extglob": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
          "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
          "dev": true
        },
        "is-glob": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.0.tgz",
          "integrity": "sha1-lSHHaEXMJhCoUgPd8ICpWML/q8A=",
          "dev": true,
          "requires": {
            "is-extglob": "2.1.1"
          }
        }
      }
    },
    "webpack-log": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/webpack-log/-/webpack-log-1.1.2.tgz",
      "integrity": "sha512-B53SD4N4BHpZdUwZcj4st2QT7gVfqZtqHDruC1N+K2sciq0Rt/3F1Dx6RlylVkcrToMLTaiaeT48k9Lq4iDVDA==",
      "dev": true,
      "requires": {
        "chalk": "2.3.1",
        "log-symbols": "2.2.0",
        "loglevelnext": "1.0.3",
        "uuid": "3.2.1"
      }
    },
    "webpack-sources": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.1.0.tgz",
      "integrity": "sha512-aqYp18kPphgoO5c/+NaUvEeACtZjMESmDChuD3NBciVpah3XpMEU9VAAtIaB1BsfJWWTSdv8Vv1m3T0aRk2dUw==",
      "dev": true,
      "requires": {
        "source-list-map": "2.0.0",
        "source-map": "0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "websocket-driver": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.0.tgz",
      "integrity": "sha1-DK+dLXVdk67gSdS90NP+LMoqJOs=",
      "dev": true,
      "requires": {
        "http-parser-js": "0.4.10",
        "websocket-extensions": "0.1.3"
      }
    },
    "websocket-extensions": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.3.tgz",
      "integrity": "sha512-nqHUnMXmBzT0w570r2JpJxfiSD1IzoI+HGVdd3aZ0yNi3ngvQ4jv1dtHt5VGxfI2yj5yqImPhOK4vmIh2xMbGg==",
      "dev": true
    },
    "whatwg-fetch": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/whatwg-fetch/-/whatwg-fetch-2.0.3.tgz",
      "integrity": "sha1-nITsLc9oGH/wC8ZOEnS0QhduHIQ="
    },
    "which": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.0.tgz",
      "integrity": "sha512-xcJpopdamTuY5duC/KnTTNBraPK54YwpenP4lzxU8H91GudWpFv38u0CKjclE1Wi2EH2EDz5LRcHcKbCIzqGyg==",
      "dev": true,
      "requires": {
        "isexe": "2.0.0"
      }
    },
    "which-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
      "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
      "dev": true
    },
    "worker-farm": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.5.2.tgz",
      "integrity": "sha512-XxiQ9kZN5n6mmnW+mFJ+wXjNNI/Nx4DIdaAKLX1Bn6LYBWlN/zaBhu34DQYPZ1AJobQuu67S2OfDdNSVULvXkQ==",
      "dev": true,
      "requires": {
        "errno": "0.1.7",
        "xtend": "4.0.1"
      }
    },
    "wrap-ansi": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz",
      "integrity": "sha1-2Pw9KE3QV5T+hJc8rs3Rz4JP3YU=",
      "dev": true,
      "requires": {
        "string-width": "1.0.2",
        "strip-ansi": "3.0.1"
      },
      "dependencies": {
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "1.1.0",
            "is-fullwidth-code-point": "1.0.0",
            "strip-ansi": "3.0.1"
          }
        }
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=",
      "dev": true
    },
    "write-file-atomic": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-1.3.4.tgz",
      "integrity": "sha1-+Aek8LHZ6ROuekgRLmzDrxmRtF8=",
      "dev": true,
      "requires": {
        "graceful-fs": "4.1.11",
        "imurmurhash": "0.1.4",
        "slide": "1.1.6"
      }
    },
    "xtend": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.1.tgz",
      "integrity": "sha1-pcbVMr5lbiPbgg77lDofBJmNY68=",
      "dev": true
    },
    "y18n": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
      "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w==",
      "dev": true
    },
    "yallist": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-2.1.2.tgz",
      "integrity": "sha1-HBH5IY8HYImkfdUS+TxmmaaoHVI=",
      "dev": true
    },
    "yargs": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-9.0.1.tgz",
      "integrity": "sha1-UqzCP+7Kw0BCB47njAwAf1CF20w=",
      "dev": true,
      "requires": {
        "camelcase": "4.1.0",
        "cliui": "3.2.0",
        "decamelize": "1.2.0",
        "get-caller-file": "1.0.2",
        "os-locale": "2.1.0",
        "read-pkg-up": "2.0.0",
        "require-directory": "2.1.1",
        "require-main-filename": "1.0.1",
        "set-blocking": "2.0.0",
        "string-width": "2.1.1",
        "which-module": "2.0.0",
        "y18n": "3.2.1",
        "yargs-parser": "7.0.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0=",
          "dev": true
        },
        "load-json-file": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
          "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
          "dev": true,
          "requires": {
            "graceful-fs": "4.1.11",
            "parse-json": "2.2.0",
            "pify": "2.3.0",
            "strip-bom": "3.0.0"
          }
        },
        "path-type": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
          "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
          "dev": true,
          "requires": {
            "pify": "2.3.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        },
        "read-pkg": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
          "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
          "dev": true,
          "requires": {
            "load-json-file": "2.0.0",
            "normalize-package-data": "2.4.0",
            "path-type": "2.0.0"
          }
        },
        "read-pkg-up": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
          "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
          "dev": true,
          "requires": {
            "find-up": "2.1.0",
            "read-pkg": "2.0.0"
          }
        },
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
          "dev": true
        },
        "y18n": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
          "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE=",
          "dev": true
        }
      }
    },
    "yargs-parser": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-7.0.0.tgz",
      "integrity": "sha1-jQrELxbqVd69MyyvTEA4s+P139k=",
      "dev": true,
      "requires": {
        "camelcase": "4.1.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0=",
          "dev": true
        }
      }
    },
    "yeoman-environment": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/yeoman-environment/-/yeoman-environment-2.0.5.tgz",
      "integrity": "sha512-6/W7/B54OPHJXob0n0+pmkwFsirC8cokuQkPSmT/D0lCcSxkKtg/BA6ZnjUBIwjuGqmw3DTrT4en++htaUju5g==",
      "dev": true,
      "requires": {
        "chalk": "2.3.1",
        "debug": "3.1.0",
        "diff": "3.4.0",
        "escape-string-regexp": "1.0.5",
        "globby": "6.1.0",
        "grouped-queue": "0.3.3",
        "inquirer": "3.3.0",
        "is-scoped": "1.0.0",
        "lodash": "4.17.5",
        "log-symbols": "2.2.0",
        "mem-fs": "1.1.3",
        "text-table": "0.2.0",
        "untildify": "3.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "inquirer": {
          "version": "3.3.0",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-3.3.0.tgz",
          "integrity": "sha512-h+xtnyk4EwKvFWHrUYsWErEVR+igKtLdchu+o0Z1RL7VU/jVMFbYir2bp6bAj8efFNxWqHX0dIss6fJQ+/+qeQ==",
          "dev": true,
          "requires": {
            "ansi-escapes": "3.0.0",
            "chalk": "2.3.1",
            "cli-cursor": "2.1.0",
            "cli-width": "2.2.0",
            "external-editor": "2.1.0",
            "figures": "2.0.0",
            "lodash": "4.17.5",
            "mute-stream": "0.0.7",
            "run-async": "2.3.0",
            "rx-lite": "4.0.8",
            "rx-lite-aggregates": "4.0.8",
            "string-width": "2.1.1",
            "strip-ansi": "4.0.0",
            "through": "2.3.8"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "3.0.0"
          }
        }
      }
    },
    "yeoman-generator": {
      "version": "github:ev1stensberg/generator#9e24fa31c85302ca1145ae34fc68b4f133251ca0",
      "dev": true,
      "requires": {
        "async": "2.6.0",
        "chalk": "1.1.3",
        "cli-table": "0.3.1",
        "cross-spawn": "5.1.0",
        "dargs": "5.1.0",
        "dateformat": "2.2.0",
        "debug": "2.6.9",
        "detect-conflict": "1.0.1",
        "error": "7.0.2",
        "find-up": "2.1.0",
        "github-username": "4.1.0",
        "istextorbinary": "2.2.1",
        "lodash": "4.17.5",
        "mem-fs-editor": "3.0.2",
        "minimist": "1.2.0",
        "mkdirp": "0.5.1",
        "pretty-bytes": "4.0.2",
        "read-chunk": "2.1.0",
        "read-pkg-up": "2.0.0",
        "rimraf": "2.6.2",
        "run-async": "2.3.0",
        "shelljs": "0.7.8",
        "text-table": "0.2.0",
        "through2": "2.0.3",
        "yeoman-environment": "1.6.6"
      },
      "dependencies": {
        "ansi-escapes": {
          "version": "1.4.0",
          "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-1.4.0.tgz",
          "integrity": "sha1-06ioOzGapneTZisT52HHkRQiMG4=",
          "dev": true
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "2.2.1",
            "escape-string-regexp": "1.0.5",
            "has-ansi": "2.0.0",
            "strip-ansi": "3.0.1",
            "supports-color": "2.0.0"
          }
        },
        "cli-cursor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-1.0.2.tgz",
          "integrity": "sha1-ZNo/fValRBLll5S9Ytw1KV6PKYc=",
          "dev": true,
          "requires": {
            "restore-cursor": "1.0.1"
          }
        },
        "diff": {
          "version": "2.2.3",
          "resolved": "https://registry.npmjs.org/diff/-/diff-2.2.3.tgz",
          "integrity": "sha1-YOr9DSjukG5Oj/ClLBIpUhAzv5k=",
          "dev": true
        },
        "external-editor": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-1.1.1.tgz",
          "integrity": "sha1-Etew24UPf/fnCBuvQAVwAGDEYAs=",
          "dev": true,
          "requires": {
            "extend": "3.0.1",
            "spawn-sync": "1.0.15",
            "tmp": "0.0.29"
          }
        },
        "figures": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/figures/-/figures-1.7.0.tgz",
          "integrity": "sha1-y+Hjr/zxzUS4DK3+0o3Hk6lwHS4=",
          "dev": true,
          "requires": {
            "escape-string-regexp": "1.0.5",
            "object-assign": "4.1.1"
          }
        },
        "glob": {
          "version": "6.0.4",
          "resolved": "https://registry.npmjs.org/glob/-/glob-6.0.4.tgz",
          "integrity": "sha1-DwiGD2oVUSey+t1PnOJLGqtuTSI=",
          "dev": true,
          "requires": {
            "inflight": "1.0.6",
            "inherits": "2.0.3",
            "minimatch": "3.0.4",
            "once": "1.4.0",
            "path-is-absolute": "1.0.1"
          }
        },
        "globby": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/globby/-/globby-4.1.0.tgz",
          "integrity": "sha1-CA9UVJ7BuCpsYOYx/ILhIR2+lfg=",
          "dev": true,
          "requires": {
            "array-union": "1.0.2",
            "arrify": "1.0.1",
            "glob": "6.0.4",
            "object-assign": "4.1.1",
            "pify": "2.3.0",
            "pinkie-promise": "2.0.1"
          }
        },
        "inquirer": {
          "version": "1.2.3",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-1.2.3.tgz",
          "integrity": "sha1-TexvMvN+97sLLtPx0aXD9UUHSRg=",
          "dev": true,
          "requires": {
            "ansi-escapes": "1.4.0",
            "chalk": "1.1.3",
            "cli-cursor": "1.0.2",
            "cli-width": "2.2.0",
            "external-editor": "1.1.1",
            "figures": "1.7.0",
            "lodash": "4.17.5",
            "mute-stream": "0.0.6",
            "pinkie-promise": "2.0.1",
            "run-async": "2.3.0",
            "rx": "4.1.0",
            "string-width": "1.0.2",
            "strip-ansi": "3.0.1",
            "through": "2.3.8"
          }
        },
        "load-json-file": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
          "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
          "dev": true,
          "requires": {
            "graceful-fs": "4.1.11",
            "parse-json": "2.2.0",
            "pify": "2.3.0",
            "strip-bom": "3.0.0"
          }
        },
        "log-symbols": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-1.0.2.tgz",
          "integrity": "sha1-N2/3tY6jCGoPCfrMdGF+ylAeGhg=",
          "dev": true,
          "requires": {
            "chalk": "1.1.3"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        },
        "mute-stream": {
          "version": "0.0.6",
          "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.6.tgz",
          "integrity": "sha1-SJYrGeFp/R38JAs/HnMXYnu8R9s=",
          "dev": true
        },
        "onetime": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/onetime/-/onetime-1.1.0.tgz",
          "integrity": "sha1-ofeDj4MUxRbwXs78vEzP4EtO14k=",
          "dev": true
        },
        "path-type": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
          "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
          "dev": true,
          "requires": {
            "pify": "2.3.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        },
        "read-pkg": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
          "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
          "dev": true,
          "requires": {
            "load-json-file": "2.0.0",
            "normalize-package-data": "2.4.0",
            "path-type": "2.0.0"
          }
        },
        "read-pkg-up": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
          "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
          "dev": true,
          "requires": {
            "find-up": "2.1.0",
            "read-pkg": "2.0.0"
          }
        },
        "restore-cursor": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-1.0.1.tgz",
          "integrity": "sha1-NGYfRohjJ/7SmRR5FSJS35LapUE=",
          "dev": true,
          "requires": {
            "exit-hook": "1.1.1",
            "onetime": "1.1.0"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "1.1.0",
            "is-fullwidth-code-point": "1.0.0",
            "strip-ansi": "3.0.1"
          }
        },
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
          "dev": true
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        },
        "tmp": {
          "version": "0.0.29",
          "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.29.tgz",
          "integrity": "sha1-8lEl/w3Z2jzLDC3Tce4SiLuRKMA=",
          "dev": true,
          "requires": {
            "os-tmpdir": "1.0.2"
          }
        },
        "untildify": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/untildify/-/untildify-2.1.0.tgz",
          "integrity": "sha1-F+soB5h/dpUunASF/DEdBqgmouA=",
          "dev": true,
          "requires": {
            "os-homedir": "1.0.2"
          }
        },
        "yeoman-environment": {
          "version": "1.6.6",
          "resolved": "https://registry.npmjs.org/yeoman-environment/-/yeoman-environment-1.6.6.tgz",
          "integrity": "sha1-zYX6Z9FWBg5EDXgH1+988NLR1nE=",
          "dev": true,
          "requires": {
            "chalk": "1.1.3",
            "debug": "2.6.9",
            "diff": "2.2.3",
            "escape-string-regexp": "1.0.5",
            "globby": "4.1.0",
            "grouped-queue": "0.3.3",
            "inquirer": "1.2.3",
            "lodash": "4.17.5",
            "log-symbols": "1.0.2",
            "mem-fs": "1.1.3",
            "text-table": "0.2.0",
            "untildify": "2.1.0"
          }
        }
      }
    }
  }
}
