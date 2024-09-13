import {user} from '~/utils/auth-data'

export const FetchedSwiftLoanStatuses = ref([])

export function getIdFromUID(uid: string) {
  return FetchedSwiftLoanStatuses.value.find(ls => ls?.uid === uid)?.id
}

export function getUIDFromId(id: string) {
  return FetchedSwiftLoanStatuses.value.find(ls => ls?.id === id)?.uid
}

export enum SwiftLoanStatuses {
  CREATED_UID = 'CREATED',
  TO_UNDERWRITER_UID = 'TO-UNDERWRITER',
  APPROVED_UID = 'APPROVED',
  DENIED_UID = 'DENIED',
  POSTPONED_UID = 'POSTPONED',
  DISBURSED_UID = 'DISBURSED',
  CLIENT_REFUSED_UID = 'CLIENT-REFUSED',
  CLIENT_UNAVAILABLE_UID = 'CLIENT-UNAVAILABLE',
}

export enum SwiftLoanUserRole {
  customerServiceSpecialist = 'customer-service-specialist',
  callOfficer = 'call-officer',
  operationOfficer = 'operation-officer',
  manager = 'manager',
  cashier = 'cashier',
  underwriter = 'underwriter',
  underwriterManager = 'underwriter-manager',
}

export enum SwiftLoanSearchAction {
  clientInformation = 'clientInformation',
  newRequest = 'newRequest',
  newRequestBased = 'newRequestBased',
  clientDecision = 'clientDecision',
  protocol = 'protocol',
  openRequest = 'openRequest',
  openDeclaration = 'openDeclaration',
  result = 'result',
}

export function getSwiftLoanPermissions() {

  const swiftLoanPermissions = {
    'call-officer': {
      window: [
        {title: 'Запрос от андерайтера', status: [SwiftLoanStatuses.POSTPONED_UID, SwiftLoanStatuses.APPROVED_UID, SwiftLoanStatuses.DENIED_UID],
        actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol}
        ],
        additionalFilter: `filter{created_by.id}=${user.value.id}`},
        {title: 'Открытые заявки', status: [SwiftLoanStatuses.CREATED_UID, SwiftLoanStatuses.TO_UNDERWRITER_UID],
        actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
        ],
        additionalFilter: `filter{created_by.id}=${user.value.id}`},
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
        {title: 'Новая Заявка', action: SwiftLoanSearchAction.newRequestBased},
        {title: 'Решение клиента', action: SwiftLoanSearchAction.clientDecision},
      ]
    },
    'underwriter': {
      window: [
        {title: 'Открытые заявки', status: [SwiftLoanStatuses.TO_UNDERWRITER_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol}
        ]},
        {title: 'Отложенные решения', status: [SwiftLoanStatuses.POSTPONED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol}
        ]},
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
        {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
        {title: 'Протокол решения', action: SwiftLoanSearchAction.protocol},
      ]
    },
    'customer-service-specialist': {
      window: [
        {title: 'Запрос от андерайтера', status: [SwiftLoanStatuses.POSTPONED_UID, SwiftLoanStatuses.APPROVED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol}
        ],
        additionalFilter: `filter{created_by.swift_loan_role}=${SwiftLoanUserRole.customerServiceSpecialist}`},
        {title: 'Открытые заявки', status: [SwiftLoanStatuses.CREATED_UID, SwiftLoanStatuses.TO_UNDERWRITER_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
        ],
        additionalFilter: `filter{created_by.swift_loan_role}=${SwiftLoanUserRole.customerServiceSpecialist}`},
        {title: 'Заявки с Колл-центра', status: [SwiftLoanStatuses.APPROVED_UID, SwiftLoanStatuses.DENIED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol}
        ],
        additionalFilter: `filter{created_by.swift_loan_role}=${SwiftLoanUserRole.callOfficer}`},
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
        {title: 'Новая Заявка', action: SwiftLoanSearchAction.newRequestBased},
      ]
    },
    'operation-officer': {
      window: [
        {title: 'Открытые заявки', status: [SwiftLoanStatuses.APPROVED_UID, SwiftLoanStatuses.DENIED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
          {title: 'Результат', action: SwiftLoanSearchAction.result},
        ]}
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
      ]
    },
    'manager': {
      window: [
        {title: 'Заявки с Решением', status: [SwiftLoanStatuses.APPROVED_UID, SwiftLoanStatuses.DENIED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
        ]},
        {title: 'Отложенные заявки', status: [SwiftLoanStatuses.POSTPONED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
        ]}
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
      ]
    },
    'cashier': {
      window: [
        {title: 'Заявки на выдачу', status: [SwiftLoanStatuses.APPROVED_UID], actions: []}
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
      ]
    },
    'underwriter-manager': {
      window: [
        {title: 'Открытые заявки в очереди', status: [SwiftLoanStatuses.TO_UNDERWRITER_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
        ]},
        {title: 'Отложенные заявки', status: [SwiftLoanStatuses.POSTPONED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
        ]},
        {title: 'Открытые заявки с решением', status: [SwiftLoanStatuses.APPROVED_UID, SwiftLoanStatuses.DENIED_UID], actions: [
          {title: 'Заявка', action: SwiftLoanSearchAction.openRequest},
          {title: 'Декларация', action: SwiftLoanSearchAction.openDeclaration},
          {title: 'Решение', action: SwiftLoanSearchAction.protocol},
        ]}
      ],
      searchAction: [
        {title: 'Информация о клиенте', action: SwiftLoanSearchAction.clientInformation},
      ]
    }
  }

  return swiftLoanPermissions[user.value.swift_loan_role] || []
}
