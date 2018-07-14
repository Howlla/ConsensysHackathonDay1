import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Modal } from 'antd';
import { connect } from 'react-redux';  

import { AUTH_LOGOUT, RESET_ORDER_DETAIL, MENU_CHANGE, TOGGLE_MENU } from '../../ActionTypes/ActionTypes';

import 'antd/dist/antd.css';
import './Admin.css';   
import Logo from '../../assets/caredose.png';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm; 


class Admin extends Component {
    
    state = {
        //  redirect: false,
        // current: '',
    };

    // const { history } = this.props;

    componentDidMount = () => {
        if (this.props.loggedIn!==true) {
            console.log('LOGOUT')
            this.props.history.push("/login")
        }
        else {
            console.log("LOGGED IN");
        }
    }
   
    

    toggle = () => {
        this.props.toggelMenu();
        // this.setState({
        //   collapsed: !this.state.collapsed,
        // });
    }

    // toAllOrders = (event) => {
    //     this.props.history.push('/allOrders');
        
    //     console.log(event);
    // }

    // toNewOrders = (event) => {
    //     this.props.history.push('/addOrder');
    //     event.preventDefault();
    //     console.log(event);
    // }
    select = (values) => {
        // console.log(values, event);
        // this.props.history.push(values.key);
        // this.setState({ current: values.key });
        this.props.changeMenu(values.key);
            // this.props.history.pop();
            // let temp = this.props.history.location.pathname;
            // let count = (temp.match(/\//g) || []).length;
            // if ( count > 1 ) {
            //     console.log(this.props.history.location.pathname, count);
            //     this.props.history.goBack();
            //     this.props.history.push(values.key);
            // } else {
            // }
        // this.props.history.goBack();
        // console.log('hello');
        this.props.history.push(values.key);
        // this.props.history.location.pathname = ``
    }

    showConfirm = () => {
        confirm({
            title: 'You will be logged Out',
            // content: 'Some descriptions',
            onOk: () => {
                this.props.resetOrderDetail();
                this.props.logOut()
                this.props.history.push('/login');        
            },
            onCancel: () => {
                return;
            },
        });
      }

    handleLogOut = () => {
        this.showConfirm();
    }
    
    render() {

        // console.log(this.props.history.location);

        return (

            <Layout style={{ height: '100vh' }}>
                <Sider
                    style={{ overflow: 'auto', height: '100%', position: 'relative', left: 0 }}
                    trigger={null}
                    collapsible
                    collapsed={this.props.collapsed}
                >
                    <div className="row logo  align-self-center"  >
                        <a className={this.props.collapsed?'d-flex':'d-flex ml-3'}>
                            <img
                                alt="Logo"    
                                className={this.props.collapsed?'ml-2':''}
                                src={Logo} 
                                style={{height:'32px', width:'32px'}}
                            />
                            <div className={this.props.collapsed?'d-none':''}>
                                <p style={{textDecoration: 'none'}}className="ml-2 text-light lead">CareWare</p>
                            </div>
                        </a>
                    </div>

                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.menu]} onSelect={this.select}>
                        
                        <SubMenu key="0" title={<span><Icon type="mail" /><span>Orders</span></span>}>    
                            <Menu.Item key="/allOrders">
                                <Icon type="user" />
                                <span className="text-light"> All Order</span>
                            </Menu.Item>
    
                            <Menu.Item key="/addOrder" >
                                <Icon type="user" />
                                <span className="text-light"> New Order</span>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="/allUsers">
                            <Icon type="user" />
                            <span>Users</span>
                        </Menu.Item>

                        <Menu.Item key="/managePartners">
                            <Icon type="user" />
                            <span className="text-light"> Partners</span>
                        </Menu.Item>
                        
                        <Menu.Item key="/allMedicines">
                            <Icon type="upload" />
                            <span>Medicines</span>
                        </Menu.Item>
                    </Menu> 
                </Sider>
                <Layout style={{ position: 'relative', width: '100vw' }}>
             
                    <Header style={{ background: '#02152a', position: 'fixed', zIndex: 1, width: '100%'}}>
                      <Menu
                       theme="dark"
                       mode="horizontal"
                       style={{ lineHeight: '64px', float: 'left', border: 'none' }}
                       >
                        <Icon
                            style={{ float: 'left' }}
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        </Menu>

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            // defaultSelectedKeys={['2']}
                            style={{ positon:'fixed',lineHeight: '64px', float: 'right', border: 'none', paddingRight: this.props.collapsed ? '100px' : '200px' }}
                        >   
                            <div 
                                className="logoutDiv"
                                onClick={this.handleLogOut}
                            >
                                <p 
                                    className="mr-2 h5 d-inline mt-2"
                                >
                                    Log Out
                                </p>
                                <Icon
                                    style={{ position: 'relative', float: 'right', fontSize: '32px', cursor: 'pointer', paddingTop: '15px' }}
                                    className="logOut d-inline"
                                    type={'logout'}
                                />
                            </div>
                            
                            {/* <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3" onClick={ this.handleLogOut }>{ this.props.loggedIn ? 'Log Out' : 'LogIn' }</Menu.Item> */}
                        </Menu>
                    </Header>
             

                    <Content style={{ margin: '80px 16px 24px 16px', padding: 24, background: '#fff'}}>
                        {this.props.children}
                    
                    </Content>
                </Layout>
            </Layout>

        )
    }
}

const mapStateToProps = state => {
    // console.log(state.AppState);
    return {
        loggedIn: state.AppState.loggedIn,
        menu: state.AppState.menu,
        collapsed: state.AppState.collapsed,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch({type: AUTH_LOGOUT}),
        resetOrderDetail: () => dispatch({type: RESET_ORDER_DETAIL}),
        // deleteMedicineFromMedicineList: (id) => dispatch({type: DELETE_MEDICINE_FROM_LIST, id:id}),
        changeMenu: (key) => dispatch({type: MENU_CHANGE, key:key}),
        toggelMenu: () => dispatch({type: TOGGLE_MENU}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
