import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


const error = (options = {}) => {
    let basic = {
        icon: 'error',
        timer: 10000,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Toast.fire(basic)
}
const success = (options = {}) => {
    let basic = {
        icon: 'success',
        timer: 10000,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Toast.fire(basic)
}
const warning = (options = {}) => {
    let basic = {
        icon: 'warning',
        timer: 10000,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Toast.fire(basic)
}
const info = (options = {}) => {
    let basic = {
        icon: 'info',
        timer: 10000,
        showConfirmButton: false,
    }
    for (var key in options) {
        basic[key] = options[key]
    }
    Toast.fire(basic)
}

export default {
    Swal,
    Toast,
    error,
    success,
    warning,
    info
}