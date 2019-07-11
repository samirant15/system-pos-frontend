import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag, Select, Row, Col } from 'antd';
import Axios from 'axios';
const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider } = Layout;

export default class Movimientos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            almacenes: [],
            almacen: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            let almacenes = await Axios.get('http://rayito88.lorexddns.net:9000/stores');
            this.setState({ almacenes: almacenes.data })
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    handleChange(value) {
        this.setState({ selectedId: value })
        console.log(`selected ${value}`);
    }

    render() {
        const columns = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Artículo',
                dataIndex: 'articulo',
                key: 'articulo',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Cantidad',
                dataIndex: 'cantidad',
                key: 'cantidad',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Unidad',
                dataIndex: 'unidad',
                key: 'unidad',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Tipo',
                key: 'tipo',
                dataIndex: 'tipo',
                render: text => {
                    return <Tag color={text == 'entrada' ? 'green' : 'volcano'} key={text}>{text.toUpperCase()}</Tag>
                }
            },
        ];

        const data = [
            {
                codigo: 1,
                articulo: 'PC',
                cantidad: 100,
                unidad: 'computadoras',
                tipo: 'entrada'
            }
        ];
        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <h1 style={{ color: "#fff" }}>TAREA TECNOLOGÍAS EMERGENTES</h1>
                    </Header>
                    <Layout>
                        <Side tab={'1'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Row>
                                <h1>MOVIMIENTOS</h1>
                            </Row>
                            <Divider dashed />
                            <Row style={{ marginBottom: 5 }}>
                                <div style={{ float: 'right' }}>
                                    <h3>Almacen:</h3>
                                    <Select style={{ width: 120 }} onChange={this.handleChange}>
                                        {this.state.almacenes.length > 0 ? this.state.almacenes.map((alm, i) => <Option key={i} value={alm.id}>{alm.name}</Option>) : null}
                                    </Select>
                                </div>
                            </Row>
                            <Row>
                                <Table style={{ borderWidth: 1, borderRadius: 5, borderStyle: 'solid' }} columns={columns} dataSource={data} />
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}