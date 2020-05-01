<template>
  <div class="map">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" class="map-container">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" ref="mapView"/>
      <vl-layer-tile id="osm">
        <vl-source-osm/>
      </vl-layer-tile>
      <vl-feature v-for="office in (contentType === 0 ? offices : [])"
        :key="`marker-${office.name}`">
        <vl-geom-point :coordinates="office.coordinates"></vl-geom-point>
      </vl-feature>
    </vl-map>
    <div class="map-content">
      <nti-input class="content-title" type="dropdown" v-model="contentType"
        :items="contentTypes" primary big/>
      <div class="content-items" v-if="contentType === 0">
        <div class="content-item" v-for="office in offices" :key="office.name"
          @click="goToLocation(office.coordinates)">
          <div class="item-title">
            {{ office.name }}
          </div>
          <div class="item-row">
            <div class="row-title">Статус:</div>
            <div class="row-value">{{ office.status }}</div>
          </div>
          <div class="item-row">
            <div class="row-title">Страна:</div>
            <div class="row-value">{{ office.country }}</div>
          </div>
          <div class="item-row">
            <div class="row-title">Адрес:</div>
            <div class="row-value">{{ office.address }}</div>
          </div>
          <div class="item-row">
            <div class="row-title">Руководитель:</div>
            <div class="row-value">{{ office.manager }}</div>
          </div>
          <div class="item-row">
            <div class="row-title">Число сотрудников:</div>
            <div class="row-value">{{ office.staff }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'Map',
  components: {
    NtiInput,
  },
  data() {
    return {
      contentType: 0,
      contentTypes: [{
        prop: 0,
        text: 'Филиалы',
      }, {
        prop: 1,
        text: 'Грузы',
      }, ],
      zoom: 2,
      center: [0, 0],
      rotation: 0,
    };
  },
  computed: {
    ...mapState('map', ['offices']),
  },
  methods: {
    goToLocation(coordinates) {
      this.$refs.mapView.animate({center: coordinates, zoom: 16});
    }
  },
};
</script>

<style lang="scss" scoped>
.map {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  &-container {
    width: 500px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
  }

  &-content {
    width: 370px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    .content {

      &-title {
        padding: 20px;
        height: 60px;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 10px;
      }

      &-items {
        max-height: 425px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        overflow-x: hidden;
        overflow-y: auto;
      }

      &-item {
        padding: 20px;
        max-width: 370px;
        background: #fff;
        font-family: $bahnschrift;
        border-radius: 10px;

        &:hover {
          cursor: pointer;
        }

        &:not(:last-child) {
          margin-bottom: 15px;
        }

        .item {

          &-title {
            margin-bottom: 10px;
            font-size: 16px;
          }

          &-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 14px;

            &:not(:last-child) {
              margin-bottom: 10px;
            }

            .row {

              &-title {
                min-width: 125px;
                color: $neutralDarker;
              }

              &-value {
                color: #000;
                text-align: right;
              }

            }

          }

        }

      }

    }

  }

}
</style>