# Arabic-Font-Detector
This model detects arabic fonts (نسخ, رقعة، كوفي) given a picture of the text
<br>
Built using Pytorch and kids stories. 

### Data
We used various computer fonts of Nask (نسخ) and Ruqa (رقعة)) and took pictures of those then spliced them up and fed them to a convolutional neural network. The models are under the <code>Results</code> folder. The data is too large for github so open an issue and we'll supply them. 

### Results

##### Train
Here is a sample of the training data (the training data has been augmented, see [section 2 here](https://github.com/d7miiZ/Arabic-Font-Detector/blob/main/arabic_caligraphy.ipynb) for more):
![Train](results/2021_7_18__12AM/train_sample.png)

##### Validation
Here is a sample of the validation data:
![Validation](results/2021_7_18__12AM/test_sample.png)

##### Outside samples
![Outside](results/2021_7_18__12AM/outside_sample.jpg)

### Notes
The fonts we used + the outside images test + the text in the images aren't ours <br>
I am not the one who named نسخ to Nask, or even worse رقعة to Ruqa!
