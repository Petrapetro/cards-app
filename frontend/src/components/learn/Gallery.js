import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { animated, useTransition, config } from "react-spring";
import Card from './Card'
import "./gallery.css";



const Gallery = ({userId, cardSetId}) => {
/*   const [name, setName] = useState('') */
  const [cardSet, setCardSet] = useState([{text: '', flippedText:''}])

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}/set/${cardSetId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          console.log("massage from useEffect inside the Gallery component")
          console.log({cards})
          setCardSet(cards)
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])

  const cards = cardSet.map((text, flippedText) => (
    ({ style }) => <Card text={text} flippedText={flippedText} style={style} />
  ))

  console.log({cards})

  const [index, setIndex] = useState(0);
  const onClickNext = () =>  {
    setIndex(state => (state + 1) % cardSet.length)
  }
  const onClickBack = () => {
    setIndex(state => (state - 1) % cardSet.length)
  }

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-150%)" },
    config: config.slow
  });

  return (
    <div className="gallery-wrapper" style={{}}>    
      <button className="gallery-button" onClick={onClickBack}>&larr;</button>
    <div className="gallery">
      {transitions.map(({item, props, key}) => {
        console.log({ item, props, key })
        let actualCard = cardSet[item]
        console.log({actualCard})
        return <animated.div style={props} key={{}}>
          <Card text={actualCard.text} flippedText={actualCard.flippedText} />
          </animated.div>
      })}
    </div>
    <button className="gallery-button" onClick={onClickNext}>&rarr;</button>

    </div>
  );
};

export default Gallery;
