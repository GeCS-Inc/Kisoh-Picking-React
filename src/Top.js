import AutoScroll from "@brianmcallister/react-auto-scroll";
import { Button, Input } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInterval from "use-interval";
import { useGetApi, usePostApi } from "./utils/hooks/useApi";

const Row = styled.div`
  display: flex;
`;

const Preview = styled.div`
  margin: 20px;
`;
const PreviewImg = styled.img`
  width: 400px;
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

  const [plcReadMes, loadPlcReadMes] = usePostApi("/read-plc", {
    device_number: plcReadDN,
    device_count: plcReadDC,
  });

  const [plcWriteMes, loadPlcWriteMes] = usePostApi("/write-plc", {
    device_number: plcWriteDN,
    device_count: plcWriteDC,
    write_content: plcWriteWC,
  });

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
          <PreviewImg src={`data:image/jpeg;base64,${inputImg}`} />
        </Preview>
        <Preview>
          <p>処理結果</p>
          <PreviewImg src={`data:image/jpeg;base64,${outputImg}`} />
        </Preview>
        <Preview>
          <p>深度</p>
          <PreviewImg src={`data:image/jpeg;base64,${depthImg}`} />
        </Preview>
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
