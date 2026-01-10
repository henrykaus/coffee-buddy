export enum OrderType {
  ToGo = 'TO GO',
  ForHere = 'FOR HERE',
  CoffeeBeans = 'BEANS',
}

export enum MainMenuOption {
  Home = 'home',
  MoreOptions = 'more-options',
}

export enum UserMenuOption {
  Home = 'home',
  MoreOptions = 'more-options',
  LogOut = 'log-out',
}

export enum MoreMenuOption {
  WhatsNew = 'whats-new',
  DeleteAccount = 'delete-account',
}

export enum VisitActionType {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export enum Route {
  Root = '/',
  Home = '/home',
  Login = '/login',
  WhatsNew = '/home/updates',
}

export enum PageTitle {
  Home = 'Recent visits',
  WhatsNew = "What's new",
}

export enum ShopSearchState {
  Default = 'default',
  SelectedShop = 'selected-shop',
  Searching = 'searching',
  NoShops = 'no-shops',
  FoundShops = 'found-shops',
}

export enum ToastType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

export enum VisitFormField {
  Date = 'date',
  Rating = 'rating',
  Notes = 'notes',
  Shop = 'shop',
  Drink = 'drink',
  Size = 'size',
  Price = 'price',
  OrderType = 'order-type',
}

export enum MenuPreference {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

export enum LocalStorageItem {
  MenuPreference = 'menu-preference',
}
