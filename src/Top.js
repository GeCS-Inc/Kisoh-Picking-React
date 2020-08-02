import React, { useCallback, useEffect } from "react";
import useInterval from 'use-interval';
import styled from "styled-components";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import AutoScroll from '@brianmcallister/react-auto-scroll';

import { useGetApi } from "./utils/hooks/useApi"

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
`

const Log = styled.pre`
  margin: 0px;
  font-size: 12px;
  background-color: #0e121a;
  text-align: left;
  padding: 32px;
`;

const Top = () => {
  const [log, readLogFn] = useGetApi("/read-log");
  const [position, readPositionFn] = useGetApi("/read-result");
  const [inputImg, readInputImgFn] = useGetApi("/read-input-img");
  const [outputImg, readOutputImgFn] = useGetApi("/read-output-img");
  const history = useHistory();
  const onClickSettingsButton = useCallback(() => history.push("/settings"), []);

  const intervalFn = () => {
    readLogFn();
    readPositionFn();
    readInputImgFn();
    readOutputImgFn();
  }

  useEffect(intervalFn, [])
  useInterval(intervalFn, 3000)
  return (
    <>
      <Button type="primary" onClick={onClickSettingsButton}>
        設定
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
    </>
  );
};

export default Top;
