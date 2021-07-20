import Container from "@material-ui/core/Container";
import styles from "./Description.module.css";

const authors = [
  <a
    className={styles.link}
    href="https://github.com/Hawzen"
    target="_blank"
    rel="noreferrer"
  >
    Hawzen
  </a>,
  <a
    className={styles.link}
    href="https://github.com/d7miiZ"
    target="_blank"
    rel="noreferrer"
  >
    D7miiZ
  </a>,
  <a
    className={styles.link}
    href="https://github.com/soraxksa"
    target="_blank"
    rel="noreferrer"
  >
    SoraxKsa
  </a>,
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(authors);

export const Description = () => {
  return (
    <div>
      <Container className={styles.card} maxWidth="sm">
        <p>
          Caligraphy Bot (CALBOT) can discern two arabic handwritten fonts, Ruqa (رقعة) and Nask (نسخ) (including each font's variations) from each other. 
          Given an image of the handwriting CALBOT uses Convolutional Neural Networks (CNNS) to analyze and predict which font is more similar to the handwriting. 
          This page will detail the training process, architecture and results of CALBOT.
        </p>
        <span>
          Done by: {""}
          {authors[0]} {authors[1]} {authors[2]}
        </span>
      </Container>
    </div>
  );
};

export default Description;
