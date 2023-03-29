import React, { useState } from "react";
import { usePopper } from "react-popper";
import { PvTooltipInterface } from "../../assets/interfaces";
import * as S from './styled';

/**
 * Tooltip to verify the name of the PV being displayed.
*/
const SiriusTooltip: React.FC<PvTooltipInterface> = (props) => {
  const [state, setState] = useState<boolean>(false);
  const [ancEl, setAncEl] = useState<any>(null);
  const [popEl, setPopEl] = useState<any>(null);
  const { styles, attributes } = usePopper(ancEl, popEl);

  const openTooltip = ( event: React.MouseEvent) => {
    if( event.button === 1 ) {
      setState(true);
    }
  }

  const closeTooltip = () => {
    setState(false);
  }

  return (
    <div
      onMouseDown={openTooltip}
      onMouseUp={closeTooltip}
      onMouseLeave={closeTooltip}>
        <S.TooltipText
          ref={setPopEl}
          value={state}
          style={styles.popper}
          {...attributes.popper}
         >
            {props.text}
        </S.TooltipText>
        <span ref={setAncEl}>
          {props.children}
        </span>
    </div>
  )
};

export default SiriusTooltip;
