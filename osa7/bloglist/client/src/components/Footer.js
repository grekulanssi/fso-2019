import React from 'react'

import Typography from '@material-ui/core/Typography'

const Footer = () => (
  <div className='footer'>
    <Typography variant='body1'>Blog App by <a href="http://github.com/grekulanssi/" target="_blank" rel="noopener noreferrer">@grekulanssi</a>.</Typography>
    <Typography variant='body1'>Made on <a href="https://fullstackopen.com/" target="_blank" rel="noopener noreferrer">Full Stack Open MOOC</a> by University of Helsinki, 2020.</Typography>
  </div>
)

export default Footer