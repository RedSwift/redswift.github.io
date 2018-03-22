import React from 'react';
import OnePerson from './OnePerson';

export default ({firstImage, secondImage}) => {
  return (
    <div className="one-row">
      <OnePerson image={firstImage} />
      <OnePerson image={secondImage} />
    </div>
  );
}