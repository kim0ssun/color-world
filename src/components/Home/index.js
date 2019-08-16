import React, { useState, useEffect } from 'react'
import firebase from '../Firebase';

export default props => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('works')
      .onSnapshot(snapshot => {
        setData(snapshot.docs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <ul>
        {data && data.map(doc => {
          const { id, title, url, description, categories } = doc.data(); 

          return (
            <li key={id}>
              {`${title}/${description}`}
            </li>
          )
        })}
      </ul>
    </div>
  );
}