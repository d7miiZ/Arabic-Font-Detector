import "./App.css";
import Description from "./components/Description";
import MainSection from "./components/MainSection";
import Demo from "./components/Demo";
import Footer from "./UI/Footer";

function App() {
  return (
    <div className="App">
      <h1>CalBot</h1>
      <Description></Description>
      <MainSection></MainSection>
      <Demo></Demo>
      <Footer></Footer>
    </div>
  );
}

export default App;
