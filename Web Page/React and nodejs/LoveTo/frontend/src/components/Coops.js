import React, {useState} from 'react';
import Switch from "react-switch";

import { Button, ButtonGroup, } from 'reactstrap';

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
      
        <div className="">
          <span className=" col-6">{Pag}of{maxPag}</span>
          
            <ButtonGroup size="sm" >
              <Button  className="background" onClick={()=>{if(Pag<maxPag){setPag(Pag+=1); setShow(Slice());}}} style={{borderColor: "transparent"}}> <i className="fa fa-chevron-left "></i> </Button>
              <Button  className="background" onClick={()=>{if(Pag>1){setPag(Pag-=1); setShow(Slice());}}} style={{borderColor: "transparent"}}><i className="fa fa-chevron-right "></i></Button>
            </ButtonGroup>
          
        </div>
      
    );
  }

const Coops = (props)=>{
  const Slice = ()=>props.Coops.slice((Pag-1)*maxElement , Pag*maxElement)
  var [Pag, setPag] = useState(1);
  var maxElement = 6;
  var maxPag = Math.ceil(props.Coops.length / maxElement);
  var [Show, setShow] = useState(Slice());
   

      const Coops = Show.map((Coops)=>{

      
        return(
          <div className="row mb-3 text-center text-muted ">
            
            <div className="col-3 ">
                {Coops.CoorpName}
            </div>
            <div className="col-3 ">
                {Coops.Firstname+" "+Coops.Lastname}
            </div>
            <div className="col-3 ">
                <Status status={Coops.Banned} />
            </div>
            <div className="col-3 ">
              
              <Switch height={20} width={48} checkedIcon={false} uncheckedIcon={false} onColor="#43d0e9" checked={!Coops.Banned} onChange={()=>{props.Put(Coops._id,!Coops.Banned,"admin","coorp");}}  />
              

            </div>
          </div>
        );
      })

      return(
        <div>
          
            <div className=" col-12 border shadow p-3 text-left animated backInLeft" style={{borderRadius:"15px"}}>
                  <span className="h5" >Coops Management</span>
              <div className="mt-1">
                  <hr/>
                  <div className="row mb-4 text-center"> 
                    <div className="col-3 " >Coop Name</div>
                    <div className="col-3 " >Responsible</div>
                    <div className="col-3 " >Status</div>
                    <div className="col-3 " >Action</div>
                </div>
                <div className="col-12 align-center">
                  {Coops}
                </div>
              </div>
            </div>
              <div className="col-12 ">
                <div className="float-right mt-5 ">
                  <ListControl Pag={Pag} setPag={setPag} setShow={setShow} Slice={Slice} maxPag={maxPag} />
                </div>  
              </div>

          
        </div>
      );
    
}

export default Coops;
