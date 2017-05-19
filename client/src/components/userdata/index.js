import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import * as Cookies from 'js-cookie';

export class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gitHubHandle: null,
            points: null,
            name: null,
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then((user) => {
            this.setState({
                gitHubHandle: user.gitHubHandle,
                points: user.points,
                name: user.name
            })
            }
        );
    }

    render() {
        let gitHubHandle = this.state.gitHubHandle;
        let points = this.props.points;
        let name = this.state.name;

        return (
            <ul className="user-list">
                <p>{gitHubHandle}<span>{name}</span></p>
                <ul className="userscores">
                    <li>Score: {points}</li>
                    <li>Correct </li>
                    <li>Wrong </li>
                </ul>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    points: state.dataFromAPI.points

})

export default connect(mapStateToProps)(UserData);