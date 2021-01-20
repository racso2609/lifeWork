import React from 'react'
import {Card, CardImg, Button} from 'reactstrap'
import {Link} from "react-router-dom"

const RenderRaison = ({raison})=>{
    console.log(raison.img);
    return(
        <div key={raison._id} >
            <Card>
                <CardImg src={raison.img} alt={raison.title}/>
            </Card>
        </div>
    );
}
const RenderText = ({raison})=>{
    return(
        <div>
            <h1 className="mb-4 text-secondary">{raison.title}</h1> <br/> <br/>
            <h4 className="mb-4 text-secondary text-center">{raison.raison}</h4>
            
        </div>
    );
}
const Detail = (props)=>{
    return(
        <div className = "row mx-auto container mt-5 mb-5 animated backInDown border border-secondary">

            <div className="col-6 mt-5 justify-content-center mb-5 ">
                <div className="col-12">
                    <RenderRaison raison={props.raison} />
                </div>
            </div>
            <div className="col-6 mt-5 justify-content-center mb-5">
                <div>
                        <RenderText raison = {props.raison} />
                        <Link to="/reasons">

                            <Button color="danger" size="lg" block onClick={()=>{props.deleteRaison(props.raison._id)}}>Delete reason</Button>
                        </Link>
                            
                </div>
            </div>
        </div>
    );
}

export default Detail;