import UForm from './core/BasicForm'
import BootStrap from './ui/bootstrap'

// register bootstrap ui controls
UForm.registerControl(BootStrap.controls)

// add ui plugin of bootstrap
UForm.UiLibPlugin = new BootStrap.UiPlugin()

export default UForm
