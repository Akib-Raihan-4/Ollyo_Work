import React from 'react'
import { useContext, useState, useEffect } from "react";
import { stepContext, userDataContext } from "../../../App";

const EduBack = () => {
    const { incrementStep, decrementStep } = useContext(stepContext);
    const { userData, setUserData } = useContext(userDataContext);

    const [dataIsValid, setDataIsValid] = useState(false);
    const [nextBtnClicked, setNextBtnClicked] = useState(false);
     function validateData() {
       setUserData((prevData) =>
         prevData.map((arr, arrIndex) => {
           if (arrIndex === 2) {
             return arr.map((field) => {
               if (field.value.length > 0) {
                 if (field.name === "email") {
                   if (
                     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                       field.value
                     )
                   ) {
                     return {
                       ...field,
                       hasCorrectFormat: true,
                     };
                   } else {
                     return {
                       ...field,
                       hasCorrectFormat: false,
                     };
                   }
                 }
                 if (field.name === "phone") {
                   if (/^[0-9]*$/.test(field.value)) {
                     return {
                       ...field,
                       hasCorrectFormat: true,
                     };
                   } else {
                     return {
                       ...field,
                       hasCorrectFormat: false,
                     };
                   }
                 }
                 return {
                   ...field,
                   isFilled: true,
                 };
               } else {
                 return field;
               }
             });
           } else {
             return arr;
           }
         })
       );
       setDataIsValid(
         userData[1].every((field) => field.isFilled && field.hasCorrectFormat)
       );
     }

     useEffect(() => {
       if (dataIsValid) {
         incrementStep();
       }
     }, [dataIsValid]);

     function handleChange(e) {
       const { name, value } = e.target;
       setUserData((prevData) => {
         return prevData.map((arr, arrIndex) => {
           if (arrIndex === 2) {
             return arr.map((dataObj) => {
               if (dataObj.name === name) {
                 if (value.length > 0) {
                   if (name === "email") {
                     if (
                       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                         value
                       )
                     ) {
                       return {
                         ...dataObj,
                         value: value,
                         isFilled: true,
                         hasCorrectFormat: true,
                       };
                     } else {
                       return {
                         ...dataObj,
                         value: value,
                         isFilled: true,
                         hasCorrectFormat: false,
                       };
                     }
                   }
                   if (name === "phone") {
                     if (/^[0-9]*$/.test(value)) {
                       return {
                         ...dataObj,
                         value: value,
                         isFilled: true,
                         hasCorrectFormat: true,
                       };
                     } else {
                       return {
                         ...dataObj,
                         value: value,
                         isFilled: true,
                         hasCorrectFormat: false,
                       };
                     }
                   }
                   return {
                     ...dataObj,
                     value: value,
                     isFilled: true,
                   };
                 } else {
                   return {
                     ...dataObj,
                     value: value,
                     isFilled: false,
                   };
                 }
               } else {
                 return dataObj;
               }
             });
           } else {
             return arr;
           }
         });
       });
     }
  return (
    <div className="container" id="infoForm">
      <div className="form">
        <form>
          <div>
            <label htmlFor="degree">
              Highest Degree
              {nextBtnClicked && !userData[1][0].isFilled && (
                <span className="required">This field is required</span>
              )}
            </label>
            <input
              type="text"
              name="degree"
              id="degree"
              placeholder="Your Degree"
              value={userData[2][0].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="fos">
              Field of Study
              {nextBtnClicked && !userData[2][1].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[2][1].isFilled &&
                !userData[2][1].hasCorrectFormat && (
                  <span className="invalid">Invalid Email Format </span>
                )}
            </label>
            <input
              type="fos"
              name="fos"
              id="fos"
              placeholder="Your Field of Study"
              value={userData[2][1].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="instit">
              Instituition Name
              {nextBtnClicked && !userData[1][2].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[2][2].isFilled &&
                !userData[2][2].hasCorrectFormat && (
                  <span className="invalid">
                    Only Numeric values are allowed
                  </span>
                )}
            </label>
            <input
              type="instit"
              name="instit"
              id="instit"
              placeholder="Your Instituition Name"
              value={userData[2][2].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="goy">
              Graduation Year
              {nextBtnClicked && !userData[1][3].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[2][3].isFilled &&
                !userData[2][3].hasCorrectFormat && (
                  <span className="invalid">
                    Only Numeric values are allowed
                  </span>
                )}
            </label>
            <input
              type="goy"
              name="goy"
              id="goy"
              placeholder="Graduation Year"
              value={userData[2][3].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </form>
      </div>
      <footer>
        <button className="go-back btn" onClick={decrementStep}>
          Go Back
        </button>
        <button
          className="next-step btn end"
          onClick={() => {
            setNextBtnClicked(true);
            validateData();
          }}
        >
          Next Step
        </button>
      </footer>
    </div>
  );
}

export default EduBack