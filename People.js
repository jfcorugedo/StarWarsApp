import React, { Component } from 'react'
import { // A
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    FlatList,
    Modal,
    Picker
} from 'react-native';
import _ from 'lodash';
import CommonStyles from './CommonStyles';

//import HomeWorld from './Homeworld' // C

export default class People extends Component {
    static navigationOptions = { // A
        headerTitle: 'People',
        headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#ffe81f',
            backgroundColor: 'black'
        },
        headerTintColor: '#ffe81f',
        pressColorAndroid: 'white'
    };

    state = {
        data: [],
        loading: true,
        modalVisible: false,
        gender: 'all',
        pickerVisible: false
    };

    componentDidMount() {
        fetch('https://swapi.co/api/people/')
            .then(response => {
                return response.json()
            })
            .then(json => {
                // do something with the returned data / json
                console.log(json);
                this.setState({ data: json.results, loading: false});
            })
            .catch(err => {
                // handle error here
                console.warn('Error', err);
            })
    }

    render() {
        let { data } = this.state // A
        if (this.state.gender !== 'all') { // B
            data = data.filter(f => f.gender === this.state.gender)
        }

        return (
            <View style={CommonStyles.container}>
                <TouchableHighlight style={styles.pickerToggleContainer} onPress={this.togglePicker}>
                    <Text style={styles.pickerToggle}>{this.state.pickerVisible ? 'Close Filter' : 'Open Filter'}</Text>
                </TouchableHighlight>
                { // D
                    this.state.loading ? <ActivityIndicator color='#ffe81f' /> : (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.name}
                            renderItem={this.renderItem}
                        />
                    )
                }
                <Modal // E
                    onRequestClose={() => console.log('onrequest close called')}
                    animationType="slide"
                    visible={this.state.modalVisible}>

                </Modal>
                {
                    this.state.pickerVisible && ( // F
                        <View style={styles.pickerContainer}>
                            <Picker // G
                                style={{ backgroundColor: '#ffe81f' }}
                                selectedValue={this.state.gender}
                                onValueChange={(item) => this.filter(item)}>

                                <Picker.Item itemStyle={{ color: 'yellow' }} label="All" value="all" />
                                <Picker.Item label="Males" value="male" />
                                <Picker.Item label="Females" value="female" />
                                <Picker.Item label="Other" value="n/a" />
                            </Picker>
                        </View>
                    )
                }
            </View>
        );
    }

    renderItem = ({ item }) => { // A
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.info}>Height: {item.height}</Text>
                <Text style={styles.info}>Birth Year: {item.birth_year}</Text>
                <Text style={styles.info}>Gender: {item.gender}</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.openHomeWorld(item.homeworld)}
                >
                    <Text style={styles.info}>View Homeworld</Text>
                </TouchableHighlight>
            </View>
        )
    }

    openHomeWorld = (url) => { // B
        this.setState({
            url,
            modalVisible: true
        })
    };

    closeModal = () => { // C
        this.setState({ modalVisible: false })
    };

    togglePicker = () => { // D
        this.setState({ pickerVisible: !this.state.pickerVisible })
    };

    filter = (gender) => { // E
        this.setState({ gender })
    }
}

const styles = StyleSheet.create({
    pickerToggleContainer: {
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerToggle: {
        color: '#ffe81f'
    },
    pickerContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1, borderBottomColor: '#ffe81f'
    },
    name: {
        color: '#ffe81f',
        fontSize: 18
    },
    info: {
        color: '#ffe81f',
        fontSize: 14,
        marginTop: 5
    }
});