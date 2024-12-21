import { Component, inject, OnInit } from '@angular/core';
import { ICharacter, Transformation } from '../../models/character.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {

  character?: ICharacter;
  transformation: Transformation[] = [];
  loading: boolean = true;
  error: string | null = null;

  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = params['id'];
      this._apiService.getFindCharacter(id).subscribe({
        next: (data: ICharacter) => {
        this.character = data;
        this.transformation = data.transformations;
        this.loading = false;
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.error = 'No se pudo cargar la información del personaje';
          this.loading = false;
          }
      });
    });
  }
  
  getColumnsClass(): string {
    const count = this.transformation.length;
    if (count == 6){
      return `md:grid-cols-3 lg:grid-cols-6`
    } else if (count == 2){
      return `md:grid-cols-2`
    } else if (count == 5){
      return `md:grid-cols-3 lg:grid-cols-5`
    } else if (count == 4){
      return `md:grid-cols-2 lg:grid-cols-4`
    }
    return `md:grid-cols-${count}`
  }

  navButton(){
    this._router.navigate(['/home']);
  }
}