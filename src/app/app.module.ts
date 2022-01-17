import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TyperModule } from '../../projects/typer/src/lib/typer.module';

@NgModule({

    declarations: [

        AppComponent

    ],

    imports: [

        BrowserModule,
        TyperModule

    ],

    providers: [],
    bootstrap: [ AppComponent ]

})
export class AppModule {
}
