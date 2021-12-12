import { Injectable } from '@angular/core';
import imageCompression from 'browser-image-compression';
import { from } from 'rxjs';

@Injectable()

export class UploadImageService {

  constructor() { }

  handleImageUpload(event: any) {        
    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);  
    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    return from(imageCompression(imageFile, options))      
  }
  

}