import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IManagedObject,
  InventoryService
} from "@c8y/client";

@Component({
  selector: 's7server',
  templateUrl: './s7server.component.html'
})
export class S7ServerComponent {
  constructor(
    public route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  device: IManagedObject = this.route.snapshot.data.contextData || this.route.parent.snapshot.data.contextData;
  tags: Array<{name: string, id: number, type: string, db: number, offset: number, unit: string}> = this.device.tags;

  addTag = () => {
    let count = 2
    const defaultName = 'New_tag'
    let name = defaultName
    while (this.tags.find(parameter => parameter.name === name)) {
      name = `${defaultName}_${count}`
      count += 1
    }
    const tag: {name: string, id: number, type: string, db: number, offset: number, unit: string} = {
      name: name,
      id: new Date().getTime(),
      type: 'BOOL',
      db: 1,
      offset: 0,
      unit: ''
    }
    this.tags.push(tag);
  }

  removeTag = (id: number) => {
    const item = this.tags.find(tag => tag.id === id);
    this.tags.splice(this.tags.indexOf(item), 1);
  }

  updateTag = (id: number, property: string, event: Event) => {
    const element = event.target as HTMLInputElement;
    let newValue;
    newValue = ['offset', 'db'].includes(property) ? Number(element.value) : element.value;
    if (property === 'name' && newValue.length === 0) {
      element.value = this.tags.find(parameter => parameter.id === id)[property];
    } else {
      this.tags.find(parameter => parameter.id === id)[property] = newValue;
    }
  }

  saveTags = async() => {
    try {
      await this.inventoryService.update(this.device);
    } catch (error) {
      console.log(error);
    }
  }
}