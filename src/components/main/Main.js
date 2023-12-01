import { useContext } from "react";
import InfoForm from "./infoForm/InfoForm";
import EduBack from "./eduBack/EduBack";
import WorkExp from "./addOns/WorkExp";
import { stepContext } from "../../App";

export default function Main() {
  const { currentStep } = useContext(stepContext);

  let MainComponet;
  switch (currentStep) {
    case 1:
      MainComponet = InfoForm;
      break;
    case 2:
      MainComponet = EduBack;
      break;
    case 3:
      MainComponet = WorkExp;
      break;
  }

  return (
    <main>
      <MainComponet />
    </main>
  );
}
