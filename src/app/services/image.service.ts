import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class ImageService {


  constructor(private httpClient: HttpClient) {
  }

  public saveImage(image: FormData){
    return this.httpClient.post('http://localhost:8080/v1/image', image);
  }
}
