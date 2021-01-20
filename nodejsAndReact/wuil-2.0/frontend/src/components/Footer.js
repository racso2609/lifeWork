import React from 'react'

const Footer = () =>{
    return(
        <div  className="footer bg-dark text-white mt-5 p-5">
            <div className="container ">

                <h1>Contact us</h1>
                <div className="row justify-content-center">
                    
                    <div className="col-12 col-md-5 align-self-center">
                         
                        <address>
                           
                            <i className="fa fa-phone fa-lg"></i>: +58 424-1094447<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:oscaremiliolugoyt@gmail.com">
                                oscaremiliolugoyt@gmail.com</a>
                            </address>
                        
                    </div>
                    <div className="col-12 col-md-5 align-self-center text-justify">
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