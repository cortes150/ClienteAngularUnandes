import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa la compatibilidad
import { ref, set, onValue } from 'firebase/database'; // Importa desde Firebase

@Injectable({
  providedIn: 'root',
})
export class FbRealTimeService {
  private ledPath = '/sensores/led';

  constructor(private db: AngularFireDatabase) {} // Cambia a AngularFireDatabase

  getLedState(callback: (state: number) => void) {
    const ledRef = ref(this.db.database, this.ledPath); // Accede a la referencia
    onValue(
      ledRef,
      (snapshot) => {
        const state = snapshot.val();
        callback(state);
      },
      (error) => {
        console.error('Error al leer el estado del LED: ', error);
        callback(0); // En caso de error, asigna 0 como estado por defecto
      }
    );
  }

  setLedState(state: number) {
    const ledRef = ref(this.db.database, this.ledPath); // Accede a la referencia
    set(ledRef, state)
      .then(() => console.log('Estado del LED actualizado:', state))
      .catch((error) =>
        console.error('Error al actualizar el estado del LED: ', error)
      );
  }
}
