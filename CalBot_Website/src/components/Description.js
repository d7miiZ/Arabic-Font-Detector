import Container from "@material-ui/core/Container";
import styles from "./Description.module.css";

export const Description = () => {
  return (
    <div>
      <Container className={styles.card} maxWidth="sm">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesettfffFing
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <span>
          Done by:{" "}
          <a
            className={styles.link}
            href="https://github.com/Hawzen"
            target="_blank"
            rel="noreferrer"
          >
            Hawzen
          </a>{" "}
          <a
            className={styles.link}
            href="https://github.com/d7miiZ"
            target="_blank"
            rel="noreferrer"
          >
            D7miiZ
          </a>{" "}
          <a
            className={styles.link}
            href="https://github.com/soraxksa"
            target="_blank"
            rel="noreferrer"
          >
            SoraxKsa
          </a>
        </span>
      </Container>
    </div>
  );
};

export default Description;
