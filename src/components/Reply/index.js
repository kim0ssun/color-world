import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../Firebase';

export default props => {
  let { id, password } = useParams();

  useEffect(() => {

  }, []);

  return (
    <div>
      <p>{id}/{password}</p>
    </div>
  )
}