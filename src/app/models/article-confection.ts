import { Categorie } from "./categorie";
import { Fournisseur } from "./forunisseur";
import { Unite } from "./unite";

export class ArticleConfection {
    id!: number;
    libelle!: string;
    prix!: number;
    qteStock!: number;
    reference!: string;
    categorie!: Categorie;
    unite: Unite = new Unite;
    fournisseurs: Fournisseur[] = [];

}
