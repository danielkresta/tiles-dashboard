import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { Dialog } from '@angular/cdk/dialog';
import { first, of } from 'rxjs';

describe('AppComponent', () => {
  const dialogOpenSpy = jasmine.createSpy('open').and.callFake(() => ({
    closed: of(undefined),
  }));

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Dialog,
          useValue: { open: dialogOpenSpy },
        },
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
