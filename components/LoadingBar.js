import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#ffca28',
  },
  barColorPrimary: {
    backgroundColor: '#ffb300',
  },
})(LinearProgress)

class LoadingBar extends React.Component {
render () {
    return (
      <ColorLinearProgress />
    )
  }
}

export default LoadingBar
