import AutoScroll from "@brianmcallister/react-auto-scroll";
import { Button, Input, Space, Typography, InputNumber, Modal } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInterval from "use-interval";
import { useGetApi, usePostApi, useFormPostApi } from "./utils/hooks/useApi";
import sampleImg from "./resources/sample.png";
import { Switch } from "antd";

const { confirm } = Modal;

const Row = styled.div`
  display: flex;
`;

const Preview = styled.div`
  margin: 20px;
`;
const PreviewImg = styled.img`
  width: 384px;
  height: 384px;
`;

const Position = styled.pre`
  margin: 20px;
  font-size: 14px;
  background-color: #0e121a;
  text-align: left;
  padding: 32px;
`;

const StyledAutoScroll = styled(AutoScroll)`
  margin: 20px;
`;

const Log = styled.pre`
  margin: 0px;
  font-size: 12px;
  background-color: #0e121a;
  text-align: left;
  padding: 32px;
`;

const SubTitle = styled.p`
  font-size: 18px;
`;

const useToggleState = (s) => {
  const [state, setState] = useState(s);
  const onChange = useCallback(() => setState(!state), [state]);
  return [state, onChange];
};
const useInputState = (s) => {
  const [state, setState] = useState(s);
  const onChange = useCallback((v) => setState(v), []);
  return [state, onChange];
};

