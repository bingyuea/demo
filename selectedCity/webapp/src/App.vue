<template>
  <div id="app">
      <search @txtdata="searchText" :clearText="clearSearch"></search>
      <transition name="list">
        <search-list v-if="associationShow" :searchListContent="searchListContent" @changeName="changeCity"></search-list>
      </transition>
      <scroll :data="citylist" ref="suggest" :probeType="3" :listenScroll="true" @distance="distance" @scrollStore="scrollStore">
        <div>
          <position-box :chooseCity="chooseCity" :orientate="nowCity" :historyCityArr="historyCityArr" @changeCity="changeCity"></position-box>
          <city-list :citylist="citylist" :elementIndex="elementIndex" @positionCity="changeCity" @singleLetter="singleLetter"></city-list>
        </div>
      </scroll>
      <nav-list :navList="cityIndexList" @toElement="toElement" :flagText="flagText"></nav-list>
      <mask-box v-if="maskShow" :message="maskMessage" @chooseing="chooseResult"></mask-box>
      <transition name="flag">
        <div class="nowFlag" v-if="flag">{{flagText}}</div>
      </transition>
    </div>
</template>

<script>
  import axios from 'axios'
  import Search from './components/Search'
  import Scroll from './base/Scroll.vue'
  import PositionBox from './components/PositionBox'
  import CityList from './components/CityList'
  import NavList from './components/NavList'
  import MaskBox from './components/MaskBox'
  import SearchList from './components/SearchList'
  import { getSearchList } from './common/js/search'
  import { getDistance } from './common/js/dom'
export default {
  name: 'App',
  components: {
    'search': Search,
    'scroll': Scroll,
    'position-box': PositionBox,
    'nav-list': NavList,
    'city-list': CityList,
    'mask-box': MaskBox,
    'search-list': SearchList
  },
  data(){
    return{
      nowCity: '', // 当前所在的城市
      choiceCity: '', // 点击即将查看的城市
      choiceCityName: '', // 选择查看的城市
      citylist: [], // 城市列表
      cityIndexList: ['顶'], // 右边导航栏列表
    }
  },
  methods:{
    // 获取当前所在城市
    getNowCity(){
      axios.get('http://localhost:1234/nowcity').then((res) => {
        this.nowCity  = res.data.city;
        if (!this.choiceCity && !this.choiceCityName) {
          this.choiceCity = this.nowCity
          this.choiceCityName = this.nowCity
        }
      },() => {
        this.nowCity = '北京'
        if (!this.choiceCity && !this.choiceCityName) {
          this.choiceCity = this.nowCity
          this.choiceCityName = this.nowCity
        }
      })
    },
    // 获取城市列表
    getCityListApi () {
      axios.get('http://localhost:1234/').then((res) => {
        this.citylist = res.data.openCityList
        this.citylist.map((item) => {
          this.cityIndexList.push(item[0])
        })
      })
    },
  },
  created(){
    this.getNowCity();
    this.getCityListApi();
  }
}
</script>

<style lang="stylus">
  @import 'common/stylus/index.styl'
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    .nowFlag
      width 50px
      height 50px
      background #4395ff
      color #fff
      font-size 30px
      font-weight 900
      line-height 50px
      text-align center
      position absolute
      top 60px
      left 50%
      margin-left -25px
  .list-enter-active, .list-leave-active
    transition all 0.5s
  .list-enter
    opacity 0
  .list-leave-to
    transform scale(0, 0)
    opacity 0
  .flag-leave-active
    transition all 1s
  .flag-leave-to
    opacity 0
</style>
