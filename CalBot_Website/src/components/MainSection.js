import styles from "./MainSection.module.css";
import Container from "@material-ui/core/Container";


import results from "../assets/results.png";
import test from "../assets/test.png"
import train from "../assets/train.png"

export const MainSection = () => {
  return (
    <section>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Data Collection:</h3>
        <p>
          Finding quality training images isn't an easy task, since data isn't always organized and labeled and fonts aren't clearly defined.
          We opted to generate our training samples from computer fonts. The problem with generating data is that the model tends to memorize the fonts 
            we trained it with and not generalize to all variations of the font. Thankfully this can be relieved by applying random transfomations on the images
            like skewing, cropping, bluring, etc.
          We used 7 different fonts for training the model (4 Nask, 3 Ruqa). We used fonts from <a target="_blank" href="https://arbfonts.com/arabic_fonts">here</a> and 
          from <a target="_blank" href="PLACE.HOLDER">here</a>. Then sampled a text from <a target="_blank" href="https://mawdoo3.com/">here</a>. 
          After that we started generating images (~500 images), each seven lines long. We cut each image to smaller 200x200 chunks and store them for training.
        </p>
      </Container>
      <Container maxWidth="md">
        <img src={test} className={styles.ResultsImg} alt={"sry"}></img>
      </Container>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Model Architecture:</h3>
        <p>
          Our architecture is a simple Conv and Linear layers. Here's more detail
          <span style={{display: "block", clear: "both", whiteSpace: "pre", fontSize: "0.7em"}}>
          <br/>
          # Init <br/>
                self.conv1 = nn.Conv2d(1, 10, kernel_size=3, padding=1)  <br/>
                self.conv2 = nn.Conv2d(10, 30, kernel_size=3, padding=1)<br/>
                self.conv3 = nn.Conv2d(30, 50, kernel_size=3, padding=1)<br/>
                self.conv4 = nn.Conv2d(50, 70, kernel_size=3, padding=1)<br/>
                self.pool = nn.MaxPool2d(kernel_size=3, stride=2)<br/>
                <br/>
                self.fc1 = nn.Linear(70 * 11 * 11, 437) <br/>
                self.fc2 = nn.Linear(437, 109)<br/>
                self.fc3 = nn.Linear(109, 50)<br/>
                self.fc4 = nn.Linear(50, 2)<br/>
                
          <br/><br/>#Forward <br/>
                x = self.pool(F.relu(self.conv1(x)))<br/>
                x = self.pool(F.relu(self.conv2(x)))<br/>
                x = self.pool(F.relu(self.conv3(x)))<br/>
                x = self.pool(F.relu(self.conv4(x)))<br/>
                <br/>
                x = torch.flatten(x, 1) # flatten all dimensions except batch<br/>
                x = F.relu(self.fc1(x))<br/>
                x = F.relu(self.fc2(x))<br/>
                x = F.relu(self.fc3(x))<br/>
                x = self.fc4(x)<br/>
                return x<br/>
                <br/>
          </span>
          We also experimented with augmenting our training data so that the model generalizes better, rather than memorizing the fonts we used.
          Heres a sample from the training data:
        </p>
      </Container>
      <Container maxWidth="md">
        <img src={train} className={styles.ResultsImg} alt={"sry"}></img>
      </Container>
      <Container maxWidth="sm" className={styles.text}>
        <h3>Results:</h3>
        <p>
          The model seems to capture the different universal characters of the two fonts, for example, Ruqa will usually write the dots as one stroke rather than seperate dots. 
          So testing it with an image it didnt saw before of a Ruqa-like font will usually perform well.
          The model scored an accuracy of 100% on the training, validation and testing. Though all of the three mentioned sets are generated so that doesn't mean as much.
          The model however scored a 31/32 from photos of various sources, as shown in the picture:
        </p>
      </Container>
      <Container maxWidth="md">
        <img src={results} className={styles.ResultsImg} alt={"sry"}></img>
      </Container>
    </section>
  );
};

export default MainSection;
