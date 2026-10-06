/**
 * Conteúdo da página inicial — Paróquia Santíssima Trindade.
 *
 * Estrutura preparada para CMS futuro (Directus ou similar):
 * - singletons: site, contact, history, historyPage, parocosPage, pastoraisPage,
 *   comunidadesPage, pedidoOracaoPage, dizimo, liturgyToday
 * - coleções: navLinks, heroSlides, news, massSchedule, communities,
 *   confessions, sacraments, celebrations, footerColumns, historyTimeline, parocos,
 *   pastorais, comunidades
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

/**
 * Menu principal. Itens com `children` viram submenu (dropdown no desktop,
 * grupo expansível no mobile). O logo já leva para o início.
 * Submenu "A Paróquia": /historia, /paroco, /pastorais e /comunidades.
 */
export const navLinks = [
  {
    id: 'a-paroquia',
    label: 'A Paróquia',
    children: [
      { id: 'historia', label: 'História', href: '/historia' },
      { id: 'paroco', label: 'Párocos', href: '/paroco' },
      { id: 'pastorais', label: 'Pastorais', href: '/pastorais' },
      { id: 'comunidades', label: 'Comunidades', href: '/comunidades' },
    ],
  },
  { id: 'horarios', label: 'Horários', href: '/#horarios' },
  { id: 'noticias', label: 'Notícias', href: '/noticias' },
  {
    id: 'pedido-de-oracoes',
    label: 'Pedido de Oração',
    href: '/pedido-de-oracoes',
    keywords: 'pedido de oração intenção rezar', // termos extras para a busca (lupa)
  },
  { id: 'contato', label: 'Contato', href: '/#contato' },
  { id: 'dizimo', label: 'Dízimo', href: '/#dizimo', highlight: true },
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
      botao_secundario: { label: 'Como Chegar', href: '/#contato' },
      foto: {
        alt: 'Interior da Igreja Matriz durante a celebração',
        label: 'Foto — interior da Matriz',
      },
      cartao: {
        linha_cima: 'Hoje, sexta-feira, 2 de outubro',
        destaque: 'Missa às 18h',
        complemento: 'Confissões das 9h às 11h',
        rotulo_info: 'Amanhã: missa às 7h e, na Comunidade Santa Helena, às 19h.',
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
      },
    },
  ],
}

