import { Fournisseur } from "./forunisseur";

export class Categorie {
    id: number | undefined;
    libelle: string | undefined;
    fournisseurs: Fournisseur[] = [];

}
