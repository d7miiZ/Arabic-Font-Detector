import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Modal from "../UI/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Demo.module.css";

import nask from "../assets/nask.png";
import nask3 from "../assets/nask3.png";
import ruqa from "../assets/ruqa.png";
import ruqa2 from "../assets/ruqa2.png";
import ruqa3 from "../assets/ruqa3.jpg";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

const itemData = [
  {
    img: nask,
    title: "nask",
    key: 1,
  },
  {
    img: nask3,
    title: "nask3",
    key: 3,
  },
  {
    img: ruqa,
    title: "ruqa",
    key: 4,
  },
  {
    img: ruqa2,
    title: "ruqa2",
    key: 5,
  },
  {
    img: ruqa3,
    title: "ruqa3",
    key: 6,
  },
];

export const Demo = () => {
  const [LastId, SetLastId] = useState(0);
  const [sample, SetSample] = useState("");
  const [prediction, SetPrediction] = useState("");
  const [UploadedImage, SetUploadedImage] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [show, SetShow] = useState(false);

  const classes = useStyles();

  const onHide = () => {
    if (LastId !== 0) {
      document.getElementById(LastId).classList.remove(styles.selected);
    }
    SetSample("");
    SetUploadedImage(null);
    SetLastId(0);
    SetShow(false);
  };

  const ChooseSample = (event) => {
    const id = event.target.getAttribute("data-key");
    const src = event.target.src;

    if (LastId === id) {
      if (document.getElementById(LastId).classList.contains(styles.selected)) {
        document.getElementById(LastId).classList.remove(styles.selected);
        SetSample("");
      } else {
        document.getElementById(LastId).classList.add(styles.selected);
        SetSample(src);
      }
    } else {
      if (LastId !== 0) {
        document.getElementById(LastId).classList.remove(styles.selected);
      }
      document.getElementById(id).classList.add(styles.selected);
      SetSample(src);
    }
    SetLastId(id);
  };

  const PredSample = async () => {
    SetLoading(true);
    fetch(sample).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], sample, { contentType });

      let formData = new FormData();
      formData.append("image", file);

      fetch("/api/calbot/predict", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((pred) => {
          SetPrediction(pred.pred);
          SetLoading(false);
          SetShow(true);
        });
    });
  };

  const PredUploadedImg = () => {
    SetLoading(true);
    let formData = new FormData();
    formData.append("image", UploadedImage);

    fetch("/api/calbot/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((pred) => {
        SetPrediction(pred.pred);
        SetLoading(false);
        SetShow(true);
      });
  };

  const onDropAccepted = useCallback((acceptedImage) => {
    SetUploadedImage(acceptedImage[0]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
    maxFiles: 1,
  });

  const SampleBtn = !loading ? (
    <Button variant="contained" className={styles.PredBtn} onClick={PredSample}>
      Predict
    </Button>
  ) : (
    <CircularProgress className={styles.margin}></CircularProgress>
  );

  const UploadBtn = !loading ? (
    <Button
      variant="contained"
      className={styles.PredBtn}
      onClick={PredUploadedImg}
    >
      Predict
    </Button>
  ) : (
    <CircularProgress className={styles.margin}></CircularProgress>
  );

  return (
    <>
      {show && (
        <Modal onClose={onHide} classes={styles.modal}>
          <h4>Predicted Image:</h4>
          <img
            src={sample === "" ? URL.createObjectURL(UploadedImage) : sample}
            className={styles.PredImg}
            alt={"sry"}
          ></img>
          <h3>CalBot Preditcion: {prediction}</h3>
          <Button variant="contained" onClick={onHide}>
            Close
          </Button>
        </Modal>
      )}
      <h3>Demo:</h3>
      <p>Choose one of the sample images to see the model prediction!</p>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">samples</ListSubheader>
          </ImageListItem>
          {itemData.map((item) => (
            <ImageListItem key={item.key}>
              <img
                className={styles.clickable}
                src={item.img}
                alt={item.title}
                onClick={ChooseSample}
                data-key={item.key}
              />
              <ImageListItemBar id={`${item.key}`} title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {sample !== "" && SampleBtn}
      <div className={styles.DropContainer}>
        <p>Or upload your own images and see if the model gets it right!</p>
        <div className={styles.drop}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image</p>
            <p>OR</p>
            <Button variant="contained" onClick={open}>
              <span>Browse Your Device</span>
            </Button>
            <p style={{ padding: "20px" }}>
              ( Only *.jpg *.jpeg *.png will be accepted )
            </p>
            {UploadedImage !== null && UploadBtn}
          </div>
        </div>
        {UploadedImage !== null && (
          <Container maxWidth="sm">
            <h4>Uploaded Image: </h4>
            <img
              className={styles.PredImg}
              src={URL.createObjectURL(UploadedImage)}
              alt={"sry"}
            ></img>
          </Container>
        )}
      </div>
    </>
  );
};

export default Demo;