export const news = {
  title: 'Notícias e Avisos',
  lead: 'O que está acontecendo na paróquia.',
  view_all: { label: 'Ver todas as notícias', to: '/noticias' },
  per_page: 12,
  homepage_count: 4,
  items: [
    {
      id: 1,
      slug: 'outubro-mes-das-missoes',
      category: 'Igreja',
      date: '01/10/2026',
      time: '08h15',
      author: 'Secretaria paroquial',
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
      date: '28/09/2026',
      time: '09h40',
      author: 'Pastoral da Comunicação',
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
      date: '21/09/2026',
      time: '10h05',
      author: 'Equipe de Catequese',
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
      date: '15/09/2026',
      time: '11h30',
      author: 'Pastoral do Dízimo',
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
      date: '10/09/2026',
      time: '14h20',
      author: 'Assessoria de Imprensa',
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
      date: '05/09/2026',
      time: '16h00',
      author: 'Comunidade Santa Helena',
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
      date: '01/09/2026',
      time: '17h45',
      author: 'Comunidade N. Sra. da Esperança',
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
      date: '28/08/2026',
      time: '19h10',
      author: 'Secretaria paroquial',
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
      date: '20/08/2026',
      time: '08h15',
      author: 'Pastoral da Comunicação',
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
      date: '12/08/2026',
      time: '09h40',
      author: 'Equipe de Catequese',
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
      date: '05/08/2026',
      time: '10h05',
      author: 'Pastoral do Dízimo',
      title: 'Liturgia do Dia passa a ser publicada no site',
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
      date: '28/07/2026',
      time: '11h30',
      author: 'Assessoria de Imprensa',
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
      date: '20/07/2026',
      time: '14h20',
      author: 'Comunidade Santa Helena',
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
      date: '15/07/2026',
      time: '16h00',
      author: 'Comunidade N. Sra. da Esperança',
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
      date: '08/07/2026',
      time: '17h45',
      author: 'Secretaria paroquial',
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
      date: '01/07/2026',
      time: '19h10',
      author: 'Pastoral da Comunicação',
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
      date: '22/06/2026',
      time: '08h15',
      author: 'Equipe de Catequese',
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
      date: '15/06/2026',
      time: '09h40',
      author: 'Pastoral do Dízimo',
      title: 'Pedido de Oração pela comunidade',
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

/** Notícias recentes para a barra lateral (exclui slug atual). */
export function getRecentNews(excludeSlug, limit = 5) {
  return news.items.filter((item) => item.slug !== excludeSlug).slice(0, limit)
}


/**
 * Singleton `dizimo` no Directus. pix_qr_url = imagem do QR Code PIX (upload no Directus);
 * vazio → placeholder. A chave PIX por escrito não é exibida (só o QR Code).
 */
export const dizimo = {
  title: 'Dízimo e Ofertas',
  text: 'O dízimo sustenta a vida da paróquia: as celebrações, a catequese e o cuidado com quem mais precisa.',
  quote: 'Deus ama quem dá com alegria.',
  quote_ref: '2Cor 9,7',
  pix_qr_url: '',
  pix_qr_alt: 'QR Code PIX para dízimo e ofertas da Paróquia Santíssima Trindade',
  pix_qr_label: 'QR Code PIX',
  pix_qr_hint: 'Abra o app do seu banco e escaneie o código.',
  pix_favorecido: 'Paróquia Santíssima Trindade',
  pix_note: 'Para ser dizimista, preencha a ficha na secretaria.',
}

export const masses = {
  title: 'Horários de Missa',
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
    title: 'Nas Comunidades',
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
  title: 'Liturgia do Dia',
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

/*
 * Sacramentos — coleção `sacraments` (itens) + campos do bloco.
 * Cada item traz `documentos` (lista), `procedimento` (passos em ordem) e
 * `observacao` (texto curto, opcional), exibidos no pop-up "Mais Informações".
 *
 * ATENÇÃO: documentos, procedimentos e observações abaixo são CONTEÚDO DE
 * EXEMPLO, baseado em exigências comuns das paróquias no Brasil.
 * Confirmar tudo com a secretaria paroquial antes de publicar.
 */
export const sacraments = {
  title: 'Sacramentos',
  lead: 'Para pedir um sacramento, comece pela secretaria. A equipe explica a preparação e os documentos.',
  more_label: 'Mais Informações',
  docs_title: 'Documentação Necessária',
  steps_title: 'Como Solicitar na Secretaria',
  secretaria_title: 'Secretaria Paroquial',
  call_label: 'Ligar para a Secretaria',
  close_label: 'Fechar',
  items: [
    {
      id: 'batismo',
      title: 'Batismo',
      text: 'Para crianças e adultos. Agende na secretaria; pais e padrinhos participam de um encontro de preparação.',
      icon: 'mdi-water',
      documentos: [
        'Certidão de nascimento da criança (cópia)',
        'Documento de identidade com foto e CPF dos pais e dos padrinhos',
        'Comprovante de residência',
        'Padrinhos: comprovante de Batismo e de Crisma; se casados, certidão de casamento religioso',
        'Autorização da paróquia de origem, se a família morar em outra paróquia',
      ],
      procedimento: [
        'Vá à secretaria com os documentos e preencha a ficha de inscrição.',
        'Escolha a data do Batismo e a do encontro de preparação.',
        'Pais e padrinhos participam do encontro de preparação.',
        'No dia, chegue à igreja com antecedência.',
      ],
      observacao:
        'Faça a inscrição com pelo menos 30 dias de antecedência. Adultos passam pela catequese antes do Batismo.',
    },
    {
      id: 'eucaristia',
      title: 'Eucaristia',
      text: 'A catequese prepara crianças, jovens e adultos para a Primeira Comunhão.',
      icon: 'mdi-cup',
      documentos: [
        'Certidão de nascimento (cópia)',
        'Certidão ou lembrança de Batismo',
        'Documento de identidade dos pais ou responsáveis',
        'Comprovante de residência',
      ],
      procedimento: [
        'Faça a inscrição na catequese pela secretaria, no período de matrículas.',
        'Participe dos encontros de catequese.',
        'Pais ou responsáveis comparecem às reuniões marcadas pela catequese.',
        'Ao final da preparação, a paróquia marca a celebração da Primeira Comunhão.',
      ],
      observacao:
        'Crianças, jovens e adultos têm turmas próprias. Pergunte na secretaria as datas de inscrição.',
    },
    {
      id: 'crisma',
      title: 'Crisma',
      text: 'Preparação para jovens e adultos que desejam confirmar a fé recebida no Batismo.',
      icon: 'mdi-fire',
      documentos: [
        'Certidão de Batismo',
        'Comprovante da Primeira Comunhão',
        'Documento de identidade com foto',
        'Comprovante de residência',
        'Padrinho ou madrinha: crismado e, se casado, casado na Igreja',
      ],
      procedimento: [
        'Inscreva-se na secretaria no período de inscrições.',
        'Participe dos encontros de preparação para a Crisma.',
        'Escolha o padrinho ou a madrinha e entregue os dados na secretaria.',
        'A paróquia informa a data da celebração com o bispo.',
      ],
      observacao: 'A idade mínima e o calendário da turma são informados na secretaria.',
    },
    {
      id: 'confissao',
      title: 'Confissão',
      text: 'Na Igreja Matriz, às terças e sextas, das 9h às 11h.',
      icon: 'mdi-key-variant',
      documentos: ['Não é preciso apresentar documentos.'],
      procedimento: [
        'Venha à Igreja Matriz às terças e sextas, das 9h às 11h.',
        'Antes, faça um exame de consciência.',
        'Para confissão em outro horário ou de pessoa doente, combine com a secretaria.',
      ],
      observacao:
        'Antes do Natal e da Páscoa a paróquia costuma abrir horários extras, divulgados nas notícias.',
    },
    {
      id: 'matrimonio',
      title: 'Matrimônio',
      text: 'Procure a secretaria com antecedência para marcar a data e o curso de noivos.',
      icon: 'mdi-ring',
      documentos: [
        'Certidão de Batismo dos noivos, atualizada (emitida há menos de 6 meses)',
        'Comprovante de Crisma',
        'Documento de identidade com foto e CPF dos noivos',
        'Certidão de nascimento ou de casamento civil',
        'Comprovante de residência',
        'Certificado do curso de noivos',
        'Documento de identidade de duas testemunhas',
      ],
      procedimento: [
        'Procurem a secretaria para verificar a data disponível.',
        'Façam o curso de noivos.',
        'Agendem a entrevista com o padre para o processo matrimonial.',
        'Entreguem os documentos e confirmem os detalhes da celebração.',
      ],
      observacao:
        'Procurem a secretaria com pelo menos 6 meses de antecedência. Para efeito civil, providenciem também a habilitação no cartório.',
    },
    {
      id: 'uncao',
      title: 'Unção dos Enfermos',
      text: 'Para doentes e idosos. Ligue para a secretaria e combine a visita do padre.',
      icon: 'mdi-hand-heart',
      documentos: ['Não é preciso apresentar documentos.'],
      procedimento: [
        'Ligue para a secretaria ou vá pessoalmente.',
        'Informe o nome do doente, o endereço e um telefone de contato.',
        'Combine o dia e o horário da visita do padre.',
        'Em caso de risco de morte, avise com urgência.',
      ],
      observacao:
        'Na mesma visita, o doente pode se confessar e receber a Comunhão.',
    },
  ],
}

export const celebrations = {
  title: 'Próximas Celebrações',
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
  title: 'Nossa História',
  paragraphs: [
    'A Paróquia Santíssima Trindade fica no bairro Primavera, na zona Norte de Teresina, e pertence à Forania Norte I da Arquidiocese de Teresina. Reúne a Igreja Matriz e as comunidades Nossa Senhora da Esperança e Santa Helena.',
    'Foi nesta igreja que começou a Missa da Misericórdia, celebração que reúne milhares de fiéis e hoje é Patrimônio Cultural Imaterial do Piauí.',
  ],
  pastor_label: 'Pároco',
  pastor_name: 'Pe. Antônio Francisco dos Santos Cruz',
  cta: { label: 'Conheça a Nossa História', href: '/historia' },
  photo_label: 'Foto da fachada da Igreja Matriz',
  photo_alt: 'Fachada da Igreja Matriz da Paróquia Santíssima Trindade',
}

/**
 * Página /historia — singleton `history_page` no Directus (+ coleção `history_timeline`
 * relacionada, ordenada por `sort`). Os dois primeiros parágrafos repetem o texto do bloco
 * "Nossa História" da home (`history.paragraphs`). Trechos entre colchetes são
 * PLACEHOLDERS: substituir pelo texto confirmado com a secretaria antes de publicar.
 */
export const historyPage = {
  title: 'Nossa História',
  resumo:
    'Da Igreja Matriz no bairro Primavera às comunidades Nossa Senhora da Esperança e Santa Helena: a caminhada de fé da Paróquia Santíssima Trindade na zona Norte de Teresina.',
  breadcrumb_parent: 'A Paróquia',
  hero_icon: 'mdi-church-outline',
  photo_url: '', // imagem (Directus file) — vazio = placeholder
  photo_label: 'Foto histórica da Igreja Matriz',
  photo_alt: 'Foto histórica da Igreja Matriz da Paróquia Santíssima Trindade',
  body: [
    ...history.paragraphs,
    '[Texto a confirmar com a secretaria: origem da paróquia, data de criação e quem a instituiu.]',
    '[Texto a confirmar com a secretaria: construção da Igreja Matriz e formação das comunidades Nossa Senhora da Esperança e Santa Helena.]',
    '[Texto a confirmar com a secretaria: párocos que serviram à paróquia e marcos da vida pastoral.]',
  ],
  quote: {
    text: 'Ide, pois, e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo.',
    source: 'Mt 28,19',
  },
  timeline_title: 'Linha do Tempo',
  timeline_lead: 'Principais marcos da caminhada da paróquia. Datas e descrições a confirmar com a secretaria.',
  timeline: [
    {
      id: 1,
      sort: 1,
      year: '[Ano a confirmar]',
      title: 'Criação da Paróquia',
      description: '[Texto a confirmar com a secretaria]',
    },
    {
      id: 2,
      sort: 2,
      year: '[Ano a confirmar]',
      title: 'Construção da Igreja Matriz',
      description: '[Texto a confirmar com a secretaria]',
    },
    {
      id: 3,
      sort: 3,
      year: '[Ano a confirmar]',
      title: 'Início da Missa da Misericórdia',
      description:
        'Celebração que começou nesta igreja e hoje reúne milhares de fiéis. [Detalhes a confirmar com a secretaria]',
    },
    {
      id: 4,
      sort: 4,
      year: '[Ano a confirmar]',
      title: 'Patrimônio Cultural Imaterial do Piauí',
      description:
        'A Missa da Misericórdia é reconhecida como Patrimônio Cultural Imaterial do Piauí. [Detalhes a confirmar com a secretaria]',
    },
    {
      id: 5,
      sort: 5,
      year: '[Ano a confirmar]',
      title: 'Comunidades Nossa Senhora da Esperança e Santa Helena',
      description: '[Texto a confirmar com a secretaria]',
    },
  ],
}

/**
 * Página /paroco — singleton `parocos_page` no Directus.
 */
export const parocosPage = {
  title: 'Nossos Párocos',
  resumo:
    'Conheça os sacerdotes que conduziram e conduzem a caminhada de fé da Paróquia Santíssima Trindade.',
  breadcrumb_parent: 'A Paróquia',
  breadcrumb_label: 'Párocos',
  hero_icon: 'mdi-account-tie',
  periodo_label: 'Período na Paróquia',
  atual_label: 'Pároco Atual',
  atual_periodo_fim_label: 'Atual',
  anteriores_title: 'Párocos Anteriores',
  foto_placeholder_label: 'Foto do pároco',
}

/**
 * Coleção `parocos` no Directus (foto_url = arquivo do Directus; vazio = placeholder).
 * Ordem de exibição: pároco atual primeiro, depois os anteriores do mais recente ao mais
 * antigo (campo `sort`). periodo_fim = null → "Atual".
 * Campos opcionais: apelido (exibido sob o nome), tag (selo, ex.: "Fundador"),
 * periodo_nota (complemento do período, ex.: "cerca de 31 anos").
 * Trechos entre colchetes são PLACEHOLDERS a confirmar com a secretaria.
 */
export const parocos = [
  {
    id: 1,
    sort: 1,
    titulo: 'Pe.',
    nome: history.pastor_name.replace(/^Pe\.\s*/, ''),
    apelido: 'Padre Toinho / Padre Cruz',
    tag: 'No Colo da Trindade',
    foto_url: '',
    foto_alt: `Foto do ${history.pastor_name}`,
    // Provavelmente 2024 (sucessor do Pe. Edvaldo), mas ainda não confirmado.
    periodo_inicio: '[Ano a confirmar]',
    periodo_fim: null,
    periodo_nota: '',
    atual: true,
    biografia: [
      'Conhecido como Padre Toinho ou Padre Cruz, é o atual pároco da Paróquia Santíssima Trindade.',
      'Em 2026, comemorou 40 anos de ordenação sacerdotal.',
      'Criou o "No Colo da Trindade", momento de adoração ao Santíssimo Sacramento após a Santa Missa.',
      '[Biografia completa a confirmar com a secretaria]',
    ],
    frase: '[Frase marcante a confirmar]',
    frase_fonte: '',
  },
  {
    id: 2,
    sort: 2,
    titulo: 'Pe.',
    nome: 'Edvaldo Barbosa Lima',
    apelido: '',
    tag: '',
    foto_url: '',
    foto_alt: 'Foto do Pe. Edvaldo Barbosa Lima',
    periodo_inicio: '[Ano a confirmar]',
    periodo_fim: '2024',
    periodo_nota: '',
    atual: false,
    biografia: [
      'Pe. Edvaldo Barbosa Lima atuou na Paróquia Santíssima Trindade até 2024, quando foi transferido para a Paróquia Cristo Rei.',
      '[Biografia completa a confirmar com a secretaria]',
    ],
    frase: '[Frase marcante a confirmar]',
    frase_fonte: '',
  },
  {
    id: 3,
    sort: 3,
    titulo: 'Pe.',
    nome: 'Nilton Santos',
    apelido: '',
    tag: 'Missa da Misericórdia',
    foto_url: '',
    foto_alt: 'Foto do Pe. Nilton Santos',
    periodo_inicio: '[Ano a confirmar]',
    periodo_fim: '2018',
    periodo_nota: '',
    atual: false,
    biografia: [
      'Pe. Nilton Santos é conhecido pela Missa da Misericórdia. Foi transferido da paróquia em 2018.',
      '[Biografia completa a confirmar com a secretaria]',
    ],
    frase: '[Frase marcante a confirmar]',
    frase_fonte: '',
  },
  {
    id: 4,
    sort: 4,
    titulo: 'Pe.',
    nome: 'Manoel',
    apelido: '',
    tag: 'Fundador',
    foto_url: '',
    foto_alt: 'Foto do Pe. Manoel',
    periodo_inicio: '[Ano a confirmar]',
    periodo_fim: '[Ano a confirmar]',
    periodo_nota: 'cerca de 31 anos',
    atual: false,
    biografia: [
      'Fundador da paróquia, Pe. Manoel acompanhou a comunidade por cerca de 31 anos.',
      '[Biografia completa a confirmar com a secretaria]',
    ],
    frase: '[Frase marcante a confirmar]',
    frase_fonte: '',
  },
]

/**
 * Página /pastorais — singleton `pastorais_page` no Directus.
 */
export const pastoraisPage = {
  title: 'Pastorais e Movimentos',
  resumo:
    'Conheça as pastorais e os movimentos que animam a vida da Paróquia Santíssima Trindade e descubra onde você pode servir.',
  breadcrumb_parent: 'A Paróquia',
  breadcrumb_label: 'Pastorais',
  hero_icon: 'mdi-hands-pray',
  demais_title: 'Demais Pastorais',
  demais_lead: 'Outros grupos, pastorais e movimentos da paróquia.',
  coordenador_label: 'Coordenação',
  encontros_label: 'Encontros',
  local_label: 'Local',
  contato_fallback_label: 'Falar com a Secretaria',
  cta_title: 'Quer Participar?',
  cta_text:
    'Procure a secretaria paroquial para saber os dias de encontro e como fazer parte de uma pastoral ou movimento.',
  cta_label: 'Falar com a Secretaria',
}

/**
 * Coleção `pastorais` no Directus. `destaque: true` → card grande no topo da página;
 * as demais aparecem na grade "Demais Pastorais". Ordem pelo campo `sort`.
 * ATENÇÃO: lista de EXEMPLO (pastorais comuns em paróquias católicas) — confirmar com a
 * secretaria quais existem de fato, além de coordenação, encontros, local e contatos.
 * Fatos já conhecidos: a Pastoral do Dízimo atende após as missas de domingo; a Pastoral
 * da Comunicação publica as notícias do site.
 */
export const pastorais = [
  {
    id: 1,
    sort: 1,
    nome: 'Pastoral do Dízimo',
    slug: 'pastoral-do-dizimo',
    destaque: true,
    icone: 'mdi-hand-heart-outline',
    foto_url: '',
    foto_alt: 'Foto: Pastoral do Dízimo',
    descricao:
      'Acolhe os dizimistas, mantém o cadastro atualizado e anima a comunidade a partilhar com gratidão aquilo que recebe de Deus.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: 'Atendimento após as missas de domingo',
    local: '[A confirmar com a secretaria]',
    contato_label: 'Saiba Mais Sobre o Dízimo',
    contato_href: '/#dizimo',
  },
  {
    id: 2,
    sort: 2,
    nome: 'Catequese',
    slug: 'catequese',
    destaque: true,
    icone: 'mdi-book-cross',
    foto_url: '',
    foto_alt: 'Foto: Catequese',
    descricao:
      'Prepara crianças, jovens e adultos para os sacramentos da Iniciação Cristã e acompanha o crescimento na fé.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 3,
    sort: 3,
    nome: 'Pastoral da Juventude',
    slug: 'pastoral-da-juventude',
    destaque: true,
    icone: 'mdi-account-group-outline',
    foto_url: '',
    foto_alt: 'Foto: Pastoral da Juventude',
    descricao:
      'Reúne os jovens para viver a fé em comunidade, com momentos de oração, formação, convivência e serviço.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 4,
    sort: 4,
    nome: 'Pastoral da Comunicação',
    slug: 'pastoral-da-comunicacao',
    destaque: false,
    icone: 'mdi-bullhorn-outline',
    foto_url: '',
    foto_alt: 'Foto: Pastoral da Comunicação',
    descricao:
      'Cuida da divulgação da vida paroquial: notícias, avisos e redes sociais da paróquia.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: 'Ver Notícias',
    contato_href: '/noticias',
  },
  {
    id: 5,
    sort: 5,
    nome: 'Pastoral Familiar',
    slug: 'pastoral-familiar',
    destaque: false,
    icone: 'mdi-home-heart',
    foto_url: '',
    foto_alt: 'Foto: Pastoral Familiar',
    descricao:
      'Acompanha as famílias e os casais, com encontros de formação, preparação para o matrimônio e apoio nas diferentes fases da vida.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 6,
    sort: 6,
    nome: 'Pastoral da Liturgia',
    slug: 'pastoral-da-liturgia',
    destaque: false,
    icone: 'mdi-candle',
    foto_url: '',
    foto_alt: 'Foto: Pastoral da Liturgia',
    descricao:
      'Prepara e anima as celebrações: leitores, comentaristas, acólitos e equipe de canto.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 7,
    sort: 7,
    nome: 'Pastoral do Batismo',
    slug: 'pastoral-do-batismo',
    destaque: false,
    icone: 'mdi-water-outline',
    foto_url: '',
    foto_alt: 'Foto: Pastoral do Batismo',
    descricao:
      'Orienta pais e padrinhos na preparação para o Batismo das crianças.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 8,
    sort: 8,
    nome: 'Ministros Extraordinários da Sagrada Comunhão',
    slug: 'ministros-extraordinarios-da-sagrada-comunhao',
    destaque: false,
    icone: 'mdi-cup-outline',
    foto_url: '',
    foto_alt: 'Foto: Ministros Extraordinários da Sagrada Comunhão',
    descricao:
      'Auxiliam na distribuição da Eucaristia nas missas e levam a Comunhão aos doentes e idosos.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 9,
    sort: 9,
    nome: 'Legião de Maria',
    slug: 'legiao-de-maria',
    destaque: false,
    icone: 'mdi-flower-outline',
    foto_url: '',
    foto_alt: 'Foto: Legião de Maria',
    descricao:
      'Movimento mariano de oração e apostolado, com visitas às famílias e aos doentes.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 10,
    sort: 10,
    nome: 'Terço dos Homens',
    slug: 'terco-dos-homens',
    destaque: false,
    icone: 'mdi-hands-pray',
    foto_url: '',
    foto_alt: 'Foto: Terço dos Homens',
    descricao:
      'Reúne os homens da comunidade para rezar o terço e fortalecer a fé e a vida em família.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
  {
    id: 11,
    sort: 11,
    nome: 'Pastoral Social',
    slug: 'pastoral-social',
    destaque: false,
    icone: 'mdi-handshake-outline',
    foto_url: '',
    foto_alt: 'Foto: Pastoral Social',
    descricao:
      'Atende famílias em situação de vulnerabilidade, com campanhas de doação e acompanhamento solidário.',
    coordenador: '[A confirmar com a secretaria]',
    encontros: '[A confirmar com a secretaria]',
    local: '[A confirmar com a secretaria]',
    contato_label: '',
    contato_href: '',
  },
]

/**
 * Página /pedido-de-oracoes — singleton `pedido_oracao_page` no Directus.
 * Os pedidos enviados irão futuramente para uma coleção `pedidos_oracao` (ver PedidoOracoesView.vue).
 */
export const pedidoOracaoPage = {
  title: 'Pedido de Oração',
  resumo:
    'Envie sua intenção de oração. A comunidade da Paróquia Santíssima Trindade reza pelos pedidos recebidos.',
  breadcrumb_label: 'Pedido de Oração',
  hero_icon: 'mdi-hands-pray',
  form_title: 'Sua Intenção',
  form_lead: 'Escreva seu pedido abaixo. O nome é opcional.',
  name_label: 'Nome (opcional)',
  name_placeholder: 'Seu nome',
  request_label: 'Pedido / intenção',
  request_placeholder: 'Escreva aqui a sua intenção de oração',
  request_required_message: 'Escreva o seu pedido de oração.',
  anonymous_label: 'Desejo que meu pedido seja anônimo',
  submit_label: 'Enviar Pedido',
  success_title: 'Pedido Recebido',
  success_message: 'Seu pedido foi recebido. Rezaremos por sua intenção.',
  new_request_label: 'Enviar Outro Pedido',
}

export const prayerRequest = {
  title: 'Pedido de Oração',
  lead: 'Escreva sua intenção. A comunidade reza por ela nas missas da semana.',
  name_label: 'Seu nome (opcional)',
  request_label: 'Seu pedido',
  request_placeholder: 'Escreva aqui a sua intenção',
  checkbox_label: 'Pode ser lido durante a missa',
  submit_label: 'Enviar pedido',
  success_message: 'Pedido enviado. A comunidade vai rezar por esta intenção.',
}

export const contact = {
  title: 'Como Chegar',
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
  cnpj: '[CNPJ a confirmar]',
  email: '[E-mail a confirmar]',
  phone: '(86) 3305-3327',
  phone_href: 'tel:+558633053327',
  instagram_label: 'Instagram',
  instagram: '@_paroquiasantissimatrindade',
  instagram_url: 'https://www.instagram.com/_paroquiasantissimatrindade',
  youtube_label: 'YouTube',
  youtube_url: 'https://www.youtube.com',
  route_label: 'Traçar rota',
  call_label: 'Ligar para a secretaria',
  communities_title: 'Comunidades',
  communities: [
    {
      name: 'Nossa Senhora da Esperança',
      slug: 'nossa-senhora-da-esperanca',
      note: 'missa aos domingos, às 17h.',
    },
    {
      name: 'Santa Helena',
      slug: 'santa-helena',
      note: 'missa aos sábados, às 19h.',
    },
  ],
}

/**
 * Página /comunidades — singleton `comunidades_page` no Directus.
 */
export const comunidadesPage = {
  title: 'Nossas Comunidades',
  resumo:
    'A Paróquia Santíssima Trindade reúne a Igreja Matriz, no bairro Primavera, e as comunidades Nossa Senhora da Esperança e Santa Helena.',
  breadcrumb_parent: 'A Paróquia',
  breadcrumb_label: 'Comunidades',
  hero_icon: 'mdi-home-group',
  padroeiro_label: 'Padroeiro(a)',
  endereco_label: 'Endereço',
  missas_label: 'Missas',
  festa_label: 'Festa do Padroeiro',
  maps_label: 'Como Chegar',
  horarios_label: 'Ver Horários',
  horarios_href: '/#horarios',
  foto_placeholder_label: 'Foto da comunidade',
  cta_title: 'Fale com a Secretaria',
  cta_text:
    'Dúvidas sobre horários, celebrações ou a vida das comunidades? A secretaria paroquial ajuda você.',
  cta_label: 'Fale com a Secretaria',
}

/** Horários das comunidades vêm de `masses.communities.items` (mesma fonte da home). */
const missasDaComunidade = (name) =>
  masses.communities.items
    .filter((item) => item.name === name)
    .map((item) => ({ dia: item.day, horario: item.time }))

/**
 * Coleção `comunidades` no Directus (ordem pelo campo `sort`; Matriz primeiro).
 * Missas: lista { dia, horario }. maps_url vazio → busca no Google Maps pelo nome + Teresina.
 * Usa apenas dados já existentes no site; o restante é PLACEHOLDER a confirmar com a secretaria.
 */
export const comunidades = [
  {
    id: 1,
    sort: 1,
    nome: 'Igreja Matriz Santíssima Trindade',
    slug: 'igreja-matriz',
    tipo: 'Igreja Matriz',
    icone: 'mdi-church',
    padroeiro: 'Santíssima Trindade',
    foto_url: '',
    foto_alt: 'Foto da Igreja Matriz da Paróquia Santíssima Trindade',
    descricao: 'Sede da Paróquia Santíssima Trindade, no bairro Primavera, zona Norte de Teresina.',
    endereco: contact.address_lines[0],
    bairro: contact.address_lines[1],
    missas: masses.matriz.rows.map((row) => ({
      dia: row.day,
      horario: row.times ? row.times.join(' e ') : row.empty,
      sem_missa: !row.times,
    })),
    maps_url: contact.maps_url,
    festa_padroeiro: '[A confirmar com a secretaria]',
  },
  {
    id: 2,
    sort: 2,
    nome: 'Comunidade Nossa Senhora da Esperança',
    slug: 'nossa-senhora-da-esperanca',
    tipo: 'Comunidade',
    icone: 'mdi-church-outline',
    padroeiro: 'Nossa Senhora da Esperança',
    foto_url: '',
    foto_alt: 'Foto da Comunidade Nossa Senhora da Esperança',
    descricao: '[Descrição a confirmar com a secretaria]',
    endereco: '[A confirmar com a secretaria]',
    bairro: '',
    missas: missasDaComunidade('Nossa Senhora da Esperança'),
    maps_url: '',
    festa_padroeiro: '[A confirmar com a secretaria]',
  },
  {
    id: 3,
    sort: 3,
    nome: 'Comunidade Santa Helena',
    slug: 'santa-helena',
    tipo: 'Comunidade',
    icone: 'mdi-church-outline',
    padroeiro: 'Santa Helena',
    foto_url: '',
    foto_alt: 'Foto da Comunidade Santa Helena',
    descricao: '[Descrição a confirmar com a secretaria]',
    endereco: '[A confirmar com a secretaria]',
    bairro: '',
    missas: missasDaComunidade('Santa Helena'),
    maps_url: '',
    festa_padroeiro: '[A confirmar com a secretaria]',
  },
]

export const footer = {
  // Faixa final: "© … · Desenvolvido por: Delta.Io" (sem link — URL não informada)
  credito_label: 'Desenvolvido por:',
  credito_nome: 'Delta.Io',
  contato_labels: {
    endereco: 'Endereço',
    cnpj: 'CNPJ',
    email: 'E-mail',
    telefone: 'Telefone',
  },
  secretaria_title: 'Secretaria',
  instagram_label: 'Instagram',
  mapa_label: 'Ver no mapa',
  columns: [
    {
      id: 'paroquia',
      title: 'A Paróquia',
      links: [
        { label: 'Nossa História', href: '/historia' },
        { label: 'Comunidades', href: '/comunidades' },
      ],
    },
    {
      id: 'celebracoes',
      title: 'Celebrações',
      links: [
        { label: 'Horários de Missa', href: '/#horarios' },
        { label: 'Liturgia do Dia', href: '/#horarios' },
        { label: 'Próximas Celebrações', href: '/#celebracoes' },
      ],
    },
    {
      id: 'participe',
      title: 'Participe',
      links: [
        { label: 'Notícias e Avisos', href: '/noticias' },
        { label: 'Sacramentos', href: '/#sacramentos' },
        { label: 'Dízimo', href: '/#dizimo' },
        { label: 'Pedido de Oração', href: '/pedido-de-oracoes' },
      ],
    },
  ],
}
