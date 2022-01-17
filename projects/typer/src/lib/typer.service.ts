import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { TyperConfig } from './typer-config';
import { TyperInstance } from './typer-instance';
import { TyperComponent } from './typer.component';

@Injectable({
    providedIn: 'root'
})
export class TyperService {

    private instances: { [ name: string ]: TyperInstance } = {};

    public constructor(private readonly injector: Injector,
                       private readonly applicationRef: ApplicationRef,
                       private readonly componentFactoryResolver: ComponentFactoryResolver) {

    }

    public create(name: string, config: TyperConfig): void {

        this.instances[ name ] = new TyperInstance(config);

        const componentRef = this.componentFactoryResolver.resolveComponentFactory(TyperComponent).create(this.injector);

        // this.applicationRef.attachView(componentRef.hostView);

        // componentRef.instance.config = config;

        const comp = config.viewContainerRef.createComponent(TyperComponent);

        comp.instance.config = config;
        // config.viewContainerRef.createComponent(componentRef.componentType);

    }

}
