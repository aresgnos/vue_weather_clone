<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ item.cityName }}</p>
        <p>{{ item.currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>{{ Math.round(item.currentTemp) }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="@/assets/images/01d.png" alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div
            v-for="temporary in item.temporaryData"
            :key="temporary"
            class="detailData"
          >
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div
          class="timelyWeather"
          v-for="(weather, i) in item.arrayWeather"
          :key="i"
        >
          <div class="icon">
            <img src="@/assets/images/01n.png " />
          </div>
          <div class="data">
            <p class="time">{{ weather.name }}</p>
            <p class="currentDegree">{{ Math.round(weather.main.temp) }}&deg;</p>
            <div>
              <img src="@/assets/images/drop.png" />
              <p class="fall">{{ weather.main.humidity }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <a>1</a>
      <a>2</a>
      <a>3</a>
      <a>4</a>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { reactive } from "@vue/reactivity";
dayjs.locale("ko"); // global로 한국어 locale 사용

export default {
  setup() {
    const item = reactive({
      // 현재 시간을 나타내기 위한 Dayjs 플러그인 사용
      currentTime: dayjs().format("YYYY. MM .DD. ddd"),
      // 현재 시간에 따른 현재 온도 데이터
      currentTemp: "",
      temp: [],
      icons: [],
      arrayWeather: [],
      cityName: "",
      // 임시 데이터
      temporaryData: [
        {
          title: "습도",
          value: "",
        },
        {
          title: "풍속",
          value: "",
        },
        {
          title: "체감온도",
          value: "",
        },
      ],
    });

    // 초기 데이터 선언을 위한 코드 작성
    const API_KEY = "287badc8e5f12951018a81a6c07a93a8";
    const initialLat = 36.5638;
    const initialLon = 126.9778;

    // get() 메서드를 통해서 우리가 필요로하는 API 데이터를 호출한다.
    // `https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/find?lat=${initialLat}&lon=${initialLon}&cnt=10&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log(response);
        const mainCity = response.data.list[3];
        item.cityName = mainCity.name;
        console.log(item.cityName);
        item.currentTemp = mainCity.main.temp;
        console.log(item.currentTemp);
        item.temporaryData[0].value = mainCity.main.humidity + "%";
        item.temporaryData[1].value = mainCity.wind.speed + "m/s";
        item.temporaryData[2].value = mainCity.main.feels_like + "도";
        // 지역별 날씨 데이터를 제어
        // item.arrayWeather = response.data.list;
        // console.log(item.arrayWeather);
        for (let i = 0; i < 10; i++) {
          item.arrayWeather[i] = response.data.list[i];
        }
        console.log("item.arrayWeather", item.arrayWeather);
      })
      .catch((error) => {
        console.log(error);
      });

    return { API_KEY, item };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

.leftContainer {
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#16455f, #0e1239);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: "Poppins", sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
          width: 241px;
          height: 0px;
          font-size: 1.35rem;
        }
        &:last-child {
          width: 160px;
          height: 10px;
          font-size: 0.9rem;
          font-weight: 100;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: 62.5%;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #052137;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;

          &.forecast {
            background-color: #0889ff;
            color: white;
          }

          &.airquality {
            background: transparent;
            color: #467599;
          }
        }
      }
    }

    .weatherBox {
      width: 100%;
      height: 80%;

      .weatherDegree {
        @include center;
        width: 100%;
        height: 15%;

        p {
          font-size: 3.5rem;
          font-weight: 500;
          font-family: "Be Vietnam Pro", sans-serif;
          color: white;
        }
      }

      .weatherIcon {
        @include center;
        width: 100%;
        height: 60%;

        img {
          width: 168px;
          height: 160px;
        }
      }

      .weatherData {
        display: flex;
        width: 100%;
        height: 20%;

        .detailData {
          @include c-center;
          width: 33.33%;
          height: 50%;

          // 레이아웃이 3개이기 때문에
          // 동일한 레이아웃을 반복시킴
          &:nth-child(1) {
            margin-left: 10px;
          }
          &:nth-child(2) {
            margin-left: 0 -10px;
          }
          &:nth-child(3) {
            margin-left: 10px;
          }

          p {
            line-height: 1.5;
            color: white;
            margin-bottom: -10px;

            &:first-child {
              font-size: 1rem;
              font-weight: 300;
              font-family: "Noto Sans KR", sans-serif;
              color: #799ed0;
            }
            &:last-child {
              font-size: 1rem;
              font-weight: 200;
              font-family: "Poppins", sans-serif;
              color: #799ed0;
            }
          }
        }
      }
    }
  }

  #todayWeather {
    width: 100%;
    height: 17.5%;

    .textBox {
      @include center-sb;
      width: calc(100% - 70px);
      height: 35%;
      padding: 0 35px;
      font-family: "Noto Sans KR", sans-serif;

      p {
        font-weight: 400;
        font-size: 0.8rem;
        color: white;
        text-align: center;

        &:last-child {
          font-weight: 400;
          font-size: 0.8rem;
          color: #0085ff;
          cursor: pointer;
          margin-bottom: 2px;
        }
      }
    }

    .timelyWeatherBox {
      display: flex;
      align-items: center;
      width: calc(100% - 70px);
      height: 65%;
      padding: 0 30px;
      overflow: scroll;

      -ms-overflow-style: none; // IE and Edge
      scrollbar-width: none; // Firefox
      &::-webkit-scrollbar {
        // Chrome, Safari, Opera
        display: none;
      }

      .timelyWeather {
        display: flex;
        min-width: 126px;
        width: 126px;
        height: 70px;
        background-color: #0989ff;
        border-radius: 20px;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
        }

        .icon {
          @include center;
          width: 45%;
          height: 100%;

          img {
            width: 100%;
          }
        }

        .data {
          @include c-center-se;
          width: 55%;
          height: 100%;
          margin-top: -7px;

          p {
            color: whitesmoke;
            font-family: "Poppins", sans-serif;
            text-align: center;
            margin-top: 10px;
            margin-bottom: -10px;

            &.time {
              font-size: 0.8rem;
              font-weight: 200;
              // margin-top: 7.5px;
            }

            &.currentDegree {
              font-size: 1.2rem;
              // margin-top: 7.5px;
            }
          }

          div {
            @include center;
            width: 100%;
            height: 33.33%;

            img {
              height: 55%;
              margin-top: 15px;
            }

            .fall {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  nav {
    @include center-sb;
    widows: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    a {
      color: white;
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #799ed0;
      }
    }
  }
}
</style>