import { Button, Form, Input, InputNumber, Select, Switch, message } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useGetApi, useFormPostApi } from "./utils/hooks/useApi";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 18 },
};

const StyledForm = styled(Form)`
  margin: 0px;
  width: 500px;
`;

const Text = styled.span`
  color: white;
`;
const SectionTitle = styled.h1`
  color: white;
`;

const Settings = () => {
  const [currentConfig, loading, loadFn] = useGetApi("/read-config", false);
  const [, updateFn] = useFormPostApi("/update-config", () =>
    message.success("サーバーを再起動しました", 3)
  );
  const [, resetFn] = useFormPostApi("/reset-config", () =>
    message.success("設定を初期化しました。", 3)
  );
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickBackButton = useCallback(() => history.push("/"), []);
  const onFinish = useCallback((value) => {
    console.log(value);
    const params = { ...value };
    updateFn(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onReset = useCallback(() => {
    resetFn();
    loadFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Button type="primary" htmlType="submit" onClick={onClickBackButton}>
        戻る
      </Button>
      {loading ? (
        <SectionTitle>読み込み中...</SectionTitle>
      ) : (
        <Forms currentConfig={currentConfig} onFinish={onFinish} />
      )}
      <Button type="primary" htmlType="submit" onClick={onReset}>
        設定をデフォルトに戻す
      </Button>
    </>
  );
};

const Forms = ({ currentConfig, onFinish }) => (
  <StyledForm
    name="validate_other"
    {...formItemLayout}
    onFinish={onFinish}
    initialValues={currentConfig}
  >
    <SectionTitle>サーバー</SectionTitle>
    <Form.Item label={<Text>実行間隔</Text>}>
      <Form.Item name="main_loop_wait">
        <InputNumber min={0.0} max={20.0} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>ホスト名</Text>}>
      <Form.Item name="host">
        <Input />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>ポート番号</Text>}>
      <Form.Item name="port">
        <InputNumber min={1} max={20000} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>PLC ホスト名</Text>}>
      <Form.Item name="plc_host">
        <Input />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>PLC ポート番号</Text>}>
      <Form.Item name="plc_port">
        <InputNumber min={1} max={20000} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>PLC タイムアウト</Text>}>
      <Form.Item name="plc_timeout">
        <InputNumber min={1} max={20000} />
      </Form.Item>
    </Form.Item>
    <Form.Item name="plc_enable" label={<Text>PLC 有効</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>

    <SectionTitle>Realsense</SectionTitle>
    <Form.Item
      name="rgb_calibration"
      label={<Text>RGB画像キャリブレーション</Text>}
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
    <Form.Item label={<Text>X軸 加速度 最大値</Text>}>
      <Form.Item name="accel_max_x">
        <InputNumber min={5} max={20} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>Y軸 加速度 最大値</Text>}>
      <Form.Item name="accel_max_y">
        <InputNumber min={5} max={20} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>Z軸 加速度 最大値</Text>}>
      <Form.Item name="accel_max_z">
        <InputNumber min={5} max={20} />
      </Form.Item>
    </Form.Item>
    <SectionTitle>座標検知</SectionTitle>
    <Form.Item name="depth_input" label={<Text>深度入力</Text>} hasFeedback>
      <Select placeholder="Please select a device">
        <Option value="terabee">TeraBee</Option>
        <Option value="depth_camera">Realsense Depth Camera</Option>
      </Select>
    </Form.Item>
    <Form.Item name="tta" label={<Text>TTA（精度向上）</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item name="use_sample" label={<Text>サンプル画像を使用</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item name="reverse_xy" label={<Text>X軸とY軸を反転</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item name="reverse_x" label={<Text>X軸を反転</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item name="reverse_y" label={<Text>Y軸を反転</Text>} valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item
      name="convert_dimension"
      label={<Text>基準ブロックを使用して座標変換</Text>}
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
    <Form.Item label={<Text>座標値の倍率</Text>}>
      <Form.Item name="pos_rate">
        <InputNumber min={1} max={10000} />
      </Form.Item>
    </Form.Item>
    <Form.Item label={<Text>姿勢値の倍率</Text>}>
      <Form.Item name="angle_rate">
        <InputNumber min={1} max={10000} />
      </Form.Item>
    </Form.Item>
    <Form.Item
      name="write_point_with_2word"
      label={<Text>書き込みに2レジスタを使用</Text>}
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
    <SectionTitle>その他</SectionTitle>

    <Form.Item label={<Text>プレビューの点サイズ</Text>}>
      <Form.Item name="preview_point_size">
        <InputNumber min={1} max={10} />
      </Form.Item>
    </Form.Item>

    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
      <Button type="primary" htmlType="submit" onClick={onFinish}>
        適応 & サーバーを再起動
      </Button>
    </Form.Item>
  </StyledForm>
);

export default Settings;
