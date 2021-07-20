import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, useMediaQuery } from "@material-ui/core";

import styles from "./Demo.module.css";
import Modal from "../UI/Modal";

import nask from "../assets/nask.png";
import nask2 from "../assets/nask2.png";
import nask3 from "../assets/nask3.png";
import ruqa from "../assets/ruqa.png";
import ruqa2 from "../assets/ruqa2.png";
import ruqa3 from "../assets/ruqa3.jpg";

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

const itemData = [[nask, "Nask1"], [nask2, "Nask2"], [nask3, "Nask3"], [ruqa, "Ruqa1"], [ruqa2, "Ruqa2"], [ruqa3, "Ruqa3"]].map(arr => 
  {
    return {
      img: arr[0],
      title: arr[1],
      key: arr[1]
    }
});

export const Demo = () => {
  const [lastId, setLastId] = useState(0);
  const [sample, setSample] = useState("");
  const [prediction, setPrediction] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const classes = useStyles();

  const matches = useMediaQuery('(min-width:600px)');

  const onHide = () => {
    if (lastId !== 0) {
      document.getElementById(lastId).classList.remove(styles.selected);
    }
    setSample("");
    setUploadedImage(null);
    setLastId(0);
    setShow(false);
  };

  const chooseSample = (event) => {
    const id = event.target.getAttribute("data-key");
    const src = event.target.src;

    if (lastId === id) {
      if (document.getElementById(lastId).classList.contains(styles.selected)) {
        document.getElementById(lastId).classList.remove(styles.selected);
        setSample("");
      } else {
        document.getElementById(lastId).classList.add(styles.selected);
        setSample(src);
        setUploadedImage(null)
      }
    } else {
      if (lastId !== 0) {
        document.getElementById(lastId).classList.remove(styles.selected);
      }
      document.getElementById(id).classList.add(styles.selected);
      setSample(src);
      setUploadedImage(null)
    }
    setLastId(id);
  };

  const predSample = async () => {
    setLoading(true);
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
          setPrediction(pred.pred);
          setLoading(false);
          setShow(true);
        });
    });
  };

  const predUploadedImg = () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", uploadedImage);

    fetch("/api/calbot/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((pred) => {
        setPrediction(pred.pred);
        setLoading(false);
        setShow(true);
      });
  };

  const onDropAccepted = useCallback((acceptedImage) => {
    setUploadedImage(acceptedImage[0]);
    setSample("")
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    // maxSize: 2^20 * 50, // Enabling this makes dropzone reject every photo?
    onDropAccepted,
  });

  const sampleBtn = !loading ? (
    <Button size="large" variant="contained" className={styles.PredBtn} onClick={predSample}>
      Predict
    </Button>
  ) : (
    <CircularProgress className={styles.margin}></CircularProgress>
  );

  const uploadBtn = !loading ? (
    <Button
      size="large"
      variant="contained"
      className={styles.PredBtn}
      onClick={predUploadedImg}
    >
      Predict
    </Button>
  ) : (
    <CircularProgress className={styles.margin}></CircularProgress>
  );

  return (
    
    <div style={{marginTop: "2em"}}>
    <code style={{fontSize: "7em", fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: ""}}>DEMO</code>
      {show && (
        <Modal onClose={onHide} classes={styles.modal}>
          <h4>Predicted Image:</h4>
          <img
            src={sample === "" ? URL.createObjectURL(uploadedImage) : sample}
            className={styles.PredImg}
            style={{marginBottom: "1em"}}
            alt={"sry"}
          ></img>
          <h3>CALBOT predicts: <i><b>{prediction}</b></i></h3>
          <Button variant="outlined" onClick={onHide} style={{margin: "1em"}}>
            CLOSE
          </Button>
        </Modal>
      )}
      <h2 style={{margin: "2em"}}>See the model in action by choosing a sample image</h2>
      <div className={classes.root}>
        <ImageList rowHeight={180} cols={matches ? 3 : 2} className={classes.imageList}>
          {/* <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}> // Why is this an item??
            <ListSubheader component="div">samples</ListSubheader>
          </ImageListItem> */}
          {itemData.map((item) => (
            <ImageListItem key={item.key}>
              <img
                className={styles.clickable}
                src={item.img}
                alt={item.title}
                onClick={chooseSample}
                data-key={item.key}
              />
              <ImageListItemBar id={`${item.key}`} title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className={styles.DropContainer}>
        <h2 style={{margin: "1em"}}>Or upload your own image</h2>
        <div className={styles.drop}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button variant="outlined" onClick={open}>
              <span>UPLOAD</span>
            </Button>
            <p style={{ padding: "20px" }}>
              (Only *.jpg *.jpeg *.png)
            </p>
          </div>
        </div>
        {(uploadedImage !== null || sample !== "") && (
          <Container maxWidth="sm">
            <h4>Chosen image: </h4>
            <img
              className={styles.PredImg}
              src={sample === "" ? URL.createObjectURL(uploadedImage) : sample}
              alt={"sry"}
            ></img>
          </Container>
        )}
        <Container style={{marginTop: "2em"}}>
            {uploadedImage !== null && uploadBtn}
            {sample !== "" && sampleBtn}
          </Container>
      </div>
    </div>
  );
};

export default Demo;
