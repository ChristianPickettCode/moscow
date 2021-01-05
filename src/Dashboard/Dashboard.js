import React, { useEffect, useState } from 'react';
import { Input, Layout, Menu, Row, Spin, Table, Button , Tag, Form, Divider, Alert} from 'antd';
import {
  SettingOutlined,
  RocketOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
  EyeOutlined
} from '@ant-design/icons';

import {
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { ghcolors, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

import moment from "moment";
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Whitelist from './Whitelist';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const Dashboard = (props) => {

    const codeSnippet = `
    import React from 'react'
    import Atlis from 'atlis'

    const App = () => {
        return(
            <Atlis 
                request={{ 
                    data: ["email", "name"], // "name" is optional
                    appName: "your app name", 
                    appID: "your app id" }}>
                <Home />
            </Atlis>
        ); 
    }

    export default App;
    `;

    const codeSnippet2 = `
    const Home = (prop) => {
        return(
            <div>
                { props.user ?
                    <div>
                        <p>{props.user.email}</p>
                        <button onClick={props.logout}>logout</button>
                    </div>
                : 
                    <div>
                        <button onClick={props.login}>login</button>
                    </div>
                }
            </div>
        ) 
    }
    `;

    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [appName, setAppName] = useState("");
    const [apiKeys, setApiKeys] = useState([]);
    const [form] = Form.useForm();
    const [connectCount, setConnectCount] = useState(0);
    const [transferCount, setTransferCount] = useState(0);
    const [notValidCount, setNotValidCount] = useState(0);

    const getUser = async (id) => {
        //console.log(id)
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

    const callGetUser = () => {
        getUser(props.user.userAppID)
            .then((res) => {
                if (res.data.getUser === null) {
                    // console.log("CREATE NEW USER");
                    createUser(props.user.userAppID, props.user.email, props.user.name).then(res => {
                        setUserData(res.data.createUser); 
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    // console.log("GET USER", res.data.getUser);
                    setUserData(res.data.getUser);
                    let keys = res.data.getUser.apiKeys.items;
                    keys.forEach(item => {
                        session(item.id).then(res => {
                            const sess = res.data.listSessions.items;
                            const sortedSess = sess.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                            item.sessions = sortedSess;
                            
                        })
                    });
                    setApiKeys(keys);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (props.user) {
            callGetUser();
            setInterval(callGetUser, 30000);
        }
    }, [props.user]);

    useEffect(() => {
        setConnectCount(0);
        setTransferCount(0);
        setNotValidCount(0);
        if (userData) {
            userData.apiKeys.items.forEach(item => {
                API.graphql(graphqlOperation(queries.listSessions, {
                    filter: {
                        apiKeyID: {
                            eq: item.id
                        }
                    }
                })).then(res => {
                    res.data.listSessions.items.forEach(i => {
                        if (i.type === "CONNECT") {
                            setConnectCount(prev => prev + 1);
                        }
                        if (i.type === "TRANSFER") {
                            setTransferCount(prev => prev + 1);
                        }
                        if (i.type === "NOT VALID") {
                            setNotValidCount(prev => prev + 1);
                        }
                    })
                }).catch(err => {
                    console.log(err);
                })
            })
        }
        // console.log(userData)
    }, [userData])


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

    const getSession = async(id) => {
        return await API.graphql(graphqlOperation(queries.listSessions, {
            filter: {
                apiKeyID: {
                    eq: id
                }
            }
        }));
    }

    const session = (id) => {
        return getSession(id);
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                theme="light"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                  }} >
                <Menu  defaultSelectedKeys={[location.pathname]} defaultOpenKeys={['/get-started']} mode="inline">
                    <div style={{width:"100%", padding:"0 0 0 10%", margin:"15% 0 15% 0"}}>
                        <h2>"Atlis"</h2>
                    </div>
                    <Menu.Item key="/" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="/get-started" icon={<RocketOutlined />}  title="Get Started">
                        <Menu.Item key="/create-key">
                            <Link to="/create-key">Create Key</Link>
                        </Menu.Item>
                        <Menu.Item key="/setup">
                            <Link to="/setup">Setup</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/setting" icon={<SettingOutlined />} title="Settings">
                        <Menu.Item key="/account" icon={<UserOutlined />}><Link to="/account">Account</Link></Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={props.logout}><Link to="/">Logout</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{marginLeft:"200px"}}>
                <Switch>
                    <Route exact path="/">
                        <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left"}}>
                            <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                <div style={{ padding: "2%" }}>
                                    <h3 style={{margin:"0"}}>Welcome {props.user.name}</h3>
                                </div>
                            </Content>

                            <Row>
                                <Tag color="orange" style={{padding:"8px"}}>CONNECT : {connectCount}</Tag>
                                <Tag color="cyan" style={{padding:"8px"}}>TRANSFER : {transferCount}</Tag>
                                <Tag color="error" style={{padding:"8px"}}>NOT VALID : {notValidCount}</Tag>
                            </Row>
                            <Content>
                                { userData ? 
                                        <Table 
                                            style={{ margin: '2% auto 2% auto'}}
                                            rowKey="id"
                                            dataSource={apiKeys} 
                                            expandable={{
                                                expandedRowRender: item => {
                                                    return(
                                                        <Table 
                                                            rowKey="id"
                                                            dataSource={item.sessions}
                                                            columns={[
                                                                { title:"Type", dataIndex:"type", render: type => (<Tag color={type === "CONNECT" ? "orange" : type === "NOT VALID" ? "error" : "cyan"}>{type}</Tag>)},
                                                                { title:"ID", dataIndex:"id"},
                                                                { title:"Time", dataIndex:"createdAt", render: date => (<>{moment(new Date(date)).fromNow()}</>)},
                                                            ]}
                                                        />
                                                    )},
                                            }}
                                            columns={[
                                                { title : "App Name", dataIndex:"appName" },
                                                { title : "App ID", dataIndex:"id" },
                                                { title : "Session Count", dataIndex:"sessionCount", sorter:(a,b) => (a.sessionCount - b.sessionCount) },
                                                { title : "Last Active", dataIndex:"updatedAt", sorter:(a,b) => (new Date(a.updatedAt) - new Date(b.updatedAt)), render: date => (<>{moment(new Date(date)).fromNow()}</>)},
                                                { title : "Whitelist", dataIndex:"id", render: (id) => <div style={{textAlign:"center"}}><Link to={`/whitelist/${id}`}><EyeOutlined /></Link></div>} ]}  
                                            />
                                    : <div style={{textAlign:"center", margin: "10% auto"}}><Spin/></div>}
                            </Content>
                        </Content>
                    </Route>
                    <Route path="/create-key">
                        <>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left" }}>
                                
                                <Alert message="Get started by creating an api key" type="success" closable style={{marginBottom:"2vh"}} />

                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{padding:"2%"}}>
                                        <h3>Create Api Key</h3>
                                        <Row>
                                            <Search value={appName} onChange={(e) => setAppName(e.target.value)} enterButton="Create" placeholder="Enter an application name" onSearch={create} />
                                        </Row>
                                    </div>
                                </Content>

                                { userData ? 
                                    <Table 
                                        style={{ margin: '2% auto 2% auto'}}
                                        rowKey="id"
                                        dataSource={apiKeys.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))} 
                                        columns={[
                                            { title : "App Name", dataIndex:"appName" },
                                            { title : "App ID", dataIndex:"id" },
                                            { title : "Session Count", dataIndex:"sessionCount" },
                                            { title : "Created At", dataIndex:"createdAt", render: date => (<>{moment(new Date(date)).fromNow()}</>)},
                                            { title : "Action", render: (item) => (<Button type="primary" danger onClick={() => delKey(item)}>Delete</Button>)} ]} />
                                : <div style={{textAlign:"center", margin: "10% auto"}}><Spin/></div>}
                            </Content>
                        </>
                    </Route>
                    <Route path="/setup">
                        <>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left"}}>

                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        <h3 style={{margin:"0"}}>1. Install Package</h3>
                                        <Divider style={{marginTop:"10px", marginBottom:"10px"}} />
                                        <SyntaxHighlighter language="javascript" style={github}>
                                            yarn add atlis
                                        </SyntaxHighlighter>
                                        <SyntaxHighlighter language="javascript" style={github}>
                                            npm install --save atlis
                                        </SyntaxHighlighter>
                                    </div>
                                </Content>

                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        <h3 style={{margin:"0"}}>2. Wrap Application</h3>
                                        <Divider style={{marginTop:"10px", marginBottom:"10px"}} />
                                        {/* <code style={{fontSize:"0.85em"}}>{codeSnippet}</code>*/}
                                        <SyntaxHighlighter language="javascript" style={github}>
                                            {codeSnippet}
                                        </SyntaxHighlighter>  
                                    </div>
                                </Content>
                                

                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        <p style={{margin:"0"}}>The data array contains the fields that will be requested from the user. Replace <b>"your app name"</b> and <b>"your app id"</b> with your created App Name key and App ID. <b>"name"</b> is optional and more available parameters will be added.</p>
                                    </div>
                                </Content>

                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        <h3 style={{margin:"0"}}>3. Access Props</h3>
                                        <Divider style={{marginTop:"10px", marginBottom:"10px"}} />
                                        <p>Within your Home component with prop you have access to the user object and login and logout functions.</p>
                                        <SyntaxHighlighter language="javascript" style={github}>
                                            {codeSnippet2}
                                        </SyntaxHighlighter>  

                                    </div>
                                </Content>
                            </Content>
                        </>
                    </Route>
                    <Route path="/account">
                        <>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", textAlign:"left"}}>
                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        <h3 style={{margin:"0"}}>Account</h3>
                                    </div>
                                    
                                </Content>
                                <Content style={{ width:"100%", backgroundColor:"white", border:"1px #c4c4c4 solid", marginBottom:"2vh"}}>
                                    <div style={{ padding: "2%" }}>
                                        {userData ? 
                                            <Form
                                                layout="vertical"
                                                form={form} >
                                                <Form.Item label="Name">
                                                    <Input value={userData.firstName}  placeholder="input placeholder" />
                                                </Form.Item>
                                                {/* <Form.Item label="Last Name">
                                                    <Input value={userData.lastName}  placeholder="input placeholder" />
                                                </Form.Item> */}
                                                <Form.Item label="Email">
                                                    <Input value={userData.email} placeholder="input placeholder" />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary">Edit</Button>
                                                </Form.Item>
                                            </Form>
                                        
                                        : <Spin />}

                                    </div>
                                    
                                </Content>
                            </Content>
                        </>
                    </Route>
                    <Route path="/whitelist/:id"><Whitelist userData={userData} /></Route>
                </Switch>
                
            </Layout>
      </Layout>
    )
}

export default Dashboard
