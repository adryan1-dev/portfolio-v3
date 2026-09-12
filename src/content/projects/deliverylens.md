---
title: DeliveryLens Analytics
order: 4
category: Engenharia de dados
niche: Delivery
year: 2026
status: Projeto técnico
summary: Pipeline que leva dados de uma API REST pelas camadas bronze e silver até o PostgreSQL, com orquestração no Airflow e serviços em Docker.
seoDescription: Case do DeliveryLens Analytics, pipeline de engenharia de dados em camadas bronze e silver com Python, Apache Airflow, Docker e PostgreSQL.
stack: [Python, Pandas, Apache Airflow, PostgreSQL, Docker]
link:
  label: Ver código
  href: https://github.com/adryan1-dev/DeliveryLens-Analytics
repo: https://github.com/adryan1-dev/DeliveryLens-Analytics
cover:
  wide: ../../assets/covers/deliverylens-wide.png
  tall: ../../assets/covers/deliverylens-tall.png
  alt: Diagrama do pipeline DeliveryLens, da API REST às camadas bronze e silver até o PostgreSQL
case:
  lede: Um pipeline que transforma dados de uma API em camadas rastreáveis e reprocessáveis.
  context: Estudo prático de engenharia de dados que simula o fluxo de uma empresa de delivery.
  objective: Levar dados de uma API REST até um banco analítico com etapas rastreáveis e reprocessáveis.
  role: Desenho do pipeline, código Python, orquestração e infraestrutura local.
  problem: Dados que chegam de uma API sem registro bruto nem validação ficam difíceis de auditar, corrigir e reprocessar.
  strategy: "Arquitetura em camadas: a bronze guarda a resposta exatamente como chegou, a silver valida cada registro sem descartá-lo (marcando is_valid e validation_errors) e a carga final vai para o PostgreSQL."
  direction:
    title: Arquitetura técnica
    body: Uma DAG do Airflow encadeia ingestão, bronze, silver e carga. O scheduler e o banco rodam em containers com volumes persistentes.
    points:
      - "DAG deliverylens_pipeline: ingestão, bronze, silver e PostgreSQL"
      - Docker Compose com Airflow e PostgreSQL 16
      - "Módulos separados: ingestion, bronze, silver, pipeline, db e config"
  implementation:
    body: Python com Requests na ingestão, Pandas no tratamento e psycopg2 na carga, Apache Airflow na orquestração e Docker no ambiente.
    points:
      - Respostas brutas preservadas em JSON para auditoria
      - Validação de id, nome e formato de e-mail
      - Nenhum registro descartado na camada silver
      - Configuração por variáveis de ambiente
  limitations:
    - Fonte de dados simulada (JSONPlaceholder).
    - A camada gold, com modelo dimensional, ainda não foi implementada.
    - Laboratório técnico, sem uso em produção, volume ou frequência declarados.
---
