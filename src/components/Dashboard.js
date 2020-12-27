import React, { useEffect, useState } from 'react';
import { Input, Layout, Menu, Row, Spin, Table, Button , Col, List} from 'antd';
import {
  SettingOutlined,
  RocketOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined
} from '@ant-design/icons';

import {
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

import moment from "moment";
import SessionCount from './SessionCount';


const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const Dashboard = (props) => {

    // const codeSnippet = `
    // <Bridge 
    //     request={{ 
    //         data: ["email", "name"], 
    //         appName: "your app name", 
    //         appID: "your app id" }}>
    //     <App />
    // </Bridge>
    // `
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [appName, setAppName] = useState("");
    const [apiKeys, setApiKeys] = useState([]);

    const getUser = async (id) => {
        return await API.graphql(graphqlOperation(queries.getUser, { id }));
    };

    const createUser = async (id, email, name) => {
        return await API.graphql(
            graphqlOperation(mutations.createUser, {
                input: {
                id,
                email,
                firstName: name
                },
            })
        );
    };


    useEffect(() => {
        if (props.user) {
            getUser(props.user.userAppID)
                .then((res) => {
                    if (res.data.getUser === null) {
                        console.log("CREATE NEW USER");
                        createUser(props.user.userAppID, props.user.email, props.user.name).then(res => {
                            setUserData(res.data.createUser); 
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        console.log("GET USER", res.data.getUser);
                        setUserData(res.data.getUser);
                        setApiKeys(res.data.getUser.apiKeys.items);
                    }
                })
                .catch((err) => console.log(err));
        }

        
    }, [props.user]);


    const createKey = async (name) => {
        return await API.graphql(graphqlOperation(mutations.createApiKey, {
            input : {
                appName: name,
                userID: userData.id,
                sessionCount: 0
            }
        }))
    }

    const create = () => {
        if (appName && appName !== "") {
            createKey(appName)
                .then(res => {
                    setApiKeys(prev => [...prev, res.data.createApiKey])
                    setAppName("");
                })
                .catch(err => { console.log(err); });
        }
        
    }

    const deleteKey = async (id) => {
        return await API.graphql(graphqlOperation(mutations.deleteApiKey, {
            input: {
                id
            }
        }));
    }

    const delKey = (item) => {
        deleteKey(item.id)
            .then(res => {
                console.log(res);
                setApiKeys(prev => prev.filter(i => i.id !== item.id));
            })
            .catch(err => { console.log(err); })
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light">
                <Menu  defaultSelectedKeys={[location.pathname]} mode="inline">
                    <div style={{width:"100%", padding:"0 0 0 10%", margin:"15% 0 15% 0"}}>
                        <h2>"Atlis"</h2>
                    </div>
                    <Menu.Item key="/" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="/setup" icon={<RocketOutlined />}>
                        <Link to="/setup">Setup</Link>
                    </Menu.Item>
                    <SubMenu key="/setting" icon={<SettingOutlined />} title="Settings">
                        <Menu.Item key="/account" icon={<UserOutlined />}><Link to="/account">Account</Link></Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={props.logout}><Link to="/">Logout</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Switch>
                    <Route exact path="/">
                        <>
                            <Content style={{ margin: '2% auto 2% auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>Welcome {props.user.name}</h3>
                                {/* <Row>
                                    { userData && userData.apiKeys.items.map((item) => (
                                        <Col span={2} key={item.id}>
                                            <SessionCount  item={item} />
                                        </Col>
                                    )) }
                                </Row> */}
                                { userData ? 
                                    <Table 
                                        style={{ margin: '2% auto 2% auto'}}
                                        rowKey="id"
                                        dataSource={apiKeys} 
                                        columns={[
                                            { title : "App Name", dataIndex:"appName" },
                                            { title : "App ID", dataIndex:"id" },
                                            { title : "Session Count", dataIndex:"sessionCount" }]}  
                                        />
                                : <div style={{textAlign:"center", margin: "10% auto"}}><Spin/></div>}
                                

                            </Content>
                        </>
                    </Route>
                    <Route path="/setup">
                        <>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left" }}>
                                <Content style={{backgroundColor:"white", padding:"2% 2% 4% 2%"}}>
                                    <h2>Create Api Key</h2>
                                    <Row>
                                        <Search value={appName} onChange={(e) => setAppName(e.target.value)} enterButton="Create" placeholder="Enter an application name" onSearch={create} />
                                    </Row>
                                </Content>

                                { userData ? 
                                    <Table 
                                        style={{ margin: '2% auto 2% auto'}}
                                        rowKey="id"
                                        dataSource={apiKeys} 
                                        columns={[
                                            { title : "App Name", dataIndex:"appName" },
                                            { title : "App ID", dataIndex:"id" },
                                            { title : "Session Count", dataIndex:"sessionCount" },
                                            { title : "Created At", dataIndex:"createdAt", render: date => (<>{moment(new Date(date)).fromNow()}</>)},
                                            { title : "Action", render: (item) => (<Button type="primary" danger onClick={() => delKey(item)}>Delete</Button>)} ]} />
                                : <div style={{textAlign:"center", margin: "10% auto"}}><Spin/></div>}
                            </Content>

                            {/* <div style={{ width: "50%" }}>
                                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} wrapLongLines>
                                        {codeSnippet}
                                    </SyntaxHighlighter>
                                </div> */}
                        </>
                    </Route>
                    <Route path="/account">
                        <>
                            <Content style={{ margin: '2% auto 2% auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>Account</h3>
                            </Content>
                        </>
                    </Route>
                </Switch>
                
            </Layout>
      </Layout>
    )
}

export default Dashboard
