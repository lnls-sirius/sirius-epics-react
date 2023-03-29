import React from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components'
import TooltipDoc from './tooltip'
import LedDoc from './led'
import LabelDoc from './label'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffa78b;
  margin-left: 2em;
  margin-top: 2em;
  padding: 1em;
  border-radius: 1em 0em 0em 1em;
`

const Title = styled.div`
  text-align: center;
  margin-top: 1em;
  font-weight: bold;
  font-size: 20px;
`

root.render(
  <React.StrictMode>
    <Title>EPICS React Components</Title>
    <Wrapper>
      <TooltipDoc/>
    </Wrapper>
    <Wrapper>
      <LedDoc/>
    </Wrapper>
    <Wrapper>
      <LabelDoc/>
    </Wrapper>
  </React.StrictMode>
)
