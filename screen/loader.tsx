import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Spinner, Text } from '@ui-kitten/components';

const Loader = (props) => {
    return (
        <Modal
            visible={props.data}
            backdropStyle={styles.backdrop}>
            <Spinner size='giant' />
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
export default Loader;