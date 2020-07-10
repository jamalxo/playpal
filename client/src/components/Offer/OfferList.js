import React from "react";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import OfferCard from "./OfferCard";

export default function OfferList(props) {
    return <Grid container justify="center">

        {props.dataOffers.map((item, index) => (
            <Grid key={index} item className="profileList">

                <Link key={index} className="linkDecoration" to={`/user/${item.owner}`}>
                    <OfferCard key={index} price={item.price} game={item.game} owner={item.owner}/>
                </Link>
            </Grid>
        ))}
    </Grid>
}