import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Component1 = dynamic(() => import('../components/Component1'));
const Component2 = dynamic(() => import('../components/Component2'));
const Component3 = dynamic(() => import('../components/Component3'));

const useComponents = (overrideScript) => {
  const Components = useMemo(() => {
    const Components = {
      Component1,
      Component2,
      Component3,
    };

    if (!overrideScript) {
      return Components;
    }
    try {
      const fn = new Function('scope', `with(scope){${overrideScript};return components;}`);
      const Overrides = fn({ React, Card, CardActions, CardContent, Typography, Button, styled });
      return Object.assign(Components, Overrides);
    } catch (e) {
      console.error(e);
      return Components;
    }
  }, [overrideScript]);

  return Components;
}

export default useComponents;