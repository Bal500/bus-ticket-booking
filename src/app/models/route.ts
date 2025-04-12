export interface Route {
    id: number;
    from: string;
    to: string;
    departure: string; // ISO formátumú dátum + idő
    price: number; // ár
}
