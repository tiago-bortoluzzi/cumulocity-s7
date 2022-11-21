import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as NgRouterModule } from '@angular/router';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { CoreModule, RouterModule, HOOK_ROUTE, ViewContext } from '@c8y/ngx-components';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { SubAssetsModule } from '@c8y/ngx-components/sub-assets';
import { ChildDevicesModule } from '@c8y/ngx-components/child-devices';
import { DeviceGridExampleModule } from '@c8y/ngx-components/device-grid-example';
import { DeviceProfileModule } from '@c8y/ngx-components/device-profile';
import { DeviceShellModule } from '@c8y/ngx-components/device-shell';
import { OperationsModule } from '@c8y/ngx-components/operations';
import { ImpactProtocolModule } from '@c8y/ngx-components/protocol-impact';
import { OpcuaProtocolModule } from '@c8y/ngx-components/protocol-opcua';
import { RepositoryModule } from '@c8y/ngx-components/repository';
import { ServicesModule } from '@c8y/ngx-components/services';
import { TrustedCertificatesModule } from '@c8y/ngx-components/trusted-certificates';
import {
  DashboardUpgradeModule,
  HybridAppModule,
  UpgradeModule,
  UPGRADE_ROUTES
} from '@c8y/ngx-components/upgrade';
import { BinaryFileDownloadModule } from '@c8y/ngx-components/binary-file-download';
import { SearchModule } from '@c8y/ngx-components/search';
import { LpwanProtocolModule } from '@c8y/ngx-components/protocol-lpwan';
import {
  DeviceManagementHomeDashboardModule,
  DeviceInfoDashboardModule
} from '@c8y/ngx-components/context-dashboard';
import { DiagnosticsModule } from '@c8y/ngx-components/diagnostics';

import { S7AgentComponent } from './src/s7agent/s7agent.component';
import { S7AgentGuard } from './src/s7agent/s7agent.guard';
import { S7ServerComponent } from './src/s7server/s7server.component';
import { S7ServerGuard } from './src/s7server/s7server.guard';

@NgModule({
  imports: [
    // Upgrade module must be the first
    UpgradeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    NgRouterModule.forRoot([...UPGRADE_ROUTES], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    AssetsNavigatorModule.config({
      smartGroups: true
    }),
    OperationsModule,
    OpcuaProtocolModule,
    ImpactProtocolModule,
    TrustedCertificatesModule,
    DeviceGridExampleModule,
    NgUpgradeModule,
    DashboardUpgradeModule,
    RepositoryModule,
    DeviceProfileModule,
    BinaryFileDownloadModule,
    SearchModule,
    ServicesModule,
    LpwanProtocolModule,
    SubAssetsModule,
    ChildDevicesModule,
    DeviceManagementHomeDashboardModule,
    DeviceInfoDashboardModule,
    DeviceShellModule,
    DiagnosticsModule
  ],
  declarations: [S7AgentComponent, S7ServerComponent],
  entryComponents: [S7AgentComponent, S7ServerComponent],
  providers: [
    S7AgentGuard,
    S7ServerGuard,
    {
      provide: HOOK_ROUTE,
      useValue: [{
        context: ViewContext.Device,
        path: 's7agent',
        component: S7AgentComponent,
        label: 'S7 Agent',
        priority: 0,
        icon: 'settings',
        canActivate: [S7AgentGuard]
      }],
      multi: true
    },{
      provide: HOOK_ROUTE,
      useValue: [{
        context: ViewContext.Device,
        path: 's7server',
        component: S7ServerComponent,
        label: 'S7 Server',
        priority: 0,
        icon: 'settings',
        canActivate: [S7ServerGuard]
      }],
      multi: true
    }
  ]
})

export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
