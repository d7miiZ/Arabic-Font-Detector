import styles from "./MainSection.module.css";
import Container from "@material-ui/core/Container";
import Resluts from "../assets/results.png";

export const MainSection = () => {
  return (
    <section>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Data Collection:</h3>
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
      </Container>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Model Architecture:</h3>
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
      </Container>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Results:</h3>
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
        <img src={Resluts} className={styles.ResultsImg} alt={"sry"}></img>
      </Container>
    </section>
  );
};

export default MainSection;
