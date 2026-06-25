#!/bin/bash

# para tornar executavel digite no terminal: chmod +x backup.sh
# para rodar digite no terminal: ./backup.sh

# 1. Solicita o nome da pasta ao usuário
read -p "Digite o nome da pasta que deseja copiar: " PASTA_ORIGEM

# 2. Verifica se a pasta digitada realmente existe
if [ ! -d "$PASTA_ORIGEM" ]; then
    echo "❌ Erro: A pasta '$PASTA_ORIGEM' não existe no diretório atual!"
    exit 1
fi

# 3. Define o local de destino e captura a data/hora atual
PASTA_DESTINO="Recovery/$PASTA_ORIGEM"
DATA_HORA=$(date +"%Y-%m-%d %H-%M")
NOME_FINAL_PASTA="$PASTA_ORIGEM $DATA_HORA"

# 4. Cria a estrutura de pastas destino (o -p garante que cria Recovery/ e a subpasta se não existirem)
mkdir -p "$PASTA_DESTINO/$NOME_FINAL_PASTA"

# 5. Copia todo o conteúdo da pasta de origem para dentro da nova pasta com data e hora
# -r (recursivo, para subpastas) e -p (preserva permissões de arquivos)
cp -rp "$PASTA_ORIGEM/." "$PASTA_DESTINO/$NOME_FINAL_PASTA/"

echo "--------------------------------------------------------"
echo "✅ Sucesso! Conteúdo de '$PASTA_ORIGEM' copiado para:"
echo "👉 $PASTA_DESTINO/$NOME_FINAL_PASTA"
echo "--------------------------------------------------------"