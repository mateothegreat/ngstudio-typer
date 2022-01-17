import { ViewContainerRef } from '@angular/core';
import { TyperPhraseConfig } from './typer-phrase-config';

export class TyperConfig {

    public viewContainerRef: ViewContainerRef;
    public phrases: Array<TyperPhraseConfig>;
    public cursor?: {

        style?: { [ key: string ]: any };
        width?: string,
        direction?: 'vertical' | 'horizontal',
        hideWhenDone?: boolean

    };

}
