import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { TyperService } from '../../projects/typer/src/lib/typer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit {

    @ViewChild('one', { read: ViewContainerRef }) private one: ViewContainerRef;

    public constructor(private readonly typerService: TyperService) {

    }

    public ngAfterViewInit() {

        this.typerService.create('one', {

            viewContainerRef: this.one,
            cursor: {

                style: {

                    color: 'rebeccapurple',
                    'border-width': '50px'

                },
                direction: 'horizontal',
                hideWhenDone: true

            },
            phrases: [

                {

                    value: 'I like big cursors',
                    style: {

                        color: 'green',
                        'text-decoration': 'underline'

                    },
                    speed: {

                        forward: 100,
                        reverse: 25

                    },
                    pause: 2000,
                    repeat: 1

                }, {

                    value: 'anoooother one',
                    style: {

                        color: 'orange',
                        'font-weight': 'bold'

                    },
                    speed: {

                        forward: 100,
                        reverse: 25

                    },
                    pause: 2000,
                    repeat: 2

                }

            ]

        });

    }
}
