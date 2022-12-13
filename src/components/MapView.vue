<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    onMounted(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(initMap);
        script.src =
          "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=56c80471f2bba86088d7e13e757c4323";
        document.head.appendChild(script);
      }
    });

    const initMap = () => {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.3432, 127.947613), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };
      var map = new kakao.maps.Map(mapContainer, mapOption); //eslint-disable-line no-unused-vars
      var positions = [
        {// 서울
          latlng: new kakao.maps.LatLng(37.566826, 126.9786567),
        },
        {// 강릉
          latlng: new kakao.maps.LatLng(37.791688035246636, 128.82867301427635),
        },
        {// 대구
          latlng: new kakao.maps.LatLng(35.871148697228875, 128.61345034272617),
        },
        {// 부산
          latlng: new kakao.maps.LatLng(5.185997613083536, 129.0662809358643),
        },
        {// 제주
          latlng: new kakao.maps.LatLng(33.5097, 126.5219),
        },
      ];

      // 마커를 생성합니다.
      positions.forEach(function (pos) {
        var marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        // 마커가 지도 위에 표시되도록 설정합니다.
        marker.setMap(map);
      });
    };

    return { initMap };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>