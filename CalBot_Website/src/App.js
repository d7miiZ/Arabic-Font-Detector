import "./App.css";
import Description from "./components/Description";
import MainSection from "./components/MainSection";
import Demo from "./components/Demo";
import Footer from "./UI/Footer";

function App() {
  return (
    <div className="App">
      <code style={{fontSize: "7em", fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: ""}}>CALBOT</code>
      <Description/>
      <MainSection/>
      <Demo/>
      <Footer/>
    </div>
  );
}

export default App;
