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
  { id: 'inicio', label: 'Início', href: '/#inicio' },
  { id: 'a-paroquia', label: 'A paróquia', href: '/#a-paroquia' },
  { id: 'horarios', label: 'Horários', href: '/#horarios' },
  { id: 'sacramentos', label: 'Sacramentos', href: '/#sacramentos' },
  { id: 'noticias', label: 'Notícias', href: '/noticias' },
  { id: 'pastorais', label: 'Pastorais', href: '/#pastorais' },
  { id: 'contato', label: 'Contato', href: '/#contato' },
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
      botao_principal: { label: 'Ver horários de missa', href: '/#horarios' },
      botao_secundario: { label: 'Como chegar', href: '/#contato' },
      foto: {
        alt: 'Interior da Igreja Matriz durante a celebração',
        label: 'Foto — interior da Matriz',
      },
      cartao: {
        linha_cima: 'Hoje, sexta-feira, 2 de outubro',
        destaque: 'Missa às 18h',
        complemento: 'Confissões das 9h às 11h',
        rotulo_info: 'Amanhã: missa às 7h e, na Comunidade Santa Helena, às 19h.',
        link: { label: 'Ver todos os horários', href: '/#horarios' },
      },
    },
    {
      id: 2,
      selo: 'Adoração ao Santíssimo',
      titulo: 'No colo da Trindade',
      texto:
        'Um momento de adoração ao Santíssimo Sacramento logo após a Santa Missa. Fique mais um pouco, em silêncio e oração, diante de Jesus Eucarístico.',
      botao_principal: { label: 'Saiba mais', href: '/noticias' },
      botao_secundario: { label: 'Ver horários de missa', href: '/#horarios' },
      foto: {
        alt: 'Ostensório com o Santíssimo Sacramento',
        label: 'Foto — adoração ao Santíssimo',
      },
      cartao: {
        linha_cima: 'Depois da Santa Missa',
        destaque: 'Adoração ao Santíssimo',
        complemento: 'Silêncio, louvor e oração diante de Jesus Eucarístico.',
        rotulo_info: 'Quando: [dia e horário]',
        link: { label: 'Saiba mais', href: '/noticias' },
      },
    },
    {
      id: 3,
      selo: 'Evento da paróquia',
      titulo: 'V Festival de Sorvete',
      texto:
        'Um dia de alegria e confraternização para toda a família. Venha participar!',
      botao_principal: { label: 'Saiba mais', href: '/noticias' },
      botao_secundario: { label: 'Ver local no mapa', href: '/#contato' },
      foto: {
        alt: 'Festival de sorvete da paróquia',
        label: 'Foto — Festival de Sorvete',
      },
      cartao: {
        linha_cima: '22 de novembro, a partir das 10h',
        destaque: 'R$ 15,00',
        complemento: 'Entrada + 4 bolas de sorvete',
        rotulo_info: 'Local: SINTUFPI',
        link: { label: 'Ver local no mapa', href: '/#contato' },
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
  view_all: { label: 'Ver todas as notícias', to: '/noticias' },
  per_page: 12,
  homepage_count: 4,
  items: [
    {
      id: 1,
      slug: 'outubro-mes-das-missoes',
      category: 'Igreja',
      date: '1º de outubro',
      title: 'Outubro, mês das missões',
      excerpt:
        'Durante o mês missionário, as missas lembram as missões e os missionários.',
      photo_label: 'Foto',
      body: [
        'No mês de outubro, a Igreja Universal celebra o Mês Missionário. Nas missas da Matriz e das comunidades, a paróquia lembra o anúncio do Evangelho e quem leva a fé a lugares distantes.',
        'As intenções e os avisos do mês destacam a oração pelas missões e o apoio às iniciativas missionárias da Arquidiocese de Teresina.',
        'Participe das celebrações e acompanhe os avisos na secretaria e neste site.',
      ],
    },
    {
      id: 2,
      slug: 'inscricoes-para-a-catequese-de-2027',
      category: 'Catequese',
      date: '28 de setembro',
      title: 'Inscrições para a catequese de 2027',
      excerpt: 'Inscrições na secretaria. Leve a certidão de batismo.',
      photo_label: 'Foto',
      body: [
        'Estão abertas as inscrições para a catequese de 2027. Pais e responsáveis devem procurar a secretaria paroquial com a documentação solicitada.',
        'É necessário levar a certidão de batismo da criança ou do jovem. A equipe de catequese orienta sobre turmas, horários e encontros de pais.',
        'Vagas limitadas. Informe-se o quanto antes para garantir a matrícula.',
      ],
    },
    {
      id: 3,
      slug: 'encontro-de-preparacao-para-o-batismo',
      category: 'Sacramentos',
      date: '21 de setembro',
      title: 'Encontro de preparação para o Batismo',
      excerpt: 'Pais e padrinhos participam antes da celebração.',
      photo_label: 'Foto',
      body: [
        'Antes da celebração do Batismo, pais e padrinhos participam de um encontro de preparação na paróquia.',
        'O encontro explica o sentido do sacramento, os compromissos da família e os documentos necessários.',
        'Agende pela secretaria. Sem o encontro, a data da celebração não é confirmada.',
      ],
    },
    {
      id: 4,
      slug: 'atualize-seu-cadastro-de-dizimista',
      category: 'Dízimo',
      date: '15 de setembro',
      title: 'Atualize seu cadastro de dizimista',
      excerpt: 'A Pastoral do Dízimo atende depois das missas de domingo.',
      photo_label: 'Foto',
      body: [
        'A Pastoral do Dízimo convida as famílias a atualizarem o cadastro de dizimista.',
        'O atendimento acontece depois das missas de domingo, na secretaria. Também é possível preencher a ficha durante a semana.',
        'O dízimo sustenta as celebrações, a catequese e o cuidado com quem mais precisa.',
      ],
    },
    {
      id: 5,
      slug: 'missa-da-misericordia-em-outubro',
      category: 'Igreja',
      date: '10 de setembro',
      title: 'Missa da Misericórdia em outubro',
      excerpt: 'Confira a programação especial da celebração que é Patrimônio Cultural Imaterial do Piauí.',
      photo_label: 'Foto',
      body: [
        'A Missa da Misericórdia, celebrada nesta igreja e reconhecida como Patrimônio Cultural Imaterial do Piauí, tem programação especial em outubro.',
        'Horários e intenções serão divulgados nos avisos paroquiais e nas redes sociais.',
        'Venha rezar conosco e traga sua família.',
      ],
    },
    {
      id: 6,
      slug: 'grupo-de-oracao-retoma-encontros',
      category: 'Pastorais',
      date: '5 de setembro',
      title: 'Grupo de oração retoma encontros',
      excerpt: 'Encontros semanais de louvor e intercessão na Matriz.',
      photo_label: 'Foto',
      body: [
        'O grupo de oração da paróquia retoma os encontros semanais na Igreja Matriz.',
        'Os momentos incluem louvor, palavra e intercessão pelas intenções da comunidade.',
        'Todos são bem-vindos. Horário na secretaria e nos avisos do domingo.',
      ],
    },
    {
      id: 7,
      slug: 'curso-de-noivos-abre-nova-turma',
      category: 'Sacramentos',
      date: '1º de setembro',
      title: 'Curso de noivos abre nova turma',
      excerpt: 'Casais que desejam o Matrimônio devem se inscrever com antecedência.',
      photo_label: 'Foto',
      body: [
        'Está aberta uma nova turma do curso de noivos da paróquia.',
        'O Matrimônio exige preparação. Procure a secretaria com antecedência para marcar a data e garantir vaga no curso.',
        'Documentos e calendário são informados no ato da inscrição.',
      ],
    },
    {
      id: 8,
      slug: 'confissoes-reforcadas-neste-mes',
      category: 'Sacramentos',
      date: '28 de agosto',
      title: 'Confissões reforçadas neste mês',
      excerpt: 'Além das terças e sextas, haverá horários extras na Matriz.',
      photo_label: 'Foto',
      body: [
        'Neste mês, a paróquia reforça o atendimento de confissões na Igreja Matriz.',
        'O horário habitual permanece: terças e sextas, das 9h às 11h. Horários extras saem nos avisos.',
        'Aproveite para celebrar o sacramento da reconciliação.',
      ],
    },
    {
      id: 9,
      slug: 'comunidade-santa-helena-celebra-padroeira',
      category: 'Comunidades',
      date: '20 de agosto',
      title: 'Comunidade Santa Helena celebra padroeira',
      excerpt: 'Tríduo e missa festiva com a presença da Matriz.',
      photo_label: 'Foto',
      body: [
        'A Comunidade Santa Helena prepara o tríduo e a missa festiva em honra à padroeira.',
        'A Matriz se une à festa. Horários das celebrações serão publicados nos avisos e nas redes.',
        'Toda a paróquia é convidada a participar.',
      ],
    },
    {
      id: 10,
      slug: 'campanha-do-agasalho-na-paroquia',
      category: 'Caridade',
      date: '12 de agosto',
      title: 'Campanha do agasalho na paróquia',
      excerpt: 'Doe roupas e cobertores em bom estado na secretaria.',
      photo_label: 'Foto',
      body: [
        'A paróquia organiza a Campanha do Agasalho para famílias acompanhadas pela pastoral social.',
        'Doe roupas e cobertores em bom estado na secretaria, de segunda a sexta, no horário de atendimento.',
        'Sua generosidade aquece quem mais precisa.',
      ],
    },
    {
      id: 11,
      slug: 'liturgia-do-dia-passa-a-ser-publicada-no-site',
      category: 'Igreja',
      date: '5 de agosto',
      title: 'Liturgia do dia passa a ser publicada no site',
      excerpt: 'Leituras, salmo e evangelho do dia na página inicial.',
      photo_label: 'Foto',
      body: [
        'A partir de agora, a liturgia do dia aparece na página inicial do site da paróquia.',
        'Você encontra as referências das leituras, o salmo responsorial e um link para ler o texto completo.',
        'Um jeito simples de rezar a Palavra em casa.',
      ],
    },
    {
      id: 12,
      slug: 'transmissoes-no-youtube-orientacoes',
      category: 'Igreja',
      date: '28 de julho',
      title: 'Transmissões no YouTube: orientações',
      excerpt: 'Como acompanhar a Santa Missa ao vivo pelo canal da paróquia.',
      photo_label: 'Foto',
      body: [
        'As celebrações da paróquia são transmitidas pelo canal no YouTube.',
        'Inscreva-se e ative o sininho para ser avisado quando a missa começar. Dias e horários das transmissões serão confirmados com a secretaria.',
        'Quem puder, participe também presencialmente na Matriz ou nas comunidades.',
      ],
    },
    {
      id: 13,
      slug: 'v-festival-de-sorvete-inscricoes',
      category: 'Eventos',
      date: '20 de julho',
      title: 'V Festival de Sorvete: inscrições',
      excerpt: 'Dia de confraternização para toda a família. Entrada + 4 bolas.',
      photo_label: 'Foto',
      body: [
        'O V Festival de Sorvete da paróquia será no dia 22 de novembro, a partir das 10h, no SINTUFPI.',
        'A entrada custa R$ 15,00 e inclui 4 bolas de sorvete. É um dia de alegria e confraternização para toda a família.',
        'Mais informações na secretaria e nos próximos avisos.',
      ],
    },
    {
      id: 14,
      slug: 'adoracao-ao-santissimo-no-colo-da-trindade',
      category: 'Igreja',
      date: '15 de julho',
      title: 'Adoração ao Santíssimo: No colo da Trindade',
      excerpt: 'Momento de silêncio e oração depois da Santa Missa.',
      photo_label: 'Foto',
      body: [
        '“No colo da Trindade” é o momento de adoração ao Santíssimo Sacramento logo após a Santa Missa.',
        'Fique mais um pouco, em silêncio e oração, diante de Jesus Eucarístico.',
        'Dia e horário serão confirmados com a secretaria e publicados nos avisos.',
      ],
    },
    {
      id: 15,
      slug: 'secretaria-informa-horario-de-atendimento',
      category: 'Secretaria',
      date: '8 de julho',
      title: 'Secretaria informa horário de atendimento',
      excerpt: 'Telefone (86) 3305-3327. Atendimento presencial na Matriz.',
      photo_label: 'Foto',
      body: [
        'A secretaria paroquial atende na Igreja Matriz. Na dúvida sobre horários, sacramentos ou documentos, ligue para (86) 3305-3327.',
        'Endereço: Rua Governador Artur de Vasconcelos, 2291, Primavera, Teresina – PI.',
        'Siga também o Instagram @_paroquiasantissimatrindade para avisos rápidos.',
      ],
    },
    {
      id: 16,
      slug: 'comunidade-nossa-senhora-da-esperanca-missa-as-17h',
      category: 'Comunidades',
      date: '1º de julho',
      title: 'Comunidade Nossa Senhora da Esperança: missa às 17h',
      excerpt: 'Missa aos domingos, às 17h, na comunidade.',
      photo_label: 'Foto',
      body: [
        'Na Comunidade Nossa Senhora da Esperança, a Santa Missa é celebrada aos domingos, às 17h.',
        'A paróquia reúne a Matriz e as comunidades Nossa Senhora da Esperança e Santa Helena.',
        'Participe e fortaleça a vida comunitária no bairro.',
      ],
    },
    {
      id: 17,
      slug: 'uncao-dos-enfermos-agende-visita',
      category: 'Sacramentos',
      date: '22 de junho',
      title: 'Unção dos Enfermos: agende a visita',
      excerpt: 'Para doentes e idosos. Ligue e combine a visita do padre.',
      photo_label: 'Foto',
      body: [
        'A Unção dos Enfermos é oferecida a doentes e idosos. A família pode ligar para a secretaria e combinar a visita do padre.',
        'Não é necessário esperar uma gravidade extrema: o sacramento fortalece na doença e na idade avançada.',
        'Telefone da secretaria: (86) 3305-3327.',
      ],
    },
    {
      id: 18,
      slug: 'pedido-de-oracao-pela-comunidade',
      category: 'Igreja',
      date: '15 de junho',
      title: 'Pedido de oração pela comunidade',
      excerpt: 'Envie sua intenção pelo site. A comunidade reza nas missas da semana.',
      photo_label: 'Foto',
      body: [
        'Na página inicial do site, você pode enviar um pedido de oração.',
        'A comunidade reza pelas intenções nas missas da semana. Se quiser, marque a opção para que o pedido possa ser lido durante a missa.',
        'Nome é opcional. O importante é a intenção confiada a Deus.',
      ],
    },
  ],
}

/** Retorna notícia pelo slug (ou undefined). */
export function getNewsBySlug(slug) {
  return news.items.find((item) => item.slug === slug)
}

/** Itens exibidos na grade da homepage. */
export function getHomepageNews() {
  return news.items.slice(0, news.homepage_count)
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
      link: { label: 'Como pedir', href: '/#contato' },
    },
    {
      id: 'eucaristia',
      title: 'Eucaristia',
      text: 'A catequese prepara crianças, jovens e adultos para a Primeira Comunhão.',
      icon: 'mdi-cup',
      link: { label: 'Como pedir', href: '/#contato' },
    },
    {
      id: 'crisma',
      title: 'Crisma',
      text: 'Preparação para jovens e adultos que desejam confirmar a fé recebida no Batismo.',
      icon: 'mdi-fire',
      link: { label: 'Como pedir', href: '/#contato' },
    },
    {
      id: 'confissao',
      title: 'Confissão',
      text: 'Na Igreja Matriz, às terças e sextas, das 9h às 11h.',
      icon: 'mdi-key-variant',
      link: { label: 'Ver horários', href: '/#horarios' },
    },
    {
      id: 'matrimonio',
      title: 'Matrimônio',
      text: 'Procure a secretaria com antecedência para marcar a data e o curso de noivos.',
      icon: 'mdi-ring',
      link: { label: 'Como pedir', href: '/#contato' },
    },
    {
      id: 'uncao',
      title: 'Unção dos Enfermos',
      text: 'Para doentes e idosos. Ligue para a secretaria e combine a visita do padre.',
      icon: 'mdi-hand-heart',
      link: { label: 'Como pedir', href: '/#contato' },
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
  cta: { label: 'Conheça a nossa história', href: '/#a-paroquia' },
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
        { label: 'Nossa história', href: '/#a-paroquia' },
        { label: 'Pastorais e movimentos', href: '/#pastorais' },
        { label: 'Comunidades', href: '/#contato' },
      ],
    },
    {
      id: 'celebracoes',
      title: 'Celebrações',
      links: [
        { label: 'Horários de missa', href: '/#horarios' },
        { label: 'Liturgia do dia', href: '/#horarios' },
        { label: 'Próximas celebrações', href: '/#celebracoes' },
      ],
    },
    {
      id: 'participe',
      title: 'Participe',
      links: [
        { label: 'Notícias e avisos', href: '/noticias' },
        { label: 'Sacramentos', href: '/#sacramentos' },
        { label: 'Dízimo', href: '/#dizimo' },
        { label: 'Pedido de oração', href: '/#contato' },
      ],
    },
  ],
}
