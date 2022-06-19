import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const input = "src/index.js";

export default [
  {
    input,
    output: {
        file: '../docs/overrides1.js',
        name: 'components',
        format: "iife",
        sourcemap: false,
        globals: {
            'react': 'React',
            '@emotion/styled': 'styled',
            '@mui/material/Card': 'Card',
            '@mui/material/CardActions': 'CardActions',
            '@mui/material/CardContent': 'CardContent',
            '@mui/material/Button': 'Button',
            '@mui/material/Typography': 'Typography',
        },
    },
    plugins: [
        resolve(),
        commonjs({ include: /node_modules/ }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/env', '@babel/preset-react']
        })
    ],
    external: [
        'react',
        '@emotion/styled',
        '@mui/material/Card',
        '@mui/material/CardActions',
        '@mui/material/CardContent',
        '@mui/material/Button',
        '@mui/material/Typography',
    ],
  },
];