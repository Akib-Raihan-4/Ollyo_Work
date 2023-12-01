import Header from "../Header";
import { useContext, useState, useEffect } from "react";
import { stepContext, userDataContext } from "../../../App";

export default function InforForm() {
  const { incrementStep } = useContext(stepContext);
  const { userData, setUserData } = useContext(userDataContext);

  const [dataIsValid, setDataIsValid] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);

  function validateData() {
    setUserData((prevData) =>
      prevData.map((arr, arrIndex) => {
        if (arrIndex === 1) {
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
        if (arrIndex === 1) {
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

                if (name === "profileImage"){
                  return{
                    ...dataObj,
                    value:value,
                    isFilled:true,
                    hasCorrectFormat:true,
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
            <label htmlFor="name">
              Name
              {nextBtnClicked && !userData[1][0].isFilled && (
                <span className="required">This field is required</span>
              )}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={userData[1][0].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="email">
              Email Address
              {nextBtnClicked && !userData[1][1].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[1][1].isFilled &&
                !userData[1][1].hasCorrectFormat && (
                  <span className="invalid">Invalid Email Format </span>
                )}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email Address"
              value={userData[1][1].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number
              {nextBtnClicked && !userData[1][2].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[1][2].isFilled &&
                !userData[1][2].hasCorrectFormat && (
                  <span className="invalid">
                    Only Numeric values are allowed
                  </span>
                )}
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Your Phone Number"
              value={userData[1][2].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="address">
              Address
              {nextBtnClicked && !userData[1][3].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                userData[1][3].isFilled &&
                !userData[1][3].hasCorrectFormat && (
                  <span className="invalid">
                    Only Numeric values are allowed
                  </span>
                )}
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Your Address"
              value={userData[1][3].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="profileImage">
              Profile Image
              {nextBtnClicked && !userData[1][4].isFilled && (
                <span className="required">This field is required</span>
              )}
            </label>
            <input
              type="file" // Change this input type based on your image upload mechanism
              name="profileImage"
              id="profileImage"
            />
          </div>
        </form>
      </div>
      <footer>
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
