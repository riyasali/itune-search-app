
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItuneService } from '../services/itune.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public searchTerm: string | undefined;
  public albums:any = [];
  public form!: FormGroup;
  public pristine = true;
  public noResult = false;
  public loading = false;
  public errorMsg = 'No albums found for this artist!';
  constructor(private ituneService: ItuneService, private fb: FormBuilder) {
   
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchTerm: ['', [
        Validators.required,
        Validators.pattern("[A-Za-z\s\0-9]{1,}[\.]{0,1}[A-Za-z\s]{0,}$")]],
    });
  }
  searchAlbums() {
    if (this.form.valid) {
      const artistName: string = this.form.value.searchTerm? this.form.value.searchTerm?.trim() : '';
      this.albums = [];
      this.pristine = false;
      this.noResult = false;
      this.loading = true;
      this.ituneService.getAlbums(artistName).subscribe((data) => {
        if(data.resultCount > 0) {
          this.albums = data.results;
        } else{
          this.noResult = true;
        }
        this.loading = false;
      }, error => {
        console.log(error);
        this.noResult = true;
        this.loading = false;
        if(error.status === 400) {
          this.errorMsg = 'Invalid artist name';
        }
      })
    }
  }
}
