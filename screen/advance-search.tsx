import React from 'react';
import { Layout, Input, Button, Select, SelectItem, IndexPath, } from '@ui-kitten/components';
import ResultScreen from './result'
import Communication from '../communication/communication'
import Loader from './loader'

const generateYear = () => {
    let items: any[] = ['None'];
    for (let i = 1947; i <= new Date().getFullYear(); i++) {
        items.push(i);
    }
    return items;
}

const listOfMc = [
    { name: 'None' },
    { name: 'Andhra Pradesh Medical Council', id: 1 },
    { name: 'Arunachal Pradesh Medical Council', id: 2 },
    { name: 'Assam Medical Council', id: 3 },
    { name: 'Bhopal Medical Council', id: 28 },
    { name: 'Bihar Medical Council', id: 4 },
    { name: 'Bombay Medical Council', id: 29 },
    { name: 'Chandigarh Medical Council', id: 30 },
    { name: 'Chattisgarh Medical Council', id: 5 },
    { name: 'Delhi Medical Council', id: 6 },
    { name: 'Goa Medical Council', id: 7 },
    { name: 'Gujarat Medical Council', id: 8 },
    { name: 'Haryana Medical Council', id: 9 },
    { name: 'Himachal Pradesh Medical Council', id: 10 },
    { name: 'Hyderabad Medical Council', id: 45 },
    { name: 'Jammu & Kashmir Medical Council', id: 11 },
    { name: 'Jharkhand Medical Council', id: 12 },
    { name: 'Karnataka Medical Council', id: 13 },
    { name: 'Madhya Pradesh Medical Council', id: 15 },
    { name: 'Madras Medical Council', id: 36 },
    { name: 'Mahakoshal Medical Council', id: 35 },
    { name: 'Maharashtra Medical Council', id: 16 },
    { name: 'Manipur Medical Council', id: 26 },
    { name: 'Medical Council of India', id: 46 },
    { name: 'Medical Council of Tanganyika', id: 47 },
    { name: 'Mizoram Medical Council', id: 42 },
    { name: 'Mysore Medical Council', id: 37 },
    { name: 'Nagaland Medical Council', id: 41 },
    { name: 'Orissa Council of Medical Registration', id: 17 },
    { name: 'Pondicherry Medical Council', id: 38 },
    { name: 'Punjab Medical Council', id: 18 },
    { name: 'Rajasthan Medical Council', id: 19 },
    { name: 'Sikkim Medical Council', id: 20 },
    { name: 'Tamil Nadu Medical Council', id: 21 },
    { name: 'Telangana State Medical Council', id: 43 },
    { name: 'Travancore Cochin Medical Council, Trivandrum', id: 50 },
    { name: 'Tripura State Medical Council', id: 22 },
    { name: 'Uttar Pradesh Medical Council', id: 23 },
    { name: 'Uttarakhand Medical Council', id: 24 },
    { name: 'Vidharba Medical Council', id: 40 },
    { name: 'West Bengal Medical Council', id: 25 }
]

const AdvanceSearchScreen = () => {
    const communication: Communication = new Communication();
    const [data, setData] = React.useState();
    const [loaderVisible, setLoaderVisible] = React.useState(false);
    const [name, setName] = React.useState('');
    const [regNo, setRegNo] = React.useState('');
    const [selectedRegYear, setSelectedRegYear] = React.useState(new IndexPath(0));
    const [selectedMC, setSelectedMC] = React.useState(new IndexPath(0));
    const years = generateYear();
    const displayValueMC = listOfMc[selectedMC.row]?.name;
    const displayValueYear = years[selectedRegYear.row];
    const fetchData = async () => {
        setLoaderVisible(true);
        const url = 'start=0&length=500&name=' + name + '&registrationNo=' + regNo + '&smcId=' + (displayValueMC === 'None' ? '' : listOfMc[selectedMC.row]?.id) + '&year=' + (displayValueYear === 'None' ? '' : displayValueYear);
        communication.getOnlyDataAPI(url).then(response => {
            setData(response);
            setLoaderVisible(false);
        }).catch(err => { console.error(err); setLoaderVisible(false); })
    };
    return (
        <Layout style={{ flex: 1, alignItems: 'center', padding: 20 }}>
            <Input
                value={name}
                label='Doctor Name:'
                placeholder='Enter Doctor Name'
                onChangeText={nextValue => setName(nextValue)}
            />
            <Input
                style={{ marginTop: 10 }}
                value={regNo}
                label='Registration No:'
                placeholder='Enter Doctor Registration No'
                onChangeText={nextValue => setRegNo(nextValue)}
            />
            <Select
                placeholder='Select Year of Admission'
                label='Year of Registration:'
                value={displayValueYear}
                style={{ marginTop: 10, width: '100%' }}
                selectedIndex={selectedRegYear}
                onSelect={index => setSelectedRegYear(index)}>
                {
                    years.map((item, index) => (<SelectItem title={item} key={index} />))
                }
            </Select>
            <Select
                placeholder='None'
                label='State Medical Council:'
                value={displayValueMC}
                style={{ marginTop: 10, width: '100%' }}
                selectedIndex={selectedMC}
                onSelect={index => setSelectedMC(index)}>
                {
                    listOfMc.map((item, index) => (<SelectItem title={item.name} key={index} />))
                }
            </Select>
            <Button style={{ marginTop: 10, alignSelf: 'flex-start' }} onPress={() => fetchData()}>
                Search
    </Button>
            {data &&
                <ResultScreen data={data} advance={true}></ResultScreen>
            }
            <Loader data={loaderVisible}></Loader>
        </Layout>
    )
}


export default AdvanceSearchScreen;