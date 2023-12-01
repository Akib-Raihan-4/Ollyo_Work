import { useContext } from "react";
import { stepContext } from "../../App";
export default function StepLabels(props) {
  const { currentStep } = useContext(stepContext);
  const { id, small_heading, large_heading } = props;
  const classes = currentStep === id ? "circle active" : "circle";
  return (
    <div className="step--label">
      <div className={classes}>{id}</div>
      <div className="headings">
        <p>{large_heading}</p>
      </div>
    </div>
  );
}
