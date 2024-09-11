// Dans un fichier utils/errors.js (par exemple)
export class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthorizationError"; // Nom spécifique de l'erreur
    }
  }
  