export class IUserRepository {
  create({ data }) {
    throw new Error("Method not implemented");
  }
  FindById(id) {
    throw new Error("Method not implemented");
  }
  update(id, data) {
    throw new Error("Method not implemented");
  }
  delete(id) {
    throw new Error("Method not implemented");
  }
  /**
   * Busca vários usuários com base em filtros opcionais.
   * @param {string[]} [fields] - Campos específicos para retornar. Ex: ['id', 'name', 'email']
   * @param {number} [skip] - Quantidade de registros a pular (paginação)
   * @param {number} [take] - Quantidade de registros a retornar
   * @param {string} [role] - Filtrar por cargo, por exemplo
   * @returns {Promise<Array>} Lista de usuários encontrados
   */
  findAll({ fields, skip, take, role }) {
    throw new Error("Method not implemented");
  }
}
