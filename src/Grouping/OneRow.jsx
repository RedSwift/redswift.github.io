import React from 'react';
import OnePerson from './OnePerson';

export default ({firstImage, secondImage, upsize}) => {
  return (
    <div className="one-row">
      <OnePerson image={firstImage} />
      <OnePerson image={secondImage} />
    </div>
  );
}