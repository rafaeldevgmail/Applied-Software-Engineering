export const Utils = {
  getInitials(name: string): string {
    if (!name) return "";

    // Remove espaços extras e divide o nome por espaços
    const nameParts = name.trim().split(/\s+/);

    // Se houver apenas um nome, retorna a inicial dele
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Pega a inicial do primeiro e do último nome
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  },
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },
};
