import Swal from 'sweetalert2';

export const successAlert = (value = '') => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${value}`,
        showConfirmButton: false,
        timer: 1500
    })
}
