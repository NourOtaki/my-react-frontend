// // import React from 'react';
// import styled from 'styled-components';

// const Star = () => {
//   return (
//     <StyledWrapper>
//       <div className="rating -left-56 relative">
//         <input type="radio" id="star-1" name="star-radio" defaultValue="star-1" />
//         <label htmlFor="star-1">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
//         </label>
//         <input type="radio" id="star-2" name="star-radio" defaultValue="star-1" />
//         <label htmlFor="star-2">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
//         </label>
//         <input type="radio" id="star-3" name="star-radio" defaultValue="star-1" />
//         <label htmlFor="star-3">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
//         </label>
//         <input type="radio" id="star-4" name="star-radio" defaultValue="star-1" />
//         <label htmlFor="star-4">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
//         </label>
//         <input type="radio" id="star-5" name="star-radio" defaultValue="star-1" />
//         <label htmlFor="star-5">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
//         </label>
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .rating {
//     display: flex;
//     flex-direction: row-reverse;
//     gap: 0.1rem;
//     --stroke: #666;
//     --fill: #ffc73a;
//   }

//   .rating input {
//     appearance: unset;
//   }

//   .rating label {
//     cursor: pointer;
//   }

//   .rating svg {
//     width: 2rem;
//     height: 2rem;
//     overflow: visible;
//     fill: transparent;
//     stroke: var(--stroke);
//     stroke-linejoin: bevel;
//     stroke-dasharray: 12;
//     animation: idle 4s linear infinite;
//     transition: stroke 0.2s, fill 0.5s;
//   }

//   @keyframes idle {
//     from {
//       stroke-dashoffset: 24;
//     }
//   }

//   .rating label:hover svg {
//     stroke: var(--fill);
//   }

//   .rating input:checked ~ label svg {
//     transition: 0s;
//     animation: idle 4s linear infinite, yippee 0.75s backwards;
//     fill: var(--fill);
//     stroke: var(--fill);
//     stroke-opacity: 0;
//     stroke-dasharray: 0;
//     stroke-linejoin: miter;
//     stroke-width: 8px;
//   }

//   @keyframes yippee {
//     0% {
//       transform: scale(1);
//       fill: var(--fill);
//       fill-opacity: 0;
//       stroke-opacity: 1;
//       stroke: var(--stroke);
//       stroke-dasharray: 10;
//       stroke-width: 1px;
//       stroke-linejoin: bevel;
//     }

//     30% {
//       transform: scale(0);
//       fill: var(--fill);
//       fill-opacity: 0;
//       stroke-opacity: 1;
//       stroke: var(--stroke);
//       stroke-dasharray: 10;
//       stroke-width: 1px;
//       stroke-linejoin: bevel;
//     }

//     30.1% {
//       stroke: var(--fill);
//       stroke-dasharray: 0;
//       stroke-linejoin: miter;
//       stroke-width: 8px;
//     }

//     60% {
//       transform: scale(1.2);
//       fill: var(--fill);
//     }
//   }`;

// export default Star;
// // import React from "react";
// // import styled from "styled-components";

// // const Star = () => {
// //   return (
// //     <StyledWrapper>
// //       <div className="radio-input">
// //         <input
// //           defaultValue="value-1"
// //           name="value-radio"
// //           id="value-1"
// //           type="radio"
// //           className="star s1"
// //         />
// //         <input
// //           defaultValue="value-2"
// //           name="value-radio"
// //           id="value-2"
// //           type="radio"
// //           className="star s2"
// //         />
// //         <input
// //           defaultValue="value-3"
// //           name="value-radio"
// //           id="value-3"
// //           type="radio"
// //           className="star s3"
// //         />
// //         <input
// //           defaultValue="value-4"
// //           name="value-radio"
// //           id="value-4"
// //           type="radio"
// //           className="star s4"
// //         />
// //         <input
// //           defaultValue="value-5"
// //           name="value-radio"
// //           id="value-5"
// //           type="radio"
// //           className="star s5"
// //         />
// //       </div>
// //     </StyledWrapper>
// //   );
// // };

// // const StyledWrapper = styled.div`
// //   .radio-input {
// //     display: flex;
// //     scale: 0.15;
// //     transform: rotate(180deg);
// //   }

// //   .star {
// //     margin: 1em;
// //     appearance: none;
// //     --color:red;
// //     border-left: 6.4721359549996em solid transparent;
// //     border-right: 6.4721359549996em solid transparent;
// //     border-bottom: 4em solid var(--color);
// //     transform: rotate(0deg);
// //     cursor: pointer;
// //   }

// //   .star:before {
// //     content: "";
// //     border-left: 6.4721359549996em solid transparent;
// //     border-right: 6.4721359549996em solid transparent;
// //     border-top: 4em solid var(--color);
// //     position: absolute;
// //     left: -6.4721359549996em;
// //     transform: rotate(108deg);
// //   }

// //   .star:after {
// //     content: "";
// //     border-left: 6.4721359549996em solid transparent;
// //     border-right: 6.4721359549996em solid transparent;
// //     border-top: 4em solid var(--color);
// //     position: absolute;
// //     left: -6.4721359549996em;
// //     transform: rotate(253deg);
// //   }

// //   .radio-input > .star:hover ~ .star,
// //   .radio-input > .star:hover,
// //   .radio-input > .star:checked ~ .star,
// //   .radio-input > .star:checked {
// //     --color: yellow;
// //   }

// //   .radio-input > .star:checked ~ .star,
// //   .radio-input > .star:checked {
// //     animation: rotate 0.5s linear forwards;
// //     transform: rotate(360deg);
// //     transition: transform 0.3s;
// //   }

// //   @keyframes rotate {
// //     0% {
// //       transform: rotate(0deg);
// //     }
// //     50% {
// //       scale: 1.5;
// //     }
// //     100% {
// //       transform: rotate(360deg);
// //     }
// //   }
// // `;

// // export default Star;
