import { Component } from '@angular/core';
import { FbRealTimeService } from '../../service/fb-real-time.service';

@Component({
  selector: 'app-led-on',
  templateUrl: './led-on.component.html',
  styleUrl: './led-on.component.css',
})
export class LedOnComponent {
  ledState: number = 0; // 0 para apagado, 1 para encendido

  constructor(private firebaseService: FbRealTimeService) {}

  ngOnInit(): void {
    this.firebaseService.getLedState((state) => {
      this.ledState = state || 0; // Si no hay estado, asigna 0
    });
  }

  toggleLed() {
    this.ledState = this.ledState === 0 ? 1 : 0;
    this.firebaseService.setLedState(this.ledState);
  }
}
