import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const MyStyle = styled.div`
    color: ${props => props.color};
`;

const Component3 = ({ data, actions }) => {
    return (
        <MyStyle color={data.color}>This is component 3 that might get overriden:
            <Button onClick={actions.action2}>Trigger action2</Button>
            {data.text}
        </MyStyle>
    )
}

export default Component3;