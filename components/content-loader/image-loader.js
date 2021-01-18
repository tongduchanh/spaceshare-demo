import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
  <ContentLoader 
    height={300}
    width={450}
    speed={2}
    primaryColor="#e6e6e6"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="450" height="300" />
  </ContentLoader>
)

export default MyLoader
