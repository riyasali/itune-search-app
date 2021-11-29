import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public search: string | undefined;
  public tiles = [
    1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17
  ];
  constructor() { }

  ngOnInit(): void {
    this.search = '';
  }
  
}