const Top = () => {
  const [log, , readLogFn] = useGetApi("/read-log");
  const [position, , readPositionFn] = useGetApi("/read-result");
  const [inputImg, , readInputImgFn] = useGetApi("/read-input-img");
  const [outputImg, , readOutputImgFn] = useGetApi("/read-output-img");
  const [depthImg, , readDepthImgFn] = useGetApi("/read-depth-img");
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickSettingsButton = useCallback(() => history.push("/settings"), []);

  const [plcReadDN, setPlcReadDN] = useState("");
  const [plcReadDC, setPlcReadDC] = useState("");
  const [plcWriteDN, setPlcWriteDN] = useState("");
  const [plcWriteDC, setPlcWriteDC] = useState("");
  const [plcWriteWC, setPlcWriteWC] = useState("");

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [rectifyMode, , loadRectifyMode] = useGetApi("/get-rectify-mode", false);
  const [rectifyX, handleChangeRectifyX] = useInputState(0);
  const [rectifyY, handleChangeRectifyY] = useInputState(0);

  const [plcReadMes, loadPlcReadMes] = usePostApi("/read-plc", {
    device_number: plcReadDN,
    device_count: plcReadDC,
  });

  const [plcWriteMes, loadPlcWriteMes] = usePostApi("/write-plc", {
    device_number: plcWriteDN,
    device_count: plcWriteDC,
    write_content: plcWriteWC,
  });

  const [testPointResult, writeTestPoint] = usePostApi("/write_test_point", {
    x,
    y,
  });
  const [, setRectifyMode] = usePostApi(
    "/set-rectify-mode",
    {
      mode: !rectifyMode,
    },
    loadRectifyMode
  );
  const [, writeRectifyParams] = usePostApi("/write-rectify-params", {
    x: rectifyX,
    y: rectifyY,
  });
  const [, resetRectifyParams] = usePostApi("/reset-rectify-params");

  const confirmResetRectifyParams = useCallback(
    () =>
      confirm({
        title: "補正の設定データを削除してもよろしいですか？",
        content: "保存した補正データがすべて削除されます。",
        onOk: resetRectifyParams,
      }),
    []
  );

  const inputImgSrc = inputImg.length > 0 ? `data:image/jpeg;base64,${inputImg}` : sampleImg;
  const outputImgSrc = outputImg.length > 0 ? `data:image/jpeg;base64,${outputImg}` : sampleImg;
  const depthImgSrc = depthImg.length > 0 ? `data:image/jpeg;base64,${depthImg}` : sampleImg;

  const onMouseMove = useCallback((e) => {
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  }, []);

  const intervalFn = () => {
    readLogFn();
    readPositionFn();
    readInputImgFn();
    readOutputImgFn();
    readDepthImgFn();
  };

  useEffect(intervalFn, []);
  useInterval(intervalFn, 3000);
  return (
    <>
      <Button type="primary" onClick={onClickSettingsButton}>
        設定ページへ
      </Button>
      <Row>
        <Preview>
          <p>入力画像</p>
          <SubTitle> {"　"} </SubTitle>
          <PreviewImg src={inputImgSrc} onMouseMove={onMouseMove} onClick={writeTestPoint} />
          <SubTitle> {"　"} </SubTitle>
        </Preview>
        <Preview>
          <p>処理結果</p>
          <SubTitle>クリックでテストレジスタに座標書き込み</SubTitle>
          <PreviewImg src={outputImgSrc} onMouseMove={onMouseMove} onClick={writeTestPoint} />
          {testPointResult.split("\n").map((s) => (
            <SubTitle>{s}</SubTitle>
          ))}
        </Preview>
        <Preview>
          <p>深度</p>
          <SubTitle> {"　"} </SubTitle>
          <PreviewImg src={depthImgSrc} onMouseMove={onMouseMove} onClick={writeTestPoint} />
          <SubTitle> {"　"} </SubTitle>
        </Preview>
      </Row>
      <Row>
        <pre>
          x: {x}, y: {y}
        </pre>
      </Row>
      <Row>
        <Space align="center">
          位置補正モード
          <Switch
            defaultChecked
            checked={rectifyMode}
            onChange={() => {
              setRectifyMode();
              console.log("asdfasdf");
            }}
          />
          x補正値:{" "}
          <InputNumber
            disabled={!rectifyMode}
            min={-500}
            max={500}
            value={rectifyX}
            onChange={handleChangeRectifyX}
          />
          y補正値:{" "}
          <InputNumber
            disabled={!rectifyMode}
            min={-500}
            max={500}
            value={rectifyY}
            onChange={handleChangeRectifyY}
          />
          <Button type="primary" disabled={!rectifyMode} onClick={writeRectifyParams}>
            書き込み
          </Button>
          <Button type="secondary" disabled={!rectifyMode} onClick={confirmResetRectifyParams}>
            設定をリセット
          </Button>
        </Space>
      </Row>
      <Row>
        <div>
          <p>座標</p>
          <Position>{position}</Position>
        </div>
        <div>
          <p>ログ</p>
          <StyledAutoScroll height="720px">
            <Log>{log}</Log>
          </StyledAutoScroll>
        </div>
      </Row>
      <p>PLC 読み込み</p>
      <Row>
        <Preview>
          <SubTitle>デバイス番号</SubTitle>
          <Input
            placeholder="1000"
            value={plcReadDN}
            onChange={(v) => setPlcReadDN(v.target.value)}
          />
        </Preview>
        <Preview>
          <SubTitle>デバイス数</SubTitle>
          <Input placeholder="3" value={plcReadDC} onChange={(v) => setPlcReadDC(v.target.value)} />
        </Preview>
      </Row>
      <Button type="primary" onClick={loadPlcReadMes}>
        読み込み
      </Button>
      <Log>{plcReadMes}</Log>

      <p style={{ paddingTop: 64 }}>PLC 書き込み</p>
      <Row>
        <Preview>
          <SubTitle>デバイス番号</SubTitle>
          <Input
            placeholder="1000"
            value={plcWriteDN}
            onChange={(v) => setPlcWriteDN(v.target.value)}
          />
        </Preview>
        <Preview>
          <SubTitle>デバイス数</SubTitle>
          <Input
            placeholder="3"
            value={plcWriteDC}
            onChange={(v) => setPlcWriteDC(v.target.value)}
          />
        </Preview>
        <Preview>
          <SubTitle>書き込み内容</SubTitle>
          <Input
            placeholder="10,11,23"
            value={plcWriteWC}
            onChange={(v) => setPlcWriteWC(v.target.value)}
          />
        </Preview>
      </Row>
      <Button type="primary" onClick={loadPlcWriteMes}>
        書き込み
      </Button>
      <Log>{plcWriteMes}</Log>
    </>
  );
};

export default Top;
