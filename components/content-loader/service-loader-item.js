import React from 'react'
import ContentLoader from 'react-content-loader'

class ServiceLoader extends React.Component {
  render() {
    return (
      <div className="service">
      <div className="service__item">
        <div className="service__cover" style={{ width: `100%` }}>
          <ContentLoader 
            height={180}
            width={240}
            speed={2}
            primaryColor="#d9d9d9"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="12" ry="12" width="240" height="210" /> 
            <rect x="0" y="180" rx="0" ry="0" width="240" height="30" />
          </ContentLoader>
          <div className="service__name">
            <ContentLoader 
              height={30}
              width={240}
              speed={2}
              primaryColor="#a3a0a0"
              secondaryColor="#969595"
            >
              <rect x="0" y="0" rx="8" ry="8" width="240" height="20" />
            </ContentLoader>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default ServiceLoader
