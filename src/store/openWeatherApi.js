import axios from "axios";

export default {
  // 하나의 store에서 모듈화하여 사용될 수 있음을 명시적으로 나타내는 개념
  namespaced: true,
  // state: 실제로 취급해야하는 데이터
  state: {},
  // getters: 계산된 상태의 데이터를 만들어내는 속성
  // computed와 비슷한 기능
  getters: {},
  // mutation, actions: methods와 유사한 기능
  // 1. mutation: 변이 메서드, 우리가 관리하는 데이터(state)를 변경시켜줄 수 있다.
  // 즉, state 안의 데이터는 오직 mutations에서만 데이터 변경 가능
  mutation: {},
  // 2. actions: **특정한 데이터를 직접적으로 수정하는 것이 허용되지 않음
  // 비동기로 동작
  actions: {}
  // actions 부분에서는 mutations처럼 state를 바로 불러올 수 없고,
  // context라는 객체 데이러를 호출하여 context를 참조하여 데이터를 불러옴
  // context 안에는 state, getters, mutation을 활용할 수 있는 내용이 들어있다.
  // mutations을 호출하기 위해서는 context.commit('mutations이름', payload)의 형식으로 호출
  // 객체 구조분해하여 불러올 수도 있다.

  // OpenweatherAPI 호출
};
