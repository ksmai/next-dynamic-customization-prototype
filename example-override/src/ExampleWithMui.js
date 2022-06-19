import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styled from '@emotion/styled';

const MyStyledComponent = styled.h5`
    color: ${props => props.color};
`;

const ExampleWithMui = ({ data, actions }) => {
  const [count, setCount] = useState(data.count);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <MyStyledComponent color={data.color}>{data.title}</MyStyledComponent>
        <Typography variant="body2">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={actions.action2}>Trigger action2</Button>
        <Button size="small" onClick={() => setCount(c => c + 1)}>increment me! {count}</Button>
      </CardActions>
    </Card>
  );
};

export default ExampleWithMui;