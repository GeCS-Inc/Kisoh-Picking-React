import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
} from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const StyledForm = styled(Form)`
  margin: 40px;
`;

const Text = styled.span`
  color: white;
`;

const Settings = () => {
  const history = useHistory();
  const onClickBackButton = useCallback(() => history.push("/"), []);
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <>
      <Button type="primary" htmlType="submit" onClick={onClickBackButton}>
        戻る
      </Button>
      <StyledForm
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          ["input-number"]: 3,
          ["checkbox-group"]: ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item
          name="select"
          label={<Text>Select</Text>}
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a country">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="select-multiple"
          label={<Text>Select[multiple]</Text>}
          rules={[
            { required: true, message: "Please select your favourite colors!", type: "array" },
          ]}
        >
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<Text>InputNumber</Text>}>
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={10} />
          </Form.Item>
          <span className="ant-form-text">
            {" "}
            <Text>machines</Text>
          </span>
        </Form.Item>

        <Form.Item name="switch" label={<Text>Switch</Text>} valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="slider" label={<Text>Slider</Text>}>
          <Slider
            marks={{
              0: <Text>A</Text>,
              20: <Text>B</Text>,
              40: <Text>C</Text>,
              60: <Text>D</Text>,
              80: <Text>E</Text>,
              100: <Text>F</Text>,
            }}
          />
        </Form.Item>

        <Form.Item name="radio-group" label={<Text>Radio.Group</Text>}>
          <Radio.Group>
            <Radio value="a">
              <Text>item 1</Text>
            </Radio>
            <Radio value="b">
              <Text>item 2</Text>
            </Radio>
            <Radio value="c">
              <Text>item 3</Text>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="radio-button" label={<Text>Radio.Button</Text>}>
          <Radio.Group>
            <Radio.Button value="a">item 1</Radio.Button>
            <Radio.Button value="b">item 2</Radio.Button>
            <Radio.Button value="c">item 3</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="checkbox-group" label={<Text>Checkbox.Group</Text>}>
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="A" style={{ lineHeight: "32px" }}>
                  A
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="B" style={{ lineHeight: "32px" }} disabled>
                  B
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="C" style={{ lineHeight: "32px" }}>
                  C
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="D" style={{ lineHeight: "32px" }}>
                  D
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E" style={{ lineHeight: "32px" }}>
                  E
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="F" style={{ lineHeight: "32px" }}>
                  F
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="rate" label={<Text>Rate</Text>}>
          <Rate />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            適応
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  );
};

export default Settings;
