import React from 'react';
import { Layout, Menu } from 'antd';
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
    Link
  } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light">
                <Menu  defaultSelectedKeys={['1']} mode="inline">
                    <div style={{width:"100%", padding:"0 0 0 10%", margin:"15% 0 15% 0"}}>
                        <h2>"Atlis"</h2>
                    </div>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<RocketOutlined />}>
                        <Link to="/setup">Setup</Link>
                    </Menu.Item>
                    <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                        <Menu.Item key="6" icon={<UserOutlined />}><Link to="/account">Account</Link></Menu.Item>
                        <Menu.Item key="8" icon={<LogoutOutlined />} onClick={props.logout}><Link to="/">Logout</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Switch>
                    <Route exact path="/">
                        <>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>Welcome {props.user.name}</h3>
                            </Content>
                            <Content style={{ margin: '2% auto 0 auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>email :  {props.user.email}</h3>
                            </Content>
                            <Content style={{ margin: '2% auto 2% auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>id {props.user.userAppID}</h3>
                            </Content>
                        </>
                    </Route>
                    <Route path="/setup">
                        <>
                            <Content style={{ margin: '2% auto 2% auto', width:"95%", backgroundColor:"white", padding: "2%", textAlign:"left" }}>
                                <h3>Setup</h3>
                                <code>console.log("hello world")</code>
                            </Content>
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
