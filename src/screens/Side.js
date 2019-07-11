import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Side extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu mode="inline" defaultSelectedKeys={[this.props.tab]} style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="1" onClick={() => this.props.history.push("/movimientos")}>
                        <Icon type="swap" />
                        <span>Movimientos</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => this.props.history.push("/orden")}>
                        <Icon type="inbox" />
                        <span>Nueva Orden</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => this.props.history.push("/ventas")}>
                        <Icon type="file-done" />
                        <span>Ventas</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
