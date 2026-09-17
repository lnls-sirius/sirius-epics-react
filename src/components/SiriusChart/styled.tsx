import styled from "styled-components";

const Chart = styled.canvas`
  width: 100%;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  background: #eeeeee;
`

const Tooltip = styled.div`
  font-size: 15 px;
`

export {
  Chart,
  ChartWrapper,
  Tooltip
}