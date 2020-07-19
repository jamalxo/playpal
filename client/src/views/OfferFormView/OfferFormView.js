import React from 'react';

import OfferService from '../../services/OfferService';
import OfferForm from "../../components/Offer/OfferForm";
import Loading from "../../components/Loading";

export class OfferFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.history.location.pathname ==='/offer/create') {
            this.setState({
                loading: false,
                offer: undefined,
                error: undefined,
                openRes: false,
                successRes: false,
                test: true
            });
        } else if (this.props.location.state !== undefined && this.props.location.state.offer !== undefined) {
            this.setState({
                loading: false,
                offer: this.props.location.state.offer,
                error: undefined
            });
        } else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            OfferService.getOffer(id).then((data) => {
                this.setState({
                    offer: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updateOffer(offer) {
        if (this.state.offer === undefined) {
            try {
                let ret = await OfferService.createOffer(offer)
                    .then(res => {
                        this.setState(Object.assign({}, this.state, {openRes: true}));
                    });
            } catch (err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating offer'}));
                this.setState(Object.assign({}, this.state, {openRes: true}));

            }
        } else {
            try {
                let ret = await OfferService.updateOffer(offer)
                    .then(res => {
                        this.setState(Object.assign({}, this.state, {openRes: true}));
                    });
                //this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            }
        }
    }

    render() {
        // THIS IS IMPORTANT
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <div>
                <OfferForm open={false}
                           offer={this.state.offer}
                           onSubmit={(offer) => this.updateOffer(offer)}
                           error={this.state.error}/>
            </div>

        );
    }
}
