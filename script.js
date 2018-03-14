import React from 'react';
import ReactDOM from 'react-dom';

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
                                        ]
                            };
          }
        render() {
           const pictures = this.state.pictures;
           return ( pictures.map((pic) =>
                  <div key = {pic} style = {{backgroundImage:pic}}></div>
                  )
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
