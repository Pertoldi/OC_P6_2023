import { HttpHeaders } from "@angular/common/http";

export function getHeader(token: string | null) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return headers
}