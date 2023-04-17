import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import SiriusTooltip from '../components/SiriusTooltip';
import SiriusLed from '../components/SiriusLed';
import SiriusLabel from '../components/SiriusLabel';

describe('Sirius Tooltip', () => {
  it("Component renders", async () => {
    await act(async () => {
      render(
        <SiriusTooltip text="Test tooltip">
          This is a test
        </SiriusTooltip>
      );
    });

    const element = screen.getByText(/This is a test/i);
    expect(element).toBeInTheDocument();
  })

  it('Hover is working', async () => {
    const hover_txt: string = "Test tooltip";

    await act(async () => {
      render(
        <SiriusTooltip text={hover_txt}>
          <div aria-label="element">Element</div>
        </SiriusTooltip>
      );
    });

    fireEvent.click(screen.getByText(/Element/i), {button: 1});
    expect(screen.getByText(hover_txt)).toBeInTheDocument();
  })
})

describe('Sirius Led', () => {
  it("Component renders", async () => {
    await act(async () => {
      render(
        <SiriusLed
          pv_name="A:RANDOM:PV"
          shape={'circle'}
          threshold={{}}/>
      );
    });

    const element = screen.getByTestId("sirius-led");
    expect(element).toBeInTheDocument();
  })
})

describe('Sirius Label', () => {
  it("Component renders", async () => {
    await act(async () => {
      render(
        <SiriusLabel pv_name={'A:RANDOM:PV'} precision={3} egu='m'/>
      );
    });

    const element = screen.getByTestId("sirius-label");
    expect(element).toBeInTheDocument();

    expect(element).toHaveTextContent('m');
  })
})
