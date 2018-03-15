import React from 'react';
import ReactDOM from 'react-dom';

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

    class Carousel_Item extends React.Component {
          constructor(props) {
            super(props);
            this.state = {pictures: [
                                      "i_need_1.jpg",
                                      "i_need_2.jpg",
                                      "i_need_3.jpg",
                                      "i_need_4.jpg",
                                      "i_need_5.jpg",
                                      "i_need_6.jpg",
                                      "i_need_7.jpg",
                                      "i_need_8.jpg",
                                      "i_need_9.jpg"
                                    ],
                          display:false
                            };
          }
        render() {
           const pictures = this.state.pictures;
           return ( pictures.map((pic) =>
                  <div key = {pic} style = {{
                      backgroundImage:pic,
                      height: '90%',
                      width:'100%',
                      border:'2px solid black'
                    }}></div>
                  )
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
              <span className = {"glyphicon glyphicon-chevron-left"} aria-hidden={"true"}></span>
            </a>
        );
      }
    }



ReactDOM.render(
  <Title sideface = "Overall"/>,
  document.getElementsByClassName('title')[0]
);

ReactDOM.render(
  <Carousel_Item />,
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
