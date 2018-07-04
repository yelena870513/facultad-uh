import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss('Cancel');
  }

  saveModal() {
    this.activeModal.close('Ok');
  }



ngOnInit() {
  }

}
