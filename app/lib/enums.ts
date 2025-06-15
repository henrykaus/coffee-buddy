export enum OrderType {
  ToGo = 'TO GO',
  ForHere = 'FOR HERE',
}

export enum UserMenuOption {
  DeleteAccount = 'delete-account',
  LogOut = 'log-out',
  MoreOptions = 'more-options',
  WhatsNew = 'whats-new',
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
