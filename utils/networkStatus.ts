import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

type NetworkStatusListener = (isOnline: boolean) => void;

class NetworkStatus {
  private listeners: NetworkStatusListener[] = [];
  private isOnline: boolean = true;
  private unsubscribeNetInfo: (() => void) | null = null;

  constructor() {
    // Инициализируем слушатель NetInfo
    this.init();
  }

  private init() {
    // Подписываемся на обновления сети
    this.unsubscribeNetInfo = NetInfo.addEventListener((state: NetInfoState) => {
      // Считаем, что мы онлайн, если isConnected true и isInternetReachable true (или null, т.к. иногда оно null при старте)
      const isConnected =
        state.isConnected &&
        (state.isInternetReachable === true || state.isInternetReachable === null);

      this.setOnline(!!isConnected);
    });

    // Также получаем начальное состояние
    NetInfo.fetch().then((state) => {
      const isConnected =
        state.isConnected &&
        (state.isInternetReachable === true || state.isInternetReachable === null);
      this.setOnline(!!isConnected);
    });
  }

  public addListener(listener: NetworkStatusListener) {
    this.listeners.push(listener);
    // Сразу сообщаем текущий статус новому слушателю
    listener(this.isOnline);
  }

  public removeListener(listener: NetworkStatusListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public setOnline(isOnline: boolean) {
    if (this.isOnline !== isOnline) {
      this.isOnline = isOnline;
      this.notifyListeners();
    }
  }

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isOnline));
  }
}

export const networkStatus = new NetworkStatus();
