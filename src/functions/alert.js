import Swal from 'sweetalert2';


const error = (options = {}) => {
    let basic = {
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Swal.fire(basic)
}
const success = (options = {}) => {
    let basic = {
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Swal.fire(basic)
}
const warning = (options = {}) => {
    let basic = {
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Swal.fire(basic)
}
const info = (options = {}) => {
    let basic = {
        icon: 'info',
        timer: 1500,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Swal.fire(basic)
}

export default {
    Swal,
    error,
    success,
    warning,
    info
}