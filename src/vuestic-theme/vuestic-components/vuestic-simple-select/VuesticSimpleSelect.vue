<template>
  <div class="vuestic-simple-select">
    <div
      class="form-group with-icon-right dropdown select-form-group"
      v-dropdown="{ isBlocked: true, onDropdownClose: onDropdownClose }"
      :class="{'has-error': hasErrors()}"
    >
      <div class="input-group dropdown-toggle vuestic-simple-select__dropdown-toggle">
        <div>
          <input
            @focus="showDropdown()"
            :class="{'has-value': !!value}"
            v-model="displayValue"
            :name="name"
            :options="options"
            autocomplete="off"
            placeholder=""
            readonly
          />
          <label class="control-label">{{label}}</label>
          <i class="bar" />
          <small v-show="hasErrors()" class="help text-danger">{{ showRequiredError() }}</small>
        </div>
        <i
          class="ion ion-ios-arrow-down icon-right input-icon vuestic-simple-select__dropdown-arrow"
        />
      </div>
      <div v-if="isClearable">
        <i
          class="fa fa-close icon-cross icon-right input-icon vuestic-simple-select__unselect"
          @click="unselectOption"
          v-if="!this.unselectDisabled"
        />
      </div>
      <div
        class="dropdown-menu vuestic-simple-select__dropdown-menu"
        aria-labelledby="dropdownMenuButton"
      >
        <scrollbar ref="scrollbar">
          <div class="dropdown-menu-content vuestic-simple-select__dropdown-menu-content">
            <div class="bs-searchbox not-collapse" v-if="showSearchBox">
              <input
                type="text"
                class="keyword not-collapse"
                @keyup="filterSelection"
                v-model="filterInput"
                :placeholder="searchText"
                ref="search"
              />
            </div>
            <div
              class="dropdown-item vuestic-simple-select__dropdown-item"
              v-for="(option, index) in filterOptions"
              :key="index"
              :class="{'selected': isOptionSelected(option), 'noclick': (option.title === 'RoleTitle')}"
              @click="toggleSelection(option)"
            >
              <span
                class="ellipsis"
                :title="optionKey ? getOptionDetail(option, optionKey) : option"
              >
                <span v-if="option.showIcon">
                  <i
                    :class="option.iconClass"
                    :style="{'color': option.iconColor}"
                    aria-hidden="true"
                  ></i>
                  <span style="margin-left:5px;"></span>
                </span>
                {{optionKey ? getOptionDetail(option, optionKey) : option}}
              </span>
            </div>
          </div>
        </scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from 'vuestic-directives/Dropdown'
