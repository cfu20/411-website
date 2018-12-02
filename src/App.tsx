import * as React from 'react';
import styled from 'react-emotion';
import { Col } from 'reactstrap';
import './buttons.css';
import { Redirect } from 'react-router';
import { GoogleLogin } from 'react-google-login';

const Section = styled('div')`
    text-align: center;
    margin-bottom: 30%;
`;

const TitleSection = styled('div')`
    text-align: center;
    margin-top: 15%;
`;

const MainHeaderWhite = styled('h1')`
    color: white;
    display: inline;
    font-size: 60px;
`;

const MainHeaderGreen = styled('h1')`
    color: green;
    display: inline;
    font-size: 60px;
`;

const MainHeaderBlue = styled('h1')`
    color: #aaa;
    display: inline;
    font-size: 60px;
`;

const GoogleSignInButton = styled('a')`
    font-size: 14px;
    padding: 10px;
    margin: 30px 0px;
`;

interface State {
    isSignedIn: boolean;
    name: string;
    image: string;
}

export default class App extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            image: '',
            isSignedIn: false,
            name: '',
        };

        this.responseSuccess = this.responseSuccess.bind(this);
    }

    public componentDidMount() {
        const user = JSON.parse(String(localStorage.getItem('userInfo')));
        const check = Boolean(user);
        console.log(user)
        if (check === false) {
            return;
        }

        // const userToken = user.El;
        const nameObj = user.profileObj.givenName;
        const imageObj = user.profileObj.imageUrl;

        this.setState({
            image: imageObj,
            isSignedIn: check,
            name: nameObj,
        });
    }

    public responseSuccess = (response: any) => {
        localStorage.setItem('userInfo', JSON.stringify(response));
        console.log('you got here')
    }

    public responseFailure = (response: any) => {
        console.log(response);
    }

    public render() {
        return (
            <>
                <TitleSection>
                    <MainHeaderWhite>Uber</MainHeaderWhite>
                    <MainHeaderGreen>Eats</MainHeaderGreen>
                    <MainHeaderBlue>(Out!)</MainHeaderBlue>
                </TitleSection>

                <Section>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <GoogleLogin
                            clientId=""
                            render={renderProps => (
                                <GoogleSignInButton className="btn btn-sm animated-button thar-three" onClick={renderProps.onClick}>LOG IN</GoogleSignInButton>
                            )}
                            onSuccess={this.responseSuccess}
                            onFailure={this.responseFailure}
                        />
                    </Col>
                </Section>
                {
                    this.state.isSignedIn ? <Redirect to="/pages/welcome" /> : null
                }
            </>
        );
    }
}

