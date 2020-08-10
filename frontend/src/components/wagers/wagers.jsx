import React from 'react';
import { connect } from 'react-redux';

class Wagers extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>Hey</p>
            </div>
        )
    }
}

const msp = state => {
    return {

    }
}

const mdp = dispatch => {
    return {

    }
}

export default connect(msp, mdp)(Wagers);