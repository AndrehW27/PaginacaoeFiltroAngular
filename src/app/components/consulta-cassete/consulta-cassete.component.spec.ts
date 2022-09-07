import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCasseteComponent } from './consulta-cassete.component';

describe('ConsultaCasseteComponent', () => {
  let component: ConsultaCasseteComponent;
  let fixture: ComponentFixture<ConsultaCasseteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCasseteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCasseteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
