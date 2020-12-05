<template>
  <v-input
      :value="masker.value"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="className"
      @input="handleInput"
  >
    <template v-if="iconLeft" #prepend>
      <v-icon :name="iconLeft"/>
    </template>
    <template v-if="iconRight" #append>
      <v-icon :name="iconRight"/>
    </template>
  </v-input>
</template>

<script>
import IMask from 'imask'

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    font: {
      type: String,
      default: 'sans-serif',
    },
    storeMasked: {
      type: Boolean,
      default: true,
    },
    transform: {
      type: String,
      default: '',
    },
    masks: {
      type: Array,
      default: () => [],
    },

  },

  methods: {
    handleInput: function (value) {
      this.masker.resolve(value)
      let finalValue = this.$props.storeMasked ? this.masker.value : this.masker.unmaskedValue;
      if (this.$props.transform === 'uppercase') {
        finalValue = finalValue.toUpperCase()
      } else if (this.$props.transform === 'lowercase') {
        finalValue = finalValue.toLowerCase()
      }
      this.$emit('input', finalValue)
    },
    buildMaskConfig: function () {
      return {
        mask: this.$props.masks.map((item) => {
          let pattern = item.mask
          if (item.type === 'regex') {
            try {
              pattern = new RegExp(item.mask)
            }
            catch (error) {
              return null
            }
          }
          return {
            mask: pattern,
          }
        }).filter((i) => !!i),
      }
    },
  },

  watch: {
    value: function(newValue, oldValue) {
      if (oldValue === null) {
        this.masker.resolve(newValue)
      }
    }
  },

  computed: {
    className: function() {
      return {
        [this.$props.font]: true,
        invalid: this.value && !this.masker.isComplete,
      }
    },
  },

  data: function () {

    window.hh = this
    window.IMask = IMask;
    return {
      masker: IMask.createMask(this.buildMaskConfig())
    }
  },

}
</script>

<style lang="css" scoped>
.monospace {
  --v-input-font-family: var(--family-monospace);
}

.serif {
  --v-input-font-family: var(--family-serif);
}

.sans-serif {
  --v-input-font-family: var(--family-sans-serif);
}

.invalid >>> .input {
  border-color: var(--warning) !important;
}
</style>
