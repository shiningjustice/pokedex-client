
const formatType = (type) => {
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
  return <span role="img" aria-label={type}>{emojis[type]}</span>;
}

export {
  formatType
}