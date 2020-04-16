function () {
  var storeJson = [{
      "cidade": "Goiânia",
      "endereco": "Av. I, 208 - Lote 2 - Jd. Goiás",
      "estado": "GO",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Goiânia",
      "telefone": "(62) 4053-9558",
      "transportadora": "Loja - Decathlon Goiânia - Corporativo"
    },
    {
      "cidade": "Vila Velha",
      "endereco": "RUA LUCIANO DAS NEVES, 2418, PISO G1, LOJA 12 - Divino Espirito Santo",
      "estado": "ES",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 13hs - 21hs",
      "nome": "Loja - Decathlon Vila Velha",
      "telefone": "(27) 3512-3424",
      "transportadora": "Loja - Decathlon Vila Velha - Corporativo"
    },
    {
      "cidade": "Belo Horizonte",
      "endereco": "Av. Pastor Anselmo Silvestre, 1495 - União",
      "estado": "MG",
      "horario": "Seg/Sab: 9hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Belo Horizonte",
      "telefone": "(31) 3181-0011",
      "transportadora": "Loja - Decathlon Belo Horizonte - Corporativo"
    },
    {
      "cidade": "Curitiba",
      "endereco": "R. Tobias de Macedo Júnior, 114 - Santo Inacio",
      "estado": "PR",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Barigui",
      "telefone": "(41) 3180-0237",
      "transportadora": "Loja - Decathlon Barigui - Corporativo"
    },
    {
      "cidade": "Curitiba",
      "endereco": "Rod. BR-116 Pista Lateral, 10.000 - Jardim Botânico",
      "estado": "PR",
      "horario": "Seg/Sab: 9hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Torres",
      "telefone": "(41) 3073-0201",
      "transportadora": "Loja - Decathlon Torres - Corporativo"
    },
    {
      "cidade": "Londrina",
      "endereco": "Av. Me. Leônia Milito, 2121 - Gleba Palhano",
      "estado": "PR",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Londrina",
      "telefone": "(43) 3032-1622",
      "transportadora": "Loja - Decathlon Londrina - Corporativo"
    },
    {
      "cidade": "Rio de Janeiro",
      "endereco": "Freeway Center - Av. das Américas, 2000 - Barra da Tijuca",
      "estado": "RJ",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 21hs",
      "nome": "Loja - Decathlon Barra da Tijuca",
      "telefone": "(21) 2018-0468",
      "transportadora": "Loja - Decathlon Barra da Tijuca - Corporativo"
    },
    {
      "cidade": "Rio de Janeiro",
      "endereco": "Av Pastor Martin Luther King Jr., 126 - Del Castilho",
      "estado": "RJ",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 13hs - 21hs",
      "nome": "Loja - Decathlon Nova América",
      "telefone": "",
      "transportadora": "Retirar em Loja"
    },
    {
      "cidade": "Porto Alegre",
      "endereco": "Av. Dr. Nilo Peçanha, 2061 - Três Figueiras",
      "estado": "RS",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Nilo",
      "telefone": "(51) 3181-0530",
      "transportadora": "Loja - Decathlon Nilo - Corporativo"
    },
    {
      "cidade": "Porto Alegre",
      "endereco": "Av Praia de Belas, 1181, LJ 3035A3041 - Praia de Belas",
      "estado": "RS",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 12hs - 20hs",
      "nome": "Loja - Decathlon Praia de Belas",
      "telefone": "(51) 2626-4289",
      "transportadora": "Loja - Decathlon Praia de Belas - Corporativo"
    },
    {
      "cidade": "Florianópolis",
      "endereco": "Rod. SC-401, 3400 - Saco Grande",
      "estado": "SC",
      "horario": "Seg/Sab: 9hs - 22hs / Dom: 9hs - 20hs / Fer: 14hs - 20hs",
      "nome": "Loja - Decathlon Florianópolis",
      "telefone": "(48) 3036-0236",
      "transportadora": "Loja - Decathlon Florianópolis - Corporativo"
    },
    {
      "cidade": "Joinville",
      "endereco": "R. XV de Novembro, 2805 - Glória",
      "estado": "SC",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 14hs - 20hs",
      "nome": "Loja - Decathlon Joinville",
      "telefone": "(47) 4063-9240",
      "transportadora": "Loja - Decathlon Joinville - Corporativo"
    },
    {
      "cidade": "Barueri",
      "endereco": "ALAMEDA ARAGUAIA, 3192 - Alphaville Industrial",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Alphaville",
      "telefone": "(11) 3181-6795",
      "transportadora": "Loja - Decathlon Alphaville - Corporativo"
    },
    {
      "cidade": "Campinas",
      "endereco": "TRV DA RODOVIA DOM PEDRO I, KM 129 - Vila Brandina",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 13hs - 21hs",
      "nome": "Loja - Decathlon Campinas",
      "telefone": "(19) 3512-3424",
      "transportadora": "Loja - Decathlon Campinas - Corporativo"
    },
    {
      "cidade": "Campinas",
      "endereco": "Av Guilherme Campos, 500 - Jardim Santa Genebra- Campinas - Parque Dom Pedro Shopping",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 12hs - 20hs",
      "nome": "Loja - Decathlon Dom Pedro",
      "telefone": "(19) 2101-3850",
      "transportadora": "Loja - Decathlon Dom Pedro - Corporativo"
    },
    {
      "cidade": "Jundiaí",
      "endereco": "Av. Nove de julho, 1650, Parque do Colégio",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Jundiaí",
      "telefone": "(11) 2708-8482",
      "transportadora": "Loja - Decathlon Jundiaí - Corporativo"
    },
    {
      "cidade": "Mogi das Cruzes",
      "endereco": "Av. Ver. Narciso Yague Guimarães, 1000 - Socorro, Mogi das Cruzes",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom: 9hs - 20hs",
      "nome": "Loja - Decathlon Mogi das Cruzes",
      "telefone": "(11) 5118-3785",
      "transportadora": "Loja - Decathlon Mogi - Corporativo"
    },
    {
      "cidade": "Osasco",
      "endereco": "Av. dos Autonomistas, 1828 - Centro",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Osasco",
      "telefone": "(11) 2711-5999",
      "transportadora": "Loja - Decathlon Osasco - Corporativo"
    },
    {
      "cidade": "Praia Grande",
      "endereco": "Litoral Plaza Shopping - Av. Ayrton Senna da Silva, 1511 - Sítio do Campo",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 11hs - 20hs",
      "nome": "Loja - Decathlon Praia Grande",
      "telefone": "(13) 3513-0937",
      "transportadora": "Loja - Decathlon Praia Grande - Corporativo"
    },
    {
      "cidade": "Ribeirão Preto",
      "endereco": "Av. Pres. Kennedy, 1500 - Ribeirânia",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 11hs - 20hs",
      "nome": "Loja - Decathlon Ribeirão Preto",
      "telefone": "(16) 3515-9494",
      "transportadora": "Loja - Decathlon Ribeirão Preto - Corporativo"
    },
    {
      "cidade": "São Bernardo do Campo",
      "endereco": "Av. Pereira Barreto, 1500 - Baeta Neves",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom/Fer: 9hs - 20hs",
      "nome": "Loja - Decathlon São Bernardo do Campo",
      "telefone": "(11) 3181-8940",
      "transportadora": "Loja - Decathlon São Bernardo do Campo - Corporativo"
    },
    {
      "cidade": "São José dos Campos",
      "endereco": "R. Andaraí, 400 - Jd. Satélite",
      "estado": "SP",
      "horario": "Seg/Sex: 10hs - 22hs / Sab: 9hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon São José dos Campos",
      "telefone": "(12) 3512-7844",
      "transportadora": "Loja - Decathlon São José dos Campos - Corporativo"
    },
    {
      "cidade": "São José do Rio Preto",
      "endereco": "Av. Pres. Juscelino K. de Oliveira, 4201 - Res. Eco Village I",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom: 10hs - 20hs / Fer: 14hs - 20hs",
      "nome": "Loja - Decathlon São José do Rio Preto",
      "telefone": "(17) 3520-0025",
      "transportadora": "Loja - Decathlon São José do Rio Preto - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Regente Feijó 1334 - 2º andar",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Anália Franco",
      "telefone": "(11) 3181-5218",
      "transportadora": "Loja - Decathlon Analia Franco - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Otto Baumgart, 500 - Vila Guilherme",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Lar Center",
      "telefone": "(11) 3181-8661",
      "transportadora": "Loja - Decathlon Lar Center - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Pres. Castelo Branco, 4885 - Pte. Pequena",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom/Fer: 9hs - 20hs",
      "nome": "Loja - Decathlon Marginal Tietê",
      "telefone": "(11) 2261-3249",
      "transportadora": "Loja - Decathlon Marginal Tietê - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Duquesa de Goiás, 381 - Real Parque",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom: 10hs - 21hs",
      "nome": "Loja - Decathlon Morumbi",
      "telefone": "(11) 3181-8660",
      "transportadora": "Loja - Decathlon Morumbi - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Paulista, 854 - Bela Vista",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 21hs / Dom/Fer: 9hs - 18hs",
      "nome": "Loja - Decathlon Paulista",
      "telefone": "(11) 3181-2954",
      "transportadora": "Loja - Decathlon Paulista - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Rod. Raposo Tavares, 6008 - Conjunto Residencial Butantã",
      "estado": "SP",
      "horario": "Seg/Sex: 10hs - 22hs / Sab: 9hs - 22hs / Dom/Fer: 9hs - 20hs",
      "nome": "Loja - Decathlon Raposo Tavares",
      "telefone": "(11) 3181-8662",
      "transportadora": "Loja - Decathlon Raposo Tavares - Corporativo"
    },
    {
      "cidade": "São Paulo",
      "endereco": "Av. Queiroz Filho, 1310 - Vila Leopoldina",
      "estado": "SP",
      "horario": "Seg/Sab: 9hs - 22hs / Dom: 9hs - 20hs",
      "nome": "Loja - Decathlon Vila Lobos",
      "telefone": "(11) 3181-6796",
      "transportadora": "Loja - Decathlon Vila Lobos - Corporativo"
    },
    {
      "cidade": "Sorocaba",
      "endereco": "Av. Comendador Pereira Inácio, 2480 - Jd. Emilia",
      "estado": "SP",
      "horario": "Seg/Sab: 10hs - 22hs / Dom/Fer: 10hs - 20hs",
      "nome": "Loja - Decathlon Sorocaba",
      "telefone": "(15) 4062-9550",
      "transportadora": "Loja - Decathlon Sorocaba - Corporativo"
    }
  ];
  return storeJson;
}