import React from 'react';

const TypeEmoji = (props) => {
  const emojis = {
    normal: '👍', 
    fire: '🔥', 
    water: '💧', 
    electric: '⚡',  
    grass: '🌿',
    ice:'❄',
    fighting: '💢',
    poison: '☠',
    ground: '🐜',
    flying: '✈',
    psychic: '🔮',
    bug: '🐞',
    rock: '⛰',
    ghost: '👻',
    dragon: '🐲',
    dark: '😈',
    steel: '🤘', 
    fairy: '🧚‍'
  }
  
  const { type, children } = props;
  return <span role="img" aria-label={type} {...children}>{emojis[type]}</span>
}

export {
  TypeEmoji
}