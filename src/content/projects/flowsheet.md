---
title: FlowSheet
order: 2
category: Automação de processos
niche: Tarefas administrativas
solution: automacao
year: 2026
status: Projeto autoral
summary: Importa uma planilha Excel e usa cada linha para preencher formulários web automaticamente, com status em tempo real e reprocesso só dos erros.
seoDescription: Case do FlowSheet, automação que transforma linhas de planilhas Excel em preenchimentos de formulários web. Python, Django, openpyxl e Playwright.
stack: [Python, Django, openpyxl, Playwright]
link:
  label: Ver código
  href: https://github.com/adryan1-dev/flow-sheet
repo: https://github.com/adryan1-dev/flow-sheet
cover:
  wide: ../../assets/covers/flowsheet-wide.png
  tall: ../../assets/covers/flowsheet-tall.png
  alt: Diagrama do FlowSheet, da planilha Excel aos registros, ao Playwright e aos resultados por linha
case:
  lede: Uma automação que tira a digitação repetitiva de planilhas e devolve esse tempo para a equipe.
  context: Projeto autoral que simula uma rotina administrativa comum, em que os dados estão numa planilha e precisam ser lançados, um a um, em um sistema web.
  objective: Transformar cada linha de uma planilha em um preenchimento automático de formulário, com acompanhamento e possibilidade de corrigir apenas o que falhou.
  role: Modelagem dos dados, aplicação Django, automação com Playwright e acompanhamento da execução.
  problem: Muitas operações ainda dependem de copiar dados de uma planilha e digitá-los em um sistema web, linha por linha. É um trabalho lento, repetitivo e sujeito a erro de digitação.
  strategy: O FlowSheet separa as etapas. Primeiro importa a planilha e guarda cada linha como um registro que pode ser revisado e editado. Depois dispara a automação, que processa os registros em segundo plano e mostra o status de cada um. Se algo falhar, só os registros com erro são reprocessados.
  direction:
    title: Como funciona
    body: A aplicação segue uma separação simples por responsabilidade. Um app cuida da importação e dos registros, outro cuida das execuções e dos resultados.
    points:
      - "Importação: upload de planilha .xlsx lida com openpyxl, com histórico de importações"
      - "Revisão: cada linha vira um registro que pode ser listado e editado antes de rodar"
      - "Execução: o Playwright preenche o formulário web usando cada registro como entrada"
      - "Acompanhamento: status atualizado linha por linha e histórico de execuções e resultados"
      - "Correção: reprocessamento apenas dos registros que deram erro"
  implementation:
    body: Python e Django na aplicação, openpyxl para ler as planilhas e Playwright para controlar o navegador e preencher os formulários.
    points:
      - Upload e leitura de planilhas Excel
      - Persistência dos registros e dos lotes importados
      - Edição manual de cada linha antes da automação
      - Execução em segundo plano com status em tempo real
      - Histórico por execução e por registro
  benefits:
    - Menos digitação repetitiva e menos chance de erro de transcrição.
    - Cada registro processado fica rastreável, com o resultado salvo para consulta.
    - Uma falha pontual não obriga a refazer o lote inteiro.
  applications:
    - Cadastro de clientes, produtos ou pedidos em um portal sem integração disponível.
    - Lançamento de dados de uma planilha em sistemas administrativos.
    - Preenchimento repetitivo de formulários de órgãos, fornecedores ou plataformas.
  limitations:
    - Não há versão publicada para teste, o projeto roda localmente.
    - Cada formulário de destino exige uma automação específica.
    - Os benefícios acima são potenciais, não há medição de tempo economizado.
    - Projeto autoral, sem uso em produção declarado.
---
