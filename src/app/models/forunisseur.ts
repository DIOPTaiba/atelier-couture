import { Categorie } from "./categorie";

export class Fournisseur {
    id: number | undefined;
    name: string | undefined;
    zone: string | undefined;
    categories: Categorie[] = [];


}
