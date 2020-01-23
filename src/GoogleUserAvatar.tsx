import React from 'react';

import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

interface IGoogleAvatarProps {
    signedIn: boolean;
    user: {
        displayName: string;
        photoURL: string;
    }
}

interface IGoogleAvatarStates {

}

export default class GoogleUserAvatar extends React.Component<IGoogleAvatarProps, IGoogleAvatarStates> {
    render() {
        if (this.props.signedIn) {
            return  <Avatar alt={this.props.user.displayName} src={this.props.user.photoURL}></Avatar>;
        } else {
            return <Button color="inherit">Login</Button>;
        }
    }
}
