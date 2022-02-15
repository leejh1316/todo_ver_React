import React, { useState, useReducer, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [getSlideWrap, setSlideWrap] = useState();
  console.log(getSlideWrap);
  return (
    <div className="App">
      <div className="container">
        <div className="mainLayout">
          <div className="titleName">TODO</div>
          <Components.Add.AddThema themaWrap={getSlideWrap} />
          <div className="themaSlideWrap">
            <Components.Slide.SlideWorkWrap setSlideWrap={setSlideWrap} />
          </div>
        </div>
      </div>
    </div>
  );
}

let Components = {
  //슬라이드 컴포넌트 시작
  Slide: {
    init: function () {
      return {
        startX: 0,
        moveX: 0,
        moveY: 0,
        beforeMoveX: 0,
        startY: 0,
        endX: 0,
        mouseState: "up",
      };
    },
    reducer: function (state, action) {
      switch (action.type) {
        case "down": {
          return {
            type: "move",
            startX: action.startX,
            startY: action.startY,
            mouseState: "down",
            beforeMoveX: action.startX,
          };
        }
        case "move": {
          if (state.mouseState === "down") {
            return {
              beforeMoveX: state.moveX,
              moveX: action.moveX,
              startX: state.startX,
              startY: state.startY,
              mouseState: state.mouseState,
              endX: state.startX,
              moveY: action.moveY,
            };
          } else {
            return {
              moveX: state.moveX,
              moveY: state.moveY,
              beforeMoveX: state.beforeMoveX,
              startX: state.startX,
              startY: state.startY,
              endX: state.endX,
            };
          }
        }
        case "up": {
          return {
            endX: action.endX,
            beforeMoveX: state.beforeMoveX,
            mouseState: "up",
            moveX: state.moveX,
            moveY: state.moveY,
            startX: state.startX,
            startY: state.startY,
          };
        }
        case "leave": {
          return {
            mouseState: "up",
            endX: state.endX,
            moveX: state.moveX,
            moveY: state.moveY,
            beforeMoveX: state.beforeMoveX,
            startY: state.startY,
            startX: state.startX,
          };
        }
      }
    },
    SlideWorkWrap: function (props) {
      const [state, dispatch] = useReducer(
        Components.Slide.reducer,
        Components.Slide.init
      );
      const themaWrapRef = useRef();
      useEffect((e) => {
        props.setSlideWrap(themaWrapRef);
      });
      const [startCheck, setStartCheck] = useState(false);
      const [themaInCheck, setThemaInCheck] = useState(false);
      const [nowThemaStyleData, setNowThemaStyleData] = useState({});
      let timeout;
      function slide(e) {
        const themaAll = themaWrapRef.current.querySelectorAll(`.themaItem`);
        if (themaAll.length > 1 && startCheck === false) {
          if (state.mouseState === "down") {
            // console.log(`startX: ${state.startX}, startY: ${state.startY}`);
            // console.log(`moveX: ${state.moveX}, moveY: ${state.moveY}`);
            const mainLayout = themaWrapRef.current.parentElement.parentElement;
            const mainLayoutWidth = mainLayout.clientWidth;
            const mainLayoutHeight = mainLayout.clientHeight;
            const nextThema = themaWrapRef.current.querySelector(".nextThema");
            const prevThema = themaWrapRef.current.querySelector(".prevThema");
            const nowThema = themaWrapRef.current.querySelector(".nowThema");
            const themaIn = themaWrapRef.current.querySelector(".themaIn");
            if (themaInCheck === false) {
              setNowThemaStyleData({
                width: `
                  ${
                    nextThema != null
                      ? nowThema.offsetWidth
                      : prevThema.offsetWidth
                  }px`,
                height: `${
                  nextThema != null
                    ? nowThema.offsetHeight
                    : prevThema.offsetHeight
                }px`,
                top: "50%",
                translate: "translate(-50%,-50%)",
                left: "50%",
                zIndex: 0,
              });
            }
            clearTimeout(timeout);
            //줌인해제
            if (
              themaIn != null &&
              state.startY < 120 &&
              state.startY - state.moveY < -40
            ) {
              if (nextThema != null) {
                nextThema.style.opacity = "1";
              }
              if (prevThema != null) {
                prevThema.style.opacity = "1";
              }
              themaIn.style.width = nowThemaStyleData.width;
              themaIn.style.height = nowThemaStyleData.height;
              themaIn.style.maxWidth = nowThemaStyleData.width;
              themaIn.style.maxHeight = nowThemaStyleData.height;
              themaIn.style.top = nowThemaStyleData.top;
              themaIn.style.left = nowThemaStyleData.left;
              themaIn.style.zIndex = nowThemaStyleData.zIndex;
              themaIn.style.transform = nowThemaStyleData.translate;
              nowThema.style.cursor = "pointer";
              timeout = setTimeout((e) => {
                themaIn.classList.remove("themaIn");
                setThemaInCheck(false);
              }, 1300);
            }
            //줌인
            if (e.target === nowThema && themaInCheck === false) {
              if (
                state.startY - state.moveY > 60 &&
                state.startX - state.moveX >= -30 &&
                state.startX - state.moveX <= 30
              ) {
                nowThema.style.transform = "translate(-50%,-60%)";
                nowThema.style.cursor = "Default";
                setThemaInCheck(true);
                timeout = setTimeout((e) => {
                  if (nextThema != null) nextThema.style.opacity = "0";
                  if (prevThema != null) prevThema.style.opacity = "0";
                  nowThema.style.top = "30%";
                  nowThema.style.zIndex = "90";
                  // nowThema.style.borderRadius = `0px`;
                  nowThema.style.width = `${mainLayoutWidth - 30}px`;
                  nowThema.style.height = `${mainLayoutHeight - 70}px`;
                  nowThema.style.maxWidth = `${mainLayoutWidth - 30}px`;
                  nowThema.style.maxHeight = `${mainLayoutHeight - 70}px`;
                  nowThema.classList.add("themaIn");
                }, 500);
              }
            }
            //오른쪽 슬라이드
            if (nextThema !== null && themaInCheck === false) {
              if (state.startX - state.moveX >= 80) {
                setStartCheck(true);
                nowThema.style.left = "25%";
                nowThema.style.transform = "translate(-125%,-50%)";
                nextThema.style.left = "50%";
                nextThema.style.transform = "translate(-50%,-50%)";
                if (nextThema.nextElementSibling != null) {
                  nextThema.nextElementSibling.style.left = "75%";
                  nextThema.nextElementSibling.style.transform =
                    "translate(25%,-50%)";
                }
                if (prevThema != null) {
                  prevThema.style.left = "0%";
                  prevThema.style.transform = "translate(-200%,-50%)";
                }
                timeout = setTimeout((e) => {
                  setStartCheck(false);
                  nowThema.classList.add("prevThema");
                  nowThema.classList.remove("nextThema");
                  nowThema.classList.remove("nextReadyThema");
                  nowThema.classList.remove("prevReadyThema");
                  nowThema.classList.remove("nowThema");
                  if (nextThema.nextElementSibling != null) {
                    nextThema.nextElementSibling.classList.add("nextThema");
                    nextThema.nextElementSibling.classList.remove("prevThema");
                    nextThema.nextElementSibling.classList.remove("nowThema");
                    nextThema.nextElementSibling.classList.remove(
                      "prevReadyThema"
                    );
                    nextThema.nextElementSibling.classList.remove(
                      "nextReadyThema"
                    );
                  }
                  nextThema.classList.add("nowThema");
                  nextThema.classList.remove("nextReadyThema");
                  nextThema.classList.remove("prevThema");
                  nextThema.classList.remove("prevReadyThema");
                  nextThema.classList.remove("nextThema");
                  if (prevThema != null) {
                    prevThema.classList.add("prevReadyThema");
                    prevThema.classList.remove("nowThema");
                    prevThema.classList.remove("nextThema");
                    prevThema.classList.remove("nextReadyThema");
                    prevThema.classList.remove("prevThema");
                  }
                }, 1700);
              }
            }
            //왼쪽 슬라이드
            if (prevThema !== null && themaInCheck === false) {
              if (state.startX - state.moveX < -80) {
                setStartCheck(true);
                nowThema.style.left = "75%";
                nowThema.style.transform = "translate(25%, -50%)";
                prevThema.style.left = "50%";
                prevThema.style.transform = "translate(-50%, -50%)";
                if (prevThema.previousElementSibling != null) {
                  prevThema.previousElementSibling.style.left = "25%";
                  prevThema.previousElementSibling.style.transform =
                    "translate(-125%, -50%)";
                }
                if (nextThema != null) {
                  nextThema.style.left = "100%";
                  nextThema.style.transform = "translate(100%, -50%)";
                }
                timeout = setTimeout((e) => {
                  setStartCheck(false);
                  nowThema.classList.add("nextThema");
                  nowThema.classList.remove("prevThema");
                  nowThema.classList.remove("prevReadyThema");
                  nowThema.classList.remove("nextReadyThema");
                  nowThema.classList.remove("nowThema");
                  if (prevThema.previousElementSibling != null) {
                    prevThema.previousElementSibling.classList.add("prevThema");
                    prevThema.previousElementSibling.classList.remove(
                      "nextThema"
                    );
                    prevThema.previousElementSibling.classList.remove(
                      "nowThema"
                    );
                    prevThema.previousElementSibling.classList.remove(
                      "nextReadyThema"
                    );
                    prevThema.previousElementSibling.classList.remove(
                      "prevReadyThema"
                    );
                  }
                  prevThema.classList.add("nowThema");
                  prevThema.classList.remove("prevReadyThema");
                  prevThema.classList.remove("nextThema");
                  prevThema.classList.remove("prevThema");
                  if (nextThema != null) {
                    nextThema.classList.add("nextReadyThema");
                    nextThema.classList.remove("nowThema");
                    nextThema.classList.remove("prevReadyThema");
                    nextThema.classList.remove("prevThema");
                    nextThema.classList.remove("nextThema");
                  }
                }, 1700);
              }
            }
          }
        }
      }
      return (
        <>
          <div
            className="slideWorkWrap"
            ref={themaWrapRef}
            onMouseDown={(e) => {
              dispatch({
                type: "down",
                startX: e.clientX,
                startY: e.clientY,
              });
            }}
            onMouseMove={(e) => {
              dispatch({
                type: "move",
                moveX: e.clientX,
                moveY: e.clientY,
              });
              slide(e);
            }}
            onMouseUp={(e) => {
              dispatch({ type: "up", endX: e.clientX });
            }}
            onMouseLeave={(e) => {
              dispatch({ type: "leave" });
            }}
          >
            <div className="themaItem nowThema"></div>
            <div className="themaItem nextThema"></div>
            <div className="themaItem nextReadyThema"></div>
            <div className="themaItem nextReadyThema"></div>
            <div className="themaItem nextReadyThema"></div>
          </div>
        </>
      );
    },
  },
  //슬라이드 컴포넌트 끝
  //테마 추가
  Add: {
    AddThema: function (props) {
      const refArrow = useRef();
      const [useArrow, setArrow] = useState(false);
      const [getDate, setDate] = useState(0);
      const [getDays, setDays] = useState(0);

      function today() {
        const myDate = new Date();
        const day = myDate.getDay();
        const dayObj = {
          0: "일요일",
          1: "월요일",
          2: "화요일",
          3: "수요일",
          4: "목요일",
          5: "금요일",
          6: "토요일",
        };
        setDays(`${dayObj[day]}`);
        setDate(
          `${myDate.getFullYear()}년 ${
            myDate.getMonth() + 1
          }월 ${myDate.getDate()}일`
        );
      }

      function arrowEvent(e) {
        const themaCon = refArrow.current.parentElement;
        const arrow1 = refArrow.current.querySelector(".arrowIcon1");
        const arrow2 = refArrow.current.querySelector(".arrowIcon2");
        if (useArrow === true) {
          arrow1.style.transform = "translate(-50%, -50%) rotate(35deg)";
          arrow2.style.transform = "translate(-50%, -50%) rotate(-35deg)";
          themaCon.style.transform = "translate(-98%, -50%)";
          setArrow(false);
        } else if (useArrow === false) {
          arrow1.style.transform = "translate(-76%, -50%) rotate(-215deg)";
          arrow2.style.transform = "translate(-76%, -50%) rotate(215deg)";
          themaCon.style.transform = "translate(0%, -50%)";
          today();
          setArrow(true);
        }
      }

      return (
        <>
          <div className="addThemaContainer">
            <div className="addArrow" ref={refArrow} onClick={arrowEvent}>
              <div className="arrowIcon1"></div>
              <div className="arrowIcon2"></div>
            </div>
            <div className="addThemaWrap">
              <form>
                <input
                  type={"date"}
                  className="selCalendar"
                  htmlFor="addDate"
                />
              </form>
              <div className="styleDay">
                <div className="toDay">{getDays}</div>
                <div className="toDate">{getDate}</div>
              </div>
              <input
                placeholder="테마를 입력하세요"
                className="addInputThema"
              ></input>
            </div>
          </div>
        </>
      );
    },
  },
};

export default App;
