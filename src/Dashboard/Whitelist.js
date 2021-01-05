import React, { useEffect, useState } from 'react';
import { Alert, Layout, Spin, Row, Input, Table, Button, message} from 'antd';
import { useLocation } from 'react-router-dom';
import { API, graphqlOperation } from "aws-amplify";
import { updateApiKey } from '../graphql/mutations';

const { Content } = Layout;
const { Search } = Input;

const Whitelist = ({ userData }) => {
    const [id, setID] = useState();
    const [apiKey, setApiKey] = useState();
    const location = useLocation();
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (userData && userData.apiKeys && userData.apiKeys.items) {
            const ID = location.pathname.split("/whitelist/")[1];
            setID(ID);

            const aK = userData.apiKeys.items.filter(i => i.id === ID)[0];
            setApiKey(aK);

            setList(aK.whitelist);
            
        }
    }, [location.pathname, userData]);

    const update = async(val) => {
        return await API.graphql(graphqlOperation(updateApiKey, {input : {id , whitelist:val } }));
    }

    const addRecord = (val) => {
        setSearch("");
        
        if(list === null || list === undefined) {
            // console.log("LIST IS NULL")
            update([val]).then(res => {
                setApiKey(res.data.updateApiKey);
                setList(res.data.updateApiKey.whitelist);
            }).catch(err => console.log(err))
        } else {
            if(!list.includes(val)) {
            // console.log("LIST IS NOT NULL");
                update([...list, val]).then(res => {
                    setApiKey(res.data.updateApiKey);
                    setList(res.data.updateApiKey.whitelist);
                }).catch(err => console.log(err))
            } else {
                message.warning(`${val} is already listed`);
            }
        } 
        
    }

    const removeRecord = (val) => {
        setSearch("");
        const filteredList = list.filter(i => i !== val);
        update(filteredList).then(res => {
            setApiKey(res.data.updateApiKey);
            setList(res.data.updateApiKey.whitelist);
        }).catch(err => console.log(err))
    }

    return (
        <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left"}}>
            <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                <div style={{ padding: "2%" }}>
                    <h3 style={{margin:"0"}}>Whitelist</h3>
                </div>
            </Content>
            <Alert message="List of valid domains or email address. If none is set there will be no restrictions." type="warning" closable style={{marginBottom:"2vh"}} />
            <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                <div style={{padding:"2%"}}>
                    <h3>Add Record</h3>
                    <Row>
                        <Search value={search}  onChange={e => setSearch(e.target.value)} onSearch={addRecord} enterButton="Add" placeholder="Enter a domain (eg. gmail.com) or address (eg. ex@gmail.com)"  />
                    </Row>
                </div>
            </Content>
            { userData && userData.apiKeys ? 
                // <List
                //     header={<div>Addresses</div>}
                //     bordered
                //     dataSource={list}
                //     style={{backgroundColor:"white"}}
                //     renderItem={item => (
                //     <List.Item>
                //        {item}
                //     </List.Item>
                //     )}
                // />
                <Table rowKey="" dataSource={list} columns={[
                    { title:"Type", dataIndex:""},
                    { title : <div style={{textAlign:"right", paddingRight:"25px"}}>Action</div>, render: (item) => (<div style={{textAlign:"right"}}><Button type="primary" danger onClick={() => removeRecord(item)}>Remove</Button></div>)},
                ]}/>
            
            : <Spin />}
            
        </Content>
    )
}

export default Whitelist;
