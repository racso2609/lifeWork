import React from 'react'
import {UncontrolledCarousel, Jumbotron, Container} from "reactstrap"
import {Url} from "../shared/DbUrl"
import Loading from './loading';

const Jumbo = () => {
    return (
      <div>
        <Jumbotron  fluid className="bg-muted text-info">
          <Container fluid>
            <h1 className="display-3">Why i love u?</h1>
            <p className="lead"> This is the question, maybe a hard question but not for the reasons, i have so much reasons to love u, it's difficult to select which one reason.
             <br/>
              With this page I want to tell u all the reasons to love u, this will have more updates and will contain more reasons and new functions
             <br/>
             <br/>
             ---Love u baby 
             it's just de begining
             </p> 
             
          </Container>
        </Jumbotron>
      </div>
    );
  };
const Carou = ({items, isLoading})=>{
  if (isLoading) {
    return(
      <Loading/>
    );
  }else{
    return(
      <div  className=" row col-12 col-mt-9 m-auto">
          <UncontrolledCarousel items={items} />
      </div>
    );
  }
}
const Home = (props)=>{
    const items = [
        {
            src: Url + "images/carousel/carousel_1.jpeg",
            altText: 'Slide 1',
            caption: ''
          },
          {
            src: Url + "images/carousel/carousel_2.jpeg",            
            altText: 'Slide 2',
            caption: ''
           
          },
          {
            src: Url + "images/carousel/carousel_3.jpeg",            
            altText: 'Slide 3',
            caption: ''
          },
          {
            src: Url + "images/carousel/carousel_4.jpeg",
            altText: 'Slide 4',
            caption: ''
          },
          {
            src: Url + "images/carousel/carousel_5.jpeg",            
            altText: 'Slide 5',
            caption: ''
           
          },
          {
            src: Url + "images/carousel/carousel_6.jpeg",            
            altText: 'Slide 6',
            caption: ''
          }
       
    ];
  

    return(
      <div>
        <Jumbo/>
        <div className="container mt-5 mb-5">     
            <Carou items={items} isLoading={props.raisons.isLoading}/>
            <hr/>
            <div className="row text-justify mt-3" >
            
              <div className="col-12 col-md-6 mt-2">
                  <h3 className="text-primary text-left">Goals</h3>
                  
                  <h4>
                    You and only you, the love of my life, that little girl who takes my breath away and doesn't let me breathe with her eyes. That baby I want to spend the rest of my days. With whom I want to share, celebrate, enjoy, travel and live the most incredible life on the planet, we'll have the brightest, most beautiful and happy family. achieve our goals, dreams and aspirations, if there is one thing I am sure of, my love is that we will go far, we will fly as high as an eagle and we will never give up. We will fulfill our dreams</h4>
                </div>
               

              <div className="col-12 col-md-6 mt-2">
                  <h3 className="text-primary text-left">Wishes</h3>
                  <h4>
                    I wish with all my heart to continue calling you my princess, my little girl, my freshly fried cake. I want to be able to count on you through thick and thin, I want to be able to help you fulfill your dreams, to make you stronger and above all to help you enjoy life. Take away every bitterness that you carry is my goal and loving you is my goal. I love you and only you for all my life, you and only you in my bed for the rest of my days watching you wake up every morning and sleeping every night I LOVE YOU</h4>
                </div>
            </div>
        </div>
      </div>
    );
}

export default Home;