/**
 * Conteúdo da página inicial — Paróquia Santíssima Trindade.
 *
 * Estrutura preparada para CMS futuro (Directus ou similar):
 * - singletons: site, contact, history, dizimo, liturgyToday
 * - coleções: navLinks, heroSlides, news, massSchedule, communities,
 *   confessions, sacraments, celebrations, footerColumns
 */

export const site = {
  name: 'Paróquia Santíssima Trindade',
  logo_line1: 'Paróquia',
  logo_line2: 'Santíssima Trindade',
  archdiocese: 'Arquidiocese de Teresina',
  forania: 'Forania Norte I',
  city: 'Teresina',
  state: 'PI',
  copyright: '© 2026 Paróquia Santíssima Trindade, Teresina – PI',
}

export const navLinks = [
  { id: 'inicio', label: 'Início', href: '#inicio' },
  { id: 'a-paroquia', label: 'A paróquia', href: '#a-paroquia' },
  { id: 'horarios', label: 'Horários', href: '#horarios' },
  { id: 'sacramentos', label: 'Sacramentos', href: '#sacramentos' },
  { id: 'noticias', label: 'Notícias', href: '#noticias' },
  { id: 'pastorais', label: 'Pastorais', href: '#pastorais' },
  { id: 'contato', label: 'Contato', href: '#contato' },
]

/** Banners dinâmicos do topo — autoplay 7s, pausa no hover / botão */
export const heroCarousel = {
  autoplay_ms: 7000,
  slides: [
    {
      id: 1,
      selo: 'Boas-vindas',
      titulo: 'Em nome do Pai\ne do Filho e do\nEspírito Santo.',
      texto:
        'Uma comunidade de fé no bairro Primavera, zona Norte de Teresina. As portas estão abertas: venha rezar conosco.',
      botao_principal: { label: 'Ver horários de missa', href: '#horarios' },
      botao_secundario: { label: 'Como chegar', href: '#contato' },
      foto: {
        alt: 'Interior da Igreja Matriz durante a celebração',
        label: 'Foto — interior da Matriz',
      },
      cartao: {
        linha_cima: 'Hoje, sexta-feira, 2 de outubro',
        destaque: 'Missa às 18h',
        complemento: 'Confissões das 9h às 11h',
        rotulo_info: 'Amanhã: missa às 7h e, na Comunidade Santa Helena, às 19h.',
        link: { label: 'Ver todos os horários', href: '#horarios' },
      },
    },
    {
      id: 2,
      selo: 'Adoração ao Santíssimo',
      titulo: 'No colo da Trindade',
      texto:
        'Um momento de adoração ao Santíssimo Sacramento logo após a Santa Missa. Fique mais um pouco, em silêncio e oração, diante de Jesus Eucarístico.',
      botao_principal: { label: 'Saiba mais', href: '#noticias' },
      botao_secundario: { label: 'Ver horários de missa', href: '#horarios' },
      foto: {
        alt: 'Ostensório com o Santíssimo Sacramento',
        label: 'Foto — adoração ao Santíssimo',
      },
      cartao: {
        linha_cima: 'Depois da Santa Missa',
        destaque: 'Adoração ao Santíssimo',
        complemento: 'Silêncio, louvor e oração diante de Jesus Eucarístico.',
        rotulo_info: 'Quando: [dia e horário]',
        link: { label: 'Saiba mais', href: '#noticias' },
      },
    },
    {
      id: 3,
      selo: 'Evento da paróquia',
      titulo: 'V Festival de Sorvete',
      texto:
        'Um dia de alegria e confraternização para toda a família. Venha participar!',
      botao_principal: { label: 'Saiba mais', href: '#noticias' },
      botao_secundario: { label: 'Ver local no mapa', href: '#contato' },
      foto: {
        alt: 'Festival de sorvete da paróquia',
        label: 'Foto — Festival de Sorvete',
      },
      cartao: {
        linha_cima: '22 de novembro, a partir das 10h',
        destaque: 'R$ 15,00',
        complemento: 'Entrada + 4 bolas de sorvete',
        rotulo_info: 'Local: SINTUFPI',
        link: { label: 'Ver local no mapa', href: '#contato' },
      },
    },
    {
      id: 4,
      selo: 'Transmissões no YouTube',
      titulo: 'Acompanhe a\nSanta Missa ao vivo',
      texto:
        'As celebrações da paróquia são transmitidas pelo nosso canal no YouTube. Inscreva-se e ative o sininho para ser avisado quando a missa começar.',
      botao_principal: {
        label: 'Assistir no YouTube',
        href: 'https://www.youtube.com',
        external: true,
      },
      botao_secundario: {
        label: 'Inscrever-se no canal',
        href: 'https://www.youtube.com',
        external: true,
      },
      foto: {
        alt: 'Fiel em oração durante a Santa Missa',
        label: 'Foto — transmissão ao vivo',
      },
      cartao: {
        linha_cima: 'Ao vivo no YouTube',
        destaque: 'Canal da paróquia',
        complemento: 'Paróquia Santíssima Trindade',
        rotulo_info: 'Quando: [dias e horários das transmissões]',
        link: {
          label: 'Abrir o canal',
          href: 'https://www.youtube.com',
          external: true,
        },
      },
    },
  ],
}

