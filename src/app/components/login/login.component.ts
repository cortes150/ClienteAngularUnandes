import { Component } from '@angular/core';
import { AuthFirebaseService } from '../../service/auth-firebase.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMensaje: string = '';
  constructor(
    private authService: AuthFirebaseService,
    private router: Router
  ) {}
  // login() {
  //   this.authService
  //     .login(this.email, this.password)
  //     .then(() => {
  //       this.router.navigate(['/bienvenida']);
  //     })
  //     .catch((error) => {
  //       this.errorMensaje = 'Contraseña o usuario inválidos';
  //       console.error('Error during login:', error);
  //     });
  // }
  login() {
    this.authService
      .login(this.email, this.password)
      .then((doc) => {
        doc.subscribe((userData) => {
          if (userData.exists) {
            const userD: any = userData.data();
            console.log(userD);

            if (userD.rol === 'admin') {
              console.log('admin ');

              this.router.navigate(['/admin']); // Redirige a admin si es administrador
            } else {
              console.log('cliente ');

              this.router.navigate(['/bienvenida']); // Redirige a bienvenida si no
            }
          }
        });
      })
      .catch((error) => {
        this.errorMensaje = 'Contraseña o usuario inválidos';
        console.error('Error durante el login:', error);
      });
  }
  goToRegister() {
    this.router.navigate(['/registro']); // Redirige a la ruta de registro
  }
}
