import Swal from 'sweetalert2';

class Utils {

  constructor() {

    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

  }

  notify(icon, title) {

    if (icon == 'error' && (!title || title === 'Not found'))
      title = 'Houve um erro, por favor tente novamente mais tarde!'

    this.Toast.fire({
      icon, title
    });

  }

}

export default new Utils();
