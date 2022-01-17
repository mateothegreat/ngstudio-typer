import { Component, AfterViewInit, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { TyperConfig } from './typer-config';
import { TyperPhraseConfig } from './typer-phrase-config';

@Component({

    selector: 'lib-typer',
    templateUrl: './typer.component.html',
    styleUrls: [ './typer.component.scss' ]

})
export class TyperComponent implements AfterViewInit {

    @ViewChild('text', { read: ViewContainerRef }) public textElementRef: ViewContainerRef;
    @ViewChild('cursor', { read: ViewContainerRef }) public cursorElementRef: ViewContainerRef;

    public config: TyperConfig;

    private rewinding: boolean;

    public constructor(private readonly renderer: Renderer2) {

    }

    public loop(iteration: number, phraseIndex: number, c: Array<string>, phraseConfig: TyperPhraseConfig, forward = true): void {

        //
        // Re-apply styles.
        //
        for (let key in phraseConfig.style) {

            this.renderer.setStyle(this.textElementRef.element.nativeElement, key, phraseConfig.style[ key ]);

        }

        if (c.length > 0) {

            if (forward && !this.rewinding) {

                this.textElementRef.element.nativeElement.innerHTML += c.shift();

                setTimeout(() => this.loop(iteration, phraseIndex, c, phraseConfig), phraseConfig.speed.forward, forward);

            } else {

                c.pop();

                this.textElementRef.element.nativeElement.innerHTML = c.join('');

                if (c.length === 0) {

                    setTimeout(() => this.loop(iteration, phraseIndex, phraseConfig.value.split(''), phraseConfig, true), phraseConfig.speed.forward);

                    this.rewinding = false;

                } else {

                    setTimeout(() => this.loop(iteration, phraseIndex, c, phraseConfig, false), phraseConfig.speed.reverse);

                }

            }

        } else {

            if (!phraseConfig.repeat || phraseConfig.repeat > 0) {

                //
                // Repeat the current phrase.
                //
                if (!phraseConfig.repeat || iteration < phraseConfig.repeat) {

                    setTimeout(() => this.loop(iteration + 1, phraseIndex, phraseConfig.value.split(''), phraseConfig, false), phraseConfig.pause);

                } else {

                    //
                    // Move on to the next phrase.
                    //
                    if (phraseIndex + 1 < this.config.phrases.length) {

                        this.rewinding = true;

                        setTimeout(() => this.loop(1, phraseIndex + 1, this.config.phrases[ phraseIndex + 1 ].value.split(''), this.config.phrases[ phraseIndex + 1 ], true), phraseConfig.pause);

                    }

                }

            }

        }

    }

    public ngAfterViewInit(): void {

        for (let key in this.config.cursor.style) {

            this.renderer.setStyle(this.cursorElementRef.element.nativeElement, key, this.config.cursor.style[ key ]);

        }

        this.loop(1, 0, this.config.phrases[ 0 ].value.split(''), this.config.phrases[ 0 ]);

    }

}
