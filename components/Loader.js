import React from 'react'
import ReactLoading from 'react-loading'

const Loader = () => {
  return (
    <div>
      <ReactLoading
        type={'spin'}
        color={'#fbc02d'}
        height={'65px'}
        width={'65px'}
        className="loading"
      />
      <div className="loadingOverlay" />
    </div>
  )
}

export default Loader
