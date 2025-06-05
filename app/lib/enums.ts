export enum OrderType {
  ToGo = 'TO GO',
  ForHere = 'FOR HERE',
}

export enum UserMenuOption {
  LogOut = 'log-out',
  MoreOptions = 'more-options',
  DeleteAccount = 'delete-account',
}

export enum VisitActionType {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export enum Route {
  Root = '',
  Home = 'home',
  Login = 'login',
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
