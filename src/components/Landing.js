import React from 'react';
import { Layout, PageHeader, Button, Image, Row, Col, Divider } from "antd";
import { Link, Switch, Route } from 'react-router-dom';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Content, Footer } = Layout;

const Landing = (props) => {
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

    return (
        <Layout className="layout" style={{height: "100%"}}>
            <PageHeader
                title={<Link to="/"><h3 style={{ margin:"0" }}>"Atlis."</h3></Link>}
                subTitle={<p style={{margin:"7px 0 0 0"}}>"for devs, by devs"</p>}
                extra={[
                    <Button key="2"><Link to="/code">Code</Link></Button>,
                    <Button key="1" type="primary" onClick={props.login}><Link to="/">App</Link></Button>,
                ]}/>
            <Switch>
                <Route exact path="/">
                    <Content style={{ padding: '2%', overflow:"scroll", backgroundColor:"white", margin:"auto", width:"96%", height:"100%", textAlign:"left" }}>
                        <Row justify="space-between">
                            <Col style={{ padding:"15% 3% 3% 3%"}} span={16}>
                                <h1 style={{fontSize:"32px"}}>Contactless data transfers.</h1>
                                <p>Passwordless authentication, form response and registration via qr codes.</p>
                                <p>For react developers.</p>
                                <br />
                                {/* <Row>
                                    <Button type="danger">Register</Button>
                                </Row> */}
                            </Col>
                            <Col span={8} style={{alignSelf:"center", marginTop:"5vh"}}>
                                <Image width={"100%"}  src="drawkit-nature-man-monochrome.svg"  preview={false}/>
                            </Col>
                        </Row>
                        
                    </Content>
                </Route>

                <Route path="/code">
                <Content style={{ padding: '2%', overflow:"scroll", backgroundColor:"white", margin:"auto", width:"96%", height:"100%", textAlign:"left" }}>
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
                            <p style={{margin:"0"}}>The data array contains the fields that will be requested from the user. Replace <b>"your app name"</b> and <b>"your app id"</b> with your created Api Key App Name and App ID. <b>"name"</b> is optional and more available parameters will be added.</p>
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
                    </Content>
                </Route>
            </Switch>
            <Footer style={{ textAlign: 'center', backgroundColor:"transparent", padding:"12px 50px" }}>Made by <a href="https://twitter.com/esotterik" target="blank">@esotterik.</a></Footer>
        </Layout>
    )
}

export default Landing
