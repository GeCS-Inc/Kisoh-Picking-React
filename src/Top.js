import React, { useCallback } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

import InputImg from "./imgs/input.png";
import OutputImg from "./imgs/output.png";

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

const Log = styled.pre`
  margin: 20px;
  font-size: 12px;
  background-color: #0e121a;
  text-align: left;
  padding: 32px;
`;

const position = `
  (142, 191),(142, 191),
  (163, 193),(142, 191),
  (184, 192),(142, 191),
  (201, 195),(142, 191),
  (224, 194),(142, 191),
  (246, 196),(142, 191),
  (264, 194),(142, 191),
  (286, 192),(142, 191),
  (302, 193),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
  (325, 195),(142, 191),
`;

const log = `
Use GPU: 0 for training
BaseDataset: base_size 520, crop_size 480
DeepLabV3(
  (pretrained): ResNet(
    (conv1): Sequential(
      (0): Conv2d(3, 64, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
      (1): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      (2): ReLU(inplace=True)
      (3): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
      (4): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      (5): ReLU(inplace=True)
      (6): Conv2d(64, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
    )
    (bn1): SyncBatchNorm(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (relu): ReLU(inplace=True)
    (maxpool): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
    (layer1): Sequential(
      (0): Bottleneck(
        (conv1): Conv2d(128, 64, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn1): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv3): Conv2d(64, 256, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn3): SyncBatchNorm(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
        (downsample): Sequential(
          (0): Conv2d(128, 256, kernel_size=(1, 1), stride=(1, 1), bias=False)
          (1): SyncBatchNorm(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        )
      )
      (1): Bottleneck(
        (conv1): Conv2d(256, 64, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn1): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv3): Conv2d(64, 256, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn3): SyncBatchNorm(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
      )
      (2): Bottleneck(
        (conv1): Conv2d(256, 64, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn1): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
        (bn2): SyncBatchNorm(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (conv3): Conv2d(64, 256, kernel_size=(1, 1), stride=(1, 1), bias=False)
        (bn3): SyncBatchNorm(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (relu): ReLU(inplace=True)
      )
`;

const Top = () => {
  const history = useHistory();
  const onClickSettingsButton = useCallback(() => history.push("/settings"), []);
  return (
    <>
      <Button type="primary" onClick={onClickSettingsButton}>
        設定
      </Button>
      <Row>
        <Preview>
          <p>入力画像</p>
          <PreviewImg src={InputImg} />
        </Preview>
        <Preview>
          <p>処理結果</p>
          <PreviewImg src={OutputImg} />
        </Preview>
      </Row>
      <Row>
        <div>
          <p>座標</p>
          <Position>{position}</Position>
        </div>
        <div>
          <p>ログ</p>
          <Log>{log}</Log>
        </div>
      </Row>
    </>
  );
};

export default Top;
