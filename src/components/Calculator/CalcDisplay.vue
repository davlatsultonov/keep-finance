<template>
  <div id="display">
    <div id="displayText">
      <div id="leftOf">{{ displayValue }}</div>
      <div id="blinker">
        <Blinker/>
      </div>
    </div>
    <div id="subText"><p>{{ subDisplayValue }}</p></div>
  </div>
</template>

<script>
import Blinker from './CalcBlinker'
import Velocity from 'velocity-animate'

export default {
  name: 'CalcDisplay',
  components: {
    Blinker
  },
  props: {
    displayValue: String,
    subDisplayValue: String
  },
  mounted: function () {
    this.onLoady()
  },
  methods: {
    onLoady: function () {
      Velocity(document.getElementById('blinker'), { opacity: 0 }, { loop: true })
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

#display {
  width: 100%;
  border-radius: 5px;
  height: 120px;
  float: right;
}

#leftOf {
  width: 99.75%;
}

#blinker {
  width: 1.00%;
}

#displayText, #subText {
  font-family: 'Lato', sans-serif;
  text-align: right;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#displayText {
  display: flex;
  align-items: center;
  padding-right: 5px;
  height: 60px;
  font-size: 3em;
  background-color: #676767;
  color: #f9f9f9;
}

#subText {
  height: 60px;
  font-size: 1.5em;
  color: #38908f;
  border: none;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  padding-left: 15px;

  p {
    margin-bottom: 0;
  }
}
</style>
