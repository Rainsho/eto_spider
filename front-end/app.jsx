import React from 'react';
import { connect } from 'dva';
import { Card, Form, Select, Button, Table, Icon } from 'antd';
import moment from 'moment';
import find from 'lodash/find';

const FormItem = Form.Item;
const { Option } = Select;
const tip = '请选择';

const getTarget = (record, source) => {
  const src = find(source, { address: record.address });
  return (src || '-') && `${parseFloat(src.percentage).toFixed(4)}%`;
};

const getDiffer = (record, source) => {
  const { address, percentage } = record;
  const src = find(source, { address });

  if (!src) return <Icon type="flag" />;
  if (percentage === src.percentage) return <Icon type="swap" />;
  if (percentage > src.percentage) return <Icon type="arrow-up" />;
  return <Icon type="arrow-down" />;
};

@connect(({ eto, loading }) => ({
  eto,
  loading: loading.effects['eto/getEtos'],
}))
@Form.create()
export default class App extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'eto/getDate' });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, val) => {
      if (err) return;

      const { target, source } = val;

      this.props.dispatch({ type: 'eto/getEtos', payload: [target, source] });
    });
  };

  handleChange = time => {
    if (!this.props.eto.etos[time]) {
      this.props.dispatch({ type: 'eto/getEtos', payload: [time] });
    }
  };

  render() {
    const { form, eto, loading } = this.props;
    const { date, etos } = eto;

    if (!date || date.length === 0) return <h1>loading...</h1>;

    const { getFieldDecorator, getFieldsValue } = form;
    const { target, source } = getFieldsValue(['target', 'source']);
    const unselected = target === source || target === tip || source === tip;

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        render: (val, record, index) => index + 1,
      },
      {
        title: 'address',
        dataIndex: 'address',
      },
      {
        title: 'target',
        dataIndex: 'percentage',
        render: val => `${parseFloat(val).toFixed(4)}%`,
      },
      {
        title: 'source',
        key: 'source',
        render: (_, record) => getTarget(record, etos[source]),
      },
      {
        title: 'trends',
        key: 'trends',
        render: (_, record) => getDiffer(record, etos[source]),
      },
    ];

    return (
      <Card bordered={false}>
        <h1>Hello, persy</h1>
        <Form layout="inline" style={{ marginBottom: 12 }} onSubmit={this.handleSubmit}>
          <FormItem label="目标">
            {getFieldDecorator('target', { initialValue: tip, rules: [{ required: true }] })(
              <Select style={{ width: 180 }} onChange={this.handleChange}>
                {date.map(x => <Option key={x}>{moment(x).format('YYYY-MM-DD HH:mm')}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem label="对比">
            {getFieldDecorator('source', { initialValue: tip, rules: [{ required: true }] })(
              <Select style={{ width: 180 }} onChange={this.handleChange}>
                {date.map(x => (
                  <Option key={x} disabled={target == x}>
                    {moment(x).format('YYYY-MM-DD HH:mm')}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={unselected}>
              查询
            </Button>
          </FormItem>
        </Form>
        <Table
          rowKey="id"
          loading={loading}
          pagination={false}
          dataSource={etos[target] && etos[source] ? etos[target] : []}
          columns={columns}
        />
      </Card>
    );
  }
}
