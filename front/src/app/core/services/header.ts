import { HttpHeaders } from "@angular/common/http";

export function getHeader(token: string | null) {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}