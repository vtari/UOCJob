import '../polyfills.spec.ts';

import { APP_BASE_HREF } from '@angular/common';
import { getTestBed, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { FrontLayoutComponent } from './front-layout.component';

describe(`FrontLayoutComponent`, () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [FrontLayoutComponent], //declare test component
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: '/'
                }
            ]
        })
            .compileComponents(); //compile html and css
    }));

    afterEach(() => {
        getTestBed().resetTestingModule();
    });

   

});
