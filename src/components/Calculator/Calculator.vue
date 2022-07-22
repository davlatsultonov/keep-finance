<template>
  <div id="calcWrapper">
    <Display :displayValue="dispValue" :subDisplayValue="subDispValue"></Display>
    <Button v-for="b in buttons"
            v-bind:key="b.id"
            v-bind:bValues="b"
            v-on:handle-press="handlePress"
            v-bind:style="b.id === 1 ? bStyleObjectLarge:  bStyleObjectRegular">
    </Button>
  </div>
</template>

<script>
import Display from './CalcDisplay'
import Button from './CalcButton'

export default {
  name: 'Calculator',
  data: function () {
    return {
      dispValue: '0',
      subDispValue: '',
      prevValue: '0',
      prevOp: '=',
      opInEffect: false,
      bStyleObjectRegular: {
        width: '25%'
      },
      bStyleObjectLarge: {
        width: '49.9%'
      },
      buttons: [
        {
          id: 1,
          name: 'AC',
          isReg: true,
          isOp: false
        },
        {
          id: 2,
          name: 'C',
          isReg: true,
          isOp: false
        },
        {
          id: 3,
          name: '/',
          isReg: false,
          isOp: true
        },
        {
          id: 4,
          name: '7',
          isReg: true,
          isOp: false
        },
        {
          id: 5,
          name: '8',
          isReg: true,
          isOp: false
        },
        {
          id: 6,
          name: '9',
          isReg: true,
          isOp: false
        },
        {
          id: 7,
          name: 'x',
          isReg: false,
          isOp: true
        },
        {
          id: 8,
          name: '4',
          isReg: true,
          isOp: false
        },
        {
          id: 9,
          name: '5',
          isReg: true,
          isOp: false
        },
        {
          id: 10,
          name: '6',
          isReg: true,
          isOp: false
        },
        {
          id: 11,
          name: '+',
          isReg: false,
          isOp: true
        },
        {
          id: 12,
          name: '1',
          isReg: true,
          isOp: false
        },
        {
          id: 13,
          name: '2',
          isReg: true,
          isOp: false
        },
        {
          id: 14,
          name: '3',
          isReg: true,
          isOp: false
        },
        {
          id: 15,
          name: '-',
          isReg: false,
          isOp: true
        },
        {
          id: 16,
          name: '0',
          isReg: true,
          isOp: false
        },
        {
          id: 17,
          name: '.',
          isReg: true,
          isOp: false
        },
        {
          id: 18,
          name: '\u00b1',
          isReg: true,
          isOp: false
        },
        {
          id: 19,
          name: '=',
          isReg: false,
          isOp: true
        }
      ]
    }
  },
  components: {
    Display,
    Button
  },
  methods: {
    handlePress: function (event) {
      var number = event.textContent.trim()
      switch (number) {
        case 'AC':
          this.clearAll()
          break
        case 'C':
          this.clearDisplay()
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.numberPressed(number)
          break
        case '+':
          this.computeOp('+')
          break
        case '-':
          this.computeOp('-')
          break
        case '/':
          this.computeOp('/')
          break
        case 'x':
          this.computeOp('x')
          break
        case '=':
          this.equalPressed()
          break
        case '.':
          this.addPoint()
          break
        case '\u00b1':
          this.negateValue()
          break
        default:
          alert('KEY ERROR: in default')
      }
    },
    negateValue: function () {
      if (this.dispValue !== '0') {
        if (this.dispValue.indexOf('-') < 0) {
          this.dispValue = '-' + this.dispValue
        } else {
          this.dispValue = this.dispValue.substring(1)
        }
      }
    },
    addPoint: function () {
      if (this.dispValue.indexOf('.') < 0) {
        this.dispValue += '.'
      }
    },
    equalPressed: function () {
      try {
        this.computeEqual(this.prevValue, this.dispValue, this.prevOp)
        this.subDispValue = ''
      } catch (e) {
        alert(e)
      }
    },
    numberPressed: function (number) {
      this.opInEffect = false
      if (this.dispValue === '0') {
        this.dispValue = number
      } else {
        if (this.dispValue.length >= 15) {
          alert('KEY ERROR: Display limit reached')
        } else {
          this.dispValue += number
        }
      }
    },
    computePlus: function () {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '+')
    },
    computeSub: function () {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '-')
    },
    computeDiv: function () {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '/')
    },
    computeMult: function () {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, 'x')
    },
    computeOps: function (a, b, sign) {
      let result = 0

      switch (sign) {
        case '+':
          result = a + b
          break
        case '-':
          result = a + b
          break
        case '/':
          result = a + b
          break
        case '*':
          result = a + b
          break
      }
      return result
    },
    computeOp: function (op) {
      if (!this.opInEffect) {
        try {
          this.computeEqual(this.prevValue, this.dispValue, this.prevOp)
          this.prevValue = this.dispValue
          this.dispValue = '0'
          this.prevOp = op
          this.subDispValue = this.prevValue.toString() + ' ' + this.prevOp + '    '
          this.opInEffect = true
        } catch (e) {
          alert(e)
        }
      }
    },
    computeEqual: function (op1, op2, op) {
      const op1Num = parseFloat(op1)
      const op2Num = parseFloat(op2)
      let result = 0
      if (op === '+') {
        result = op1Num + op2Num
      } else if (op === '-') {
        result = op1Num - op2Num
      } else if (op === 'x') {
        result = op1Num * op2Num
      } else if (op === '/') {
        if (op2Num === 0) {
          // eslint-disable-next-line no-throw-literal
          throw 'MATH ERROR: Cannot divide by 0'
        } else {
          result = op1Num / op2Num
        }
      } else {
        result = op2Num
      }
      const temp = result.toString()
      if (temp.length >= 15) {
        // eslint-disable-next-line no-throw-literal
        throw 'DISPLAY ERROR: Computation result will not fit on display. Use C or AC to perform a simpler computation.'
      }
      this.dispValue = temp
      this.prevValue = '0'
      this.prevOp = '='
    },
    clearDisplay: function () {
      this.dispValue = '0'
    },
    clearAll: function () {
      this.clearDisplay()
      this.prevValue = '0'
      this.prevOp = '='
      this.subDispValue = ''
      this.opInEffect = false
    }
  }
}
</script>

<style scoped>
#calcWrapper {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  border: 15px solid black;
  border-radius: 5px;
  height: 700px;
  overflow: hidden;
  box-shadow: 5px 5px 5px #4b4b4c;
}

@media screen and (min-width: 768px) {
  #calcWrapper {
    width: 40%;
    margin: auto;
  }
}
</style>
