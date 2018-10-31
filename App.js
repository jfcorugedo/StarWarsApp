import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import People from './People';
import CommonStyles from './CommonStyles';

const links = [
    {title: 'People'},
    {title: 'Films'},
    {title: 'StarShips'},
    {title: 'Vehicles'},
    {title: 'Species'},
    {title: 'Planets'},
    {title: 'Test'},
];

class StarWars extends React.Component {
    static navigationOptions = { // A
        headerTitle: <Image
            style={{width: 110, height: 64}}
            source={{
                uri: "https://pbs.twimg.com/profile_images/706705820554113024/nMv9bKOo_400x400.jpg"
            }}
        />,
        headerStyle: {backgroundColor: "black", height: 110}
    };

    navigate = (link) => { // B
        const {navigate} = this.props.navigation;
        navigate(link)
    };

    renderItem = ({item, index}) => { // C
        return (
            <TouchableHighlight
                onPress={() => this.navigate(item.title)}
                style={[starWarsStyles.item, {borderTopWidth: index === 0 ? 1 : null}]}>
                <Text style={starWarsStyles.text}>{item.title}</Text>
            </TouchableHighlight>
        )
    };

    render() {
        return (
            <View style={CommonStyles.container}>
                <FlatList // E
                    data={links}
                    keyExtractor={(item) => item.title}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const starWarsStyles = StyleSheet.create({
    item: {
        padding: 20,
        justifyContent: 'center',
        borderColor: 'rgba(255,232,31, .2)',
        borderBottomWidth: 1
    },
    text: {
        color: '#ffe81f',
        fontSize: 18
    }
});


class App extends React.Component {
    render() {
        return (
            <View style={CommonStyles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        );
    }
}

const Test = () => <View><Text style={{color: 'black'}}>Test!!!</Text></View>;

export default createStackNavigator({
    StarWars: {
        screen: StarWars
    },
    Test: {
        screen: Test
    },
    People: {
        screen: People
    }
});
