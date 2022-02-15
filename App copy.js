// import React, { useState, useReducer, useEffect } from "react";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <div className="container">
//         <div className="mainLayout">
//           <div className="themaSlideWrap">
//             <Components.Slide.SlideWorkWrap />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// let Components = {
//   Slide: {
//     init: function () {
//       return {
//         startX: 0,
//         moveX: 0,
//         beforeMoveX: 0,
//         endX: 0,
//         mouseState: "up",
//         downTarget: {},
//         moveTarget: {},
//         upTarget: {},
//       };
//     },
//     reducer: function (state, action) {
//       switch (action.type) {
//         case "down": {
//           return {
//             type: "move",
//             startX: action.startX,
//             mouseState: "down",
//             beforeMoveX: action.startX,
//           };
//         }
//         case "move": {
//           if (state.mouseState === "down") {
//             return {
//               beforeMoveX: state.moveX,
//               moveX: action.moveX,
//               startX: state.startX,
//               mouseState: state.mouseState,
//               endX: state.startX,
//             };
//           } else {
//             return {
//               moveX: state.moveX,
//               beforeMoveX: state.beforeMoveX,
//               startX: state.startX,
//               endX: state.endX,
//             };
//           }
//         }
//         case "up": {
//           return {
//             endX: action.endX,
//             beforeMoveX: state.beforeMoveX,
//             mouseState: "up",
//             moveX: state.moveX,
//             startX: state.startX,
//           };
//         }
//         case "leave": {
//           return {
//             mouseState: "up",
//             endX: state.endX,
//             moveX: state.moveX,
//             beforeMoveX: state.beforeMoveX,
//             startX: state.startX,
//           };
//         }
//       }
//     },
//     SlideWorkWrap: function () {
//       const [state, dispatch] = useReducer(
//         Components.Slide.reducer,
//         Components.Slide.init
//       );
//       function slide() {
//         if (state.mouseState === "down") {
//           const myImg = document.querySelectorAll(`.themaItem`);
//           let wrap = 0;
//           // console.dir(myImg);
//           myImg.forEach((e) => {
//             wrap = wrap + e.offsetWidth + 10;
//           });
//           // console.dir(`wrap : ${wrap}`);
//           // console.log(`move:${state.moveX}`);
//           // console.log(`before:${state.beforeMoveX}`);
//           if (state.beforeMoveX < state.moveX) {
//             myImg.forEach((e) => {
//               // if (
//               //   e.offsetLeft < wrap &&
//               //   myImg[myImg.length - 1].offsetLeft !== wrap //wrap의 길이만큼 슬라이드 되도록
//               // )
//               e.style.left = `${e.offsetLeft - 9}px`; // left : 10px 단위로 움직이기 때문에 -8.7 은 left : 1.3px 단위로 움직임
//             });
//           } else if (state.beforeMoveX > state.moveX) {
//             myImg.forEach((e) => {
//               // if (
//               //   e.offsetLeft > -1 * wrap &&
//               //   myImg[0].offsetLeft !== (-1 * wrap) / 1.5 //wrap / 1.5의 길이만큼 슬라이드 되도록
//               // )
//               e.style.left = `${e.offsetLeft - 11}px`; // 위와 마찬가지로 1.2픽셀 단위로 움직임
//             });
//           }
//           // console.dir(myImg[1].offsetLeft);
//         }
//       }
//       return (
//         <>
//           <div
//             className="slideWorkWrap"
//             onMouseDown={(e) => {
//               dispatch({
//                 type: "down",
//                 startX: e.clientX,
//               });
//             }}
//             onMouseMove={(e) => {
//               dispatch({
//                 type: "move",
//                 moveX: e.clientX,
//               });
//               slide();
//             }}
//             onMouseUp={(e) => {
//               dispatch({ type: "up", endX: e.clientX });
//             }}
//             onMouseLeave={(e) => {
//               dispatch({ type: "leave" });
//             }}
//           >
//             <div className="themaItem nowThema"></div>
//             <div className="themaItem" style={{ left: `612px` }}></div>
//           </div>
//         </>
//       );
//     },
//   },
// };

