import { Fournisseur } from "./forunisseur";

export class Categorie {
    id!: number;
    libelle!: string;
    fournisseurs: Fournisseur[] = [];

}