export const news = {
  title: 'Notícias e avisos',
  lead: 'O que está acontecendo na paróquia.',
  view_all: { label: 'Ver todas as notícias', href: '#noticias' },
  items: [
    {
      id: 1,
      category: 'Igreja',
      date: '1º de outubro',
      title: 'Outubro, mês das missões',
      excerpt:
        'Durante o mês missionário, as missas lembram as missões e os missionários.',
      href: '#noticias',
      photo_label: 'Foto',
    },
    {
      id: 2,
      category: 'Catequese',
      date: '28 de setembro',
      title: 'Inscrições para a catequese de 2027',
      excerpt: 'Inscrições na secretaria. Leve a certidão de batismo.',
      href: '#noticias',
      photo_label: 'Foto',
    },
    {
      id: 3,
      category: 'Sacramentos',
      date: '21 de setembro',
      title: 'Encontro de preparação para o Batismo',
      excerpt: 'Pais e padrinhos participam antes da celebração.',
      href: '#noticias',
      photo_label: 'Foto',
    },
    {
      id: 4,
      category: 'Dízimo',
      date: '15 de setembro',
      title: 'Atualize seu cadastro de dizimista',
      excerpt: 'A Pastoral do Dízimo atende depois das missas de domingo.',
      href: '#noticias',
      photo_label: 'Foto',
    },
  ],
}

export const dizimo = {
  title: 'Dízimo e ofertas',
  text: 'O dízimo sustenta a vida da paróquia: as celebrações, a catequese e o cuidado com quem mais precisa.',
  quote: 'Deus ama quem dá com alegria.',
  quote_ref: '2Cor 9,7',
  pix_label: 'Chave PIX (CNPJ)',
  pix_key: '[chave PIX da paróquia]',
  pix_note: 'Para ser dizimista, preencha a ficha na secretaria.',
  copy_label: 'Copiar chave',
}

export const masses = {
  title: 'Horários de missa',
  lead: 'Na Igreja Matriz e nas duas comunidades da paróquia.',
  note: 'Em solenidades e festas os horários podem mudar. Na dúvida, ligue para a secretaria: (86) 3305-3327.',
  phone: '(86) 3305-3327',
  phone_href: 'tel:+558633053327',
  matriz: {
    title: 'Na Igreja Matriz',
    rows: [
      { day: 'Domingo', times: ['7h', '19h'] },
      { day: 'Segunda-feira', empty: 'Não há missa' },
      { day: 'Terça a sexta', times: ['18h'], today: true },
      { day: 'Sábado', times: ['7h'] },
    ],
  },
  communities: {
    title: 'Nas comunidades',
    items: [
      {
        name: 'Nossa Senhora da Esperança',
        day: 'Domingo',
        time: '17h',
      },
      {
        name: 'Santa Helena',
        day: 'Sábado',
        time: '19h',
      },
    ],
  },
  confessions: {
    title: 'Confissões',
    day: 'Terça e sexta',
    place: 'Na Igreja Matriz',
    time: '9h às 11h',
  },
}

