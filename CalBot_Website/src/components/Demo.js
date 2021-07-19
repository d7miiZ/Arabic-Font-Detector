import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from "./Demo.module.css"
import nask from '../assets/nask.png';
import nask2 from '../assets/nask2.png';
import nask3 from '../assets/nask3.png';
import ruqa from '../assets/ruqa.png';
import ruqa2 from '../assets/ruqa2.png';
import ruqa3 from '../assets/ruqa3.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

  const itemData = [
    {
      img: nask,
      title: 'nask',
      key: 1
    },
     {
      img: nask2,
      title: 'nask2',
      key: 2

    },
     {
      img: nask3,
      title: 'nask3',
      key: 3
    },
     {
      img: ruqa,
      title: 'ruqa',
      key: 4
    },
     {
      img: ruqa2,
      title: 'ruqa2',
      key: 5
    },
     {
      img: ruqa3,
      title: 'ruqa3',
      key: 6
    },
  ];
 
    export const Demo = () => {

    const [LastId , SetLastId] = useState(0)
    const [sample , SetSample] = useState("")
    const classes = useStyles();

    const PredSample = async (event) =>{
      const id = event.target.getAttribute('data-key')
      if(LastId === id ){
        document.getElementById(LastId).classList.toggle(styles.selected);
        SetSample("")
      }else{
        if(LastId !== 0){
          document.getElementById(LastId).classList.remove(styles.selected);
        }
        document.getElementById(id).classList.add(styles.selected);
      }
      SetLastId(id)

      const req = await fetch("https://arabic-caligraphy-classifier.herokuapp.com/api/calbot/predict" , {
        method: "POST",
        body: {
          image: event.target.src
        }
      })

      const res = await req.json();
      console.log(res)
    }

    const onDropAccepted = useCallback(
    (acceptedFiles) => {

    },
    []
  );

  const onDropRejected = useCallback((rejectedFiles) => {
   
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
    onDropRejected,
  });
    return (
      <>
      <h3>
        Demo:
      </h3>
        <p>
          Choose one of the sample images to see the model prediction!
        </p>
          <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">samples</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.key}>
            <img src={item.img} alt={item.title}  onClick={PredSample} data-key={item.key}/>
            <ImageListItemBar 
              id={`${item.key}`}
              title={item.title}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
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
            </div>
          </div>
       </div>
       </>
       );
}

export default Demo