import Scrollbar from '../vuestic-scrollbar/VuesticScrollbar.vue'
export default {
  name: 'vuestic-simple-select',
  components: {
    Scrollbar
  },
  directives: {
    dropdown: Dropdown
  },
  props: {
    label: String,
    options: Array,
    value: {
      default: '',
      required: true
    },
    optionKey: String,
    required: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: 'simple-select'
    },
    unselectDisabled: {
      type: Boolean,
      default: false
    },
    notCollapse: {
      type: Boolean,
      default: false
    },
    showSearchBox: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
      default: 'Search...'
    }
  },
  data () {
    return {
      validated: false,
      displayValue: this.value || '',
      selectedValue: this.value,
      filterInput: '',
      filterOptions: []
    }
  },
  watch: {
    value: {
      handler (value) {
        if (!value || !this.optionKey) {
          this.displayValue = value || ''
          this.selectedValue = value || ''
          return
        }
        this.selectedValue = this.getOptionDetail(value, this.optionKey)
        this.displayValue = this.getOptionDetail(value, this.optionKey)
      },
      immediate: true
    },
    options: {
      handler (value) {
        this.filterOptions = this.options
      },
      immediate: true // 聲明此方法後，立即執行一次
    }
  },
  computed: {
    // filteredList () {
    //   return this.options
    //   /* const optionKey = this.optionKey
    //   const displayValue = this.displayValue
    //   if (displayValue === '') {
    //     return this.options
    //   } else {
    //     // HACK This is done poorly.
    //     return this.options.filter(function (item) {
    //       if (optionKey && item && item[optionKey]) {
    //         // option is object
    //         if (displayValue) {
    //           return item[optionKey].toLowerCase()
    //             .search(displayValue.toLowerCase()) === 0
    //         }
    //       } else {
    //         // option is string
    //         return (item + '').toLowerCase()
    //           .search(displayValue.toLowerCase()) === 0
    //       }
    //     })
    //   } */
    // },
    isClearable () {
      return (
        this.clearable &&
        this.selectedValue !== '' &&
        this.displayValue !== '' &&
        this.selectedValue !== undefined
      )
    },
    placeholder () {
      if (this.optionKey && this.selectedValue) {
        return this.getOptionDetail(this.selectedValue, this.optionKey)
      } else {
        return this.selectedValue
      }
    }
  },
  methods: {
    getOptionDetail (option, optionKey) {
      if (option[optionKey]) {
        let optionSplit = option[optionKey].split(' ')
        switch (optionSplit[1]) {
          case 'minutes':
            return optionKey
              ? optionSplit[0] + ' 分'
              : option
          case 'seconds':
            return optionKey
              ? optionSplit[0] + ' 秒'
              : option
          default:
            return optionKey ? option[optionKey] : option
        }
      }
    },
    onDropdownClose () {
      if (!this.value) {
        this.displayValue = ''
      }
      if (this.value) {
        if (this.optionKey) {
          this.displayValue = this.getOptionDetail(this.value, this.optionKey)
        } else {
          this.displayValue = this.value
        }
      }
    },
    toggleSelection (option) {
      if (this.value !== option) {
        this.isOptionSelected(option)
          ? this.unselectOption()
          : this.selectOption(option)
      }
    },
    unselectOption () {
      if (!this.unselectDisabled) {
        this.selectedValue = ''
        this.$emit('input', this.selectedValue)
      }
    },
    showDropdown () {
      this.displayValue = ''
      let that = this
      setTimeout(function () {
        if (that.showSearchBox) {
          that.$refs.search.focus()
        }
      }, 200)
    },
    isOptionSelected (option) {
      if (this.optionKey) {
        return (
          this.selectedValue === this.getOptionDetail(option, this.optionKey)
        )
      } else {
        return this.selectedValue === option
      }
    },
    selectOption (option) {
      if (!option) {
        this.displayValue = ''
      }
      if (option && this.optionKey) {
        this.displayValue = this.getOptionDetail(option, this.optionKey)
      }
      this.selectedValue = option
      this.$emit('input', option)
      this.resetSelection()
    },
    validate () {
      this.validated = true
    },
    isValid () {
      let isValid = true
      if (this.required) {
        isValid = !!this.value
      }
      return isValid
    },
    hasErrors () {
      let hasErrors = false
      if (this.required) {
        hasErrors = this.validated && !this.value
      }
      return hasErrors
    },
    showRequiredError () {
      return `The ${this.name} field is required`
    },
    filterSelection (event) {
      let that = this
      if (event.keyCode === 13) {
        for (let i = 0; i < this.filterOptions.length; i++) {
          let option = this.filterOptions[i]
          if (!this.isOptionSelected(option)) {
            this.selectOption(option)
            break
          }
        }
        document.getElementsByTagName('body')[0].click()
        this.resetSelection()
      }
      if (this.filterInput.trim()) {
        this.filterOptions = this.options.filter(function (option, index) {
          let value = that.optionKey ? option[that.optionKey] : option
          return (
            value.toLowerCase().indexOf(that.filterInput.trim().toLowerCase()) >
            -1
          )
        })
      } else {
        this.filterOptions = this.options
      }
    },
    resetSelection () {
      this.filterInput = ''
      this.filterOptions = this.options
    }
  }
}
</script>

<style lang="scss">
.vuestic-simple-select {
  &__unselect {
    margin-right: 20px;
    cursor: pointer;
  }
  .vuestic-simple-select__dropdown-arrow.vuestic-simple-select__dropdown-arrow {
    top: 12px;
    //cursor: pointer;
  }
  &__dropdown-menu {
    padding: 0;
    // .vuestic-scrollbar {
    //   max-height: $dropdown-item-height * 4;
    // }
  }
}
.form-group.select-form-group .dropdown-item.selected{
    color: #fff;
    background-color: rgba(0,0,0,0.1);
    box-shadow: inset 0px 1px 1.5px #d4d4d4;
}
.dropdown-menu-content {
  // max-height: 200px;
  overflow: auto;
}
.bs-searchbox {
  padding: 4px 8px;
  border-bottom: 1px solid $border-color;
  .keyword {
    color: black;
    border: 1px solid #eee;
    padding: 0px 17px;
    font-weight: 400;
    line-height: 20px;
  }
  .keyword:focus {
    border: 1px solid #a367a4;
  }
}
</style>
