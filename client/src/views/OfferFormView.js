import React from 'react';

import OfferService from '../services/OfferService';
import OfferForm from "../components/Offer/OfferForm";
import GlobalError from "../components/GlobalError/GlobalError";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";


export class OfferFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // if(this.props.history.location.pathname == '/add') {
        this.setState({
            loading: false,
            offer: undefined,
            error: undefined,
            openRes: false,
            successRes: false,
            test: true
        });
        // }
        // else if(this.props.location.state != undefined && this.props.location.state.movie != undefined) {
        //     this.setState({
        //         loading: false,
        //         movie: this.props.location.state.movie,
        //         error: undefined
        //     });
        // }
        // else {
        //     this.setState({
        //         loading: true,
        //         error: undefined
        //     });
        //
        //     let id = this.props.match.params.id;
        //
        //     MovieService.getMovie(id).then((data) => {
        //         this.setState({
        //             movie: data,
        //             loading: false,
        //             error: undefined
        //         });
        //     }).catch((e) => {
        //         console.error(e);
        //     });
        // }
    }

    async updateOffer(offer) {
        if (this.state.offer === undefined) {
            try {
                let ret = await OfferService.createoffer(offer)
                    .then(res => {
                        this.setState(Object.assign({}, this.state, {openRes: true}));
                    });
            } catch (err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating offer'}));
                this.setState(Object.assign({}, this.state, {openRes: true}));

            }
        } else {
            console.log('wtf');
        }
        // } else {
        //     try {
        //         let ret = await MovieService.updateMovie(movie);
        //         this.props.history.goBack();
        //     } catch(err) {
        //         console.error(err);
        //         this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
        //     }
        // }
    }

    render() {
        // if (this.state.loading) {
        //     return (<h2>Loading...</h2>);
        // }
        const show = this.state.openRes;
        console.log(show);


        return (
            <div>
                {/*{show ? <GlobalError> </GlobalError> : null}*/}
                <OfferForm open={false} offer={this.state.offer} onSubmit={(offer) => this.updateOffer(offer)}
                           error={this.state.error}/>
            </div>

        );
    }
}
