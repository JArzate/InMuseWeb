import { HttpHeaders } from '@angular/common/http';

export const API_URL: String = "http://ec2-18-222-223-75.us-east-2.compute.amazonaws.com:6001/api/admin";
//export const API_URL: String = "http://192.168.100.207:6001/api/admin";
export const HTTPOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}
