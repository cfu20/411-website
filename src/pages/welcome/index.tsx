import * as React from 'react';
import { Zomato } from './components';
import styled from 'react-emotion';
import * as firebase from 'firebase/app';
import 'firebase/database';

var config = {
};

const FeaturedText = styled('h1')`
    text-align: center;
    color: #FFF;
    font-size: 50px;
`;

const Section = styled('div')`
    text-align: center;
    margin-bottom: 30%;
`;

const Container = styled('div')`
    text-align: center;
    margin: 30px;
`;

const SuggestionText = styled('h3')`
    color: #FFF;
`;

interface State {
    choice: string;
    errorMsg: string;
}

export default class Welcome extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            choice: '',
            errorMsg: null
        };
    }


    public componentDidMount() {
        firebase.initializeApp(config);
        const items = firebase.database().ref(window.history.state.state.token);
        items.on('value', (item) => {
            const object = item.val();
            try {
                this.setState({
                    choice: object.Choice
                })
            } catch {
                this.setState({
                    errorMsg: "Sorry we can't find any user data, we'll start tracking now!"
                })

                //Add User Data to the Firebase
                const Items = ["Chinese", "Spanish", "Italian"];
                firebase.database().ref(window.history.state.state.token).set({
                    Array: Items,
                    Choice: Items[Math.floor(Math.random() * Items.length)]
                })
            }
        })
    }

    public render() {
        return (
            <Container>
                <FeaturedText>Hello, {window.history.state.state.name}</FeaturedText>
                {
                    this.state.errorMsg ? <SuggestionText>{this.state.errorMsg}</SuggestionText> : <SuggestionText>We suggest eating: {this.state.choice}</SuggestionText> 
                }
                <Section>
                    <Zomato search={this.state.choice}/>
                </Section>
            </Container>
        );
    }
}