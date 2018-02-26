import {Component, OnInit} from '@angular/core';
import {NotifyService} from 'notify-angular';
import {WebUtils} from '@tsmean/utils';

import {Animal, AnimalWithoutId} from '../animal.model';
import {AnimalService} from '../animal.service';
import {AnimalDashboardListStore} from '../animal-dashboard-list.store';
import {AnimalStoreService} from '../animal.store';

@Component({
  selector: 'app-animal-create',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css']
})
export class CreateAnimalComponent implements OnInit {
  public newAnimal: AnimalWithoutId;

  constructor(
    private animalService: AnimalService,
    private notifyService: NotifyService,
    private dashboardList: AnimalDashboardListStore,
    private animalStoreService: AnimalStoreService,
  ) {}

  ngOnInit() {
    this.newAnimal = {};
  }

  public createAnimal() {
    const animalObs = this.animalService.createAnimal(this.newAnimal);
    animalObs.subscribe(
      newAnimal => {
        this.animalStoreService.addOrUpdate(newAnimal);
        this.notifyService.success('Animal Created');
        this.dashboardList.add(newAnimal.id);
      },
      errorResp => {
        this.notifyService.error(errorResp.statusText);
      }
    );
    if (this.newAnimal.name) {
      this.animalService.addAnimalPic(this.newAnimal.name, animalObs);
    }
  }

  createAnimalOnEnter(e: KeyboardEvent) {
    if (WebUtils.isEnter(e)) {
      this.createAnimal();
    }
  }
}
