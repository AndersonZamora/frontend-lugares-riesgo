import Swal from 'sweetalert2';

export const errorAlert = (value = '') => {
    Swal.fire({
        icon: 'error',
        title: `${value}`
    })
}
