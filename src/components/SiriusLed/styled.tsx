import styled from "styled-components";
import { LedStatus } from "../../assets/interfaces";

const LedWrapper = styled.div`
    width: 1vh;
    height: 1vh;
    background: ${(props: LedStatus<string>) =>
        props.color};
    ${(props: LedStatus<string>) =>
        props.shape};
    border: outset 0.15em;
    padding: 0.2em;
`

export {
    LedWrapper
}
