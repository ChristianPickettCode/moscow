import React from 'react';
import { Layout, PageHeader, Button, Image, Row, Col } from "antd";
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
                    <Content style={{ padding: '2%', overflow:"scroll", backgroundColor:"white", margin:"auto", width:"96%", height:"100%", textAlign:"left" }}>
                        <Row justify="space-between">
                            <Col style={{ padding:"10% 3% 3% 3%"}} span={16}>
                                <h1 style={{fontSize:"32px"}}>Welcome</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Col>
                            <Col span={8} style={{alignSelf:"center"}}>
                                <Image width={"100%"}  src="drawkit-nature-man-monochrome.svg"  preview={false}/>
                            </Col>
                        </Row>
                        
                    </Content>
                </Route>

                <Route path="/about">
                <Content style={{ padding: '2%', overflow:"scroll", backgroundColor:"white", margin:"auto", width:"96%", height:"100%", textAlign:"left" }}>
                        <Row justify="space-between">
                            <Col style={{ padding:"3%", width:"70%"}}>
                                <h3>Welcome</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Col>
                            <Col>
                                <Image src="unlock-monochrome.svg" width={250}/>
                            </Col>
                        </Row>
                        <Row style={{margin: "4% 3%"}}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Vitae purus faucibus ornare suspendisse. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Scelerisque varius morbi enim nunc. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Id interdum velit laoreet id donec. Viverra mauris in aliquam sem fringilla.</p>
                        </Row>
                        <Row justify="space-around" style={{marginTop:"5%"}}>
                            <Col>
                                <Image src="drawkit-drawing-man-monochrome.svg" width={250} height={250}/>
                            </Col>

                            <Col>
                                <Image src="gamer-monochrome.svg" width={250} height={250}/>
                            </Col>

                            <Col>
                                <Image src="drawkit-mobile-article-monochrome.svg" width={250} height={250}/>
                            </Col>
                        </Row>
                        <Row style={{margin: "4% 3%"}}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Vitae purus faucibus ornare suspendisse. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Scelerisque varius morbi enim nunc. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Id interdum velit laoreet id donec. Viverra mauris in aliquam sem fringilla.</p>
                        </Row>
                    </Content>
                </Route>
            </Switch>
            <Footer style={{ textAlign: 'center', backgroundColor:"transparent", padding:"12px 50px" }}>Made by <a href="https://twitter.com/esotterik" target="blank">@esotterik</a></Footer>
        </Layout>
    )
}

export default Landing
