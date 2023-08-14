import type { NetInfoState } from "@react-native-community/netinfo";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import type { ComponentProps } from "react";
import { AppState } from "react-native";
import { SWRConfig } from "swr";

type SWRConfigProps = ComponentProps<typeof SWRConfig>;

export function SWRProvider(props: SWRConfigProps) {
  const net = useNetInfo();

  return (
    <SWRConfig
      {...props}
      value={{
        initFocus: (callback) => {
          let { currentState } = AppState;

          const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
              if (
                currentState.match(/inactive|background/) &&
                nextAppState === "active"
              ) {
                callback();
              }

              currentState = nextAppState;
            },
          );

          return () => subscription.remove();
        },
        initReconnect: (callback) => {
          let { isInternetReachable } = net;

          const onNetInfoChange = (nextState: NetInfoState) => {
            if (nextState.isInternetReachable !== isInternetReachable) {
              callback();
            }

            isInternetReachable = nextState.isInternetReachable;
          };

          const subscription = NetInfo.addEventListener(onNetInfoChange);

          return () => subscription();
        },
        isOnline: () => net.isInternetReachable ?? false,
        isVisible: () => true,
        provider: () => new Map(),
        ...props.value,
      }}
    />
  );
}
