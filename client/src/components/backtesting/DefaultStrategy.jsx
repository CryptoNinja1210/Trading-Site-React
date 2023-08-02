import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const DefaultStrategy = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div className="container-fluid">
      <h1>DefaultStrategy Page</h1>
      <h4>{name}</h4>
    </div>
  );
};

export default DefaultStrategy;