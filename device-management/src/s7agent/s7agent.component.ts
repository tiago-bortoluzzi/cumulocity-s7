import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService, IManagedObject } from '@c8y/client';

@Component({
  selector: 's7agent',
  templateUrl: './s7agent.component.html'
})
export class S7AgentComponent {
  constructor(
    public route: ActivatedRoute,
    public inventory: InventoryService
    ) {}

  device: IManagedObject = this.route.snapshot.data.contextData || this.route.parent.snapshot.data.contextData;
  serversSettings: Array<{name: string, ip: string, dataReadPeriod: string}> = this.device.serversSettings;
  newServerSettings = {
    name: 'New Server',
    ip: '0.0.0.0',
    dataReadPeriod: '5'
  };
  isValid = {
    name: true,
    ip: true,
    dataReadPeriod: true
  };
  isDisabled: boolean = false;

  ngOnInit() {
    this.checkValidation();
  }

  checkValidation = () => {
    this.isValid['name'] = this.validateInput('name', this.newServerSettings.name);
    this.isDisabled = Object.values(this.isValid).includes(false) ? true : false;
  }

  updateNewServerSettings = (event: Event, property: string) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = element.value;
    this.isValid[property] = this.validateInput(property, value);
    if (this.isValid[property]) this.newServerSettings[property] = value;
    else element.value = this.newServerSettings[property];
    this.checkValidation();
  }

  validateInput = (property: string, value: string) => {
    switch (property) {
      case 'name':
        const isNameAvailable: boolean = !this.serversSettings.find(serverSettings => serverSettings.name === value);
        if (value.length === 0 || !isNameAvailable) return false;
        else return true;

      case 'ip':
        const ipPattern: RegExp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
        if (!ipPattern.test(value)) return false;
        else return true;

      case 'dataReadPeriod':
        if (Number(value) <= 0) return false;
        else return true;
    }
  }

  saveNewServerSettings = async() => {
    this.serversSettings.push(this.newServerSettings);
    const updatedDevice = {
      id: this.device.id,
      serversSettings: this.serversSettings
    }
    try {
      const { data } = await this.inventory.update(updatedDevice);
      this.device = data;
      this.serversSettings = this.device.serversSettings;
      this.checkValidation();
    } catch (error) {
      console.log(error);
    }
  }
}