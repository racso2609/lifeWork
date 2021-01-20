import React from 'react'
import {Card, CardImg, Button} from 'reactstrap'
import {Url} from "../shared/DbUrl"

const RenderRaison = ({raison})=>{
    return(
        <div key={raison._id}>
            <Card>
                <CardImg src={Url +raison.img } alt={raison.title}/>
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
        <div className = "container mb-5 ">

            <div className="row  mt-5 justify-content-center border border-secondary">
                <div className="col-12 col-md-5 mb-5 mt-5">
                    <RenderRaison raison={props.raison} />
                </div>
                <div className="col-12 col-md-5 mb-5  mt-5">
                    <RenderText raison = {props.raison} />
                </div>
                <div className="row">
                    <Button color="danger" onClick={props.deleteRaison(props.raison._id)}>Delete reason</Button>

                </div>
            </div>
        </div>
    );
}

export default Detail;