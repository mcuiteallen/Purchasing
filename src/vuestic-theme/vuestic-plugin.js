import Modal from './vuestic-components/vuestic-modal/VuesticModal.vue'
import SimpleSelect
  from './vuestic-components/vuestic-simple-select/VuesticSimpleSelect.vue'
import Widget from './vuestic-components/vuestic-widget/VuesticWidget.vue'
import FileUpload
  from './vuestic-components/vuestic-file-upload/VuesticFileUpload'
// At the moment we use quasar platform install to make its components work.
// Ideally we want to create similar vuestic platform object that holds needed values.

const VuesticPlugin = {
  install (Vue, options) {
    [
      Modal,
      SimpleSelect,
      Widget,
      FileUpload,
    ].forEach(component => {
      Vue.component(component.name, component)
    })
  },
}

export default VuesticPlugin