// export default App;

// 여기 위는 마우스 드래그 슬라이드
// 아래는 css 이용한 드래그 슬라이드
import React, { useState, useReducer, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="mainLayout">
          <div className="themaSlideWrap">
            <Components.Slide.SlideWorkWrap />
          </div>
        </div>
      </div>
    </div>
  );
}

let Components = {
  Slide: {
    init: function () {
      return {
        startX: 0,
        moveX: 0,
        beforeMoveX: 0,
        endX: 0,
        mouseState: "up",
        downTarget: {},
        moveTarget: {},
        upTarget: {},
      };
    },
    reducer: function (state, action) {
      switch (action.type) {
        case "down": {
          return {
            type: "move",
            startX: action.startX,
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
              mouseState: state.mouseState,
              endX: state.startX,
            };
          } else {
            return {
              moveX: state.moveX,
              beforeMoveX: state.beforeMoveX,
              startX: state.startX,
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
            startX: state.startX,
          };
        }
        case "leave": {
          return {
            mouseState: "up",
            endX: state.endX,
            moveX: state.moveX,
            beforeMoveX: state.beforeMoveX,
            startX: state.startX,
          };
        }
      }
    },
    SlideWorkWrap: function () {
      const [state, dispatch] = useReducer(
        Components.Slide.reducer,
        Components.Slide.init
      );
      let timeout;
      function slide(e) {
        const themaAll = e.target.querySelectorAll(`.themaItem`);
        if (themaAll.length > 1) {
          if (state.mouseState === "down") {
            const initThema = e.target.querySelector(".initThema");
            const nowThema = e.target.querySelector(".nowThema");
            const nextThema = e.target.querySelector(".nextThema");
            const prevThema = e.target.querySelector(".prevThema");
            const afterThema = nextThema.nextElementSibling;
            const getNowLeft = nowThema.offsetLeft;
            const getNowWidth = nowThema.offsetWidth;
            let getAfterLeft;
            let getAfterWidth;
            if (afterThema != null) {
              getAfterLeft = afterThema.offsetLeft;
              getAfterWidth = afterThema.offsetWidth;
            }
            // console.dir(initThema);
            console.dir(themaAll);
            console.dir(nextThema);
            // console.log(nextThemaIndex);
            // console.dir(afterThema);
            // console.dir(rectNowThema);
            // console.log(`start:${state.startX}`);
            // console.log(`move:${state.moveX}`);
            // console.log(`before:${state.beforeMoveX}`);
            clearTimeout(timeout);
            if (state.startX - state.moveX > 80) {
              if (afterThema != null) {
                afterThema.style.left = `${getAfterLeft - 311}px`;
              }
              nextThema.style.left = `${nextThema.offsetLeft - 311}px`;
              nowThema.style.left = `${getNowLeft - getNowWidth - 61}px`;
              if (prevThema != null) {
                prevThema.style.left = `${prevThema.offsetLeft - 311}px`;
              }
              timeout = setTimeout((e) => {
                nowThema.classList.add("prevThema");
                nowThema.classList.remove("nowThema");
                nextThema.classList.add("nowThema");
                nextThema.classList.remove("nextThema");
                if (afterThema != null) {
                  afterThema.classList.add("nextThema");
                }
              }, 100);
            } else if (state.startX > state.moveX) {
            }
          }
        }
      }
      return (
        <>
          <div
            className="slideWorkWrap"
            onMouseDown={(e) => {
              dispatch({
                type: "down",
                startX: e.clientX,
              });
            }}
            onMouseMove={(e) => {
              dispatch({
                type: "move",
                moveX: e.clientX,
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
            <div className="themaItem initThema nowThema "></div>
            <div
              className="themaItem nextThema"
              style={{ left: `500px` }}
            ></div>
            <div className="themaItem " style={{ left: `811px` }}></div>
          </div>
        </>
      );
    },
  },
};

export default App;
