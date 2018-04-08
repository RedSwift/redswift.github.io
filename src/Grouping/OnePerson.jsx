import React from 'react';

export default ({image}) => {
  if (image) {
    const photo = image.src ? <img className="one-image" src={image.src} alt='person' /> : null;
    const age = image['Age'] ? <span className="person-age">{image['Age']}</span> : null;
    const gender = image['Gender'] ? <span className="person-gender">{image['Gender']}</span> : null;
    const church = image['Church'] ? <span className="person-church">{image['Church']}</span> : null;
    const comments = image['Comments'] ? <span className="person-comments">{image['Comments']}</span> : null;

    return (
      <div className="one-person">
        <div className="info-container">
          <div className="image-container">
            {photo}
          </div>
          <div className="person-info">
            <span className="person-name">{image['Name']}</span><br/>
            {age}
            {gender}<br/>
            {church}<br/><br/>
            {comments}
          </div>
        </div>
      </div>
    )
  }

  return <div className="one-person"></div>
}