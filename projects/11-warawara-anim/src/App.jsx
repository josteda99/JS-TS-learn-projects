import "./App.css";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

function App() {
  const { rive, RiveComponent } = useRive({
    src: "warawara3.riv",
    autoplay: true,
    stateMachines: "test",
  });

  const sadValueInput = useStateMachineInput(rive, "test", "changeSad");

  const handleClickChange = (state) => {
    if (sadValueInput) {
      sadValueInput.value = state === "sad"; // true si es "sad", false si es "happy"
    }
  };

  return (
    <div>
      <h2>Warawara Animation</h2>
      <RiveComponent style={{ width: "500px", height: "500px" }} />
      <div style={{ marginTop: "10px" }}>
        <button style={{ marginRight: "10px" }} onClick={() => handleClickChange("sad")}>
          Change sad 😓
        </button>
        <button style={{ marginLeft: "10px" }} onClick={() => handleClickChange("happy")}>
          Change happy 😁
        </button>
      </div>
    </div>
  );
}

export default App;
