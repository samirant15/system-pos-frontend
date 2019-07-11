import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Card, Table, DatePicker, Divider, Button, Select, Row, Col, InputNumber, Form, Icon } from 'antd';
import Axios from 'axios';
const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider } = Layout;

export default class Ventas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            fecha: '',
            almacenes: [],
            almacen: '',
            articulo: null,
            cantidad: 1,
            articulosModelos: [],
            articulosSeleccionados: []
        }
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAlm = this.handleChangeAlm.bind(this);
        this.agregarArticulo = this.agregarArticulo.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    async componentDidMount() {
        try {
            let articulos = await Axios.get('http://localhost:9000/articles');
            let almacenes = await Axios.get('http://localhost:9000/stores');
            this.setState({ articulosModelos: articulos.data, almacenes: almacenes.data })
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onChangeDate(date, dateString) {
        this.setState({ fecha: dateString })
    }

    handleChange(value) {
        this.setState({ selectedId: value })
        console.log(`selected ${value}`);
    }

    handleChangeAlm(value) {
        let almacen = this.state.almacenes.find(alm => alm.id == value)
        this.setState({ almacen: almacen })
        console.log(`selected ${value}`);
    }

    agregarArticulo() {
        let articulo = this.state.articulosModelos.find(art => art.id == this.state.selectedId)
        this.state.articulosSeleccionados.push({ ...articulo, quantity: this.state.cantidad })
        this.setState({ articulosSeleccionados: this.state.articulosSeleccionados })
    }


    render() {
        const columns = [
            {
                title: 'Código',
                dataIndex: 'code',
                key: 'code',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Articulo',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Descripción',
                dataIndex: 'description',
                key: 'description',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Cantidad',
                dataIndex: 'quantity',
                key: 'quantity',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Unidad',
                dataIndex: 'unity',
                key: 'unity',
                render: text => <a>{text}</a>,
            },
        ];

        const data = this.state.articulosSeleccionados;
        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <h1 style={{ color: "#fff" }}>TAREA TECNOLOGÍAS EMERGENTES</h1>
                    </Header>
                    <Layout>
                        <Side tab={'3'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Row>
                                <h1>NUEVA VENTA</h1>
                            </Row>
                            <Divider dashed />
                            <Row>
                                <Col span={11}>
                                    <Card style={{ height: 500 }}>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item label="Fecha">
                                                    <DatePicker onChange={this.onChangeDate} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <div style={{ float: 'right' }}>
                                                    <Form.Item label="Almacen">
                                                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                                                            {this.state.almacenes.length > 0 ? this.state.almacenes.map((alm, i) => <Option key={i} value={alm.id}>{alm.name}</Option>) : null}
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <h3>Agregar articulo:</h3>
                                            <Card>
                                                <Row>
                                                    <Col span={8}>
                                                        <Form.Item label="Articulo">
                                                            <Select
                                                                showSearch
                                                                style={{ width: 200 }}
                                                                placeholder="Seleccionar articulo"
                                                                onChange={this.handleChange}
                                                                filterOption={(input, option) =>
                                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                {this.state.articulosModelos.length > 0 ? this.state.articulosModelos.map((art, i) => <Option key={i} value={art.id}>{art.name}</Option>) : null}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Form.Item label="Cantidad">
                                                            <InputNumber name="quantity" min={1} max={999} defaultValue={1} onChange={(e) => this.setState({ cantidad: e })} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Form.Item label=" ">
                                                            <Button style={{ float: 'right' }} type="primary" icon="plus" onClick={this.agregarArticulo}>Agregar</Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col span={2} style={{ height: 500 }}>
                                    <Icon style={{ fontSize: 50, width: '100%', marginTop: 200 }} type="arrow-right" />
                                </Col>
                                <Col span={11}>
                                    <Card style={{ height: 500 }}>
                                        <h3>Articulos seleccionados:</h3>
                                        <Table style={{ borderWidth: 1, borderRadius: 5, borderStyle: 'solid' }} columns={columns} dataSource={data} />
                                    </Card>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Button style={{ float: 'right' }} type="primary" icon="check-circle">Realizar Orden</Button>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
