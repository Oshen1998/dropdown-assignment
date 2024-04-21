import React from "react";
import "./App.css";
import AppDropDown from "./components/dropdown";
import { DropDownItems } from "./constants";



function App() {
  
  const handleSelect = (id: string) => {
    console.log(`Selected item with id ${id}`);
  };

  return (
    <div
      className="bg-amber-400 h-screen flex"
    >
      <div className="m-auto">
      <AppDropDown
        id="person"
        isCustomInputDisabled={true}
        title="Choose Your Preference"
        position="bottom"
        items={DropDownItems}
        width="80vw"
        onSelect={handleSelect}
      />
      </div>
      
    </div>
  );
}

export default App;
