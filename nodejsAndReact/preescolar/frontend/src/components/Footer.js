import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () =>{
    return(
        <div   className="footer bg-primary text-white  p-2">
            <div className="container ">

                <div className="row  justify-content-center ">
                        <h1 className=" col-6 mb-2">Contact us</h1>
                        <h1 className="col-6 mb-2">About us</h1>
                </div>

                <hr className=""/>

                <div className="row col-12 justify-content-center text-left">
                    
                    <div className="col-12 col-md-6  ">
                         
                        <address>
                           
                            <i className="fa fa-phone fa-lg"></i>  : +58 424-1094447<br />
                            <i className="fa fa-envelope fa-lg"></i>  : <a className="text-decoration-none text-white" href="mailto:oscaremiliolugoyt@gmail.com">
                                oscaremiliolugoyt@gmail.com</a>
                            </address>
                        
                    </div>
                    <div className="col-12 col-md-6 justify-content-center text-justify">
                        <p >
                            I'm Just a software development student, i'm working with react and node if u have any question o recomendation please contact me :)
                        </p>
                        <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;