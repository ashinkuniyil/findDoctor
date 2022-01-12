import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Modal, Button, Text, Card } from '@ui-kitten/components';
import Communication from '../communication/communication'
import Loader from './loader'

class ResultScreen extends Component {
    state = {
        seletedItem: {},
        visible: false,
        loaderVisible: false,
        modalData: undefined
    }
    communication: Communication = new Communication();
    constructor(props) {
        super(props)
    }
    header = (props, regNo?) => (
        <View {...props}>
            <Text category='h5'>{regNo ? props.firstName : props[4]}</Text>
            <Text category='s1'>Reg No: {regNo ? props.registrationNo : props[2]} | Year: {regNo ? props.yearInfo : props[1]} | Doctor ID: {regNo ? props.doctorId : this.getDoctorID(props[6])}</Text>
        </View>
    );

    getDoctorID = (value: string): string => {
        return value?.match(/\d+/g)[1] ?? ''
    }

    openModal = (selectedItem, regNo) => {
        if (regNo) {
            this.setState({ seletedItem: selectedItem, visible: true })
        } else {
            this.setState({ loaderVisible: true })
            this.communication.postModalAPI({
                doctorId: this.getDoctorID(selectedItem[6]),
                regdNoValue: selectedItem[2]
            }).then(res => {
                this.setState({
                    loaderVisible: false,
                    visible: true,
                    modalData: res
                })
            }).catch(err => this.setState({ loaderVisible: false }))
        }
    }
    styles = StyleSheet.create({
        container: {
            minHeight: 192,
            width: '80%'
        },
        backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        advanceScreen: {
            marginBottom: 300,
            marginTop: 10
        },
        screen: {
            marginBottom: 100,
            marginTop: 10
        }
    });
    render() {
        return (<View>
            <SafeAreaView style={this.props.advance ? this.styles.advanceScreen : this.styles.screen}><ScrollView>
                {this.props &&
                    this.props.data.map((item, index) => <Card style={{ marginBottom: 10 }} header={this.header(item, this.props.regNo)} key={index} onPress={() => { this.openModal(item, this.props.regNo) }}>
                        <Text>{this.props.regNo ? item.smcName : item[3]}</Text>
                    </Card>)
                }
            </ScrollView></SafeAreaView>
            <Modal
                visible={this.state.visible}
                style={this.styles.container}
                backdropStyle={this.styles.backdrop}
                onBackdropPress={() => this.setState({ visible: false })}>
                <Card disabled={true}>
                    <Text category='h6'>Address</Text>
                    {this.props.regNo
                        ? <Text>{this.state.seletedItem?.address}</Text>
                        : <Text>{this.state.modalData?.address}</Text>
                    }
                    <Text category='h6'>Qualifiaction</Text>
                    {this.props.regNo
                        ? <Text>{this.state.seletedItem?.doctorDegree}</Text>
                        : <Text>{this.state.modalData?.doctorDegree}</Text>
                    }
                    <Text category='h6'>Qualification Year</Text>
                    {this.props.regNo
                        ? <Text>{this.state.seletedItem?.yearOfPassing}</Text>
                        : <Text>{this.state.modalData?.yearOfPassing}</Text>
                    }
                    <Button style={{ marginTop: 10 }} onPress={() => this.setState({ visible: false })}>
                        <Text>Close</Text>
                    </Button>
                </Card>
            </Modal>
            <Loader data={this.state.loaderVisible}></Loader>
        </View>
        )
    }
}
export default ResultScreen;