export const liturgyToday = {
  title: 'Liturgia do dia',
  date: 'Sexta-feira, 2 de outubro de 2026',
  feast: 'Santos Anjos da Guarda',
  rank: 'Memória, cor litúrgica branca',
  readings: [
    { label: 'Primeira leitura', value: 'Ex 23,20-23' },
    { label: 'Salmo', value: 'Sl 90(91)' },
    { label: 'Evangelho', value: 'Mt 18,1-5.10' },
  ],
  response:
    'R. O Senhor deu uma ordem aos seus anjos para em todos os caminhos te guardarem.',
  link: {
    label: 'Ler as leituras do dia',
    href: 'https://liturgia.cancaonova.com/',
    external: true,
  },
}

export const sacraments = {
  title: 'Sacramentos',
  lead: 'Para pedir um sacramento, comece pela secretaria. A equipe explica a preparação e os documentos.',
  items: [
    {
      id: 'batismo',
      title: 'Batismo',
      text: 'Para crianças e adultos. Agende na secretaria; pais e padrinhos participam de um encontro de preparação.',
      icon: 'mdi-water',
      link: { label: 'Como pedir', href: '#contato' },
    },
    {
      id: 'eucaristia',
      title: 'Eucaristia',
      text: 'A catequese prepara crianças, jovens e adultos para a Primeira Comunhão.',
      icon: 'mdi-cup',
      link: { label: 'Como pedir', href: '#contato' },
    },
    {
      id: 'crisma',
      title: 'Crisma',
      text: 'Preparação para jovens e adultos que desejam confirmar a fé recebida no Batismo.',
      icon: 'mdi-fire',
      link: { label: 'Como pedir', href: '#contato' },
    },
    {
      id: 'confissao',
      title: 'Confissão',
      text: 'Na Igreja Matriz, às terças e sextas, das 9h às 11h.',
      icon: 'mdi-key-variant',
      link: { label: 'Ver horários', href: '#horarios' },
    },
    {
      id: 'matrimonio',
      title: 'Matrimônio',
      text: 'Procure a secretaria com antecedência para marcar a data e o curso de noivos.',
      icon: 'mdi-ring',
      link: { label: 'Como pedir', href: '#contato' },
    },
    {
      id: 'uncao',
      title: 'Unção dos Enfermos',
      text: 'Para doentes e idosos. Ligue para a secretaria e combine a visita do padre.',
      icon: 'mdi-hand-heart',
      link: { label: 'Como pedir', href: '#contato' },
    },
  ],
}

export const celebrations = {
  title: 'Próximas celebrações',
  lead: 'Datas do calendário litúrgico. Os horários especiais saem nas notícias.',
  items: [
    {
      id: 1,
      day: '12',
      month: 'out',
      title: 'Nossa Senhora Aparecida',
      note: 'Segunda-feira. Padroeira do Brasil.',
    },
    {
      id: 2,
      day: '1',
      month: 'nov',
      title: 'Todos os Santos',
      note: 'Domingo. Solenidade.',
    },
    {
      id: 3,
      day: '2',
      month: 'nov',
      title: 'Finados',
      note: 'Segunda-feira. Fiéis defuntos.',
    },
    {
      id: 4,
      day: '22',
      month: 'nov',
      title: 'Cristo Rei',
      note: 'Domingo. Encerra o ano litúrgico.',
    },
    {
      id: 5,
      day: '29',
      month: 'nov',
      title: '1º Domingo do Advento',
      note: 'Começa o novo ano litúrgico.',
    },
  ],
}

