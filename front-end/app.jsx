import React from 'react';
import { connect } from 'dva';
import { Card, Form, Select, Button } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const tip = '请选择';

@connect(state => state)
@Form.create()
export default class App extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'eto/getDate' });
  }

  handleSubmit() {}

  render() {
    const { form, eto } = this.props;
    const { date } = eto;

    if (!date || date.length === 0) return <h1>loading...</h1>;

    const { getFieldDecorator, getFieldsValue } = form;
    const { target, source } = getFieldsValue(['target', 'source']);
    const unselected = target === source || target === tip || source === tip;

    return (
      <Card>
        <Form layout="inline">
          <FormItem label="目标">
            {getFieldDecorator('target', { initialValue: tip, rules: [{ required: true }] })(
              <Select style={{ width: 180 }}>
                {date.map(x => <Option key={x}>{moment(x).format('YYYY-MM-DD HH:mm')}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem label="对比">
            {getFieldDecorator('source', { initialValue: tip, rules: [{ required: true }] })(
              <Select style={{ width: 180 }}>
                {date.map(x => <Option key={x}>{moment(x).format('YYYY-MM-DD HH:mm')}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" disabled={unselected}>
              查询
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
