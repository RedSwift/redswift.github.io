import React from 'react';

export default ({image}) => {
  if (image)
    return (
      <div className="one-person">
        <div className="info-container">
          <img className="one-image" src={image.src} alt="person" />
          <span className="person-name">{image.name}</span>
        </div>
      </div>
    )
  return <div className="one-person"></div>
}