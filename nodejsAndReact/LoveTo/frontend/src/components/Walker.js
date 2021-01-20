import React, {useState} from 'react';

import { Button, ButtonGroup, Col, Row, } from 'reactstrap';

  const Status = ({status})=>{
    if (!status) {
      
      return(
        <div className="row justify-content-center">
          <div className="mx-3 my-auto rounded-circle bg-success " style={{width: "7px", height: "7px"}}></div>
          <span className="">Active</span>
        </div>  
      
      );
    }else{
      return(
        <div className="row justify-content-center">
        <div className="mx-3 my-auto rounded-circle bg-danger " style={{width: "7px", height: "7px"}}></div>
        <span className="">Disable</span>
      </div> 
      );
    }
  }

  const ListControl = ({Pag,setPag,setShow,Slice,maxPag})=>{
    return(
      
        <div className="col-11 row">
          <span className=" col-6 m-auto">{Pag}of{maxPag}</span>
          
            <ButtonGroup size="sm" className="col-6" >
              <Button className="background" onClick={()=>{if(Pag<maxPag){setPag(Pag+=1); setShow(Slice());}}} style={{ borderColor: "transparent"}}> <i className="fa fa-chevron-left "></i> </Button>
              <Button className="background" onClick={()=>{if(Pag>1){setPag(Pag-=1); setShow(Slice());}}} style={{ borderColor: "transparent"}}><i className="fa fa-chevron-right"></i></Button>
            </ButtonGroup>
          
        </div>
      
    );
  }

const Walkers = (props)=>{
  const Slice = ()=>props.Walkers.slice((Pag-1)*maxElement , Pag*maxElement)
  var [Pag, setPag] = useState(1);
  var maxElement = 6;
  var maxPag = Math.ceil(props.Walkers.length / maxElement);
  var [Show, setShow] = useState(Slice());
   

      const Walkers = Show.map((Walkers)=>{

      
        return(
          
            <Row className="form-group text-muted text-center">
              <Col md={3}  sm={3}>
                  {Walkers.Name}
              </Col>
              <Col md={3} sm={3}>
                  {Walkers.CoopName}

              </Col>
              <Col md={3} sm={3}>
                <Status status={Walkers.Banned} />

              </Col>
              <Col md={3} sm={3}>
                <label class="switch ">
                    <input type="checkbox" checked={!Walkers.Banned} model=".active" onChange={()=>{props.Put(Walkers._id,!Walkers.Banned,"walker","coorp");}} />
                    <div class="slider round"></div>
                </label>
              </Col>
            </Row>
          
        );
      })

      return(
        <div>
          
            <div className=" col-12 m-auto border shadow px-1 py-3 text-left animated backInLeft" style={{borderRadius:"10px",minHeight:"481px"}}>
              <div className="col-11 mx-auto mb-3 mt-1">

                  <div className="h5 col-12" > <strong> Walkers Management</strong></div>
                  <hr/>
                <div className="mt-1">
                  <Row className="form-group mb-4 text-center">
                    <Col md={3} sm={3}>
                      <p className="h6"><strong>Walkers</strong></p>                    
                    </Col>
                    <Col md={3} sm={3}>
                      <p className="h6"><strong>Coop</strong></p>                    
                    </Col>
                    <Col md={3} sm={3}>
                      <p className="h6"><strong> Status</strong></p>
                    </Col>
                    <Col md={3} sm={3}>
                      <p className="h6"><strong>Action</strong></p>                    
                    </Col>
                  </Row>
                </div>
                <div className="col-12 align-center mb-5">
                  {Walkers}
                </div>
              </div>
            </div>
              <div className="col-12 ">
                <div className="float-right mt-5 mr-3 ">
                  <ListControl Pag={Pag} setPag={setPag} setShow={setShow} Slice={Slice} maxPag={maxPag} />
                </div>  
              </div>

          
        </div>
      );
    
}

export default Walkers;
