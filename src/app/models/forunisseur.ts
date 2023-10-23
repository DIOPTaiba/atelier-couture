import { Categorie } from "./categorie";

export class Fournisseur {
    id!: number;
    name!: string;
    zone!: string;
    categories: Categorie[] = [];


}
