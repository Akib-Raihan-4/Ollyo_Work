import Aside from "./components/aside/Aside";
import Main from "./components/main/Main";

import "./App.css";
import { useState, createContext } from "react";
import Header from "./components/main/Header";

export const stepContext = createContext();
export const userDataContext = createContext();

// user data
const userData = [
  {
    isMonthlyActive: true,
  },

  [
    {
      name: "name",
      value: "",
      isFilled: false,
      hasCorrectFormat: true,
    },
    {
      name: "email",
      value: "",
      isFilled: false,
      hasCorrectFormat: false,
    },
    {
      name: "phone",
      value: "",
      isFilled: false,
      hasCorrectFormat: false,
    },
    {
      name: "address",
      value: "",
      isFilled: false,
      hasCorrectFormat: true,
    },

    {
      name: "profileImage",
      value: "",
      isFilled: true,
      hasCorrectFormat: true,
    },
  ],
  [
    {
      name: "degree",
      value: "",
      isFilled: false,
      hasCorrectFormat: true,
    },
    {
      name: "fos",
      value: "",
      isFilled: false,
      hasCorrectFormat: false,
    },
    {
      name: "instit",
      value: "",
      isFilled: false,
      hasCorrectFormat: false,
    },
    {
      name: "goy",
      value: "",
      isFilled: false,
      hasCorrectFormat: true,
    },
  ],
  [
    {
      heading: "Online Service",
      description: "Access multiplayer games",
      isSelected: false,
      price: {
        monthly: 1,
        yearly: 10,
      },
    },
    {
      heading: "Large Storage",
      description: "Extra 1TB of cloud save",
      isSelected: false,
      price: {
        monthly: 2,
        yearly: 20,
      },
    },
    {
      heading: "Customizable profile",
      description: "Custom theme on your profile",
      isSelected: false,
      price: {
        monthly: 2,
        yearly: 20,
      },
    },
  ],
];

// now in main

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(userData);

  const incrementStep = () => {
    setCurrentStep((prevStep) => {
      return prevStep <= 4 ? prevStep + 1 : 1;
    });
  };
  const decrementStep = () => {
    setCurrentStep((prevStep) => {
      return prevStep > 1 ? prevStep - 1 : 1;
    });
  };
  return (
    <>
      <div className="app">
        <userDataContext.Provider
          value={{ userData: data, setUserData: setData }}
        >
          <stepContext.Provider
            value={{ currentStep, incrementStep, decrementStep }}
          >
            <Header/>
            <Aside />
            <Main />
          </stepContext.Provider>
        </userDataContext.Provider>
      </div>
    </>
  );
}

export default App;
