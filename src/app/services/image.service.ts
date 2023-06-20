import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SAVE_IMAGE} from "../constants/app.constants";


@Injectable({providedIn: 'root'})
export class ImageService {


  constructor(private httpClient: HttpClient) {
  }

  public saveImage(image: FormData){
    return this.httpClient.post(SAVE_IMAGE, image);
  }
}
