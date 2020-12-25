import React from 'react';
import { Layout, PageHeader, Button } from "antd";
import { Link, Switch, Route } from 'react-router-dom';
const { Content, Footer } = Layout;

const Landing = (props) => {
    return (
        <Layout className="layout" style={{height: "100%"}}>
            <PageHeader
                title={<Link to="/"><h3 style={{ margin:"0" }}>"Atlis"</h3></Link>}
                extra={[
                    <Button key="2"><Link to="/about">About</Link></Button>,
                    <Button key="1" type="primary" onClick={props.login}><Link to="/">App</Link></Button>,
                ]}/>
            <Switch>
                <Route exact path="/">
                    <Content style={{ padding: '2%', backgroundColor:"white", margin:"auto", width:"96%" }}>
                        <div className="site-layout-content" style={{textAlign:"left"}}>
                            <h3>Welcome</h3>
                        </div>
                    </Content>
                </Route>

                <Route path="/about">
                    <Content style={{ padding: '2%', backgroundColor:"white", margin:"auto", width:"96%" }}>
                        <div className="site-layout-content" style={{textAlign:"left"}}>
                            <h3>About</h3>
                        </div>
                    </Content>
                </Route>
            </Switch>
            <Footer style={{ textAlign: 'center' }}>Made by <a href="https://twitter.com/esotterik" target="blank">@esotterik</a></Footer>
        </Layout>
    )
}

export default Landing
