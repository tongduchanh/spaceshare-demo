import React from 'react'
import ContentLoader from 'react-content-loader'

const LoadingItem = () => (
  <ContentLoader 
    height={380}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="5" rx="8" ry="8" width="400" height="220" /> 
    <rect x="0" y="245" rx="5" ry="5" width="400" height="20" /> 
    <rect x="0" y="285" rx="5" ry="5" width="300" height="20" /> 
    <rect x="0" y="325" rx="5" ry="5" width="200" height="20" />
  </ContentLoader>
)

LoadingItem.metadata = {
  name: 'RJavlonbek',
  github: 'RJavlonbek',
  description: 'BlogItem',
  filename: 'BlogItem',
}

export default LoadingItem
