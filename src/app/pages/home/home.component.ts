import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICharacter } from '../../models/character.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  characterList: ICharacter[] = [];
  loading: boolean = true;

  private _apiService = inject(ApiService);
  private _router = inject(Router);


  ngOnInit(): void {
    this._apiService.getAllCharacters().subscribe((data: ICharacter[]) => {
      this.characterList = data;
      this.loading = false;
      });
  }

  navigate(id: number): void{
    this._router.navigate(['/details', id]);
  }
}