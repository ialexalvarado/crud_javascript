import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TooltipModule } from "ngx-bootstrap/tooltip";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearComponent } from './crear/crear.component';
import { IndexComponent } from './index/index.component';
// import { TabsModule } from "ngx-bootstrap/tabs";
import { NgbTab, NgbTabset, NgbModal, ModalDismissReasons, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgxDropzoneModule } from "ngx-dropzone";


@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    IndexComponent,
    // NgbModal
    // ModalDismissReasons
    // NgbTab,
    // NgbTabset
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxDropzoneModule
    // TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
