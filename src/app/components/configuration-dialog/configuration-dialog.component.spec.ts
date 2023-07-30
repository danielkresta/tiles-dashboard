import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import {
  ConfigurationDialog,
  ConfigurationDialogArguments,
} from './configuration-dialog.component';

describe('ConfigurationDialog', () => {
  let component: ConfigurationDialog;
  let fixture: ComponentFixture<ConfigurationDialog>;
  const dialogCloseSpy = jasmine.createSpy('close');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationDialog],
      providers: [
        {
          provide: DialogRef,
          useValue: { close: dialogCloseSpy },
        },
        {
          provide: DIALOG_DATA,
          useValue: <ConfigurationDialogArguments>{
            title: 'Title',
            subtitle: 'Subtitle',
            tileConfiguration: [],
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ConfigurationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog function when update is called', () => {
    component.update();

    expect(dialogCloseSpy).toHaveBeenCalled();
  });
});