export const history = {
  title: 'Nossa história',
  paragraphs: [
    'A Paróquia Santíssima Trindade fica no bairro Primavera, na zona Norte de Teresina, e pertence à Forania Norte I da Arquidiocese de Teresina. Reúne a Igreja Matriz e as comunidades Nossa Senhora da Esperança e Santa Helena.',
    'Foi nesta igreja que começou a Missa da Misericórdia, celebração que reúne milhares de fiéis e hoje é Patrimônio Cultural Imaterial do Piauí.',
  ],
  pastor_label: 'Pároco',
  pastor_name: 'Pe. Antônio Francisco dos Santos Cruz',
  cta: { label: 'Conheça a nossa história', href: '#a-paroquia' },
  photo_label: 'Foto da fachada da Igreja Matriz',
  photo_alt: 'Fachada da Igreja Matriz da Paróquia Santíssima Trindade',
}

export const prayerRequest = {
  title: 'Pedido de oração',
  lead: 'Escreva sua intenção. A comunidade reza por ela nas missas da semana.',
  name_label: 'Seu nome (opcional)',
  request_label: 'Seu pedido',
  request_placeholder: 'Escreva aqui a sua intenção',
  checkbox_label: 'Pode ser lido durante a missa',
  submit_label: 'Enviar pedido',
  success_message: 'Pedido enviado. A comunidade vai rezar por esta intenção.',
}

export const contact = {
  title: 'Como chegar',
  map_label: 'Mapa do Google',
  map_name: 'Paróquia Santíssima Trindade',
  map_address_short: 'Rua Gov. Artur de Vasconcelos, 2291, Primavera',
  maps_link_label: 'Ver no Google Maps',
  maps_url:
    'https://www.google.com/maps/search/?api=1&query=Rua+Governador+Artur+de+Vasconcelos+2291+Primavera+Teresina+PI',
  matriz_title: 'Igreja Matriz',
  address_lines: [
    'Rua Governador Artur de Vasconcelos, 2291',
    'Primavera, Teresina – PI',
  ],
  phone_label: 'Secretaria',
  phone: '(86) 3305-3327',
  phone_href: 'tel:+558633053327',
  instagram_label: 'Instagram',
  instagram: '@_paroquiasantissimatrindade',
  instagram_url: 'https://www.instagram.com/_paroquiasantissimatrindade',
  route_label: 'Traçar rota',
  call_label: 'Ligar para a secretaria',
  communities_title: 'Comunidades',
  communities: [
    {
      name: 'Nossa Senhora da Esperança',
      note: 'missa aos domingos, às 17h.',
    },
    {
      name: 'Santa Helena',
      note: 'missa aos sábados, às 19h.',
    },
  ],
}

export const pastorais = {
  title: 'Pastorais e movimentos',
  lead: 'A lista real de pastorais e movimentos será confirmada com a secretaria.',
  note: 'Enquanto isso, procure a secretaria para saber como participar.',
}

export const footer = {
  columns: [
    {
      id: 'paroquia',
      title: 'A paróquia',
      links: [
        { label: 'Nossa história', href: '#a-paroquia' },
        { label: 'Pastorais e movimentos', href: '#pastorais' },
        { label: 'Comunidades', href: '#contato' },
      ],
    },
    {
      id: 'celebracoes',
      title: 'Celebrações',
      links: [
        { label: 'Horários de missa', href: '#horarios' },
        { label: 'Liturgia do dia', href: '#horarios' },
        { label: 'Próximas celebrações', href: '#celebracoes' },
      ],
    },
    {
      id: 'participe',
      title: 'Participe',
      links: [
        { label: 'Notícias e avisos', href: '#noticias' },
        { label: 'Sacramentos', href: '#sacramentos' },
        { label: 'Dízimo', href: '#dizimo' },
        { label: 'Pedido de oração', href: '#contato' },
      ],
    },
  ],
}
