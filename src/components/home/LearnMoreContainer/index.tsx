import { Typography } from '@material-ui/core';
import React from 'react'
import { ArrowDownCircle } from 'react-feather'
import Box from '@material-ui/core/Box';


function LearnMoreContainer(props:{onClick:()=>void}) {
    return (
      <Box className="flex items-center text-textTertiary cursor-pointer text-20 font-semibold mt-36 opacity-0 hover:opacity-60 transition-opacity">
        <Typography>Learn more</Typography>
        <ArrowDownCircle className="ml-14 w-20 h-20" />
      </Box>
    );
  };


  export default LearnMoreContainer
