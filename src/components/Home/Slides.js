import React, {  useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import './index.css';

const slides = [
  { id: 0, url: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F13.JPG?alt=media&token=97e5f20e-7f9a-46db-a81b-e55a9693e2a7' },
  { id: 1, url: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F4.JPG?alt=media&token=db286324-e5b7-4e6e-bd39-c034eb3586c3' },
  { id: 2, url: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F1.JPG?alt=media&token=2041ac23-22b6-46fe-a18c-c27a378d070f' },
];

export default () => {
  const [index, set] = useState(0);
  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })

  useEffect(() => {
    const interval = setInterval(() => set(state => (state + 1) % 3), 3000);

    return () => clearInterval(interval);
  }, []);

  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      class="bg"
      style={{ ...props, backgroundImage: `url(${item.url})`}}
    >
    </animated.div>
  ))
}

// `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`