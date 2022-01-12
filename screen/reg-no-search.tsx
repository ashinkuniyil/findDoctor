import React from 'react';
import { Layout, Input, Button } from '@ui-kitten/components';
import ResultScreen from './result'
import Communication from '../communication/communication'
import Loader from './loader'

const RegNumberSearchScreen = () => {
    const communication: Communication = new Communication();
    const [data, setData] = React.useState();
    const [value, setValue] = React.useState('');
    const [loaderVisible, setLoaderVisible] = React.useState(false);
    const fetchData = async () => {
        setLoaderVisible(true);
        communication.postFromJsonAPI({ registrationNo: value }).then(response => {
            setData(response);
            setLoaderVisible(false);
        }).catch(err => { console.error(err); setLoaderVisible(false); })
    };
    return (
        <Layout style={{ flex: 1, alignItems: 'center', padding: 20 }}>
            <Input
                textContentType='telephoneNumber'
                value={value}
                label='Registration No:'
                placeholder='Enter Doctor Registration No'
                onChangeText={nextValue => setValue(nextValue)}
            />
            <Button disabled={!value} style={{ marginTop: 10, alignSelf: 'flex-start' }} onPress={() => fetchData()}>
                Search
            </Button>
            {data &&
                <ResultScreen data={data} regNo={true}></ResultScreen>
            }
            <Loader data={loaderVisible}></Loader>
        </Layout>
    )
}


export default RegNumberSearchScreen;