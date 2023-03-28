import styled from "styled-components";
import { StateBool } from "../assets/interfaces";

const TooltipText = styled.div`
    position: absolute;
    z-index: 10;
    text-align: center;
    background: #eeeeee;
    visibility: ${(props: StateBool)=>
        props.value?"visible":"hidden"};
    padding: 0.1em 0.25em;
    border-radius: 0.5em;
    border: 0.1em ridge #000000;
`

export {
    TooltipText
}
