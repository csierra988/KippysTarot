//helper functions
import cardData from '../data/tarot-deck.json'

// export function threeRandomCards() {
//     return;
// }

export function randomCard() {
    return cardData[Math.floor(Math.random() * cardData.length)];
}
